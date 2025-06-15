<?php

namespace App\Http\Controllers;

use App\Models\anneesScolaire;
use App\Models\classes;
use App\Models\departement;
use App\Models\parcour;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ParcourController extends Controller
{
    public function reincriptions()
    {
        $derniereAnneeScolaire = AnneesScolaire::where('isActive', true)->first();
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
    public function delete(parcour $parcours)
    {
        $parcours->delete();
        return back()->with('success','Parcours supprimé avec success');
    }
}
