<?php

namespace App\Notifications;

use App\Models\Demandedocuments;
use App\Models\Etudiant;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class DemandeNotification extends Notification implements ShouldQueue
{
    public $etudiantId;
    public $demandeId;
    public $connection = null;
    public $queue = null;
    public $delay = null;


    public function __construct($etudiantId, $demandeId)
    {
        $this->etudiantId = $etudiantId;
        $this->demandeId = $demandeId;
    }
    public function via($notifiable)
    {
        return ['mail', 'database'];
    }
    public function toMail(object $notifiable): MailMessage
    {
        $etudiant = Etudiant::find($this->etudiantId);
        $demande = Demandedocuments::find($this->demandeId);

        return (new MailMessage)
            ->greeting('Bonjour!')
            ->line("Vous avez une nouvelle demande de document par {$etudiant->name}.")

            ->line('Merci d\'utiliser notre application!');
    }

    public function toArray(object $notifiable): array
    {
        $etudiant = Etudiant::find($this->etudiantId);
        $demande = Demandedocuments::find($this->demandeId);

        return [
            'etudiant_id' => $etudiant->id,
            'etudiant_nom' => $etudiant->name,
            'type_document' => $demande->type_document,
            'comment' => $demande->comment,
            'statut' => $demande->statut,
            'message' => $this->getMessage(),
            'time' => now()->toDateTimeString(),
        ];
    }

  protected function getMessage()
{
    $demande = Demandedocuments::find($this->demandeId);
    $statut = mb_strtolower(trim($demande->statut));

    return match ($statut) {
        'traité' => "Votre demande de {$demande->type_document} a été traitée",
        'non traité' => "Votre demande de {$demande->type_document} n'a pas encore été traitée",
        default => "Statut inconnu pour votre demande",
    };
}

}
