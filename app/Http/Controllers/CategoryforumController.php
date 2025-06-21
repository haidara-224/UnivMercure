<?php

namespace App\Http\Controllers;

use App\Models\Categoryforum;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryforumController extends Controller
{
    public function index()
    {
        $category=Categoryforum::with(['user'])->get();

        return Inertia::render('dashboard/forum/category/index',[
            'category'=>$category
        ]);
    }

    public function delete(Categoryforum $categoryForum)
    {
        $categoryForum->delete();
        return back()->with('success','Catégory supprimer avec success');
    }
}
