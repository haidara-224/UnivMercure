<?php

namespace App\Http\Controllers;

use App\Models\anneesScolaire;
use App\Models\classes;
use App\Models\departement;
use App\Models\matiere;
use App\Models\parcour;
use App\Models\salle;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExamController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard/examens/index');
    }
  public function create(Request $request)
{
    $matieres = Matiere::select('id', 'nom')->get();
    $departements = Departement::select('id', 'name')->get();
    $classes = classes::select('id', 'niveau')->get();
    $salles = Salle::select('id', 'salle')->get();
    $anneeActive = AnneesScolaire::where('isActive', true)->first();

    $etudiants = collect();

    if ($request->filled(['classe_id', 'departement_id', 'annee_scolaire_id'])) {
        $request->validate([
            'classe_id' => 'required|exists:classes,id',
            'departement_id' => 'required|exists:departements,id',
            'annee_scolaire_id' => 'required|exists:annees_scolaires,id',
        ]);

        $etudiants = Parcour::with('etudiant:id,name,prenom,matricule')
            ->where('classes_id', $request->classe_id)
            ->where('departement_id', $request->departement_id)
            ->where('annees_scolaire_id', $request->annee_scolaire_id)
            ->get()
            ->map(fn($parcours) => [
                'id' => $parcours->etudiant->id,
                'name' => $parcours->etudiant->name . ' ' . $parcours->etudiant->prenom,
                'matricule' => $parcours->etudiant->matricule,
            ]);
    }

    return Inertia::render('dashboard/examens/create', [
        'matieres' => $matieres,
        'departements' => $departements,
        'classes' => $classes,
        'salles' => $salles,
        'anneeActive' => $anneeActive,
        'etudiants' => $etudiants,
    ]);
}

    // Nouvelle méthode pour récupérer les étudiants
public function getEtudiants(Request $request) {
    $request->validate([
        'classe_id' => 'required|exists:classes,id',
        'departement_id' => 'required|exists:departements,id',
        'annee_scolaire_id' => 'required|exists:annees_scolaires,id'
    ]);

    $etudiants = parcour::with(['etudiant:id,name,prenom,matricule'])
        ->where('classe_id', $request->classe_id)
        ->where('departement_id', $request->departement_id)
        ->where('annees_scolaire_id', $request->annee_scolaire_id)
        ->get()
        ->map(function($parcours) {
            return [
                'id' => $parcours->etudiant->id,
                'nom_complet' => $parcours->etudiant->name . ' ' . $parcours->etudiant->prenom,
                'matricule' => $parcours->etudiant->matricule
            ];
        });

    return response()->json($etudiants);
}
}
