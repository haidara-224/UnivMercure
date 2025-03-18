<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class niveauAddRequest extends FormRequest
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
            'niveau' => ['required', Rule::in(['Licence 1', 'Licence 2', 'Licence 3', 'Licence 4', 'Licence 5', 'Master 1', 'Master 2'])],
            'departement' => ['required', 'exists:departements,id']
        ];
    }
}
