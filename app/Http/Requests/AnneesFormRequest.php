<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AnneesFormRequest extends FormRequest
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
            'annees_scolaire' => ['required','unique:annees_scolaires,annee_scolaire', 'regex:/^\d{4}-\d{4}$/'],
            'Date_debut'=>['required','date'],
            'Date_fin'=>['required','date']
        ];
    }
}
