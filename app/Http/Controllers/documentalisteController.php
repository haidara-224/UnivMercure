<?php

namespace App\Http\Controllers;

use App\Models\demandedocuments;
use Illuminate\Http\Request;

class documentalisteController extends Controller
{
    public function index()
    {
        $documents=demandedocuments::with(['etudiant'])
            ->orderBy('created_at', 'desc')
            ->get();

        return inertia('documentaliste/index', [
            'documents' => $documents
        ]);
    }

    public function update(Request $request, $demande)
    {
        // Logique pour mettre à jour une demande de document
        // ...
        return redirect()->back()->with('success', 'Demande mise à jour avec succès.');
    }

    public function destroy($demande)
    {
        // Logique pour supprimer une demande de document
        // ...
        return redirect()->back()->with('success', 'Demande supprimée avec succès.');
    }

}
