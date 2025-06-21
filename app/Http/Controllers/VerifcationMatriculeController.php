<?php

namespace App\Http\Controllers;

use App\Models\Etudiant;
use App\Models\Professeur;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VerifcationMatriculeController extends Controller
{
    public function verification(){
        return Inertia::render('verification-matricule');
    }
    public function verificationStore(Request $request){

        $data = $request->validate([
            'matricule' => 'required',

        ]);
        $matricule=$data['matricule'];
        $etudiant=Etudiant::where('matricule',$matricule)->first();
        $Prof=Professeur::where('matricule',$matricule)->first();
        if(optional($etudiant)->user_id || optional($Prof)->user_id)
        {
            return to_route('login');
        }
        if($etudiant || $Prof)
        {
            $matricule=$etudiant ? $etudiant->matricule : $Prof->matricule;

            return to_route('register')->with('matricule',$matricule);

        }
        return redirect()->back()->with('error','Matricule non existant');

    }
}
