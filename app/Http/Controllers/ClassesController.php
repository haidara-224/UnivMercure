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
        $niveaux=classes::orderByDesc('created_at')->get();

        return Inertia::render('dashboard/niveau/index',[
            'niveau'=>$niveaux,


        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(niveauAddRequest $request)
    {
        $data = $request->validated();

        $niveaux=new classes();

        $niveaux->create([
            'niveau' => $data['niveau'],

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
