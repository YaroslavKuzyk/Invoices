<?php

namespace App\Models;

use App\Enums\InvoiceStatus;
use App\Models\Scopes\LatestFirstScope;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\ScopedBy;
use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'number',
    'supplier_name',
    'supplier_tax_id',
    'net_amount',
    'vat_amount',
    'gross_amount',
    'currency',
    'status',
    'issue_date',
    'due_date',
])]
#[ScopedBy(LatestFirstScope::class)]
class Invoice extends Model
{
    use HasUlids;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'status' => InvoiceStatus::class,
            'net_amount' => 'decimal:2',
            'vat_amount' => 'decimal:2',
            'gross_amount' => 'decimal:2',
            'issue_date' => 'date',
            'due_date' => 'date',
        ];
    }
}
