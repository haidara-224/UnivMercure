<?php

namespace App\Http\Controllers;

use App\Mail\ContactMail;
use App\Models\Classes;
use App\Models\Contact;
use App\Models\Departement;
use App\Models\Evenement;
use App\Models\Tuto;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request)
    {

        $user = $request->user();
        $evenements = Evenement::with('images')
            ->orderByRaw("CASE WHEN start_date >= ? THEN 0 ELSE 1 END", [now()])
            ->orderBy('start_date')
            ->orderBy('end_date')
            ->limit(6)
            ->get();

        if ($user) {
            $authUser = $user->roles;

            return Inertia::render('welcome', [
                'authUsers' => $authUser,
                'evenements' => $evenements
            ]);
        } else {
            return Inertia::render('welcome', [
                'evenements' => $evenements
            ]);
        }
    }
    public function activity()
    {
        $evenements = Evenement::with('images')
            ->orderByRaw("CASE WHEN start_date >= ? THEN 0 ELSE 1 END", [now()])
            ->orderBy('start_date')
            ->orderBy('end_date')

            ->get();
        return Inertia::render('activity', [
            'evenements' => $evenements
        ]);
    }
    public function activityShow(Evenement $evenement)
    {
        $evenement->load('images');
        return Inertia::render('activityShow', [
            'evenement' => $evenement
        ]);
    }
    public function contact()
    {
        return Inertia::render('contact');
    }
    public function contactStore(Request $request)
    {
        $request->validate([
            'prenom' => 'required|string|max:255',
            'nom' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'message' => 'required|string|max:1000',
        ]);
        $data= $request->only(['prenom', 'nom', 'email', 'message']);
        Contact::create($data);
        Mail::to($request->email)->send(new ContactMail(new Contact($data)));
        return redirect()->back()->with('success', 'Message Envoyé successfully!');
    }
    public function coursVideo()
    {
        $departement=Departement::select(['id', 'name'])
            ->orderBy('name', 'asc')
            ->get();
        $niveau=Classes::select(['id', 'niveau'])
            ->orderBy('niveau', 'asc')
            ->get();
        $cours=Tuto::with(['professeur','departement','classes'])
            ->orderBy('created_at', 'desc')
            ->get();
        return Inertia::render('coursVideo', [
            'cours' => $cours,
            'departement' => $departement,
            'niveau' => $niveau
        ]);
    }
    public function coursVideoShow(Tuto $tuto)
    {
        $tuto->load(['professeur', 'departement', 'classes']);

        return Inertia::render('coursVideoShow', [
            'tuto' => $tuto
        ]);
    }

}
