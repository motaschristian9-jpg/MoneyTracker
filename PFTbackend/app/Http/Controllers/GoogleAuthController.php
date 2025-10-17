<?php

namespace App\Http\Controllers;

use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Str;

class GoogleAuthController extends Controller
{
    /**
     * Redirect the user to Google's OAuth page.
     */
    public function redirectToGoogle()
    {
        return Socialite::driver('google')
            ->stateless()
            ->redirect();
    }

    /**
     * Handle callback from Google and generate JWT for the user.
     */
    public function handleGoogleCallback()
    {
        try {
            $googleUser = Socialite::driver('google')->stateless()->user();

            // Create new user if not exists
            $user = User::firstOrCreate(
                ['email' => $googleUser->getEmail()],
                [
                    'name' => $googleUser->getName(),
                    'password' => bcrypt(Str::random(16)),
                ]
            );

            // Generate JWT using api guard
            $token = auth('api')->login($user);

            // Determine if user is new
            $isNewUser = $user->wasRecentlyCreated ? 'true' : 'false';
            $name = $user->name;

            // Redirect to frontend with token, user info, and flag
            $redirectUrl = env('FRONTEND_URL') 
                . "/google-auth-callback?token={$token}&is_new_user={$isNewUser}&name=" . urlencode($name);

            return redirect($redirectUrl);

        } catch (\Exception $e) {
            \Log::error('Google Auth Error: ' . $e->getMessage());
            return redirect(env('FRONTEND_URL') . "/login?error=google_auth_failed");
        }
    }
}
