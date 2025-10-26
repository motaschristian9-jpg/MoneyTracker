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

    public function storeBudget(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'target_amount' => 'required|numeric|min:0',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'description' => 'nullable|string|max:1000',
        ]);

        $budget = Budget::create([
            'user_id' => $request->user()->id,
            'name' => $request->name,
            'category' => $request->category,
            'target_amount' => $request->target_amount,
            'start_date' => $request->start_date,
            'end_date' => $request->end_date,
            'description' => $request->description ?? null,
        ]);

        return response()->json([
            'message' => 'Budget added successfully',
            'budget' => $budget,
        ]);
    }

    public function deleteBudget($id)
    {
        $budget = Budget::where('id', $id)->where('user_id', auth()->id())->first();
        if (!$budget) {
            return response()->json(['message' => 'Budget not found'], 404);
        }
        $budget->delete();
        return response()->json(['message' => 'Budget deleted successfully']);
    }
}
