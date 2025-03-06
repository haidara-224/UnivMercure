<?php

namespace App\Http\Controllers;

use App\Models\classes;
use App\Models\departement;
use App\Models\etudiant;
use App\Models\Professeur;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    private function nombreEtudiant(){
        $etudiant=etudiant::count();
        return $etudiant;
    }
    private function nombreProfesseur(){
        $professeur=Professeur::count();
        return $professeur;
    }
    private function nombreDepartement(){
        $departement=departement::count();
        return $departement;
    }
    private function nombreNiveau(){
        $classes=classes::count();
        return $classes;
    }
    public function index(){
        $nbEtudiant = Etudiant::count();
        $maleCount = Etudiant::where('sexe', 'masculin')->count();
        $femaleCount = Etudiant::where('sexe', 'feminin')->count();
        $nbprofesseur = $this->nombreProfesseur();
        $nbdepartement = $this->nombreDepartement();
        $nbniveau = $this->nombreNiveau();

        $etudiantsParDepartement = Departement::withCount('etudiants')
    ->get()
    ->map(fn ($dep) => [
        'id' => $dep->id,
        'name' => $dep->name,
        'nombre_etudiant' => $dep->etudiants_count, // Renommage ici
    ]);



        return Inertia::render('dashboard', [
            'etudiantsCount'           => $nbEtudiant,
            'maleCount'                => $maleCount,
            'femaleCount'              => $femaleCount,
            'professeursCount'         => $nbprofesseur,
            'DepartementCount'         => $nbdepartement,
            'niveauCount'              => $nbniveau,
            'etudiantsParDepartement'  => $etudiantsParDepartement,
        ]);
    }


}
