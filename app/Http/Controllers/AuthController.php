<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Hardcoded user for demonstration
        $credentials = [
            'email' => 'user@example.com',
            'password' => 'password'
        ];

        // Validate input
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($request->email === $credentials['email'] && $request->password === $credentials['password']) {
            // Return dummy token
            return response()->json(['token' => 'dummy-jwt-token'], 200);
        }

        return response()->json(['error' => 'Unauthorized'], 401);
    }
}
