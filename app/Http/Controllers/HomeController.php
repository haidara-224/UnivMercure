<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
   public function index(Request $request){

    $user=$request->user();
    if($user){
        $authUser=$user->roles;

    return Inertia::render('welcome',[
        'authUsers'=>$authUser
    ]);
    }else{
        return Inertia::render('welcome');
    }


   }

}
