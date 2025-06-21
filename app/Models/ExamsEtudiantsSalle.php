<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExamsEtudiantsSalle extends Model
{
    protected $fillable = ['exam_id', 'salle_id', 'etudiant_id'];

    public function exam() {
        return $this->belongsTo(Exam::class);
    }

    public function salle() {
        return $this->belongsTo(Salle::class);
    }

    public function etudiant() {
        return $this->belongsTo(Etudiant::class);
    }
}
