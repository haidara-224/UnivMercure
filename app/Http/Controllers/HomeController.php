<?php

namespace App\Http\Controllers;

use App\Models\Evenement;
use App\Models\User;
use Illuminate\Http\Request;
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

}
