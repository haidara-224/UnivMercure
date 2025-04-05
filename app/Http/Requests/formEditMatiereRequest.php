<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class formEditMatiereRequest extends FormRequest
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
            'nom' => 'required|string|max:255|unique:matieres,nom,'.$this->route('matiere')->id,
            'departement_id' => 'required|array',
            'departement_id.*' => 'exists:departements,id',
        ];
    }
}
