<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class PasswordController extends Controller
{
    /**
     * Send a password reset link to the user's email.
     */
    public function sendResetLink(Request $request)
    {
        $request->validate([
            'email' => 'required|email'
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return response()->json(['message' => 'No user found with this email.'], 404);
        }

        // Generate token and store in password_resets table
        $token = Str::random(60);
        \DB::table('password_resets')->updateOrInsert(
            ['email' => $user->email],
            [
                'token' => $token,
                'created_at' => now(),
            ]
        );

        $resetUrl = env('FRONTEND_URL') . "/reset-password?token={$token}&email={$user->email}";

        // Send email using Blade template
        Mail::send('emails.reset-password', ['user' => $user, 'url' => $resetUrl], function ($message) use ($user) {
            $message->to($user->email)
                    ->subject('Reset Your Password');
        });

        return response()->json(['message' => 'Password reset link sent. Please check your email.']);
    }

    /**
     * Reset the user's password using token from email.
     */
    public function reset(Request $request)
    {
        $request->validate([
            'token' => 'required|string',
            'email' => 'required|email',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $reset = \DB::table('password_resets')
            ->where('email', $request->email)
            ->where('token', $request->token)
            ->first();

        if (!$reset) {
            return response()->json(['message' => 'Invalid token or email.'], 400);
        }

        $user = User::where('email', $request->email)->first();
        $user->password = Hash::make($request->password);
        $user->save();

        // Delete token after successful reset
        \DB::table('password_resets')->where('email', $request->email)->delete();

        return response()->json(['message' => 'Password has been reset successfully!']);
    }
}
