<?php

namespace App\Http\Controllers;

use App\Models\Evenement;
use App\Models\EvenementImage;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EvenementController extends Controller
{
    public function index()
    {
        $evenements = Evenement::with('images')->orderByDesc('created_at')->get();



        return Inertia::render('bdedashboard/Evenements/index', [
            'evenements' => $evenements,
        ]);
    }
}
