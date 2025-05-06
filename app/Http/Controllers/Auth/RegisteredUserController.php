<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\etudiant;
use App\Models\Professeur;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Show the registration page.
     */
    public function create(): Response
    {
        return Inertia::render('auth/register',[
            'matricule'=>session('matricule')
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'matriculeUser'=>['required']
        ]);
        $etudiant=etudiant::where('matricule',$request->matriculeUser)->first();
        $Prof=Professeur::where('matricule',$request->matriculeUser)->first();

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        if($etudiant)
        {
            $etudiant->update(['user_id'=>$user->id]);
            $user->assignRole('etudiant');

        }
        if($Prof)
        {
            $Prof->update(['user_id'=>$user->id]);
            $user->assignRole('personnel');
        }

        event(new Registered($user));

        Auth::login($user);

        return to_route('home');
    }
}
