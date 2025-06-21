<?php

namespace App\Http\Controllers;

use App\Models\Examensclasse;
use App\Models\Examensclasseresponse;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ExamensreponsesController extends Controller
{
    public function index(Examensclasse $examen){
    $examen->load([
        'examensclassresponses',
        'examensclassresponses.etudiant',
        'examensclassresponses.examensclasse.departement',
        'examensclassresponses.examensclasse.classes',
        'examensclassresponses.examensclasse.professeur',
        'examensclassresponses.examensclasse.anneesScolaire',
    ]);
    //dd($examen->examensclassresponses);
    return Inertia::render('prof/examens/reponse/class/index', [
        'examansResponses' => $examen->examensclassresponses,
    ]);

}
   public function show(Examensclasseresponse $examensclasseresponse){
        $examensclasseresponse->load([
            'etudiant',
            'examensclasse.departement',
            'examensclasse.classes',
            'examensclasse.professeur',
            'examensclasse.anneesScolaire',
        ]);

        return Inertia::render('prof/examens/reponse/class/student/show', [
            'examansResponse' => $examensclasseresponse,
        ]);
    }


}
