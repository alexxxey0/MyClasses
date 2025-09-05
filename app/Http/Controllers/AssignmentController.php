<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redis;

class AssignmentController extends Controller {
    public function create_assignment(Request $request) {
        dd($request->all());
        // TODO: validate and add assignment to the database
    }
}
