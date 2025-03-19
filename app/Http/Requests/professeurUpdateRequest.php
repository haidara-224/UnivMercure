<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class professeurUpdateRequest extends FormRequest
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
                Rule::unique('professeurs', 'matricule')->ignore($this->route('professeur')->id)

            ],

            'name' => ['required', 'string'],
            'prenom' => ['required', 'string'],
            'telephone' => ['required', 'string'],
            'photo' => ['nullable','image', 'mimes:jpeg,jpg,png', 'max:2042'],

        ];
    }
}
