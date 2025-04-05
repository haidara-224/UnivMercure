<?php

namespace App\Http\Controllers;

use App\Http\Requests\MatiereFormRequest;
use App\Models\departement;
use App\Models\matiere;
use Illuminate\Http\Request;

class MatiereController extends Controller
{
    public function index()
    {
        $matieres = matiere::with('departements')->orderByDesc('created_at')->get();
        $departement=departement::select('id','name')->get();
        return inertia('dashboard/matieres/index', [
            'matiere' => $matieres,
            'departement' => $departement,
        ]);
    }

    public function create(MatiereFormRequest $request)
    {
        $validated = $request->validated();
        if(!$validated){
            return redirect()->back()->with('error', 'Erreur de validation');
        }else{
            $matiere = Matiere::create([
                'nom' => $validated['nom']
            ]);

            $matiere->departements()->attach($validated['departement_id']);

            return redirect()->back()->with('success', 'Matière ajoutée avec succès');
        }

    }



    public function update(Request $request, $id)
    {
        // Handle the request to update an existing matiere
        // Validate and save the data
        // Redirect or return a response
    }

    public function destroy(matiere $matiere)
    {
        $matiere->departements()->detach();
        $matiere->delete();
        return redirect()->back()->with('success', 'Matière supprimée avec succès');
    }

}
