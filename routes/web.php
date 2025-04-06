<?php

use App\Http\Controllers\anneesScolaireController;
use App\Http\Controllers\ClassesController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DepartementController;
use App\Http\Controllers\EmploieController;
use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\FacultyController;
use App\Http\Controllers\MatiereController;
use App\Http\Controllers\ProfesseurController;
use App\Http\Controllers\SalleController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->prefix('dashboard')->name('dashboard.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('index');
    /**Annees Scolaire Route */
    Route::get('/annees-scolaire', [anneesScolaireController::class, 'index'])->name('ann_scolaire.index');
    Route::put('/annees-scolaire/{anneesScolaire}', [anneesScolaireController::class, 'update'])->name('ann_scolaire.update');
    Route::delete('/annees-scolaire/{anneesScolaire}', [anneesScolaireController::class, 'destroy'])->name('ann_scolaire.destroy');
    Route::post('/annees-scolaire', [anneesScolaireController::class, 'create'])->name('ann_scolaire.create');
    /**Faculties Route */
    Route::put('/faculty/{faculty}', [FacultyController::class, 'update'])->name('faculty.update');
    Route::post('/faculty', [FacultyController::class, 'create'])->name('faculty.create');
    Route::delete('/faculty/{faculty}', [FacultyController::class, 'destroy'])->name('faculty.delete');

    Route::get('/faculty', [FacultyController::class, 'index'])->name('faculty.index');
    Route::put('/faculty/{faculty}', [FacultyController::class, 'update'])->name('faculty.update');
    Route::post('/faculty', [FacultyController::class, 'create'])->name('faculty.create');
    Route::delete('/faculty/{faculty}', [FacultyController::class, 'destroy'])->name('faculty.delete');
    /**Departement Route */
    Route::get('/departement', [DepartementController::class, 'index'])->name('departement.index');
    Route::put('/departement/{departement}', [DepartementController::class, 'update'])->name('departement.update');
    Route::post('/departement', [DepartementController::class, 'create'])->name('departement.create');
    Route::delete('/departement/{departement}', [DepartementController::class, 'destroy'])->name('departement.delete');
    /**Niveau Route */
    Route::get('/niveau', [ClassesController::class, 'index'])->name('niveau.index');
    Route::put('/niveau/{classes}', [ClassesController::class, 'update'])->name('niveau.update');
    Route::post('/niveau', [ClassesController::class, 'create'])->name('niveau.create');
    Route::delete('/niveau/{classes}', [ClassesController::class, 'destroy'])->name('niveau.delete');
    /**Professeur Route */
    Route::get('/professeurs', [ProfesseurController::class, 'index'])->name('prof.index');
    Route::put('/professeurs/{professeur}', [ProfesseurController::class, 'update'])->name('prof.update');
    Route::post('/professeurs', [ProfesseurController::class, 'create'])->name('prof.create');
    Route::delete('/professeurs/{professeur}', [ProfesseurController::class, 'destroy'])->name('prof.delete');
    /**Etudiants Route */
    Route::get('/etudiants', [EtudiantController::class, 'index'])->name('etud.index');
    // Route::get('/etudiants/{etudiant}', [EtudiantController::class, 'show'])->name('etud.show');
    Route::get('/etudiants/new', [EtudiantController::class, 'create'])->name('etud.create');
    Route::post('/etudiants', [EtudiantController::class, 'store'])->name('etud.store');

    Route::get('/etudiants/{parcours}/edit', [EtudiantController::class, 'edit'])->name('etud.edit');
    Route::put('/etudiants/{parcours}', [EtudiantController::class, 'update'])->name('etud.update');
    Route::delete('/etudiants/{parcours}', [EtudiantController::class, 'destroy'])->name('etud.delete');
    /**Matiere Route */
    Route::get('/matieres', [MatiereController::class, 'index'])->name('matiere.index');
    Route::post('/matieres', [MatiereController::class, 'create'])->name('matiere.create');
    Route::delete('/matieres/{matiere}', [MatiereController::class, 'destroy'])->name('matiere.delete');
    Route::get('/matieres/{matiere}/edit', [MatiereController::class, 'edit'])->name('matiere.edit');
    Route::put('/matieres/{matiere}', [MatiereController::class, 'update'])->name('matiere.update');
    /**Salle Route */
    Route::get('/salles', [SalleController::class, 'index'])->name('salle.index');
    Route::post('/salles', [SalleController::class, 'create'])->name('salle.create');
    Route::delete('/salles/{salle}', [SalleController::class, 'destroy'])->name('salle.delete');
    Route::get('/salles/{salle}/edit', [SalleController::class, 'edit'])->name('salle.edit');
    Route::put('/salles/{salle}', [SalleController::class, 'update'])->name('salle.update');
    //Emploie du Temps Route
    Route::get('/emploie-du-temps', [EmploieController::class, 'index'])->name('emploi.index');
    Route::get('/emploie-du-temps/new', [EmploieController::class, 'create'])->name('emploi.create');
    Route::post('/emploie-du-temps', [EmploieController::class, 'store'])->name('emploi.store');
    Route::delete('/emploie-du-temps/{emploi}', [EmploieController::class, 'destroy'])->name('emploi.delete');
    Route::get('/emploie-du-temps/{emploi}/edit', [EmploieController::class, 'edit'])->name('emploi.edit');
    Route::put('/emploie-du-temps/{emploi}', [EmploieController::class, 'update'])->name('emploi.update');


});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
