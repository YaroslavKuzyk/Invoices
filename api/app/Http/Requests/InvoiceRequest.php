<?php

namespace App\Http\Requests;

use App\Enums\InvoiceStatus;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Validator;

class InvoiceRequest extends FormRequest
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
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'number' => ['required', 'string', 'max:255', Rule::unique('invoices', 'number')->ignore($this->route('id'))],
            'supplier_name' => ['required', 'string', 'max:255'],
            'supplier_tax_id' => ['required', 'string', 'max:255'],
            'net_amount' => ['required', 'decimal:0,2', 'gt:0'],
            'vat_amount' => ['required', 'decimal:0,2', 'min:0'],
            'gross_amount' => ['required', 'decimal:0,2'],
            'currency' => ['required', 'string', 'in:UAH,USD,EUR'],
            'status' => ['required', 'string', Rule::enum(InvoiceStatus::class)],
            'issue_date' => ['required', 'date'],
            'due_date' => ['required', 'date', 'after_or_equal:issue_date'],
        ];
    }

    public function messages(): array
    {
        return [
            'number.required' => 'Number is required',
            'supplier_name.required' => 'Supplier name is required',
            'supplier_tax_id.required' => 'Supplier tax ID is required',
            'net_amount.required' => 'Net amount is required',
            'vat_amount.required' => 'VAT amount is required',
            'gross_amount.required' => 'Gross amount is required',
            'currency.required' => 'Currency is required',
            'status.required' => 'Status is required',
            'issue_date.required' => 'Issue date is required',
            'due_date.required' => 'Due date is required',
        ];
    }

    public function withValidator(Validator $validator): void
    {
        $validator->after(function (Validator $validator) {
            if ($validator->errors()->hasAny(['net_amount', 'vat_amount', 'gross_amount'])) {
                return;
            }

            $expected = round((float) $this->input('net_amount') + (float) $this->input('vat_amount'), 2);

            if ($expected !== round((float) $this->input('gross_amount'), 2)) {
                $validator->errors()->add('gross_amount', 'Gross amount must equal net amount plus VAT amount.');
            }
        });
    }
}
