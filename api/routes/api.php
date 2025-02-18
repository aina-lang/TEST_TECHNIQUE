<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ClientController;

Route::post('/upload', [ClientController::class, 'upload']);
Route::resource('clients', ClientController::class);
