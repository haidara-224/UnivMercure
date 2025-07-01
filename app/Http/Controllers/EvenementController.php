<?php

namespace App\Http\Controllers;

use App\Models\Evenement;
use App\Models\EvenementImage;
use App\Models\Image;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class EvenementController extends Controller
{
    public function index()
    {
      $evenements = Evenement::with('images')
    ->orderByRaw("CASE WHEN start_date >= ? THEN 0 ELSE 1 END", [now()])
    ->orderBy('start_date')
    ->orderBy('end_date')
    ->get();




        return Inertia::render('bdedashboard/Evenements/index', [
            'evenements' => $evenements,
        ]);
    }
    public function create()
    {
        return Inertia::render('bdedashboard/Evenements/create');
    }
public function store(Request $request)
{
    $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'required|string',
        'start_date' => 'required|date',
        'end_date' => 'required|date|after_or_equal:start_date',
        'badge' => 'required|string|max:255',
        'images' => 'required|array',
        'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);

    DB::transaction(function () use ($request) {
        $evenement = Evenement::create($request->only('title', 'description', 'start_date', 'end_date', 'badge'));

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $imageFile) {
                $path = $imageFile->store('evenement_images', 'public');
                $image = Image::create(['url' => $path]);
                $evenement->images()->attach($image->id);
            }
        }
    });

    return back()->with('success', 'Événement créé avec succès.');
}

    public function edit(Evenement $evenement)
    {
        $evenement->load('images');
        return Inertia::render('bdedashboard/Evenements/edit', [
            'evenement' => $evenement,
        ]);

    }
   public function update(Request $request, Evenement $evenement)
{
    $request->validate([
        'title' => 'required|string|max:255',
        'description' => 'required|string',
        'start_date' => 'required|date',
        'end_date' => 'required|date|after_or_equal:start_date',
        'badge' => 'required|string|max:255',
        'images' => 'required|array',
        'images.*' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);

    DB::transaction(function () use ($request, $evenement) {
        $evenement->update($request->only('title', 'description', 'start_date', 'end_date'));

        if ($request->hasFile('images')) {

            foreach ($evenement->images as $image) {
                Storage::disk('public')->delete($image->url);
                $image->delete();
            }

            foreach ($request->file('images') as $imageFile) {
                $path = $imageFile->store('evenement_images', 'public');
                $image = Image::create(['url' => $path]);
                $evenement->images()->attach($image->id);
            }
        }
    });

    return redirect()->route('bde.evenements.index')->with('success', 'Événement mis à jour avec succès.');
}

    public function destroy(Evenement $evenement)
    {

        $evenement->images()->each(function ($image) {
            Storage::disk('public')->delete($image->url);
            $image->delete();
        });
        $evenement->delete();
        return redirect()->route('bde.evenements.index')->with('success', 'Événement supprimé avec succès.');
    }
}
