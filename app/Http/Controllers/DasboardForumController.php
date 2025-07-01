<?php

namespace App\Http\Controllers;

use App\Models\Forum;
use App\Models\Forumlikes;
use App\Models\Postforum;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DasboardForumController extends Controller
{
    public function index()
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



        return Inertia::render('dashboard/forum/index', [
            'sujet' => $forums,
            'nbForum' => $nbForum,
            'nbPost' => $nbPost,
            'nbPostUser' => $nbPostUser,

        ]);
    }
    public function show(Forum $forum)
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

        // ✅ Total des likes du forum (likes = 1)
        $totalForumLikes = $forum->likes->where('likes', 1)->count();

        return Inertia::render('dashboard/forum/post', [
            'sujet' => $forum,
            'totalLikesForum' => $totalForumLikes,
        ]);
    }

    public function delete(Forum $forum)
    {
        $forum->delete();
        return back()->with('success', 'Sujet Supprimer avec success');
    }
    public function deletePost(Postforum $postforum)
    {
        $postforum->delete();
        return back()->with('success', 'Le post a été supprimé avec success');
    }
}
