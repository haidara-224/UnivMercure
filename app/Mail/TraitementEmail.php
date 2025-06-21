<?php

namespace App\Mail;

use App\Models\Demandedocuments;
use App\Models\Etudiant;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class TraitementEmail extends Mailable
{
    use Queueable, SerializesModels;

    /**
     * Create a new message instance.
     */
    public string $demandedocuments_id;
    public function __construct(string $demandedocuments_id)
    {
        $this->demandedocuments_id = $demandedocuments_id;
    }


    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        $demande = Demandedocuments::find($this->demandedocuments_id);
        $etudinant_id = $demande->etudiant_id;
        $etudiant = Etudiant::find($etudinant_id);
        return new Envelope(
            from: 'univmercure224@gmail.com',
            subject: 'votre document a été traité',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.traitement',
            with: [
                'demande' => Demandedocuments::find($this->demandedocuments_id),
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
