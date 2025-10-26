<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PasswordController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\BudgetController;
use App\Http\Controllers\SavingsController;

// Public routes with CORS
Route::prefix('api')->middleware(['cors'])->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/forgot-password', [PasswordController::class, 'sendResetLink']);
    Route::post('/reset-password', [PasswordController::class, 'reset']);

    // Protected routes with JWT
    Route::middleware(['jwt.auth'])->group(function () {
        Route::get('/profile', [AuthController::class, 'profile']);
        Route::get('/transactions', [TransactionController::class, 'transactions']);
        Route::get('/budgets', [BudgetController::class, 'budgets']);
        Route::get('/savings', [SavingsController::class, 'savings']);

        Route::post('/transactions', [TransactionController::class, 'storeTransaction']);
        Route::post('/budgets', [BudgetController::class, 'storeBudget']);
        Route::post('/logout', [AuthController::class, 'logout']);

        Route::put('/transactions/{id}', [TransactionController::class, 'updateTransaction']);

        Route::delete('/transactions/{id}', [TransactionController::class, 'deleteTransaction']);
        Route::delete('/budgets/{id}', [BudgetController::class, 'deleteBudget']);
    });

    Route::post('/refresh', [AuthController::class, 'refresh']);
});
