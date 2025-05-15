<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TutoCreateRequestValidated extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'titre'=>['required','string','max:50'],
            'contenue'=>['required','string','max:1000'],
            'fichier' => 'nullable|file|mimes:pdf,doc,docx,ppt,pptx|max:10240',
            'video' => 'nullable|file|mimetypes:video/mp4,video/avi,video/mpeg,video/quicktime,video/x-msvideo|max:51200', // 50 MB
            'departement'=>['nullable','exists:departements,id'],
            'niveaux' => ['nullable', 'exists:classes,id'],
        ];
    }
    public function messages(): array
{
    return [
        'fichier.mimes' => 'Le fichier doit être un document PDF, Word ou PowerPoint.',
    ];
}

}
