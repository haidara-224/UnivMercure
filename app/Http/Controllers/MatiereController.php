<?php

namespace App\Http\Controllers;

use App\Http\Requests\formEditMatiereRequest;
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
                'nom' => $validated['nom'],
                'credits' => $validated['credits']
            ]);

            $matiere->departements()->attach($validated['departement_id']);

            return redirect()->back()->with('success', 'Matière ajoutée avec succès');
        }

    }



    public function update(formEditMatiereRequest $request, matiere $matiere)
    {
        $validated = $request->validated();
        if (!$validated) {
            return redirect()->back()->with('error', 'Erreur de validation');
        } else {
            $matiere->update([
                'nom' => $validated['nom'],
                'credits' => $validated['credits']
            ]);

            $matiere->departements()->sync($validated['departement_id']);

            return redirect()->back()->with('success', 'Matière modifiée avec succès');
        }
    }



    public function destroy(matiere $matiere)
    {
        $matiere->departements()->detach();
        $matiere->delete();
        return redirect()->back()->with('success', 'Matière supprimée avec succès');
    }

}
