<?php

namespace App\Http\Controllers;

use App\Contracts\InvoiceServiceInterface;
use App\DTO\InvoiceData;
use App\Http\Requests\InvoiceIndexRequest;
use App\Http\Requests\InvoiceRequest;
use App\Http\Resources\InvoiceResource;
use Illuminate\Http\JsonResponse;

class InvoiceController extends Controller
{
    public function __construct(private readonly InvoiceServiceInterface $invoiceService)
    {
    }

    /**
     * Display a listing of the resource.
     */
    public function index(InvoiceIndexRequest $request): JsonResponse
    {
        $invoices = $this->invoiceService->index($request->perPage());
        return InvoiceResource::collection($invoices)->response()->setStatusCode(200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(InvoiceRequest $request): JsonResponse
    {
        $invoiceData = InvoiceData::fromRequest($request);
        $invoice = $this->invoiceService->store($invoiceData);
        return InvoiceResource::make($invoice)->response()->setStatusCode(201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id): JsonResponse
    {
        $invoice = $this->invoiceService->show($id);
        return InvoiceResource::make($invoice)->response()->setStatusCode(200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(InvoiceRequest $request, string $id): JsonResponse
    {
        $invoiceData = InvoiceData::fromRequest($request);
        $invoice = $this->invoiceService->update($id, $invoiceData);
        return InvoiceResource::make($invoice)->response()->setStatusCode(200);
    }
}
