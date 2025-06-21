<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DasboardForumController extends Controller
{
    public function index()
    {
        return Inertia::render('dashboard/forum/index');
    }
}
