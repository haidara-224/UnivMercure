<?php

namespace App\Http\Controllers;

use App\Models\etudiant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class DashboardEtudiantController extends Controller
{
    public function index()
    {
        $authUser=Auth::id();
        $etudiant=etudiant::where('user_id',$authUser)->first();


        return Inertia::render('etudiant',[
            'etudiant'=>$etudiant
        ]);
    }
}
