<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Notification;

class DemandeNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public $etudiant;
    public $type_document;
    public $comment;
    public $statut;

    /**
     * Create a new notification instance.
     */
    public function __construct($etudiant, $type_document, $comment, $statut)
    {
        $this->etudiant = $etudiant;
        $this->type_document = $type_document;
        $this->comment = $comment;
        $this->statut = $statut;
    }

    /**
     * Get the notification's delivery channels.
     */
    public function via(object $notifiable): array
    {
        return ['database'];
    }

    /**
     * Get the array representation of the notification.
     */
    public function toArray(object $notifiable): array
    {
        return [
            'etudiant_id' => $this->etudiant->id,
            'etudiant_nom' => $this->etudiant->nom_complet,
            'type_document' => $this->type_document,
            'comment' => $this->comment,
            'statut' => $this->statut,
            'message' => $this->getMessage(),

            'time' => now()->toDateTimeString(),
        ];
    }

    protected function getMessage(): string
    {
        return match($this->statut) {
            'traité' => "Votre demande de {$this->type_document} a été traitée",
            'en cours' => "Votre demande de {$this->type_document} est en cours de traitement",
            'refusé' => "Votre demande de {$this->type_document} a été refusée",
            default => "Nouvelle mise à jour concernant votre demande de {$this->type_document}",
        };
    }
}
