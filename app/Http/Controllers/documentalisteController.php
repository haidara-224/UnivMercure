<?php

namespace App\Http\Controllers;

use App\Models\Demandedocuments;
use Illuminate\Http\Request;

class DocumentalisteController extends Controller
{
    public function index(Request $request)
    {
        $documents = Demandedocuments::with(['etudiant','classes','departement','anneesScolaire'])
            ->orderBy('created_at', 'desc')
            ->get();
        $notifications = $request->user()->notifications
            ->map(fn($n) => $n->only(['id', 'data', 'read_at', 'created_at']));

        return inertia('documentaliste/index', [
            'documents' => $documents,
            'notifications' => $notifications
        ]);
    }

    public function markAsRead(Request $request, $id)
    {
        $notification = $request->user()->notifications()->findOrFail($id);
        $notification->markAsRead();

        return back()->with('success', 'Notification marquée comme lue.');
    }

    public function markAllAsRead(Request $request)
    {
        $request->user()->unreadNotifications->markAsRead();

        return back()->with('success', 'Toutes les notifications ont été marquées comme lues.');
    }
}
