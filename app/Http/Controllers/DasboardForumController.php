<?php

namespace App\Http\Controllers;

use App\Models\Forum;
use App\Models\Postforum;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DasboardForumController extends Controller
{
    public function index()
    {
        $forum = Forum::with(['categoryforum', 'role', 'user', 'postforums'])
            ->orderBy('created_at', 'desc')->get();
        $post = Postforum::with(['forum', 'role', 'user'])->orderBy('created_at', 'desc')->get();

        $nbPost = count($post);
        $nbForum = Forum::count();
        $nbPostUser = $post->pluck('user.id')->unique()->count();



        return Inertia::render('dashboard/forum/index', [
            'sujet' => $forum,
            'nbForum' => $nbForum,
            'nbPost' => $nbPost,
            'nbPostUser' => $nbPostUser
        ]);
    }
    public function show(Forum $forum){

       $forums=$forum->load([
        'categoryforum', 'role', 'user', 'postforums.user'
       ]);

        return Inertia::render('dashboard/forum/post',[
            'sujet'=>$forums
        ]);
    }
    public function delete (Forum $forum)
    {
        $forum->delete();
        return back()->with('success','Sujet Supprimer avec success');
    }
    public function deletePost(Postforum $postforum)
    {
        $postforum->delete();
        return back()->with('success','Le post a été supprimé avec success');
    }
}
