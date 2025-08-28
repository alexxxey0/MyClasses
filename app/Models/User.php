<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;

class User extends Authenticatable {
    protected $guarded = [];

    public function getAuthPassword() {
        return $this->password_hash;
    }

    public function semesters() {
        return $this->hasMany(Semester::class);
    }
}
