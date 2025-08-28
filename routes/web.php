<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::post('/register', [UserController::class, 'register'])->name('register');

Route::post('/login', [UserController::class, 'login'])->name('login');

// Routes for authenticated users
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/schedule', function () {
        return Inertia::render('Schedule');
    })->name('schedule');

    Route::get('/logout', [UserController::class, 'logout'])->name('logout');
});
