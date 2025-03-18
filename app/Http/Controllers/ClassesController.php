<?php

namespace App\Http\Controllers;

use App\Models\classes;
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
        return Inertia::render('dashboard/niveau/index',[
            'niveau'=>$niveaux
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(classes $classes)
    {
        //
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
        //
    }
}
