<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CalculatorController;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Endpoint to perform calculations: add, subtract, multiply, divide
Route::post('/calculator', [CalculatorController::class, 'calculate']);

// Endpoint to retrieve a calculation record by ID
Route::get('/calculation/{id}', [CalculatorController::class, 'getCalculation']);

// Endpoint for user authentication (login)
Route::post('/auth/login', [AuthController::class, 'login']);

// Endpoint to retrieve the last five calculations
Route::get('/calculations', [CalculatorController::class, 'getLastFiveCalculations']);