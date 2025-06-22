<?php

namespace App\Http\Controllers;

use App\Models\Categoryforum;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;


class CategoryforumController extends Controller
{
    public function index()
    {
        $category = Categoryforum::with(['user'])->get();

        return Inertia::render('dashboard/forum/category/index', [
            'category' => $category
        ]);
    }
    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required','unique:categoryforums,title'],
            'description' => ['nullable', 'string',],
            'emoji'=>['required'],
        ]);

        $category = new Categoryforum();
        $category->title = $data['title'];
        $category->description = $data['description'];
        $category->user_id = Auth::id();
        $category->emoji=$data['emoji'];
        $category->save();

        return back()->with('success', 'Catégorie créée avec succès');
    }
    public function update(Categoryforum $categoryForum, Request $request)
{
    $data = $request->validate([
        'title' => [
            'required',

            Rule::unique('categoryforums', 'title')->ignore($categoryForum->id),
        ],
        'description' => ['nullable', 'string', ],
         'emoji'=>['required'],
    ]);

    $categoryForum->update([
        'title' => $data['title'],
        'description' => $data['description'],
        'user_id'=>Auth::id(),
        'emoji'=>$data['emoji']
    ]);

    return back()->with('success', 'Catégorie modifiée avec succès');
}

    public function delete(Categoryforum $categoryForum)
    {
        $categoryForum->delete();
        return back()->with('success', 'Catégory supprimer avec success');
    }
}
