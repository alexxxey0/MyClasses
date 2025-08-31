<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Period;
use App\Models\Semester;
use App\Models\SchoolClass;
use Illuminate\Http\Request;
use App\Models\ClassSchedule;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class SemesterController extends Controller {
    public function create_semester(Request $request) {
        $user = Auth::user();
        $days_of_week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

        // Add the data to 4 tables - semesters, classes, classes_schedules, periods
        //dd($request->all());
        // semesters table
        $semester = Semester::create([
            'user_id' => $user->id,
            'educational_institution' => $request->educational_institution,
            'year' => $request->year,
            'start' => $request->start_date,
            'end' => $request->end_date,
            'type' => $request->semester_type
        ]);

        // periods table
        $periods_data = $request->periods;
        for ($i = 0; $i < count($periods_data); $i++) {
            Period::create([
                'semester_id' => $semester->id,
                'period_number' => $i + 1,
                'start_time' => $periods_data[$i]['start'],
                'end_time' => $periods_data[$i]['end']
            ]);
        }

        // classes table
        $classes_data = $request->classes;
        foreach ($classes_data as $class_data) {
            $class = SchoolClass::create([
                'semester_id' => $semester->id,
                'name' => $class_data['name'],
                'teacher' => $class_data['teacher'],
                'room' => $class_data['room'],
            ]);

            // classes_schedules table
            $schedules_data = $class_data['schedule'];
            foreach ($schedules_data as $schedule_data) {
                if (isset($schedule_data['period'])) {
                    ClassSchedule::create([
                        'class_id' => $class->id,
                        'day_of_week' => array_search($schedule_data['day'], $days_of_week) + 1,
                        'period_number' => $schedule_data['period']
                    ]);
                } else {
                    ClassSchedule::create([
                        'class_id' => $class->id,
                        'day_of_week' => array_search($schedule_data['day'], $days_of_week) + 1,
                        'start_time' => $schedule_data['start'],
                        'end_time' => $schedule_data['end']
                    ]);
                }
            }
        }


        return Inertia::render('dashboard');
    }
}
