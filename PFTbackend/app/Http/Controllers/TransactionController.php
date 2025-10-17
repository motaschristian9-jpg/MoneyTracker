<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Transaction;

class TransactionController extends Controller
{
    // Fetch last 10 transactions for authenticated user
    public function transactions(Request $request)
    {
        // Get authenticated user's transactions, latest first, limit 10
        $transactions = Transaction::where('user_id', $request->user()->id)
            ->latest() // orders by created_at descending
            ->take(10)
            ->get();

        return response()->json([
            'message' => 'Latest transactions fetched successfully',
            'data' => $transactions
        ]);
    }
}
