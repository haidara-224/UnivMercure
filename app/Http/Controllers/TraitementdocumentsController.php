<?php

namespace App\Http\Controllers;

use App\Mail\TraitementEmail;
use App\Models\Demandedocuments;
use App\Models\Traitementdocuments;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;

class TraitementdocumentsController extends Controller
{
   public function store(Request $request)
{
    $request->validate([
        'demandedocument_id' => 'required|exists:demandedocuments,id',
        'document' => 'required|file|mimes:pdf,doc,docx,jpg,png|max:2048',
    ]);


    $traitement = Traitementdocuments::where('demandedocuments_id', $request->demandedocument_id)->first();


    if ($traitement && $traitement->document && Storage::disk('public')->exists($traitement->document)) {
        Storage::disk('public')->delete($traitement->document);
    }

    if (!$traitement) {
        $traitement = new Traitementdocuments();
        $traitement->demandedocuments_id = $request->demandedocument_id;
    }


    if ($request->hasFile('document')) {
        $path = $request->file('document')->store('documents', 'public');
        $traitement->document = $path;
    }


    $traitement->save();


    $demande = Demandedocuments::find($request->demandedocument_id);
    if ($demande) {
        $demande->statut = 'traité';
        $demande->save();
    }
    Mail::to($demande->etudiant->user->email)->send(new TraitementEmail($request->demandedocument_id));
    return redirect()->back()->with('success', 'Document traité avec succès.');
}

}
