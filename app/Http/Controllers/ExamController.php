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
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ExamController extends Controller
{
    public function index()
    {
        $exam = Exam::with('matiere','anneesScolaire','repartitions.etudiant', 'repartitions.salle','repartitions.exam')->get();

        $examsEtudiants=ExamsEtudiantsSalle::with('etudiant','salle','etudiant')->get();
        $salle=salle::select(['id','salle','capacite'])->get();

        return Inertia::render('dashboard/examens/index',[
            'exam'=>$exam,
            'examsEtudiants'=>$examsEtudiants,
            'salle'=>$salle
        ]);
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
        'etudiants_ids' => 'required|array',
        'etudiants_ids.*' => 'exists:etudiants,id',
    ]);

    $anneeActive = AnneesScolaire::where('isActive', true)->first();

    if (!$anneeActive) {
        return back()->withErrors('Aucune année scolaire active trouvée.');
    }
    $salle = Salle::find($data['salle_id']);
    $nombreEtudiants = count($data['etudiants_ids']);

    if ($nombreEtudiants > $salle->capacite) {
        return back()->with('error',"La salle ne peut contenir que {$salle->capacite} étudiants, mais vous avez sélectionné $nombreEtudiants étudiants.");
    }
    $etudiantsDejaInscrits = ExamsEtudiantsSalle::whereHas('exam', function ($query) use ($data, $anneeActive) {
        $query->where('matiere_id', $data['matiere_id']);
        $query->where('module', $data['module'])
              ->where('annees_scolaire_id', $anneeActive->id);

    })->whereIn('etudiant_id', $data['etudiants_ids'])->pluck('etudiant_id')->toArray();

    if (!empty($etudiantsDejaInscrits)) {

        return back()->with('error',"Certains étudiants sont déjà inscrits à un examen pour cette matière et ce module : " . implode(', ', $etudiantsDejaInscrits));
    }
    DB::beginTransaction();
    try {
        $exam = Exam::create([
            'matiere_id' => $data['matiere_id'],
            'module' => $data['module'],
            'annees_scolaire_id' => $anneeActive->id,
            'date_examen' => $data['date_examen'],
            'heure_debut' => $data['heure_debut'],
            'heure_fin' => $data['heure_fin'],
        ]);

        foreach ($data['etudiants_ids'] as $etudiantId) {
            ExamsEtudiantsSalle::create([
                'exam_id' => $exam->id,
                'etudiant_id' => $etudiantId,
                'salle_id' => $data['salle_id'],
            ]);
        }

        DB::commit();
        return redirect()->back()->with('success', 'Examen créé avec succès.');
    } catch (\Exception $e) {
        DB::rollBack();
        return back()->with('error','Erreur lors de la création de l\'examen : ' . $e->getMessage());
    }
}
public function delete(exam $examens){
    $examens->delete();
return redirect()->back()->with('success', 'Examen Supprimé.');
}


}
