<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Assignment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class AssignmentController extends Controller {
    public function create_assignment(Request $request) {
        $form_fields = $request->validate([
            'name' => ['required', 'max:100'],
            'description' => ['nullable', 'max:500'],
            'type' => ['required'],
            'deadline' => ['required', 'date']
        ]);
        $form_fields['class_id'] = $request->class_id;

        Assignment::create($form_fields);

        return to_route('assignments')->with('flash_message', 'Assignment created successfully!');
    }
}
