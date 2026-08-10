<?php

namespace App\Contracts;

use App\DTO\InvoiceData;
use App\Models\Invoice;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface InvoiceServiceInterface
{
    public function index(int $perPage): LengthAwarePaginator;
    public function show(string $id): Invoice;
    public function store(InvoiceData $data): Invoice;
    public function update(string $id, InvoiceData $data): Invoice;
}
