<?php

use App\Http\Controllers\anneesScolaireController;
use App\Http\Controllers\ClassesController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DashboardEtudiantController;
use App\Http\Controllers\DashboardProfesseurController;
use App\Http\Controllers\DemandedocumentsController;
use App\Http\Controllers\DepartementController;
use App\Http\Controllers\documentalisteController;
use App\Http\Controllers\EmploieController;
use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\ExamensController;
use App\Http\Controllers\FacultyController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MatiereController;
use App\Http\Controllers\NotesController;
use App\Http\Controllers\ProfesseurController;
use App\Http\Controllers\SalleController;
use App\Http\Controllers\TraitementdocumentsController;
use App\Http\Controllers\TutoController;
use App\Http\Controllers\VerifcationMatriculeController;
use Illuminate\Support\Facades\Route;

Route::get('/',[HomeController::class,'index'])->name('home');
route::get('/verification-matricule',[VerifcationMatriculeController::class,'verification'])->name('verifcation.verif');
route::post('/verification-matricule',[VerifcationMatriculeController::class,'verificationStore'])->name('verifcation.store');

Route::middleware(['auth', 'verified','role:super admin|admin'])->prefix('dashboard')->name('dashboard.')->group(function () {
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
    //Users Routes
    Route::get('/users', [DashboardController::class, 'users'])->name('users.index');
    Route::post('/users', [DashboardController::class, 'create'])->name('users.create');
    Route::put('/users', [DashboardController::class, 'AddOrRevoqueRole'])->name('users.roles');


});
Route::middleware(['auth', 'verified','role:etudiant'])->prefix('etudiant')->name('etudiant.')->group(function () {
    Route::get('/', [DashboardEtudiantController::class, 'index'])->name('index');
    Route::get('/notes',[DashboardEtudiantController::class, 'notes'])->name('notes');
    Route::get('/documents',[DashboardEtudiantController::class, 'documents'])->name('documents');
    Route::post('/documents',[DemandedocumentsController::class, 'demande'])->name('demande.document');
    Route::delete('/documents/{document}',[DemandedocumentsController::class, 'destroy'])->name('demande.destroy');

});
Route::middleware(['auth', 'verified','role:personnel'])->prefix('prof')->name('prof.')->group(function () {
    Route::get('/', [DashboardProfesseurController::class, 'index'])->name('index');
    Route::get('/classe-departement', [DashboardProfesseurController::class, 'classe_dpt'])->name('classe_dpt');
    Route::get('/notes', [DashboardProfesseurController::class, 'recupererEtudiantsDuProfesseur'])->name('notes');
    Route::post('/notes', [NotesController::class, 'calculeNotes'])->name('notes.store');
    //Route::post('/notes', [NotesController::class, 'generationPdf'])->name('notes.generatedPdf');
    Route::get('/cours',[TutoController::class,'cours'])->name('cours');
    Route::get('/cours/{tuto}',[TutoController::class,'show'])->name('cours.show');
    Route::post('/cours',[TutoController::class,'create'])->name('cours.create');
    Route::delete('/cours/{tuto}',[TutoController::class,'destroy'])->name('cours.delete');
    Route::put('/cours/{tuto}',[TutoController::class,'update'])->name('cours.update');
        /**Route Examens */
    Route::get('/examens',[ExamensController::class,'index'])->name('examens.index');
    Route::post('/examens',[ExamensController::class,'store'])->name('examens.create.classe');
    Route::delete('/examens/{type}/{id}', [ExamensController::class, 'delete'])->name('examens.delete');

    Route::put('/examens/{examen}',[ExamensController::class,'createForClasseUpdate'])->name('examens.update.classe');

});
Route::middleware(['auth', 'verified','role:documentaliste'])->prefix('documentaliste')->name('documentaliste.')->group(function () {
    Route::get('/', [documentalisteController::class, 'index'])->name('index');
    Route::post('/',[TraitementdocumentsController::class, 'store'])->name('documents.store');

});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
