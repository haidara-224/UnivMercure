<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class demandeDocumentRequest extends FormRequest
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
            'type_document' => 'required|string|max:255',
            'comment' => 'nullable|string|max:500',
            'classes_id' => 'nullable|exists:classes,id',
            'departement_id' => 'nullable|exists:departements,id',
            'annees_scolaire_id' => 'nullable|exists:annees_scolaires,id',
        ];
    }
}
