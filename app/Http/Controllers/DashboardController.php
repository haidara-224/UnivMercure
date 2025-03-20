<?php

namespace App\Http\Controllers;

use App\Models\anneesScolaire;
use App\Models\classes;
use App\Models\departement;
use App\Models\etudiant;
use App\Models\Professeur;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    private function nombreEtudiant()
    {
        $etudiant = etudiant::count();
        return $etudiant;
    }
    private function nombreProfesseur()
    {
        $professeur = Professeur::count();
        return $professeur;
    }
    private function nombreDepartement()
    {
        $departement = departement::count();
        return $departement;
    }
    private function nombreNiveau()
    {
        $classes = classes::count();
        return $classes;
    }

    public function index()
    {
        $derniereAnneeScolaire = anneesScolaire::latest()->first();

        // Vérifier si aucune année scolaire n'existe
        if (!$derniereAnneeScolaire) {
            return Inertia::render('dashboard', [
                'etudiantsCount'           => 0,
                'maleCount'                => 0,
                'femaleCount'              => 0,
                'professeursCount'         => $this->nombreProfesseur(),
                'DepartementCount'         => $this->nombreDepartement(),
                'niveauCount'              => $this->nombreNiveau(),
                'etudiantsParDepartement'  => [],
                'departements'             => Departement::with(['professeur', 'faculty'])->get(),
                'last_annees_scolaire'     => null
            ]);
        }

        $nbEtudiant = Etudiant::whereHas('parcours', function ($query) use ($derniereAnneeScolaire) {
            $query->where('annees_scolaire_id', $derniereAnneeScolaire->id);
        })->count();

        $maleCount = Etudiant::where('sexe', 'masculin')
            ->whereHas('parcours', function ($query) use ($derniereAnneeScolaire) {
                $query->where('annees_scolaire_id', $derniereAnneeScolaire->id);
            })
            ->count();

        $femaleCount = Etudiant::where('sexe', 'feminin')
            ->whereHas('parcours', function ($query) use ($derniereAnneeScolaire) {
                $query->where('annees_scolaire_id', $derniereAnneeScolaire->id);
            })
            ->count();

        $nbprofesseur = $this->nombreProfesseur();
        $nbdepartement = $this->nombreDepartement();
        $nbniveau = $this->nombreNiveau();

        $etudiantsParDepartement = Departement::withCount(['parcours' => function ($query) use ($derniereAnneeScolaire) {
            $query->where('annees_scolaire_id', $derniereAnneeScolaire->id);
        }])->get()->map(fn($dep) => [
            'id' => $dep->id,
            'name' => $dep->name,
            'nombre_etudiant' => $dep->parcours_count,
        ]);

        $departement = Departement::with(['professeur', 'faculty'])->get();

        return Inertia::render('dashboard', [
            'etudiantsCount'           => $nbEtudiant,
            'maleCount'                => $maleCount,
            'femaleCount'              => $femaleCount,
            'professeursCount'         => $nbprofesseur,
            'DepartementCount'         => $nbdepartement,
            'niveauCount'              => $nbniveau,
            'etudiantsParDepartement'  => $etudiantsParDepartement,
            'departements'             => $departement,
            'last_annees_scolaire'     => $derniereAnneeScolaire
        ]);
    }

}
