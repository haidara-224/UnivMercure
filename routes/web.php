<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\FacultyController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->prefix('dashboard')->name('dashboard.')->group(function () {
    Route::get('/', [DashboardController::class, 'index'])->name('index');
    Route::get('/faculty', [FacultyController::class,'index'])->name('faculty.index');
    Route::put('/faculty/{faculty}', [FacultyController::class,'update'])->name('faculty.update');
    Route::post('/faculty', [FacultyController::class,'create'])->name('faculty.create');
    Route::delete('/faculty/{faculty}', [FacultyController::class,'destroy'])->name('faculty.delete');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
