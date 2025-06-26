<?php

namespace App\Http\Controllers;

use App\Models\Forum;
use App\Models\Postforum;
use App\Models\Postforumlikes;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Spatie\Permission\Models\Role;

class PostforumController extends Controller
{
    public function index(Forum $forum)
    {
        $authId = Auth::id();

        $forum->load([
            'user',
            'role',
            'likes',
            'likedByAuth' => fn($query) => $query->where('user_id', $authId)->where('likes', 1),
            'postforums' => function ($query) use ($authId) {
                $query->with([
                    'user',
                    'role',
                    'likes',
                    'likedByAuth' => fn($q) => $q->where('user_id', $authId)->where('likes', 1),
                    'replieposts' => function ($q) {
                        $q->with([
                            'user',
                            'replies.user',
                            'replies.replies.user',
                            'replies.replies.replies.user',
                            'replies.replies.replies.replies.user',
                        ]);
                    },
                ])
                    ->withCount([
                        'likes as total_likes' => fn($q) => $q->where('likes', 1),
                    ])
                    ->orderByDesc('created_at');
            },
        ]);

        $forum->loadCount([
            'likes as total_likes' => fn($query) => $query->where('likes', 1)
        ]);


        return Inertia::render('forum/details', [
            'post' => $forum,

        ]);
    }


    public function create(Request $request, Forum $forum)
    {
        $data = $request->validate([
            'post' => ['required', 'string']
        ]);
        $user = Auth::user();

        $post = new Postforum();
        $post->user_id = Auth::id();
        $post->forum_id = $forum->id;
        $post->content = $data['post'];
        $post->role_id = $user->roles()->first()->id;

        $post->save();
        return back()->with('success', 'Post Creer avec success');
    }
    public function updateLikePost(Postforum $postforum)
    {
        $authId = Auth::id();

        $PostforumsLikesUser = Postforumlikes::where('user_id', $authId)
            ->where('postforum_id', $postforum->id)
            ->first();

        if ($PostforumsLikesUser) {

            $newState = $PostforumsLikesUser->likes == 1 ? 0 : 1;
            $PostforumsLikesUser->update(['likes' => $newState]);

            return back()->with(
                'success',
                $newState === 1 ? '👍 Vous avez liké ce Post' : '👎 Vous avez retiré votre like'
            );
        } else {

            Postforumlikes::create([
                'user_id' => $authId,
                'postforum_id' => $postforum->id,
                'likes' => 1,

            ]);

            return back()->with('success', '👍 Vous avez liké ce Post');
        }
    }
    public function destroy(Postforum $postforum)
    {
        $postforum->delete();
         return back()->with('success', '👍 Vous avez supprimé ce post');

    }
}
