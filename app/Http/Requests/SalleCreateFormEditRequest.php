<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SalleCreateFormEditRequest extends FormRequest
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
            'salles' => 'required|string|max:255|unique:salles,salle,' . $this->route('salle')->id,
            'capacite' => 'required|integer|min:1',
        ];
    }
}
