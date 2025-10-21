<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\BudgetController;
use App\Http\Controllers\SavingsController;
use App\Http\Middleware\CorsMiddleware;

// Public routes
Route::prefix('api')->middleware([CorsMiddleware::class])->group(function () {

    // Authentication
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);

    // Password
    Route::post('/forgot-password', [PasswordController::class, 'sendResetLink']);
    Route::post('/reset-password', [PasswordController::class, 'reset']);

    // Protected routes (JWT)
    Route::middleware(['jwt.auth'])->group(function () {
        Route::get('/profile', [AuthController::class, 'profile']);
        Route::get('/transactions', [TransactionController::class, 'transactions']);
        Route::get('/budgets', [BudgetController::class, 'budgets']);
        Route::get('/savings', [SavingsController::class, 'savings']);
    });
});
