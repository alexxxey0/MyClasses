<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\Model;

class User extends Authenticatable {
    use \Staudenmeir\EloquentHasManyDeep\HasRelationships;
    protected $guarded = [];

    public function getAuthPassword() {
        return $this->password_hash;
    }

    public function semesters() {
        return $this->hasMany(Semester::class);
    }

    public function assignments(): \Staudenmeir\EloquentHasManyDeep\HasManyDeep {
        return $this->hasManyDeepFromRelations($this->classes(), (new SchoolClass())->assignments());
    }

    public function classes() {
        return $this->hasManyThrough(
            SchoolClass::class,  // target model 
            Semester::class,    // intermediate model
            'user_id',          // Foreign key on Semester referencing User
            'semester_id',      // Foreign key on Class referencing Semester
            'id',               // Local key on User
            'id'                // Local key on Semester
        );
    }

    public function periods() {
        return $this->hasManyThrough(
            Period::class,  // target model 
            Semester::class,    // intermediate model
            'user_id',          // Foreign key on Semester referencing User
            'semester_id',      // Foreign key on Period referencing Semester
            'id',               // Local key on User
            'id'                // Local key on Semester
        );
    }
}
