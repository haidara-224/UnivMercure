<?php

namespace App\Http\Controllers;

use App\Models\demandedocuments;
use App\Models\traitementdocuments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TraitementdocumentsController extends Controller
{
   public function store(Request $request)
{
    $request->validate([
        'demandedocument_id' => 'required|exists:demandedocuments,id',
        'document' => 'required|file|mimes:pdf,doc,docx,jpg,png|max:2048',
    ]);


    $traitement = traitementdocuments::where('demandedocuments_id', $request->demandedocument_id)->first();


    if ($traitement && $traitement->document && Storage::disk('public')->exists($traitement->document)) {
        Storage::disk('public')->delete($traitement->document);
    }

    if (!$traitement) {
        $traitement = new traitementdocuments();
        $traitement->demandedocuments_id = $request->demandedocument_id;
    }


    if ($request->hasFile('document')) {
        $path = $request->file('document')->store('documents', 'public');
        $traitement->document = $path;
    }


    $traitement->save();


    $demande = demandedocuments::find($request->demandedocument_id);
    if ($demande) {
        $demande->statut = 'traité';
        $demande->save();
    }

    return redirect()->back()->with('success', 'Document traité avec succès.');
}

}
