<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class studentFormUpdateRequest extends FormRequest
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
            'matricule' => [
                'required',
                'string',
                'max:255',
                Rule::unique('etudiants', 'matricule')->ignore($this->route('parcours')->etudiant->id)
            ],
            'nom' => ['required', 'string', 'max:255'],
            'prenom' => ['required', 'string', 'max:255'],
            'telephone' => ['required', 'string', 'max:255'],
            'genre' => ['required', 'string', 'in:masculin,feminin'],
            'photo' => ['nullable', 'image', 'max:2048'],
            'annees_scolaire' => ['required', 'exists:annees_scolaires,id'],
            'niveaux' => ['required', 'exists:classes,id'],
            'departement' => ['required', 'exists:departements,id'],
        ];
    }

}
