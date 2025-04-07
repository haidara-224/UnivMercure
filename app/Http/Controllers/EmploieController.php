<?php

namespace App\Http\Controllers;

use App\Models\anneesScolaire;
use App\Models\classes;
use App\Models\departement;
use App\Models\emploie;
use App\Models\salle;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmploieController extends Controller
{
    public function jourToNumber($jour)
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

    public function index(Request $request)
    {
        $derniereAnneeScolaire = anneesScolaire::orderByDesc('annee_scolaire')->first();
        $departement = departement::select('id', 'name')->get();
        $salle = salle::select('id', 'salle')->get();
        $classes = classes::select('id', 'niveau')->get();

        $emplois = emploie::with(['matiere', 'professeur', 'salle', 'classes', 'departement', 'anneesScolaire'])
            ->where('annees_scolaire_id', $derniereAnneeScolaire->id)
            ->get();

        $eventsByDay = [
            'Lundi' => [], 'Mardi' => [], 'Mercredi' => [],
            'Jeudi' => [], 'Vendredi' => [], 'Samedi' => []
        ];

        foreach ($emplois as $emploi) {
            $startOfWeek = now()->startOfWeek();
            $startDate = $startOfWeek->copy()->addDays($this->jourToNumber($emploi->jour) - 1)
                ->setTimeFromTimeString($emploi->heure_debut);
            $endDate = $startDate->copy()->setTimeFromTimeString($emploi->heure_fin);

            $eventsByDay[$emploi->jour][] = [
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

        return Inertia::render('dashboard/emploie-du-temps/index', [
            'eventsByDay' => $eventsByDay,
            'lastAnneesScolaire' => $derniereAnneeScolaire,
            'dpt' => $departement,
            'salles' => $salle,
            'classe' => $classes,
        ]);
    }
}
