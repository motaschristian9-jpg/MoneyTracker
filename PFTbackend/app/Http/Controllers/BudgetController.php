<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Budget;

class BudgetController extends Controller
{
    // Fetch all budgets for the authenticated user
    public function budgets(Request $request)
    {
        $user = $request->user();

        $budgets = Budget::where('user_id', $user->id)
            ->latest() // optional, if you want newest first
            ->get();

        return response()->json([
            'message' => 'Budgets fetched successfully',
            'data' => $budgets
        ]);
    }
}
