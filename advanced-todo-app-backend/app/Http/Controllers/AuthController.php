<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;

class AuthController extends Controller
{
    //
    public function register(Request $request)
    {
        $request->validate([
            'name'=>'required|string|max:255',
            'email'=>'required|string|email|max:255|unique:users',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user=User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password' => Hash::make($request->password),
        ]);

        $token=$user->createToken('auth_token')->plainTextToken;
        return response()->json(['token'=>$token,'user'=>$user]);
    }
    public function login(Request $request)
    {
        $request->validate([
            'email'=>'required|string|email',
            'password' => 'required|string'
        ]);
        $credentials=$request->only('email','password');

       if(!Auth::attempt($credentials))
       {
        return response()->json(['message'=>'Invalid login details'],401);
       }
       
       $user=Auth::user();

       $token=$user->createToken('auth_token')->plainTextToken;
       return response()->json(['token'=>$token,'user'=>$user]);

    }
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Successfully logged out']);

    }
}
