<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClassSchedule extends Model {
    protected $guarded = [];
    protected $table = 'classes_schedules';

    public function class() {
        return $this->belongsTo(SchoolClass::class, 'class_id', 'id');
    }
}
