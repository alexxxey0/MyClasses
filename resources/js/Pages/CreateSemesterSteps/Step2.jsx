import { useState, useEffect } from "react";
import SubmitButton from "../components/SubmitButton";
import { usePage } from "@inertiajs/react";
import { router } from '@inertiajs/react';


function Step2({ setStep }) {
    const [classes, setClasses] = useState([
        { name: "", teacher: "", room: "", mode: "time", schedule: [] }
    ]);
    const [periods, setPeriods] = useState([]);
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    const { csrf_token } = usePage().props;

    // Load saved classes and periods from sessionStorage
    useEffect(() => {
        const savedData = sessionStorage.getItem("semesterForm");
        if (savedData) {
            const parsed = JSON.parse(savedData);
            if (parsed.periods) {
                setPeriods(parsed.periods);
            }
            if (parsed.classes) {
                setClasses(parsed.classes);
            }
        }
    }, []);

    // Save whenever classes change
    useEffect(() => {
        // get current semesterForm from sessionStorage (if any)
        const storedForm = JSON.parse(sessionStorage.getItem("semesterForm")) || {};

        // update classes inside it
        const updatedForm = {
            ...storedForm,
            classes: classes
        };

        // save back to sessionStorage
        sessionStorage.setItem("semesterForm", JSON.stringify(updatedForm));
    }, [classes]);

    const updateClassField = (index, field, value) => {
        const updated = [...classes];
        updated[index][field] = value;

        // When switchind between time and period modes, delete the data about the other mode
        if (field === 'mode') {
            if (value === 'time') {
                updated[index]['schedule'].forEach((schedule_data) => {
                    delete schedule_data['period'];
                });
            } else {
                updated[index]['schedule'].forEach((schedule_data) => {
                    delete schedule_data['start'];
                    delete schedule_data['end'];
                });
            }
        }
        setClasses(updated);
    };

    const addClass = () => {
        setClasses([...classes, { name: "", teacher: "", room: "", mode: periods.length > 0 ? "period" : "time", schedule: [] }]);
    };

    const removeClass = (index) => {
        if (classes.length > 1) {
            const updated = [...classes];
            updated.splice(index, 1);
            setClasses(updated);
        }
    };

    const addScheduleEntry = (classIndex) => {
        const updated = [...classes];
        if (updated[classIndex].mode === "period") {
            updated[classIndex].schedule.push({ day: "Monday", period: 1 });
        } else {
            updated[classIndex].schedule.push({ day: "Monday", start: "", end: "" });
        }
        setClasses(updated);
    };

    const updateScheduleEntry = (classIndex, schedIndex, field, value) => {
        const updated = [...classes];
        updated[classIndex].schedule[schedIndex][field] = value;
        setClasses(updated);
    };

    const removeScheduleEntry = (classIndex, schedIndex) => {
        const updated = [...classes];
        if (updated[classIndex].schedule.length > 1) {
            updated[classIndex].schedule.splice(schedIndex, 1);
            setClasses(updated);
        }
    };

    function submit(e) {
        e.preventDefault();

        router.post('/create_semester', JSON.parse(sessionStorage.getItem('semesterForm')));
    };



    return (
        <div>
            <h1 className="text-center font-bold text-xl mb-4">Step 2: Add Classes</h1>

            <form onSubmit={submit} className="flex flex-col gap-y-6 w-8/12 mx-auto bg-white shadow-xl rounded-lg p-8">
                <p onClick={() => setStep(1)} className="hover:underline cursor-pointer font-bold text-lg">← Back to step 1</p>
                {classes.map((cls, idx) => (
                    <div key={idx} className="border p-4 rounded-md shadow-sm bg-gray-50">
                        <h2 className="font-semibold mb-2">Class {idx + 1}</h2>
                        {/* Class fields */}
                        <div className="flex flex-col gap-y-2">
                            <input
                                className="p-1 border rounded-md"
                                placeholder="Class Name *"
                                value={cls.name}
                                onChange={(e) => updateClassField(idx, "name", e.target.value)}
                                required
                            />
                            <input
                                className="p-1 border rounded-md"
                                placeholder="Teacher *"
                                value={cls.teacher}
                                onChange={(e) => updateClassField(idx, "teacher", e.target.value)}
                                required
                            />
                            <input
                                className="p-1 border rounded-md"
                                placeholder="Room *"
                                value={cls.room}
                                onChange={(e) => updateClassField(idx, "room", e.target.value)}
                                required
                            />
                        </div>

                        {/* Mode selection */}
                        <div className="flex gap-x-4 mt-2">
                            <div className="flex gap-x-2 items-center">
                                <label htmlFor={`mode-${idx}`} className={`cursor-pointer ${periods.length === 0 ? "opacity-50" : ""}`}>
                                    Period Mode
                                </label>
                                <input
                                    type="radio"
                                    name={`mode-${idx}`}
                                    value="period"
                                    checked={cls.mode === "period"}
                                    disabled={periods.length === 0}
                                    onChange={() => updateClassField(idx, "mode", "period")}
                                />
                            </div>
                            <div className="flex gap-x-2 items-center">
                                <label htmlFor={`mode-${idx}`} className="cursor-pointer">
                                    Time Mode
                                </label>
                                <input
                                    type="radio"
                                    name={`mode-${idx}`}
                                    value="time"
                                    checked={cls.mode === "time"}
                                    onChange={() => updateClassField(idx, "mode", "time")}
                                />
                            </div>
                        </div>

                        {/* Schedule input depending on mode */}
                        <div className="mt-4">
                            {cls.schedule.map((s, sIdx) => (
                                <div key={sIdx} className="flex gap-x-2 items-center mb-2">
                                    {/* Day dropdown */}
                                    <select
                                        className="p-1 border rounded-md cursor-pointer"
                                        value={s.day}
                                        onChange={(e) => updateScheduleEntry(idx, sIdx, "day", e.target.value)}
                                    >
                                        {daysOfWeek.map((day) => (
                                            <option key={day} value={day}>
                                                {day}
                                            </option>
                                        ))}
                                    </select>

                                    {cls.mode === "period" ? (
                                        <input
                                            type="number"
                                            className="p-1 border rounded-md w-20"
                                            min="1"
                                            max={periods.length || 1}
                                            placeholder="Period"
                                            value={s.period}
                                            onChange={(e) => updateScheduleEntry(idx, sIdx, "period", e.target.value)}
                                        />
                                    ) : (
                                        <>
                                            <input
                                                type="time"
                                                className="p-1 border rounded-md cursor-pointer"
                                                value={s.start}
                                                onChange={(e) => updateScheduleEntry(idx, sIdx, "start", e.target.value)}
                                            />
                                            <input
                                                type="time"
                                                className="p-1 border rounded-md cursor-pointer"
                                                value={s.end}
                                                onChange={(e) => updateScheduleEntry(idx, sIdx, "end", e.target.value)}
                                            />
                                        </>
                                    )}

                                    <button
                                        type="button"
                                        className="text-red-500 font-bold cursor-pointer"
                                        onClick={() => removeScheduleEntry(idx, sIdx)}
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}

                            <button
                                type="button"
                                className="text-blue-600 mt-2 cursor-pointer"
                                onClick={() => addScheduleEntry(idx)}
                            >
                                + Add schedule entry
                            </button>
                        </div>

                        {/* Remove class button */}
                        <div className="mt-2">
                            <button
                                type="button"
                                onClick={() => removeClass(idx)}
                                className="text-red-600 cursor-pointer"
                                disabled={classes.length === 1}
                            >
                                Remove Class
                            </button>
                        </div>
                    </div>
                ))}

                {/* Add class button */}
                <button
                    type="button"
                    onClick={addClass}
                    className="bg-violet-200 hover:bg-violet-300 rounded-lg px-3 py-1 cursor-pointer"
                >
                    + Add Another Class
                </button>

                <SubmitButton text="Finish" />
            </form>
        </div>
    );
}

export default Step2;
