<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ExamRequestValidated extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
   public function rules(): array
{
    return [
        'module' => 'required',
      'matiere_id' => 'required|exists:matieres,id',
        'date_examen' => 'required|date',
        'heure_debut' => 'required| date_format:H:i',
        'heure_fin' => 'required|date_format:H:i',
        'salle_id' => 'required|exists:salles,id',
        'etudiant_ids' => 'required|array',
        'etudiant_ids.*' => 'exists:etudiants,id',
    ];
}

}
