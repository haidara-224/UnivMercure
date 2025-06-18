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
    public function index()
    {
          $AnneeScolaire = anneesScolaire::select(['id','annee_scolaire'])->get();
        $departement = departement::select(['id', 'name'])->get();
        $classe = classes::select(['id', 'niveau'])->get();


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
        $derniereAnneeScolaire = anneesScolaire::where('isActive', true)->first();
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
     if (count($dejaInscrits)) {
        return back()->with('error', 'Certains étudiants étaient déjà inscrits dans cette année scolaire. Les autres ont été enregistrés.');
    }
    Parcour::create([
        'etudiant_id' => $etudiantId,
        'classes_id' => $validated['classe'],
        'departement_id' => $validated['departement'],
        'annees_scolaire_id' => $anneeId,
    ]);
}




    return back()->with('success', 'Étudiants inscrits avec succès.');
}



    public function delete(parcour $parcours)
    {
        $parcours->delete();
        return back()->with('success', 'Parcours supprimé avec success');
    }
}
