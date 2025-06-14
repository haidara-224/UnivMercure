<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExamRequestValidated;
use App\Models\anneesScolaire;
use App\Models\classes;
use App\Models\departement;
use App\Models\exam;
use App\Models\ExamsEtudiantsSalle;
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
        $salles = Salle::select('id', 'salle', 'capacite')->get();
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



public function store(Request $request)
{
    $data = $request->validate([
        'module' => 'required',
        'matiere_id' => 'required|exists:matieres,id',
        'date_examen' => 'required|date',
        'heure_debut' => 'required|date_format:H:i',
        'heure_fin' => 'required|date_format:H:i',
        'salle_id' => 'required|exists:salles,id',
        'etudiant_ids' => 'required|array',
        'etudiant_ids.*' => 'exists:etudiants,id',
    ]);

    $anneeActive = AnneesScolaire::where('isActive', true)->first();

    if (!$anneeActive) {
        return back()->withErrors('Aucune année scolaire active trouvée.');
    }

    $exam = Exam::create([
        'matiere_id' => $data['matiere_id'],
        'module' => $data['module'],
        'annees_scolaire_id' => $anneeActive->id,
        'date_examen' => $data['date_examen'],
        'heure_debut' => $data['heure_debut'],
        'heure_fin' => $data['heure_fin'],
    ]);

    foreach ($data['etudiant_ids'] as $etudiantId) {
        ExamsEtudiantsSalle::create([
            'exam_id' => $exam->id,
            'etudiant_id' => $etudiantId,
            'salle_id' => $data['salle_id'],
        ]);
    }

    return redirect()->back()->with('success', 'Examen créé avec succès.');
}


}
