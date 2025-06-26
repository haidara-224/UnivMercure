<?php

namespace App\Http\Controllers;

use App\Models\Categoryforum;
use App\Models\Forum;
use App\Models\Forumlikes;
use App\Models\Postforum;
use App\Models\Postforumlikes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class ForumController extends Controller
{
    public function index()
    {
        $category = Categoryforum::select(['id', 'title', 'description', 'emoji'])->get();
        $authId = Auth::id();

        $forums = Forum::with([
            'categoryforum',
            'role',
            'user',
            'postforums',
            'postforums.role',
            'likes',
            'role',
            'likedByAuth' => function ($query) use ($authId) {
                $query->where('user_id', $authId)->where('likes', 1);
            }
        ])
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

        $posts = Postforum::select('forum_id')
            ->selectRaw('count(*) as count')
            ->groupBy('forum_id')
            ->pluck('count', 'forum_id');


        return Inertia::render(
            'forum',
            [
                'category' => $category,
                'topics' => $forums,
                'nbPost' => $posts
            ]
        );
    }


    public function updateLike(Forum $forum)
    {
        $authId = Auth::id();

        $forumsLikesUser = Forumlikes::where('user_id', $authId)
            ->where('forum_id', $forum->id)
            ->first();

        if ($forumsLikesUser) {

            $newState = $forumsLikesUser->likes == 1 ? 0 : 1;
            $forumsLikesUser->update(['likes' => $newState]);

            return back()->with(
                'success',
                $newState === 1 ? '👍 Vous avez liké ce sujet' : '👎 Vous avez retiré votre like'
            );
        } else {

            Forumlikes::create([
                'user_id' => $authId,
                'forum_id' => $forum->id,
                'likes' => 1,
            ]);

            return back()->with('success', '👍 Vous avez liké ce sujet');
        }
    }
    public function store(Request $request)
    {
        $request->validate([
            'titre' => ['required'],
            'category' => ['required', 'exists:categoryforums,id'],
            'content' => ['required'],
        ]);
        $role = Role::where('name', 'forum')->first();
        $sujet = new Forum();
        $sujet->title = $request['titre'];
        $sujet->categoryforum_id = $request['category'];
        $sujet->comment = $request['content'];
        $sujet->user_id = Auth::id();
        $sujet->role_id = $role->id;
        $sujet->save();
        return back()->with('success', '👍 Sujet creer avec success');

    }
}
