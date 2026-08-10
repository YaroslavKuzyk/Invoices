<?php

use App\Http\Controllers\InvoiceController;
use Illuminate\Support\Facades\Route;


Route::controller(InvoiceController::class)->prefix('invoices')->group(function () {
    Route::get('/', 'index');
    Route::post('/', 'store');
    Route::get('/{id}', 'show');
    Route::put('/{id}', 'update');
});
