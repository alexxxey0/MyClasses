function AddSemesterTutorial() {
    return (
        <div className="max-w-3xl mx-auto rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">
                Welcome! Let’s set up your first semester
            </h2>

            <ol className="space-y-6 list-decimal list-inside">

                <li>
                    <h3 className="font-semibold text-lg ">Go to the Semesters Page</h3>
                    <p className="">
                        Click the <strong>Add a new semester</strong> button on the semesters page to start creating your first semester.
                    </p>
                </li>

                <li>
                    <h3 className="font-semibold text-lg">Enter School & Semester Info</h3>
                    <p className="">
                        Fill in your <strong>school or university</strong>, <strong>semester name/term</strong>,
                        <strong>level</strong>, and <strong>start/end dates</strong>.
                        Optionally, you can set up a <strong>period schedule</strong> if your school has fixed className periods.
                    </p>
                </li>

                <li>
                    <h3 className="font-semibold text-lg">Add Your classNamees</h3>
                    <p className="">
                        For each className, enter the <strong>name, location, and professor email</strong> (optional).
                        Choose the <strong>schedule mode</strong>:
                    </p>
                    <ul className="list-disc list-inside pl-4 mt-2">
                        <li><strong>Period Mode:</strong> For regular classNamees that follow your school’s predefined periods.</li>
                        <li><strong>Time Mode:</strong> For extra classNamees or ones at irregular times.</li>
                    </ul>
                </li>

                <li>
                    <h3 className="font-semibold text-lg text-gray-900">Set className Schedules</h3>
                    <p className="">
                        Define when your classNamees take place:
                    </p>
                    <ul className="list-disc list-inside pl-4 mt-2 ">
                        <li><strong>Period Mode:</strong> Select the <strong>days of the week</strong> and assign the <strong>period numbers</strong>.</li>
                        <li><strong>Time Mode:</strong> Enter the <strong>days</strong> and <strong>exact start/end times</strong>.</li>
                        <li>You can also set <strong>double-period classNamees</strong> by choosing consecutive periods.</li>
                    </ul>
                </li>

                <li>
                    <h3 className="font-semibold text-lg ">Review & Submit</h3>
                    <p className="">
                        Double-check your classNamees and schedules.
                        Once submitted, your semester, classNamees, and schedules will be saved to the database.
                    </p>
                </li>
            </ol>

            <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-md">
                <p className="text-sm text-blue-700">
                    💡 <strong>Tip:</strong> You can always add or edit semesters, classNamees, or schedules later.
                    Complete all steps for a fully functional semester in your dashboard.
                </p>
            </div>
        </div>
    );
}

export default AddSemesterTutorial;