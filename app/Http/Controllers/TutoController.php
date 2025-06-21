<?php

namespace App\Http\Controllers;

use App\Http\Requests\TutoCreateRequestValidated;
use App\Models\Classes;
use App\Models\Departement;
use App\Models\Professeur;
use App\Models\Tuto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class TutoController extends Controller
{
    public function cours()
    {
        $departement = Departement::select(['id', 'name'])->get();
        $niveau = Classes::select(['id', 'niveau'])->get();
        $userAuth = Auth::id();
        $profId = Professeur::where('user_id', $userAuth)->value('id');
        $tuto = Tuto::with('classes', 'departement', 'professeur')
            ->orderByDesc('created_at')
            ->where('professeur_id', $profId)->get();

        return Inertia::render('prof/cours', [
            'departement' => $departement,
            'niveau' => $niveau,
            'tutos' => $tuto
        ]);
    }
    public function show(Tuto $tuto)
    {
        $userAuth = Auth::id();
        $profId = Professeur::where('user_id', $userAuth)->value('id');

        if ($tuto->professeur_id !== $profId) {
            abort(403, 'Accès non autorisé.');
        }

        $tuto->load(['classes', 'departement', 'professeur']);

        return Inertia::render('prof/tuto/show', [
            'tutos' => $tuto,
        ]);
    }



    public function create(Request $request)
    {
        $data = $request->validate([
            'titre' => ['required', 'string', 'max:50'],
            'contenue' => ['required', 'string'],
            'fichier' => 'nullable|file|mimes:pdf,doc,docx,ppt,pptx|max:10240',
            'video' => 'nullable|file|mimes:mp4,avi,mpeg,mov,wmv|max:51200',

            'departement' => ['nullable', 'exists:departements,id'],
            'niveaux' => ['nullable', 'exists:classes,id'],
        ]);

        if ($request->hasFile('fichier')) {
            $data['fichier'] = $request->file('fichier')->store('tutos/fichiers', 'public');
        }

        if ($request->hasFile('video')) {
            $data['video'] = $request->file('video')->store('tutos/videos', 'public');
        }

        $userAuth = Auth::id();
        $profId = Professeur::where('user_id', $userAuth)->value('id');

        Tuto::create([
            'titre' => $data['titre'],
            'contenue' => $data['contenue'],
            'fichier' => $data['fichier'] ?? null,
            'video' => $data['video'] ?? null,
            'professeur_id' => $profId,
            'departement_id' => $data['departement'] ?? null,
            'classes_id' => $data['niveaux'] ?? null,
        ]);

        return to_route('prof.cours')->with('success', 'Tutoriel ajouté avec succès.');
    }
    public function update(Request $request, Tuto $tuto)
    {
        $data = $request->validate([
            'titre' => ['required', 'string', 'max:50'],
            'contenue' => ['required', 'string'],
            'fichier' => 'nullable|file|mimes:pdf,doc,docx,ppt,pptx|max:10240',
            'video' => 'nullable|file|mimes:mp4,avi,mpeg,mov,wmv|max:51200',
            'departement' => ['nullable', 'exists:departements,id'],
            'niveaux' => ['nullable', 'exists:classes,id'],
        ]);

        $fichierPath = $tuto->fichier;
        $videoPath = $tuto->video;

        if ($request->hasFile('fichier')) {
            $fichierPath = $request->file('fichier')->store('tutos/fichiers', 'public');
        }

        if ($request->hasFile('video')) {
            $videoPath = $request->file('video')->store('tutos/videos', 'public');
        }

        $profId = Professeur::where('user_id', Auth::id())->value('id');

        $tuto->update([
            'titre' => $data['titre'],
            'contenue' => $data['contenue'],
            'fichier' => $fichierPath,
            'video' => $videoPath,
            'professeur_id' => $profId,
            'departement_id' => $data['departement'] ?? null,
            'classes_id' => $data['niveaux'] ?? null,
        ]);

        return to_route('prof.cours')->with('success', 'Tutoriel modifié avec succès.');
    }

    public function destroy(Tuto $tuto)
    {
        $tuto->delete();
        return to_route('prof.cours')->with('success', 'Tutoriel supprimé avec succès.');
    }
}
