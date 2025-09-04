<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SchoolClass extends Model {
    protected $table = 'classes';
    protected $guarded = [];

    public function schedules() {
        return $this->hasMany(ClassSchedule::class, 'class_id', 'id');
    }
}
