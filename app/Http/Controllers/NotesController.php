<?php

namespace App\Http\Controllers;

use App\Http\Requests\claculateNoteRequest;
use App\Models\anneesScolaire;
use App\Models\emploie;
use App\Models\notes;
use App\Models\parcour;
use App\Models\Professeur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Laravel\Prompts\Note;

class NotesController extends Controller
{
    public function calculeNotes(Request $request)
{
    $validated = $request->validate([
        'etudiant' => 'required|exists:etudiants,id',
        'note1' => 'required|numeric|min:0|max:20',
        'note2' => 'required|numeric|min:0|max:20',
        'note3' => 'required|numeric|min:0|max:20',
        'module' => 'required|string',
        'matiere' => 'required|exists:matieres,id',
        'annees_scolaire' => 'required|exists:annees_scolaires,id',
        'classe' => 'required|exists:classes,id',
        'departement' => 'required|exists:departements,id',
    ]);


    $existingNote = notes::where('etudiant_id', $validated['etudiant'])
        ->where('matiere_id', $validated['matiere'])
        ->where('annees_scolaire_id', $validated['annees_scolaire'])
        ->where('classes_id', $validated['classe'])
        ->where('departement_id', $validated['departement'])
        ->first();

    if ($existingNote) {

        $existingNote->update([
            'note1' => $validated['note1'],
            'note2' => $validated['note2'],
            'note3' => $validated['note3'],
            'module' => $validated['module'],
            'moyenne' => $request->moyenne ?? null,
            'moyenne_literaire' => $request->moyenne_literaire ?? null,
        ]);
        return redirect()->back()->with('success', 'Note mise à jour avec succès');
    } else {

        notes::create([
            'etudiant_id' => $validated['etudiant'],
            'note1' => $validated['note1'],
            'note2' => $validated['note2'],
            'note3' => $validated['note3'],
            'module' => $validated['module'],
            'matiere_id' => $validated['matiere'],
            'annees_scolaire_id' => $validated['annees_scolaire'],
            'classes_id' => $validated['classe'],
            'departement_id' => $validated['departement'],
            'moyenne' => $request->moyenne ?? null,
            'moyenne_literaire' => $request->moyenne_literaire ?? null,
        ]);
        return redirect()->back()->with('success', 'Note enregistrée avec succès');
    }
}
public function generationPdf()
{
    $note = notes::with('etudiant', 'matiere', 'departement', 'classes', 'anneesScolaire')
            ->latest()
            ->first();

        if (!$note) {
            return abort(404, 'Note non trouvée.');
        }

}


}
