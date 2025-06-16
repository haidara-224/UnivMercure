<?php

namespace App\Http\Controllers;

use App\Models\anneesScolaire;
use App\Models\classes;
use App\Models\departement;
use App\Models\parcour;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ParcourController extends Controller
{
    public function reincriptions()
    {
        $derniereAnneeScolaire = AnneesScolaire::where('isActive', true)->first();
        $departement = departement::select(['id', 'name'])->get();
        $classe = classes::select(['id', 'niveau'])->get();
        if (!$derniereAnneeScolaire) {
            return to_route('dashboard.index');
        }

        $parcours = Parcour::with(['anneesScolaire', 'departement', 'etudiant', 'classes'])
            ->where('annees_scolaire_id', $derniereAnneeScolaire->id)
            ->get();

        return Inertia::render('dashboard/reincriptions/index', [
            'parcours' => $parcours,
            'departements' => $departement,
            'classes' => $classe,
            'annees' => $derniereAnneeScolaire
        ]);
    }
    public function create()
    {
        $departement = departement::select(['id', 'name'])->get();
        $classe = classes::select(['id', 'niveau'])->get();
        $parcours = Parcour::with(['anneesScolaire', 'departement', 'etudiant', 'classes'])
            ->get();
        $annees = anneesScolaire::select(['id', 'annee_scolaire'])->get();
        return Inertia::render('dashboard/reincriptions/create', [
            'parcours' => $parcours,
            'departements' => $departement,
            'classes' => $classe,
            'annees' => $annees
        ]);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'etudiants' => 'required|array',
            'etudiants.*' => 'exists:etudiants,id',
            'classe' => 'required|exists:classes,id',
            'departement' => 'required|exists:departements,id',
            'annees_scolaire' => 'required|exists:annees_scolaires,id'
        ]);

        $déjàInscrits = [];

        foreach ($validated['etudiants'] as $etudiantId) {
            $existe = DB::table('parcours')
                ->where('etudiant_id', $etudiantId)
                ->where('annees_scolaire_id', $validated['annees_scolaire'])
                ->exists();

            if ($existe) {
                $déjàInscrits[] = $etudiantId;
                continue;
            }

            parcour::create([
                'etudiant_id' => $etudiantId,
                'classes_id' => $validated['classe'],
                'departement_id' => $validated['departement'],
                'annees_scolaire_id' => $validated['annees_scolaire'],
            ]);
        }


        if (count($déjàInscrits)) {
            return back()->with('error', 'Certains étudiants étaient déjà inscrits. Les autres ont été enregistrés.');
        }

        return back()->with('success', 'Étudiants réinscrits avec succès.');
    }


    public function delete(parcour $parcours)
    {
        $parcours->delete();
        return back()->with('success', 'Parcours supprimé avec success');
    }
}
