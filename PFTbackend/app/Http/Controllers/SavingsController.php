<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Savings;

class SavingsController extends Controller
{
    // Fetch all savings for the authenticated user
    public function savings(Request $request)
    {
        $user = $request->user();

        $savings = Savings::with('contributions') // eager load contributions
            ->where('user_id', $user->id)
            ->get();

        return response()->json([
            'message' => 'Savings fetched successfully',
            'data' => $savings
        ]);
    }
}
