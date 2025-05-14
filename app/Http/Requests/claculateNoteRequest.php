<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class claculateNoteRequest extends FormRequest
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
            'premiere_note' => 'required|numeric|min:1|max:20',
            'deuxieme_note' => 'required|numeric|min:0|max:20',
            'troisieme_note' => 'required|numeric|min:0|max:20',
            'module' => 'required|string|max:255',
            'matiere' => 'required|exists:matieres,id',
            'annees_scolaire' => 'required|exists:annees_scolaires,id',
            'classe' => 'required|exists:classes,id',
            'departement' => 'required|exists:departements,id',
            'etudiant' => 'required|exists:etudiants,id',
            'moyenne' => 'nullable|numeric|min:0|max:20',
            'moyenne_literaire' => 'nullable|in:A+,A-,A,B+,B-,B,C+,C-,C,D+,D-,D,E,F',
        ];
    }
}
