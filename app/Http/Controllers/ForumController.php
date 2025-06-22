<?php

namespace App\Http\Controllers;

use App\Models\Categoryforum;
use App\Models\Forum;
use App\Models\Postforum;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ForumController extends Controller
{
    public function index()
    {
        $category = Categoryforum::select(['id', 'title', 'description', 'emoji'])->get();
        $forum = Forum::with(['categoryforum', 'role', 'user', 'postforums'])
            ->orderBy('created_at', 'desc')->get();
        $post = Postforum::with(['forum', 'role', 'user'])->orderBy('created_at', 'desc')->get();

        $nbPost = count($post);
        return Inertia::render(
            'forum',
            [
                'category' => $category,
                'topics' => $forum,
                'nbPost' => $nbPost
            ]
        );
    }
    public function show()
    {
        return Inertia::render('forum/details');
    }
    public function updateLike(Forum $forum) {
        //$auth=Auth
    }
}
