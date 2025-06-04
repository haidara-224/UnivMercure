<?php

namespace App\Http\Controllers;

use App\Models\demandedocuments;
use App\Models\traitementdocuments;
use Illuminate\Http\Request;

class TraitementdocumentsController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'demandedocument_id' => 'required|exists:demandedocuments,id',
            'document' => 'required|file|mimes:pdf,doc,docx,jpg,png|max:2048',
        ]);

        $traitement = new traitementdocuments();
        $traitement->demandedocuments_id = $request->demandedocument_id;

        if ($request->hasFile('document')) {
            $path = $request->file('document')->store('documents', 'public');
            $traitement->document = $path;
        }

        if ($traitement->save()) {
            $demande = demandedocuments::find($request->demandedocument_id);

            if ($demande) {
                 $demande->statut = 'traité';
    $demande->save();
            }

            return redirect()->back()->with('success', 'Document traité avec succès.');
        }

        return redirect()->back()->with('error', 'Une erreur est survenue lors du traitement.');
    }
}
