<?php

namespace App\Http\Controllers;

use App\Http\Requests\SalleCreateFormEditRequest;
use App\Http\Requests\SalleCreateFormRequest;
use App\Models\salle;
use Illuminate\Http\Request;


class SalleController extends Controller
{
    public function index(Request $request)
    {
        $salles = salle::OrderBy('created_at', 'desc')->get();

        return Inertia('dashboard/salles/index', [
            'salles' => $salles,

        ]);
    }

    public function create(SalleCreateFormRequest $request)
    {
         salle::create($request->validated());
        return redirect()->back()->with('success', 'Salle ajoutée avec succès');
    }

    public function update(SalleCreateFormEditRequest $request, salle $salle)
    {
        $salle->salle=$request->salles;
        $salle->capacite=$request->capacite;
        $salle->save();
        return redirect()->back()->with('success', 'Salle modifiée avec succès');
    }

    public function destroy(salle $salle)
    {
        $salle->delete();
        return redirect()->back()->with('success', 'Salle supprimée avec succès');
    }
}
