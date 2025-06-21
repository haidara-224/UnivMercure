<?php

namespace App\Http\Controllers;

use App\Http\Requests\facultyAddRequestValidated;
use App\Http\Requests\facultyRequestValidated;
use App\Models\Faculty;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FacultyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $faculty=Faculty::orderByDesc('created_at')->get();
        return Inertia::render('dashboard/faculty/index',[
            'faculty'=>fn()=>$faculty
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(facultyAddRequestValidated $request)
    {
        $faculty=new Faculty();
        $faculty->create($request->validated());
        return redirect()->back()->with('success','Faculté créer avec success');
    }






    public function update(facultyRequestValidated $request, faculty $faculty)
    {
        $faculty->update($request->validated());
        return redirect()->back()->with('success','Faculté modifié avec success');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(faculty $faculty)
    {
        $faculty->delete();
        return redirect()->back()->with('success','Faculté supprimé avec success');
    }

}
