<?php

use App\Http\Controllers\ClassesController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DepartementController;
use App\Http\Controllers\FacultyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->prefix('dashboard')->name('dashboard.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('index');
    /**Faculties Route */
    Route::get('/faculty', [FacultyController::class,'index'])->name('faculty.index');
    Route::put('/faculty/{faculty}', [FacultyController::class,'update'])->name('faculty.update');
    Route::post('/faculty', [FacultyController::class,'create'])->name('faculty.create');
    Route::delete('/faculty/{faculty}', [FacultyController::class,'destroy'])->name('faculty.delete');
    /**Departement Route */
    Route::get('/departement',[DepartementController::class,'index'])->name('departement.index');
    Route::put('/departement/{departement}', [DepartementController::class,'update'])->name('departement.update');
    Route::post('/departement', [DepartementController::class,'create'])->name('departement.create');
    Route::delete('/departement/{departement}', [DepartementController::class,'destroy'])->name('departement.delete');
      /**Niveau Route */
      Route::get('/niveau',[ClassesController::class,'index'])->name('niveau.index');
      Route::put('/niveau/{classes}', [ClassesController::class,'update'])->name('niveau.update');
      Route::post('/niveau', [ClassesController::class,'create'])->name('niveau.create');
      Route::delete('/niveau/{classes}', [ClassesController::class,'destroy'])->name('niveau.delete');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
