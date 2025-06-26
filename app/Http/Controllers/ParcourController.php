<?php

namespace App\Http\Controllers;

use App\Models\AnneesScolaire;
use App\Models\Classes;
use App\Models\Departement;
use App\Models\Parcour;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ParcourController extends Controller
{
    public function index()
    {
        $AnneeScolaire = AnneesScolaire::select(['id', 'annee_scolaire'])->get();
        $departement = Departement::select(['id', 'name'])->get();
        $classe = Classes::select(['id', 'niveau'])->get();


        $parcours = Parcour::with(['anneesScolaire', 'departement', 'etudiant.user', 'classes'])

            ->get();

        return Inertia::render('dashboard/parcours/index', [
            'parcours' => $parcours,
            'departements' => $departement,
            'classes' => $classe,
            'annees' => $AnneeScolaire
        ]);
    }
    public function reincriptions()
    {
        $derniereAnneeScolaire = AnneesScolaire::where('isActive', true)->first();
        $departement = Departement::select(['id', 'name'])->get();
        $classe = Classes::select(['id', 'niveau'])->get();
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
        $departement = Departement::select(['id', 'name'])->get();
        $classe = Classes::select(['id', 'niveau'])->get();
        $parcours = Parcour::with(['anneesScolaire', 'departement', 'etudiant', 'classes'])
            ->get();
        $annees = AnneesScolaire::select(['id', 'annee_scolaire'])->get();
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

        $dejaInscrits = [];
        $anneeId = intval($validated['annees_scolaire']);

        foreach ($validated['etudiants'] as $etudiantId) {
            $inscrit = Parcour::where('etudiant_id', $etudiantId)
                ->where('annees_scolaire_id', $anneeId)
                ->exists();

            if ($inscrit) {
                $dejaInscrits[] = $etudiantId;
                continue;
            }

            Parcour::create([
                'etudiant_id' => $etudiantId,
                'classes_id' => $validated['classe'],
                'departement_id' => $validated['departement'],
                'annees_scolaire_id' => $anneeId,
            ]);
        }

        if (count($dejaInscrits)) {
            return back()->with('error', 'Certains étudiants étaient déjà inscrits dans cette année scolaire. Les autres ont été enregistrés.');
        }

        return back()->with('success', 'Tous les étudiants ont été inscrits avec succès.');
    }




    public function delete(Parcour $parcours)
    {
        $parcours->delete();
        return back()->with('success', 'Parcours supprimé avec success');
    }
}
