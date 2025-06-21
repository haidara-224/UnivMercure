<?php

namespace App\Http\Controllers;

use App\Http\Requests\claculateNoteRequest;
use App\Models\AnneesScolaire;
use App\Models\Classes;
use App\Models\Departement;
use App\Models\Notes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

use Illuminate\Support\Collection;

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


        $existingNote = Notes::where('etudiant_id', $validated['etudiant'])
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

            Notes::create([
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
        $note = Notes::with('etudiant', 'matiere', 'departement', 'classes', 'anneesScolaire')
            ->latest()
            ->first();

        if (!$note) {
            return abort(404, 'Note non trouvée.');
        }
    }


    public function notesAdmin()
    {
        $departements = Departement::select(['id', 'name'])->get();
        $niveaux = Classes::select(['id', 'niveau'])->get();
        $anneesScolaire = AnneesScolaire::select(['id', 'annee_scolaire'])->get();

        $notes = Notes::with(['etudiant', 'matiere', 'departement', 'classes', 'anneesScolaire'])
            ->join('annees_scolaires', 'notes.annees_scolaire_id', '=', 'annees_scolaires.id')
            ->orderByDesc('annees_scolaires.isActive')
            ->select('notes.*')
            ->get();
        $grouped = $notes->groupBy(function ($note) {
            return $note->annees_scolaire_id . '-' . $note->departement_id . '-' . $note->classe_id;
        });
        $groupedNotes = $grouped->map(function ($group) {
            $first = $group->first();
            return [
                'annee_scolaire' => $first->anneesScolaire->annee_scolaire,
                'departement' => $first->departement->name,
                'classe' => $first->classes->niveau,
                'notes' => $group->map(function ($note) {
                    return [
                        'etudiant' => $note->etudiant ?? 'N/A',
                        'matiere' => $note->matiere ?? 'N/A',
                        'note' => $note
                    ];
                })->toArray()
            ];
        })->values();

        return Inertia::render('dashboard/notes/index', [
            'notesGroupes' => $groupedNotes,
            'departements' => $departements,
            'niveaux' => $niveaux,
            'anneesScolaire' => $anneesScolaire
        ]);
    }
}
