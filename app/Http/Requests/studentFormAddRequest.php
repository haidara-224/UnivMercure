<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class studentFormAddRequest extends FormRequest
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
            'matricule'=>['required','string','unique:etudiants,matricule'],
            'nom'=>['required','string'],
            'prenom'=>['required','string'],
            'telephone'=>['required','string'],
             'genre' => ['required', Rule::in(['feminin','masculin'])],
             'photo' => ['nullable', 'image', 'mimes:jpeg,jpg,png', 'max:2042'],
             'annees_scolaire'=>['required','exists:annees_scolaires,id'],
             'niveau'=>['required','exists:classes,id'],
             'departement'=>['required','exists:departements,id'],

        ];
    }
}
