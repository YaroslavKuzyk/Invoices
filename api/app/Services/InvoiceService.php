<?php

namespace App\Services;

use App\Contracts\InvoiceServiceInterface;
use App\DTO\InvoiceData;
use App\Exceptions\InvoiceNotEditableException;
use App\Models\Invoice;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

final class InvoiceService implements InvoiceServiceInterface
{
    public function index(int $perPage): LengthAwarePaginator
    {
        return Invoice::paginate($perPage);
    }

    public function show(string $id): Invoice
    {
        return Invoice::findOrFail($id);
    }

    public function store(InvoiceData $data): Invoice
    {
        return Invoice::create($data->toArray());
    }

    public function update(string $id, InvoiceData $data): Invoice
    {
        $invoice = Invoice::findOrFail($id);

        if (! $invoice->status->isEditable()) {
            throw new InvoiceNotEditableException($invoice->status);
        }

        $invoice->update($data->toArray());
        return $invoice;
    }
}
