<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use PhpParser\Node\Expr\Assign;

class SchoolClass extends Model {
    protected $table = 'classes';
    protected $guarded = [];

    public function schedules() {
        return $this->hasMany(ClassSchedule::class, 'class_id', 'id');
    }

    public function assignments() {
        return $this->hasMany(Assignment::class, 'class_id', 'id');
    }
}
