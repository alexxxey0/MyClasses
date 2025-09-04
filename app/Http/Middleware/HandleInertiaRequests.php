<?php

namespace App\Http\Middleware;

use Inertia\Middleware;
use App\Models\Semester;
use Illuminate\Http\Request;
use App\Models\ClassSchedule;

class HandleInertiaRequests extends Middleware {
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array {
        // From Inertia documentation (https://inertiajs.com/shared-data)

        $user_classes_ids = $request->user() ? $request->user()->classes()->pluck('classes.id')->toArray() : [];

        return array_merge(parent::share($request), [
            'user' => $request->user() ? $request->user() : null,
            'csrf_token' => csrf_token(),
            'user_semesters' => fn() => $request->user() ? $request->user()->semesters : [],
            'user_events' => fn() => $request->user() ? ClassSchedule::whereIn('class_id', $user_classes_ids)->with('class')->get() : [],
            'user_periods' => fn() => $request->user() ? $request->user()->periods : []
        ]);
    }
}
