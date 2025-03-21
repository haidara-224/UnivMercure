<?php

namespace App\Http\Controllers;

use App\Http\Requests\AnneesFormEditRequest;
use App\Http\Requests\AnneesFormRequest;
use App\Models\anneesScolaire;
use Illuminate\Http\Request;
use Inertia\Inertia;

class anneesScolaireController extends Controller
{
    public function index()
    {
        $annees_scolaire=anneesScolaire::orderByDesc('annee_scolaire')->get();
        return Inertia::render('dashboard/annees-scolaire/index',[
            'annees'=>$annees_scolaire
        ]);
    }
    public function create(AnneesFormRequest $request)
    {
        $annees_scolaire=new anneesScolaire();
        $annees_scolaire->annee_scolaire=$request->annees_scolaire;
        $annees_scolaire->date_debut=$request->Date_debut;
        $annees_scolaire->date_fin=$request->Date_fin;
        $annees_scolaire->save();
        return redirect()->back()->with('success','Années Scolaire a été creer avec success');

    }
    public function update(AnneesScolaire $anneesScolaire, AnneesFormEditRequest $request)
    {
        $anneesScolaire->update([
            'annee_scolaire' => $request->annees_scolaire,
            'date_debut' => $request->date_debut,
            'date_fin' => $request->date_fin,
        ]);

        return redirect()->back()->with('success', 'Année Scolaire mise à jour avec succès');
    }

    public function destroy(anneesScolaire $anneesScolaire)
    {
        $anneesScolaire->delete();
        return redirect()->back()->with('success','Années Scolaire a été Supprimé avec success');

    }
}
