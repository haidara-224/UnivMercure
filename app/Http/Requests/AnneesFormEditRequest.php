<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AnneesFormEditRequest extends FormRequest
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
            'annees_scolaire' => [
                'required',
                'regex:/^\d{4}-\d{4}$/',
                Rule::unique('annees_scolaires', 'annee_scolaire')->ignore($this->route('anneesScolaire')->id),

            ],
            'date_debut' => ['required', 'date'],
            'date_fin' => ['required', 'date']
        ];
    }
}
