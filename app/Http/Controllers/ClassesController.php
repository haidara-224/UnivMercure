<?php

namespace App\Http\Controllers;

use App\Http\Requests\niveauAddRequest;
use App\Models\classes;
use App\Models\departement;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClassesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $niveaux=classes::with('departement')->orderByDesc('created_at')->get();

        $dpt=departement::select(['id','name'])->get();
        return Inertia::render('dashboard/niveau/index',[
            'niveau'=>$niveaux,

            'dpt'=>$dpt
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(niveauAddRequest $request)
    {
        $data = $request->validated();
        $existingRecord = classes::where('niveau', $request->niveau)
        ->where('departement_id', $request->departement)
        ->exists();
        $niveaux=new classes();
        if($existingRecord){
            return redirect()->back()->with('error','Erreur de la creation ce niveau a deja été creer');
        }
        $niveaux->create([
            'niveau' => $data['niveau'],
            'departement_id' => $data['departement'],
        ]);
        return redirect()->back()->with('success','Niveau creer avec success');
    }



    /**
     * Show the form for editing the specified resource.
     */
    public function edit(classes $classes)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, classes $classes)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(classes $classes)
    {
        $classes->delete();
        return redirect()->back()->with('success','Niveau Supprimé avec success');
    }
}
