<?php

namespace App\Exceptions;

use App\Enums\InvoiceStatus;
use Exception;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class InvoiceNotEditableException extends Exception
{
    public function __construct(public readonly InvoiceStatus $status)
    {
        parent::__construct("Only pending invoices can be updated, current status is [{$status->value}].");
    }

    public function render(Request $request): JsonResponse
    {
        return response()->json([
            'message' => $this->getMessage(),
            'status' => $this->status->value,
        ], Response::HTTP_CONFLICT);
    }
}
