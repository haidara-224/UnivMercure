<?php

namespace App\Http\Controllers;

use App\Http\Requests\responsesstudentRequestValidated;
use App\Models\AnneesScolaire;
use App\Models\Classes;
use App\Models\Departement;
use App\Models\Emploie;
use App\Models\Examensclasse;
use App\Models\Examensclasseresponse;
use App\Models\Examensstudents;
use App\Models\Examensstudentsresponses;
use App\Models\Parcour;
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

        $derniereAnneeScolaire =  AnneesScolaire::where('isActive', true)->first();

        $infosProf = Emploie::where('professeur_id', $prof->id)
            ->where('annees_scolaire_id', $derniereAnneeScolaire->id)
            ->select('departement_id', 'classes_id')
            ->distinct()
            ->get();


        $dptforProf = $infosProf->pluck('departement_id');
        $clsForProf = $infosProf->pluck('classes_id');

        $departements = Departement::whereIn('id', $infosProf->pluck('departement_id')->unique())
            ->select('id', 'name')
            ->get();


        $niveaux = Classes::whereIn('id', $infosProf->pluck('classes_id')->unique())
            ->select('id', 'niveau')
            ->get();
        $examensclasse = Examensclasse::with('anneesScolaire', 'departement', 'classes')
            ->orderByDesc('created_at')
            ->where('professeur_id', $prof->id)->get();
        $examensEtudiant = Examensstudents::with('etudiants')
            ->orderByDesc('created_at')
            ->where('professeur_id', $prof->id)->get();
        $parcours = Parcour::with(['classes', 'departement', 'etudiant'])
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
            'dptProf' => Departement::whereIn('id', $dptforProf)->get(),
            'clsProf' => Classes::whereIn('id', $clsForProf)->get(),
        ]);
    }
    public function store(Request $request)
    {
        $type = $request->input('type');

        $derniereAnneeScolaire = AnneesScolaire::latest('annee_scolaire')->firstOrFail();
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

            Examensclasse::create([
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

    public function createForClasseUpdate(Request $request, Examensclasse $examen)
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
        $derniereAnneeScolaire = AnneesScolaire::orderByDesc('annee_scolaire')->firstOrFail();
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
            $examen = Examensclasse::findOrFail($id);
        } elseif ($type === 'etudiant') {
            $examen = Examensstudents::findOrFail($id);
        } else {
            abort(404);
        }

        $examen->delete();

        return back()->with('success', 'Examen supprimé.');
    }

    public function examenStudent()
    {

        $etudiant = Auth::user()->etudiant;

        $examensEtudiant = Examensstudents::with('etudiants', 'professeur', 'anneesScolaire')
            ->whereHas('etudiants', function ($query) use ($etudiant) {
                $query->where('etudiants.id', $etudiant->id);
            })
            ->orderByDesc('created_at')
            ->get();
        $parcours = $etudiant->parcours;

        $classesIds = $parcours->pluck('classes_id')->unique();
        $departementIds = $parcours->pluck('departement_id')->unique();


        $examensClasse = Examensclasse::with(['classes', 'departement', 'professeur', 'anneesScolaire'])
            ->whereIn('classes_id', $classesIds)
            ->whereIn('departement_id', $departementIds)
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('etudiant/examens', [
            'examensEtd' => $examensEtudiant,
            'examens' => $examensClasse,
        ]);
    }
    public function createResponseStudent(Examensstudents $examen)
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
    public function storeResponseStudent(Request $request, Examensstudents $examen)
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

        $reponseExistante = Examensstudentsresponses::where('examensstudents_id', $examen->id)
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

        Examensstudentsresponses::create(array_merge($data, [
            'examensstudents_id' => $examen->id,
            'etudiant_id' => $etudiantId,
        ]));

        return back()->with('success', 'Réponse soumise avec succès.');
    }

    public function createResponseStudentclass(Examensclasse $examen)
    {
        $etudiant = Auth::user()->etudiant;



        return Inertia::render('etudiant/examens/class/Response/index', [
            'examen' => $examen,
            'response' =>  $examen->examensclassresponses->where('etudiant_id', $etudiant->id)->first(),

        ]);
    }
     public function storeResponseStudentclass(Request $request, Examensclasse $examen)
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

        $reponseExistante = Examensclasseresponse::where('examensclasse_id', $examen->id)
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

        Examensclasseresponse::create(array_merge($data, [
            'examensclasse_id' => $examen->id,
            'etudiant_id' => $etudiantId,
        ]));

        return back()->with('success', 'Réponse soumise avec succès.');
    }
}
