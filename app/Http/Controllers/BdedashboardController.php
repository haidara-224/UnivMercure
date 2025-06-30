<?php

namespace App\Http\Controllers;

use App\Models\Categoryforum;
use App\Models\Forum;
use App\Models\Postforum;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class BdedashboardController extends Controller
{
    public function index()
    {
        $forums = Forum::with([
            'categoryforum',
            'role',
            'user',
            'likes',
            'postforums' => function ($query) {
                $query->with(['user', 'role', 'likes'])
                    ->withCount([
                        'likes as total_likes' => fn($q) => $q->where('likes', 1),
                    ])
                    ->orderByDesc('created_at');
            },
        ])
            ->withCount([
                'categoryforum as total_categoryforums',
                'user as total_users',
                'postforums as total_postforums',
                'likes as total_likes'
            ])
            ->orderByDesc('created_at')
            ->get();

        $post = Postforum::with(['forum', 'role', 'user', 'likes'])
            ->withCount(['likes as total_likes'])
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('bdedashboard/index', [
            'forums' => $forums,
            'posts' => $post,
        ]);
    }
    public function forums()
    {
        $forums = Forum::with(['categoryforum', 'role', 'user', 'postforums', 'likes'])
            ->withCount([
                'likes as total_likes' => function ($query) {
                    $query->where('likes', 1);
                }
            ])
            ->orderBy('created_at', 'desc')
            ->get();
        $post = Postforum::with(['forum', 'role', 'user', 'likes'])
            ->withCount([
                'likes as total_likes' => function ($query) {
                    $query->where('likes', 1);
                }
            ])
            ->orderBy('created_at', 'desc')->get();

        $nbPost = count($post);
        $nbForum = Forum::count();
        $nbPostUser = $post->pluck('user.id')->unique()->count();



        return Inertia::render('bdedashboard/forum', [
            'sujet' => $forums,
            'nbForum' => $nbForum,
            'nbPost' => $nbPost,
            'nbPostUser' => $nbPostUser
        ]);

    }
      public function showForum(Forum $forum)
    {
        $forum = $forum->load([
            'categoryforum',
            'role',
            'user',
            'likes',
            'postforums.user',
            'postforums.likes',
            'postforums' => function ($query) {
                $query->withCount([
                    'likes as total_likes' => function ($q) {
                        $q->where('likes', 1);
                    }
                ]);
            },
        ]);


        $totalForumLikes = $forum->likes->where('likes', 1)->count();

        return Inertia::render('bdedashboard/forum/post', [
            'sujet' => $forum,
            'totalLikesForum' => $totalForumLikes,
        ]);
    }

    public function deleteForum(Forum $forum)
    {
        $forum->delete();
        return back()->with('success', 'Sujet Supprimer avec success');
    }
    public function deletePost(Postforum $postforum)
    {
        $postforum->delete();
        return back()->with('success', 'Le post a été supprimé avec success');
    }

     public function category()
    {
        $category = Categoryforum::with(['user'])->get();

        return Inertia::render('bdedashboard/category/index', [
            'category' => $category
        ]);
    }
    public function storeCategory(Request $request)
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
    public function updateCategory(Categoryforum $categoryForum, Request $request)
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

    public function deleteCategory(Categoryforum $categoryForum)
    {
        $categoryForum->delete();
        return back()->with('success', 'Catégorie supprimée avec succès');
    }
}
