<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class DepartementRequestValidated extends FormRequest
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
        'name' => [
            'required',
            'string',
            Rule::unique('departements', 'name')->ignore($this->route('departement')->id),
        ],
        'chef' => [
            'required',

            'exists:professeurs,id',

           // Rule::unique('departements', 'professeur_id')->ignore($this->route('departement')->id),
        ],
        'faculty' => [
            'required',

            'exists:faculties,id',


        ],
    ];
}

}
