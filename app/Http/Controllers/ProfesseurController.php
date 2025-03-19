<?php

namespace App\Http\Controllers;

use App\Http\Requests\professeurRequest;
use App\Http\Requests\professeurUpdateRequest;
use App\Models\Professeur;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class ProfesseurController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $professeur = Professeur::with('user')->orderByDesc('created_at')->get();

        return Inertia::render('dashboard/professeurs/index', [
            'professeurs' => $professeur
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(professeurRequest $request)
    {

        $data = $request->validated();
        $professeur = new Professeur();
        if ($request->hasFile('photo')) {
            $photoPath = $request->file('photo')->store('images/professeurs', 'public');
            $data['photo'] = $photoPath;
        }

        $professeur->create([
            'matricule' => $data['matricule'],
            'name' => $data['name'],
            'prenom' => $data['prenom'],
            'telephone' => $data['telephone'],
            'photo' => $data['photo'] ?? null,
        ]);
        return redirect()->back()->with('success', 'Professeur Ajouté avec succès');
    }



    public function update(professeurUpdateRequest $request, Professeur $professeur)
{
    $data = $request->validated();

    // Gestion de l'image
    if ($request->hasFile('photo')) {
        // Supprimer l'ancienne image si elle existe
        if (!empty($professeur->photo) && Storage::disk('public')->exists($professeur->photo)) {
            Storage::disk('public')->delete($professeur->photo);
        }
        // Stocker la nouvelle image et enregistrer le chemin
        $data['photo'] = $request->file('photo')->store('images/professeurs', 'public');
    }

    // Mise à jour des données
    $professeur->update($data);

    return redirect()->back()->with('success', 'Professeur mis à jour avec succès');
}
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Professeur $professeur)
    {
        $professeur->delete();
        return redirect()->back()->with('success', 'Professeur Supprimé avec succès');
    }
}
