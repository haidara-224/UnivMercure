<?php

namespace App\Http\Controllers;

use App\Http\Requests\demandeDocumentRequest;
use App\Models\demandedocuments;
use App\Models\etudiant;
use App\Models\User;
use App\Notifications\DemandeNotification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class DemandedocumentsController extends Controller
{
    public function demande(demandeDocumentRequest $request)
    {
        $documentRequest = $request->validated();

        $userId = Auth::id();

        $users = User::role(['documentaliste', 'super admin', 'admin'])->get();

        $etudiant = etudiant::where('user_id', $userId)->first();

        if (!$etudiant) {
            return redirect()->back()->withErrors('Étudiant non trouvé.');
        }

        $demandeDocument = new demandedocuments();
        $demandeDocument->etudiant_id = $etudiant->id;
        $demandeDocument->type_document = $documentRequest['type_document'];
        $demandeDocument->comment = $documentRequest['comment'];
        $demandeDocument->classes_id = $documentRequest['classes_id'];
        $demandeDocument->departement_id = $documentRequest['departement_id'];
        $demandeDocument->annees_scolaire_id = $documentRequest['annees_scolaire_id'];
        $demandeDocument->save();
        $users->each(function ($user) use ($etudiant, $demandeDocument) {
            $user->notify(new DemandeNotification($etudiant->id, $demandeDocument->id));
        });


        return redirect()->back()->with('success', 'Demande de document soumise avec succès.');
    }
    public function destroy($id)
    {
        $document = demandedocuments::findOrFail($id);
        $document->delete();

        return redirect()->back()->with('success', 'Demande de document supprimée avec succès.');
    }
}
