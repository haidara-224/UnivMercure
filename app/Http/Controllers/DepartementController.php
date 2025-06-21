<?php

namespace App\Http\Controllers;

use App\Http\Requests\departementAddRequestValidated;
use App\Http\Requests\DepartementRequestValidated;
use App\Http\Requests\facultyRequestValidated;
use App\Models\Departement;
use App\Models\Faculty;
use App\Models\Professeur;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DepartementController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $departement=Departement::with(['professeur','faculty'])->get();
        $chefDep=Professeur::orderByDesc('created_at')->get();
        $faculty=Faculty::orderByDesc('created_at')->get();

        return Inertia::render('dashboard/departement/index',[
            'departement'=>$departement,
            'chefdpt'=>$chefDep,
            'faculty'=>$faculty,
        ]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(departementAddRequestValidated $request)
    {
        $data = $request->validated();
        Departement::create([
            'name' => $data['name'],
            'professeur_id' => $data['chef'],
            'faculty_id' => $data['faculty'],
        ]);

        return redirect()->back()->with('success', 'Département créé avec succès');
    }


    public function update(DepartementRequestValidated $request, Departement $departement)
    {
        $data = $request->validated();
        $departement->update([
            'name' => $data['name'],
            'professeur_id' => $data['chef'],
            'faculty_id' => $data['faculty'],
        ]);
        return redirect()->back()->with('success','departement modifié avec success');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Departement $departement)
    {
        $departement->delete();
        return redirect()->back()->with('success','departement supprimé avec success');
    }
}
