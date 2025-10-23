<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'message' => 'User registered successfully',
            'user' => $user,
            'token' => $token,
        ], 201);
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['error' => 'Invalid credentials'], 401);
        }

        $user = JWTAuth::user();

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'name' => $user->name,
        ]);
    }

    public function profile()
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
            return response()->json($user);
        } catch (TokenExpiredException $e) {
            return response()->json(['error' => 'Token expired'], 401);
        } catch (TokenInvalidException $e) {
            return response()->json(['error' => 'Token invalid'], 401);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Token missing'], 401);
        }
    }

    public function logout()
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
            return response()->json(['message' => 'User logged out successfully']);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Failed to logout, token invalid'], 500);
        }
    }

    public function refresh()
    {
        try {
            $newToken = JWTAuth::parseToken()->refresh();

            return response()->json([
                'access_token' => $newToken,
                'token_type' => 'bearer',
                'expires_in' => JWTAuth::factory()->getTTL() * 60,
            ]);
        } catch (JWTException $e) {
            return response()->json(['error' => 'Token refresh failed'], 401);
        }
    }
}
