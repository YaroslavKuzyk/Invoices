<?php

namespace App\DTO;

use App\Http\Requests\InvoiceRequest;

final readonly class InvoiceData
{
    public function __construct(
        public string $number,
        public string $supplier_name,
        public string $supplier_tax_id,
        public float $net_amount,
        public float $vat_amount,
        public float $gross_amount,
        public string $currency,
        public string $status,
        public string $issue_date,
        public string $due_date,
    ) {
    }

    public static function fromRequest(InvoiceRequest $request): self
    {
        return new self(...$request->validated());
    }

    public function toArray(): array
    {
        return [
            'number' => $this->number,
            'supplier_name' => $this->supplier_name,
            'supplier_tax_id' => $this->supplier_tax_id,
            'net_amount' => $this->net_amount,
            'vat_amount' => $this->vat_amount,
            'gross_amount' => $this->gross_amount,
            'currency' => $this->currency,
            'status' => $this->status,
            'issue_date' => $this->issue_date,
            'due_date' => $this->due_date,
        ];
    }
}
