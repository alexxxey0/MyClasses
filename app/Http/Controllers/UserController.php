<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller {
    // Register a new user
    public function register(Request $request) {

        // Form validation
        $form_data = $request->validate([
            'name' => ['required', 'max:30'],
            'surname' => ['required', 'max:30'],
            'email' => ['required', 'email', 'max:50'],
            'phone_number' => ['nullable', 'max:20'],
            'profile_picture' => ['image', 'nullable', 'max:2048'],
            // Password must be at least 6 characters long, have at least one lowercase and one uppercase letter, and must have either a number or a symbol
            'password' => ['required', 'confirmed', 'regex:/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d\W]).+$/']
        ]);

        // Save the profile picture to the server
        if (isset($request['profile_picture']) and !empty($request['profile_picture'])) {
            $profile_picture = $request->file('profile_picture');
            $profile_picture_path = $profile_picture->store('profile_pictures', 'public');
        }

        // Save user to the database
        $user = User::create([
            'name' => $form_data['name'],
            'surname' => $form_data['surname'],
            'email' => $form_data['email'],
            'phone_number' => $form_data['phone_number'] ?? null,
            'password_hash' => bcrypt($form_data['password']),
            'profile_picture_path' => $profile_picture_path ?? null
        ]);

        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $request->session()->regenerate(); // prevents session fixation
            return to_route('dashboard');
        }
    }
}
