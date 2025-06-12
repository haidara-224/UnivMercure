<?php

namespace App\Http\Controllers;

use App\Models\etudiant;
use App\Models\examensstudents;
use App\Models\examensstudentsresponses;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExamensStudentsresponsesController extends Controller
{
   public function index(examensstudents $examensstudents)
{

    $examensstudents->load([
        'examensstudentsresponses.etudiant',
        'professeur',
        'anneesScolaire'
    ]);


    $formattedResponses = $examensstudents->examensstudentsresponses->map(function ($response) {
        return [
            'examensstudents_id' => $response->examensstudents_id,
            'etudiant_id' => $response->etudiant_id,
            'etudiant' => [
                'name' => $response->etudiant->name,
                'prenom' => $response->etudiant->prenom,
                'matricule' => $response->etudiant->matricule,
            ],
            'fichier' => $response->fichier,
            'reponse' => $response->reponse,
            'commentaire' => $response->commentaire,
            'created_at' => $response->created_at,
            'updated_at' => $response->updated_at,
        ];
    });

    return Inertia::render('prof/examens/reponse/student/index', [
        'responses' => $formattedResponses,
        'examenInfo' => [
            'titre' => $examensstudents->titre,
            'professeur' => $examensstudents->professeur
                ? $examensstudents->professeur->prenom . ' ' . $examensstudents->professeur->name
                : 'Non assigné',
            'date_fin' => $examensstudents->date_fin,
            'annee_scolaire' => $examensstudents->anneesScolaire->libelle,
        ],
    ]);
}
public function show(examensstudents $examensstudents,etudiant $etudiant)
{
    $examensstudentsresponses = examensstudentsresponses::where('examensstudents_id', $examensstudents->id)
        ->where('etudiant_id', $etudiant->id)
        ->firstOrFail();

    return Inertia::render('prof/examens/reponse/student/show', [
        'response' => $examensstudentsresponses,
    ]);

}
}
