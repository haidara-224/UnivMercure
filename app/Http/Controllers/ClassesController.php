<?php

namespace App\Http\Controllers;

use App\Http\Requests\niveauAddRequest;
use App\Models\Classes;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClassesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $niveaux=Classes::orderByDesc('created_at')->get();

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

        $niveaux=new Classes();

        $niveaux->create([
            'niveau' => $data['niveau'],

        ]);
        return redirect()->back()->with('success','Niveau creer avec success');
    }



    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Classes $classes)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Classes $classes)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Classes $classes)
    {
        $classes->delete();
        return redirect()->back()->with('success','Niveau Supprimé avec success');
    }
}
