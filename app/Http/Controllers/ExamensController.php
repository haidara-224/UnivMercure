<?php

namespace App\Http\Controllers;

use App\Http\Requests\responsesstudentRequestValidated;
use App\Models\anneesScolaire;
use App\Models\classes;
use App\Models\departement;
use App\Models\emploie;
use App\Models\examensclasse;
use App\Models\examensclasseresponse;
use App\Models\examensstudents;
use App\Models\examensstudentsresponses;
use App\Models\parcour;
use App\Models\Professeur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ExamensController extends Controller
{
    private function getClasseDepartement() {}
    public function index()
    {
        $prof = Professeur::where('user_id', Auth::id())->firstOrFail();

        $derniereAnneeScolaire = anneesScolaire::orderByDesc('annee_scolaire')->firstOrFail();

        $infosProf = emploie::where('professeur_id', $prof->id)
            ->where('annees_scolaire_id', $derniereAnneeScolaire->id)
            ->select('departement_id', 'classes_id')
            ->distinct()
            ->get();


        $dptforProf = $infosProf->pluck('departement_id');
        $clsForProf = $infosProf->pluck('classes_id');

        $departements = departement::whereIn('id', $infosProf->pluck('departement_id')->unique())
            ->select('id', 'name')
            ->get();


        $niveaux = classes::whereIn('id', $infosProf->pluck('classes_id')->unique())
            ->select('id', 'niveau')
            ->get();
        $examensclasse = examensclasse::with('anneesScolaire', 'departement', 'classes')
            ->orderByDesc('created_at')
            ->where('professeur_id', $prof->id)->get();
        $examensEtudiant = examensstudents::with('etudiants')
            ->orderByDesc('created_at')
            ->where('professeur_id', $prof->id)->get();
        $parcours = parcour::with(['classes', 'departement', 'etudiant'])
            ->whereIn('departement_id', $dptforProf)
            ->whereIn('classes_id', $clsForProf)
            ->where('annees_scolaire_id', $derniereAnneeScolaire->id)
            ->get();

        return Inertia::render('prof/examens/index', [
            'departements' => $departements,
            'parcours' => $parcours,
            'Niveau' => $niveaux,
            'examens' => $examensclasse,
            'examensEtd' => $examensEtudiant,
            'dptProf' => departement::whereIn('id', $dptforProf)->get(),
            'clsProf' => classes::whereIn('id', $clsForProf)->get(),
        ]);
    }
    public function store(Request $request)
    {
        $type = $request->input('type');

        $derniereAnneeScolaire = anneesScolaire::latest('annee_scolaire')->firstOrFail();
        $profId = Professeur::where('user_id', Auth::id())->value('id');

        if ($type === 'classe') {
            $data = $request->validate([
                'titre' => ['required', 'string', 'max:50'],
                'sujet_explication' => ['nullable', 'string'],
                'fichier' => 'nullable|file|mimes:pdf,doc,docx,ppt,pptx|max:10240',
                'date_debut' => ['required', 'date'],
                'date_fin' => ['required', 'date', 'after:date_debut'],
                'departement' => ['required', 'exists:departements,id'],
                'niveaux' => ['required', 'exists:classes,id'],
            ]);

            if ($request->hasFile('fichier')) {
                $data['fichier'] = $request->file('fichier')->store('examens/fichiers', 'public');
            }

            examensclasse::create([
                'titre' => $data['titre'],
                'sujet_explication' => $data['sujet_explication'] ?? null,
                'fichier' => $data['fichier'] ?? null,
                'date_debut' => $data['date_debut'],
                'date_fin' => $data['date_fin'],
                'professeur_id' => $profId,
                'departement_id' => $data['departement'],
                'classes_id' => $data['niveaux'],
                'annees_scolaire_id' => $derniereAnneeScolaire->id,
            ]);
        } elseif ($type === 'etudiant') {
            $data = $request->validate([
                'titre' => ['required', 'string', 'max:50'],
                'sujet_explication' => ['nullable', 'string'],
                'fichier' => 'nullable|file|mimes:pdf,doc,docx,ppt,pptx|max:10240',
                'date_debut' => ['required', 'date'],
                'date_fin' => ['required', 'date', 'after:date_debut'],
                'etudiants' => ['required', 'array'],
                'etudiants.*' => ['exists:etudiants,id'],
            ]);

            if ($request->hasFile('fichier')) {
                $data['fichier'] = $request->file('fichier')->store('examensetudiant/fichiers', 'public');
            }

            $examens =  examensstudents::create([
                'titre' => $data['titre'],
                'sujet_explication' => $data['sujet_explication'] ?? null,
                'fichier' => $data['fichier'] ?? null,
                'date_debut' => $data['date_debut'],
                'date_fin' => $data['date_fin'],
                'professeur_id' => $profId,

                'annees_scolaire_id' => $derniereAnneeScolaire->id,
            ]);
            $examens->etudiants()->attach($data['etudiants']);
        } else {

            abort(400, 'Type d’examen invalide.');
        }

        return back()->with('success', 'Examen créé avec succès.');
    }

    public function createForClasseUpdate(Request $request, examensclasse $examen)
    {
        $data = $request->validate([
            'titre' => ['required', 'string', 'max:50'],
            'sujet_explication' => ['nullable', 'string'],
            'fichier' => 'nullable|file|mimes:pdf,doc,docx,ppt,pptx|max:10240',
            'date_debut' => ['required', 'date'],
            'date_fin' => ['required', 'date'],
            'departement' => ['required', 'exists:departements,id'],
            'niveaux' => ['required', 'exists:classes,id'],
        ]);
        $derniereAnneeScolaire = anneesScolaire::orderByDesc('annee_scolaire')->firstOrFail();
        if ($request->hasFile('fichier')) {
            $data['fichier'] = $request->file('fichier')->store('examens/fichiers', 'public');
        }
        $userAuth = Auth::id();
        $profId = Professeur::where('user_id', $userAuth)->value('id');

        $examen->update([
            'titre' => $data['titre'],
            'sujet_explication' => $data['sujet_explication'] ?? null,
            'fichier' => $data['fichier'] ?? null,
            'date_debut' => $data['date_debut'] ?? null,
            'date_fin' => $data['date_fin'] ?? null,
            'professeur_id' => $profId,
            'departement_id' => $data['departement'],
            'classes_id' => $data['niveaux'],
            'annees_scolaire_id' => $derniereAnneeScolaire->id
        ]);
        return back()->with('success', 'Examens modifié avec succès.');
    }
    public function delete($type, $id)
    {
        if ($type === 'classe') {
            $examen = examensclasse::findOrFail($id);
        } elseif ($type === 'etudiant') {
            $examen = examensstudents::findOrFail($id);
        } else {
            abort(404);
        }

        $examen->delete();

        return back()->with('success', 'Examen supprimé.');
    }

    public function examenStudent()
    {

        $etudiant = Auth::user()->etudiant;

        $examensEtudiant = examensstudents::with('etudiants', 'professeur', 'anneesScolaire')
            ->whereHas('etudiants', function ($query) use ($etudiant) {
                $query->where('etudiants.id', $etudiant->id);
            })
            ->orderByDesc('created_at')
            ->get();
        $parcours = $etudiant->parcours;

        $classesIds = $parcours->pluck('classes_id')->unique();
        $departementIds = $parcours->pluck('departement_id')->unique();


        $examensClasse = examensclasse::with(['classes', 'departement', 'professeur', 'anneesScolaire'])
            ->whereIn('classes_id', $classesIds)
            ->whereIn('departement_id', $departementIds)
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('etudiant/examens', [
            'examensEtd' => $examensEtudiant,
            'examens' => $examensClasse,
        ]);
    }
    public function createResponseStudent(examensstudents $examen)
    {
        $etudiant = Auth::user()->etudiant;

        if (!$examen->etudiants->contains($etudiant->id)) {
            return back()->with('error', 'Vous n\'êtes pas autorisé à répondre à cet examen.');
        }

        return Inertia::render('etudiant/examens/Response/index', [
            'examen' => $examen,
            'response' => $examen->examensstudentsresponses->where('etudiant_id', $etudiant->id)->first(),
        ]);
    }
    public function storeResponseStudent(Request $request, examensstudents $examen)
    {
        $request->validate([
            'response' => ['nullable', 'string',],
            'fichier' => ['nullable', 'file', 'mimes:pdf,doc,docx,ppt,pptx', 'max:10240'],
        ]);

        $etudiantId = Auth::user()->etudiant->id;

        $fichierPath = null;
        if ($request->hasFile('fichier')) {
            $fichierPath = $request->file('fichier')->store('response/fichiers', 'public');
        }

        $reponseExistante = examensstudentsresponses::where('examensstudents_id', $examen->id)
            ->where('etudiant_id', $etudiantId)
            ->first();

        $data = [
            'reponse' => $request->response,
        ];

        if ($fichierPath) {
            $data['fichier'] = $fichierPath;
        }

        if ($reponseExistante) {
            $reponseExistante->update($data);
            return back()->with('success', 'Réponse mise à jour avec succès.');
        }

        examensstudentsresponses::create(array_merge($data, [
            'examensstudents_id' => $examen->id,
            'etudiant_id' => $etudiantId,
        ]));

        return back()->with('success', 'Réponse soumise avec succès.');
    }

    public function createResponseStudentclass(examensclasse $examen)
    {
        $etudiant = Auth::user()->etudiant;



        return Inertia::render('etudiant/examens/class/Response/index', [
            'examen' => $examen,
            'response' =>  $examen->examensclassresponses->where('etudiant_id', $etudiant->id)->first(),

        ]);
    }
     public function storeResponseStudentclass(Request $request, examensclasse $examen)
    {
        $request->validate([
            'response' => ['nullable', 'string',],
            'fichier' => ['nullable', 'file', 'mimes:pdf,doc,docx,ppt,pptx', 'max:10240'],
        ]);

        $etudiantId = Auth::user()->etudiant->id;

        $fichierPath = null;
        if ($request->hasFile('fichier')) {
            $fichierPath = $request->file('fichier')->store('response/fichiers', 'public');
        }

        $reponseExistante = examensclasseresponse::where('examensclasse_id', $examen->id)
            ->where('etudiant_id', $etudiantId)
            ->first();

        $data = [
            'reponse' => $request->response,
        ];

        if ($fichierPath) {
            $data['fichier'] = $fichierPath;
        }

        if ($reponseExistante) {
            $reponseExistante->update($data);
            return back()->with('success', 'Réponse mise à jour avec succès.');
        }

        examensclasseresponse::create(array_merge($data, [
            'examensclasse_id' => $examen->id,
            'etudiant_id' => $etudiantId,
        ]));

        return back()->with('success', 'Réponse soumise avec succès.');
    }
}
