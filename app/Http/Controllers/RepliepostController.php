<?php

namespace App\Http\Controllers;

use App\Models\Repliepost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RepliepostController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'content' => ['required', 'string'],
            'postforum_id' => ['required', 'exists:postforums,id'],
            'parent_id' => ['nullable', 'exists:replieposts,id'],
        ]);

        $replie = Repliepost::create([
            'content' => $data['content'],
            'postforum_id' => $data['postforum_id'],
            'user_id' => Auth::id(),
            'parent_id' => $data['parent_id'] ?? null,
        ]);

        return back()->with('success', 'Réponse envoyée avec succès.');
    }
    public function destroy(Repliepost $replies)
    {
        $replies->delete();
        return back()->with('success', '👍 Vous avez supprimé cette réponse');

    }
}
