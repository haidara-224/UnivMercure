<?php

use App\Http\Controllers\AnneesScolaireController;
use App\Http\Controllers\BdedashboardController;
use App\Http\Controllers\CategoryforumController;
use App\Http\Controllers\ClassesController;
use App\Http\Controllers\DasboardForumController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DashboardEtudiantController;
use App\Http\Controllers\DashboardProfesseurController;
use App\Http\Controllers\DemandedocumentsController;
use App\Http\Controllers\DepartementController;
use App\Http\Controllers\DocumentalisteController;
use App\Http\Controllers\EmploieController;
use App\Http\Controllers\EtudiantController;
use App\Http\Controllers\EvenementController;
use App\Http\Controllers\ExamController;
use App\Http\Controllers\ExamensController;
use App\Http\Controllers\ExamensreponsesController;
use App\Http\Controllers\ExamensStudentsresponsesController;
use App\Http\Controllers\FacultyController;
use App\Http\Controllers\ForumController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\MatiereController;
use App\Http\Controllers\NotesController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ParcourController;
use App\Http\Controllers\PostforumController;
use App\Http\Controllers\ProfesseurController;
use App\Http\Controllers\RepliepostController;
use App\Http\Controllers\SalleController;
use App\Http\Controllers\TraitementdocumentsController;
use App\Http\Controllers\TutoController;
use App\Http\Controllers\VerifcationMatriculeController;
use Illuminate\Support\Facades\Route;

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/activity', [HomeController::class, 'activity'])->name('activity');
Route::get('/activity/{evenement}', [HomeController::class, 'activityShow'])->name('activity.show');
route::get('/verification-matricule', [VerifcationMatriculeController::class, 'verification'])->name('verifcation.verif');
route::post('/verification-matricule', [VerifcationMatriculeController::class, 'verificationStore'])->name('verifcation.store');

Route::middleware(['auth', 'verified', 'role:super admin|admin'])->prefix('dashboard')->name('dashboard.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('index');
    /**Annees Scolaire Route */
    Route::get('/annees-scolaire', [AnneesScolaireController::class, 'index'])->name('ann_scolaire.index');
    Route::put('/annees-scolaire/{anneesScolaire}', [AnneesScolaireController::class, 'update'])->name('ann_scolaire.update');
    Route::delete('/annees-scolaire/{anneesScolaire}', [AnneesScolaireController::class, 'destroy'])->name('ann_scolaire.destroy');
    Route::post('/annees-scolaire', [AnneesScolaireController::class, 'create'])->name('ann_scolaire.create');
    Route::get('/annees-scolaire/active', [AnneesScolaireController::class, 'active'])->name('ann_scolaire.active');
    Route::patch('/annees-scolaire/active/{anneesScolaire}', [AnneesScolaireController::class, 'activeannees'])->name('ann_scolaire.active');
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
    //Notes Routes
    Route::get('/notes', [NotesController::class, 'notesAdmin'])->name('note.admin');
    //Examen Routes
    Route::get('/examens', [ExamController::class, 'index'])->name('exam.index');
    Route::get('/examens/create', [ExamController::class, 'create'])->name('exam.create');
    Route::post('/examens/create', [ExamController::class, 'store'])->name('exam.store');
    Route::delete('/examens/{examens}', [ExamController::class, 'delete'])->name('exam.delete');
    //Parcours Routes
    Route::get('/reincriptions', [ParcourController::class, 'reincriptions'])->name('parcours.reincriptions');
    Route::delete('/reincriptions/{parcours}', [ParcourController::class, 'delete'])->name('parcours.delete');
    Route::get('/reinscriptions/create', [ParcourController::class, 'create'])->name('parcours.create');
    Route::post('/reinscriptions/create', [ParcourController::class, 'store'])->name('parcours.store');

    //Route Parcours
    Route::get('/parcours', [ParcourController::class, 'index'])->name('parcours.index');
    //Route Forum
    Route::get('/forum', [DasboardForumController::class, 'index'])->name('forum.index');
    Route::delete('/forum/{forum}', [DasboardForumController::class, 'delete'])->name('forum.delete');
    Route::get('/forum/post/{forum}', [DasboardForumController::class, 'show'])->name('forum.show');
    Route::delete('/forum/post/{postforum}', [DasboardForumController::class, 'deletePost'])->name('post.delete');
    //Route Category Forum
    Route::get('/forum/category', [CategoryforumController::class, 'index'])->name('categoryForum.index');
    Route::delete('/forum/category/{categoryForum}', [CategoryforumController::class, 'delete'])->name('categoryForum.delete');
    Route::put('/forum/category/{categoryForum}', [CategoryforumController::class, 'update'])->name('categoryForum.update');
    Route::post('/forum/category', [CategoryforumController::class, 'store'])->name('categoryForum.store');
});
Route::middleware(['auth', 'verified', 'role:etudiant'])->prefix('etudiant')->name('etudiant.')->group(function () {
    Route::get('/', [DashboardEtudiantController::class, 'index'])->name('index');
    Route::get('/notes', [DashboardEtudiantController::class, 'notes'])->name('notes');
    Route::get('/documents', [DashboardEtudiantController::class, 'documents'])->name('documents');
    Route::post('/documents', [DemandedocumentsController::class, 'demande'])->name('demande.document');
    Route::delete('/documents/{document}', [DemandedocumentsController::class, 'destroy'])->name('demande.destroy');
    Route::get('/examens', [ExamensController::class, 'examenStudent'])->name('examens.index');
    Route::get('/examens/{examen}/response', [ExamensController::class, 'createResponseStudent'])->name('examens.create.response');
    Route::post('/examens/{examen}/response', [ExamensController::class, 'storeResponseStudent'])->name('examens.store.response');
    Route::get('/examens/class/{examen}/response', [ExamensController::class, 'createResponseStudentclass'])->name('examensclass.create.response');
    Route::post('/examens/class/{examen}/response', [ExamensController::class, 'storeResponseStudentclass'])->name('examensclass.store.response');
});
Route::middleware(['auth', 'verified', 'role:personnel'])->prefix('prof')->name('prof.')->group(function () {
    Route::get('/', [DashboardProfesseurController::class, 'index'])->name('index');
    Route::get('/classe-departement', [DashboardProfesseurController::class, 'classe_dpt'])->name('classe_dpt');
    Route::get('/notes', [DashboardProfesseurController::class, 'recupererEtudiantsDuProfesseur'])->name('notes');
    Route::post('/notes', [NotesController::class, 'calculeNotes'])->name('notes.store');
    //Route::post('/notes', [NotesController::class, 'generationPdf'])->name('notes.generatedPdf');
    Route::get('/cours', [TutoController::class, 'cours'])->name('cours');
    Route::get('/cours/{tuto}', [TutoController::class, 'show'])->name('cours.show');
    Route::post('/cours', [TutoController::class, 'create'])->name('cours.create');
    Route::delete('/cours/{tuto}', [TutoController::class, 'destroy'])->name('cours.delete');
    Route::put('/cours/{tuto}', [TutoController::class, 'update'])->name('cours.update');
    /**Route Examens */
    Route::get('/examens', [ExamensController::class, 'index'])->name('examens.index');
    Route::post('/examens', [ExamensController::class, 'store'])->name('examens.create.classe');
    Route::delete('/examens/{type}/{id}', [ExamensController::class, 'delete'])->name('examens.delete');
    Route::put('/examens/{examen}', [ExamensController::class, 'createForClasseUpdate'])->name('examens.update.classe');
    Route::get('/examens/reponse/class/{examen}', [ExamensreponsesController::class, 'index'])->name('examens.responses.index');
    Route::get('/examens/reponse/class/student/{examensclasseresponse}', [ExamensreponsesController::class, 'show'])->name('examens.responses.show');
    Route::get('/examens/reponse/student/{examensstudents}', [ExamensStudentsresponsesController::class, 'index'])->name('examens.responses.student.index');
    Route::get('/examens/reponse/student/show/{examensstudents}/{etudiant}', [ExamensStudentsresponsesController::class, 'show'])->name('examens.responses.student.show');
});
Route::middleware(['auth', 'verified', 'role:documentaliste'])->prefix('documentaliste')->name('documentaliste.')->group(function () {
    Route::get('/', [DocumentalisteController::class, 'index'])->name('index');
    Route::post('/{id}', [DocumentalisteController::class, 'markAsRead'])->name('notifications.markAsRead');


    Route::post('/', [TraitementdocumentsController::class, 'store'])->name('documents.store');
});
Route::middleware(['auth', 'verified', 'role:BDE'])->prefix('bde')->name('bde.')->group(function () {
 Route::get('/', [BdedashboardController::class, 'index'])->name('index');
 Route::get('/forums', [BdedashboardController::class, 'forums'])->name('forums');
    Route::delete('/forums/{forum}', [BdedashboardController::class, 'deleteForum'])->name('forum.delete');
    Route::get('/forums/post/{forum}', [BdedashboardController::class, 'showForum'])->name('forum.show');
    Route::delete('/forums/post/{postforum}', [BdedashboardController::class, 'deletePost'])->name('post.delete');

    Route::get('/forum/category', [BdedashboardController::class, 'category'])->name('categoryForum.index');
    Route::delete('/forum/category/{categoryForum}', [BdedashboardController::class, 'deleteCategory'])->name('categoryForum.delete');
    Route::put('/forum/category/{categoryForum}', [BdedashboardController::class, 'updateCategory'])->name('categoryForum.update');
    Route::post('/forum/category', [BdedashboardController::class, 'storeCategory'])->name('categoryForum.store');

    Route::get('/evenements',[EvenementController::class,'index'])->name('evenements.index');
    Route::get('/evenements/create',[EvenementController::class,'create'])->name('evenements.create');
    Route::post('/evenements/create',[EvenementController::class,'store'])->name('evenements.store');
    Route::delete('/evenements/{evenement}',[EvenementController::class,'destroy'])->name('evenements.delete');
    Route::get('/evenements/{evenement}/edit',[EvenementController::class,'edit'])->name('evenements.edit');
    Route::put('/evenements/{evenement}',[EvenementController::class,'update'])->name('evenements.update');

});
Route::middleware(['auth'])->group(function () {
    Route::get('/forum', [ForumController::class, 'index'])->name('forum');
    Route::put('/forum/{forum}', [ForumController::class, 'updateLike'])->name('forum.update.like')->middleware('auth');
    Route::put('/forum/details/{postforum}', [PostforumController::class, 'updateLikePost'])->name('forum.updatePost.like')->middleware('auth');
    Route::get('/forum/details/{forum}', [PostforumController::class, 'index'])->name('forum.details');
    Route::delete('/forum/details/{postforum}', [PostforumController::class, 'destroy'])->name('forum.details.delete');
    Route::post('/forum/details/{forum}', [PostforumController::class, 'create'])->name('forum.post.create');
     Route::post('/forum/replies', [RepliepostController::class, 'store'])
    ->name('forum.reply.create')
    ->middleware('auth');
     Route::delete('/forum/replies/{replies}', [RepliepostController::class, 'destroy'])
    ->name('forum.reply.delete')
    ->middleware('auth');
});

require __DIR__ . '/settings.php';

require __DIR__ . '/auth.php';
