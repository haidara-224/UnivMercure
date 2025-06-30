<?php

namespace App\Http\Controllers;

use App\Models\Forum;
use App\Models\Postforum;
use Illuminate\Http\Request;
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
}
