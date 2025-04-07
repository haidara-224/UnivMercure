<?php

namespace App\Http\Controllers;

use App\Models\anneesScolaire;
use App\Models\classes;
use App\Models\departement;
use App\Models\emploie;
use App\Models\matiere;
use App\Models\Professeur;
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

        return Inertia::render('dashboard/emploie-du-temps/index', [
            'eventsByDay' => $eventsByDay,
            'lastAnneesScolaire' => $derniereAnneeScolaire,
            'dpt' => $departement,
            'salles' => $salle,
            'classe' => $classes,
        ]);
    }
    public function create(Request $request)
    {

        $anneesScolaire = anneesScolaire::select(['id', 'annee_scolaire'])->orderByDesc('annee_scolaire')->get();
        $classes = classes::select(['id', 'niveau'])->get();
        $departement = departement::select(['id', 'name'])->get();
        $professeur = Professeur::select(['id', 'name', 'prenom', 'matricule'])->get();
        $salle = salle::select(['id', 'salle', 'capacite'])->get();
        $matiere = matiere::select(['id', 'nom'])->get();



        return Inertia::render('dashboard/emploie-du-temps/new', [
            'annees' => $anneesScolaire,
            'classes' => $classes,
            'departement' =>  $departement,
            'professeur' => $professeur,
            'salle' => $salle,
            'matiere' => $matiere
        ]);
    }
    public function store()
    {
        $data = request()->validate([
            'annee_scolaire' => 'required|exists:annees_scolaires,id',
            'niveau' => 'required|exists:classes,id',
            'departement' => 'required|exists:departements,id',
            'salle' => 'required|exists:salles,id',
            'professeur' => 'required|exists:professeurs,id',
            'matiere' => 'required|exists:matieres,id',
            'module' => 'required|string|max:255',
            'jours' => 'required|string|max:255',
            'heure_debut' => 'required|string|max:255',
            'heure_fin' => 'required|string|max:255',
        ]);

        Emploie::create([
            'annees_scolaire_id' => $data['annee_scolaire'],
            'classes_id' => $data['niveau'],
            'departement_id' => $data['departement'],
            'salle_id' => $data['salle'],
            'professeur_id' => $data['professeur'],
            'matiere_id' => $data['matiere'],
            'module' => $data['module'],
            'jour' => $data['jours'],
            'heure_debut' => $data['heure_debut'],
            'heure_fin' => $data['heure_fin'],
        ]);

        return redirect()->back()->with('success', "Emploi du temps ajouté avec succès");
    }
    public function edit(emploie $emploi)
    {
        $anneesScolaire = anneesScolaire::select(['id', 'annee_scolaire'])->orderByDesc('annee_scolaire')->get();
        $classes = classes::select(['id', 'niveau'])->get();
        $departement = departement::select(['id', 'name'])->get();
        $professeur = Professeur::select(['id', 'name', 'prenom', 'matricule'])->get();
        $salle = salle::select(['id', 'salle', 'capacite'])->get();
        $matiere = matiere::select(['id', 'nom'])->get();

        return Inertia::render('dashboard/emploie-du-temps/edit', [
            'emploi' => $emploi,
            'annees' => $anneesScolaire,
            'classe' => $classes,
            'departement' =>  $departement,
            'professeur' => $professeur,
            'salle' => $salle,
            'matiere' => $matiere
        ]);
    }
    public function update(emploie $emploi)
    {
        $data = request()->validate([
            'annee_scolaire' => 'required|exists:annees_scolaires,id',
            'niveau' => 'required|exists:classes,id',
            'departements' => 'required|exists:departements,id',
            'salles' => 'required|exists:salles,id',
            'professeurs' => 'required|exists:professeurs,id',
            'matieres' => 'required|exists:matieres,id',
            'module' => 'required|string|max:255',
            'jours' => 'required|string|max:255',
            'heure_debut' => 'required|string|max:255',
            'heure_fin' => 'required|string|max:255',
        ]);


        $emploi->update([
            'annees_scolaire_id' => $data['annee_scolaire'],
            'classes_id' => $data['niveau'],
            'departement_id' => $data['departements'],
            'salle_id' => $data['salles'],
            'professeur_id' => $data['professeurs'],
            'matiere_id' => $data['matieres'],
            'module' => $data['module'],
            'jour' => $data['jours'],
            'heure_debut' => $data['heure_debut'],
            'heure_fin' => $data['heure_fin'],
        ]);

        return redirect()->back()->with('success', "Emploi du temps modifié avec succès");
    }
    public function destroy(emploie $emploi)
    {
        $emploi->delete();

        return redirect()->back()->with('success', "Emploi du temps supprimé avec succès");
    }



}
