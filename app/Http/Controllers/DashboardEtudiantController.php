<?php

namespace App\Http\Controllers;

use App\Models\AnneesScolaire;
use App\Models\Classes;
use App\Models\Departement;
use App\Models\Emploie;
use App\Models\Etudiant;
use App\Models\Notes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardEtudiantController extends Controller
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
        $etudiant = Etudiant::where('user_id', $authUser)->first();

        if (!$etudiant) {
            return to_route('home');
        }
$derniereAnneeScolaire = AnneesScolaire::where('isActive',true)->first();

        $parcours = $etudiant->parcours()
            ->where('annees_scolaire_id', $derniereAnneeScolaire->id)
            ->first();

        if (!$parcours) {
            return back()->with('error', 'Aucun parcours trouvé pour cette année scolaire.');
        }

        $emplois = Emploie::with(['matiere', 'professeur', 'salle', 'classes', 'departement', 'anneesScolaire'])
            ->where('annees_scolaire_id', $derniereAnneeScolaire->id)
            ->where('classes_id', $parcours->classes_id)
            ->where('departement_id', $parcours->departement_id)
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
            $startDate = $startOfWeek->copy()
                ->addDays($this->jourToNumber($emploi->jour) - 1)
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

        return Inertia::render('etudiant', [
            'etudiant' => $etudiant,
            'eventsByDay' => $eventsByDay,
            'lastAnneesScolaire' => $derniereAnneeScolaire,
        ]);
    }
    public function notes()
    {
        $authUser = Auth::id();
        $etudiant = Etudiant::where('user_id', $authUser)->first();

        if (!$etudiant) {
            return to_route('home');
        }
        $annes_scolaire = AnneesScolaire::select(['id', 'annee_scolaire'])->get();
        $departements = Departement::select(['id', 'name'])->get();
        $classes = Classes::select(['id', 'niveau'])->get();
        $notes = Notes::with(['matiere', 'anneesScolaire', 'classes', 'departement'])
            ->where('etudiant_id', $etudiant->id)
            ->get();

        return Inertia::render('etudiant/notes', [
            'etudiant' => $etudiant,
            'annes_scolaire' => $annes_scolaire,
            'departements' => $departements,
            'classes' => $classes,
            'notes' => $notes,
        ]);
    }
    public function documents()
    {
        $authUser = Auth::id();
        $classes = Classes::select(['id', 'niveau'])->get();
        $departements = Departement::select(['id', 'name'])->get();
        $annes_scolaire = AnneesScolaire::select(['id', 'annee_scolaire'])->get();

       $etudiant = Etudiant::where('user_id', $authUser)
    ->with([
        'demandes' => function ($query) {
            $query->orderByDesc('created_at')
                  ->with(['traitement', 'classes', 'departement', 'anneesScolaire']);
        }
    ])
    ->first();
;


        if (!$etudiant) {
            return to_route('home');
        }

        $documents = $etudiant->demandes;

        return Inertia::render('etudiant/documents', [
            'etudiant' => $etudiant,
            'documents' => $documents,
            'classes' => $classes,
            'departements' => $departements,
            'annes_scolaire' => $annes_scolaire,
        ]);
    }
}
