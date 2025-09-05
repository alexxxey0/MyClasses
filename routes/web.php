<?php

use App\Models\User;
use Inertia\Inertia;
use GuzzleHttp\Psr7\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\SemesterController;
use App\Http\Controllers\AssignmentController;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::post('/register', [UserController::class, 'register'])->name('register');

Route::post('/login', [UserController::class, 'login'])->name('login');

// Routes for authenticated users
Route::middleware(['auth'])->group(function () {

    Route::get('/dashboard', function () {
        $user = User::where('id', Auth::user()->id)->first();
        return Inertia::render('Dashboard', [
            'hasSemester' => $user->semesters()->exists()
        ]);
    })->name('dashboard');

    Route::get('/schedule', function () {
        return Inertia::render('Schedule');
    })->name('schedule');

    Route::get('/semesters', function () {
        return Inertia::render('Semesters');
    })->name('semesters');

    Route::get('/classes', function () {
        return Inertia::render('Classes');
    })->name('classes');

    Route::get('/friends', function () {
        return Inertia::render('Friends');
    })->name('friends');

    Route::get('/assignments', function () {
        return Inertia::render('Assignments');
    })->name('assignments');

    Route::get('/grades', function () {
        return Inertia::render('Grades');
    })->name('grades');

    Route::get('/settings', function () {
        return Inertia::render('Settings');
    })->name('settings');

    Route::get('/semesters/create', function () {
        return Inertia::render('CreateSemester');
    });

    Route::post('/create_semester', [SemesterController::class, 'create_semester']);

    Route::post('/delete_semester', [SemesterController::class, 'delete_semester']);

    Route::get('/assignments/create', function () {
        return Inertia::render('CreateAssignment');
    });

    Route::post('/create_assignment', [AssignmentController::class, 'create_assignment']);

    Route::get('/logout', [UserController::class, 'logout'])->name('logout');
});
