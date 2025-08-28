function Dashboard(props) {
    return (
        <div className="my-8">
            {!props.hasSemester &&
                <div class="max-w-3xl mx-auto rounded-2xl p-8">
                    <h2 class="text-2xl font-bold mb-6">
                        Welcome! Let’s set up your first semester
                    </h2>

                    <ol class="space-y-6 list-decimal list-inside ">

                        <li>
                            <h3 class="font-semibold text-lg">Enter School & Semester Info</h3>
                            <p class="">
                                Fill in your <strong>school or university</strong>, <strong>semester name/term</strong>,
                                <strong>level</strong>, and <strong>start/end dates</strong>.
                                Optionally, you can set up a <strong>period schedule</strong> if your school has fixed class periods.
                            </p>
                        </li>

                        <li>
                            <h3 class="font-semibold text-lg">Add Your Classes</h3>
                            <p class="">
                                For each class, enter the <strong>name, location, and professor email</strong> (optional).
                                Choose the <strong>schedule mode</strong>:
                            </p>
                            <ul class="list-disc list-inside pl-4 mt-2">
                                <li><strong>Period Mode:</strong> For regular classes that follow your school’s predefined periods.</li>
                                <li><strong>Time Mode:</strong> For extra classes or ones at irregular times.</li>
                            </ul>
                        </li>

                        <li>
                            <h3 class="font-semibold text-lg text-gray-900">Set Class Schedules</h3>
                            <p class="">
                                Define when your classes take place:
                            </p>
                            <ul class="list-disc list-inside pl-4 mt-2 ">
                                <li><strong>Period Mode:</strong> Select the <strong>days of the week</strong> and assign the <strong>period numbers</strong>.</li>
                                <li><strong>Time Mode:</strong> Enter the <strong>days</strong> and <strong>exact start/end times</strong>.</li>
                                <li>You can also set <strong>double-period classes</strong> by choosing consecutive periods.</li>
                            </ul>
                        </li>

                        <li>
                            <h3 class="font-semibold text-lg ">Review & Submit</h3>
                            <p class="">
                                Double-check your classes and schedules.
                                Once submitted, your semester, classes, and schedules will be saved to the database.
                            </p>
                        </li>
                    </ol>

                    <div class="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-md">
                        <p class="text-sm text-blue-700">
                            💡 <strong>Tip:</strong> You can always add or edit semesters, classes, or schedules later.
                            Complete all steps for a fully functional semester in your dashboard.
                        </p>
                    </div>
                </div>
            }
        </div>
    );
}

export default Dashboard;