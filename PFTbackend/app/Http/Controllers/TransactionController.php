<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TransactionController extends Controller
{
    // Simple index function
    public function index()
    {
        return response()->json([
            'message' => 'Transaction index working'
        ]);
    }
}
