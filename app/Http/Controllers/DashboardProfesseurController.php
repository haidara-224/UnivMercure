<?php

namespace App\Http\Controllers;

use App\Models\anneesScolaire;
use App\Models\classes;
use App\Models\departement;
use App\Models\emploie;
use App\Models\matiere;
use App\Models\notes;
use App\Models\parcour;
use App\Models\Professeur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardProfesseurController extends Controller
{
    private function jourToNumber($jour)
    {
        return match ($jour) {
            'Lundi' => 1,
            'Mardi' => 2,
            'Mercredi' => 3,
            'Jeudi' => 4,
            'Vendredi' => 5,
            'Samedi' => 6,
            default => 0,
        };
    }
    public function index()
    {
        $authUser = Auth::id();
        $prof = Professeur::where('user_id', $authUser)->first();
        if (!$prof) {
            return to_route('home');
        }
        $derniereAnneeScolaire = anneesScolaire::where('isActive', true)->first();
        $emplois = emploie::with(['matiere', 'professeur', 'salle', 'classes', 'departement', 'anneesScolaire'])
            ->where('annees_scolaire_id', $derniereAnneeScolaire->id)
            ->where('professeur_id', $prof->id)
            ->get();

        $eventsByDay = [
            'Lundi' => [],
            'Mardi' => [],
            'Mercredi' => [],
            'Jeudi' => [],
            'Vendredi' => [],
            'Samedi' => []
        ];

        foreach ($emplois as $emploi) {
            $startOfWeek = now()->startOfWeek();
            $startDate = $startOfWeek->copy()->addDays($this->jourToNumber($emploi->jour) - 1)
                ->setTimeFromTimeString($emploi->heure_debut);
            $endDate = $startDate->copy()->setTimeFromTimeString($emploi->heure_fin);

            $eventsByDay[$emploi->jour][] = [
                'id' => $emploi->id,
                'title' => $emploi->matiere->nom,
                'module' => $emploi->module,
                'professeur' => $emploi->professeur->name,
                'heure_debut' => $emploi->heure_debut,
                'heure_fin' => $emploi->heure_fin,
                'departement' => $emploi->departement->name,
                'classe' => $emploi->classes->niveau,
                'salle' => $emploi->salle->salle,
                'start' => $startDate->toArray(),
                'end' => $endDate->toArray(),
            ];
        }


        return Inertia::render('prof', [
            'prof' => $prof,
            'eventsByDay' => $eventsByDay,
            'lastAnneesScolaire' => $derniereAnneeScolaire,
        ]);
    }
    public function classe_dpt()
    {
        // $derniereAnneeScolaire = anneesScolaire::where('isActive',true)->first();
        $authUser = Auth::id();
        $prof = Professeur::where('user_id', $authUser)->first();

        if (!$prof) {
            return to_route('home');
        }

        $classeDepartement = emploie::with(['matiere', 'salle', 'classes', 'departement', 'anneesScolaire'])
            ->where('professeur_id', $prof->id)
            ->join('annees_scolaires', 'emploies.annees_scolaire_id', '=', 'annees_scolaires.id')
            ->orderByDesc('annees_scolaires.annee_scolaire')
            ->select('emploies.*')
            ->get();


        return Inertia::render('prof/classe-departement', [
            'classeDepartement' => $classeDepartement
        ]);
    }
    public function recupererEtudiantsDuProfesseur()
    {
        $prof = Professeur::where('user_id', Auth::id())->first();

        if (!$prof) {
            return to_route('home');
        }

        $derniereAnneeScolaire = anneesScolaire::where('isActive', true)->first();

        $infosProf = emploie::where('professeur_id', $prof->id)
            ->where('annees_scolaire_id', $derniereAnneeScolaire->id)
            ->select('departement_id', 'classes_id', 'matiere_id')
            ->distinct()
            ->get();

        $departements = $infosProf->pluck('departement_id');
        $classes = $infosProf->pluck('classes_id');
        $matieres = $infosProf->pluck('matiere_id')->unique();
        $notes = notes::with('etudiant')
            ->whereIn('departement_id', $departements)
            ->whereIn('classes_id', $classes)
            ->where('annees_scolaire_id', $derniereAnneeScolaire->id)
            ->whereIn('matiere_id', $matieres)
            ->get();


        $parcours = Parcour::with(['classes', 'departement', 'etudiant'])
            ->whereIn('departement_id', $departements)
            ->whereIn('classes_id', $classes)
            ->where('annees_scolaire_id', $derniereAnneeScolaire->id)
            ->get();

        $enseignements = emploie::with('matiere')
            ->where('professeur_id', $prof->id)
            ->where('annees_scolaire_id', $derniereAnneeScolaire->id)
            ->select('departement_id', 'classes_id', 'matiere_id')
            ->get()
            ->unique('matiere_id')
            ->values(); // pour réindexer proprement

        return Inertia::render('prof/notes', [
            'parcours' => $parcours,
            'departements' => departement::whereIn('id', $departements)->get(),
            'classes' => classes::whereIn('id', $classes)->get(),
            'enseignements' => $enseignements,
            'annees_scolaire' => $derniereAnneeScolaire,
            'notes' => $notes->groupBy('etudiant_id'),

        ]);
    }
}
