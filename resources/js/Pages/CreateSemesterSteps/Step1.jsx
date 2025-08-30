import SubmitButton from "../components/SubmitButton";
import PeriodScheduleInput from "./PeriodScheduleInput";
import { useState, useEffect } from "react";

function Step1({ setStep }) {
    const [periodScheduleInputEnabled, setPeriodScheduleInputEnabled] = useState(false);
    const [data, setData] = useState({
        educational_institution: "",
        year: "",
        semester_type: "",
        start_date: "",
        end_date: "",
        periods: [] // store period schedule here
    });

    const [errors, setErrors] = useState({});

    // Load saved form from sessionStorage
    useEffect(() => {
        const saved = sessionStorage.getItem("semesterForm");
        if (saved) {
            setData(JSON.parse(saved));
            if (JSON.parse(saved).periods?.length > 0) {
                setPeriodScheduleInputEnabled(true);
            }
        }
    }, []);

    // Generic field update + save to sessionStorage
    const updateField = (field, value) => {
        const updatedData = { ...data, [field]: value };
        setData(updatedData);
        sessionStorage.setItem("semesterForm", JSON.stringify(updatedData));
    };

    // Update periods in data + save to sessionStorage
    const updatePeriods = (updatedPeriods) => {
        updateField("periods", updatedPeriods);
    };

    const handlePeriodScheduleInputChange = (e) => {
        setPeriodScheduleInputEnabled(e.target.checked);

        // If the schedule input has been disabled, clear the periods array
        if (!e.target.checked) {
            const updatedData = { ...data, periods: [] };
            setData(updatedData);
            sessionStorage.setItem("semesterForm", JSON.stringify(updatedData));
        }
    }

    // Handle form submit (go to next step)
    const submit = (e) => {
        e.preventDefault();

        // Simple validation example
        const newErrors = {};
        if (!data.educational_institution) newErrors.educational_institution = "Required";
        if (!data.year) newErrors.year = "Required";
        if (!data.semester_type) newErrors.semester_type = "Required";
        if (!data.start_date) newErrors.start_date = "Required";
        if (!data.end_date) newErrors.end_date = "Required";

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            // Everything is valid, proceed to next step
            // For example, navigate to Step 2 page
            // e.g., router.push('/step2') or show Step2 component
            console.log("Step 1 data saved to sessionStorage:", data);
            setStep(2);
        }
    };

    return (
        <div>
            <h1 className="text-center font-bold text-xl mb-4">Step 1: School & Semester Info</h1>
            <form onSubmit={submit} className="flex flex-col gap-y-4 w-3/12 mx-auto bg-white shadow-xl rounded-lg p-8">
                <p><span className="text-red-500">*</span> indicates a required field</p>

                {/* Educational Institution */}
                <div className="flex flex-col">
                    <label htmlFor="educational_institution">
                        Educational institution<span className="text-red-500">*</span>
                    </label>
                    <input
                        className="p-1 border-1 border-black rounded-md"
                        type="text"
                        name="educational_institution"
                        required
                        value={data.educational_institution}
                        onChange={(e) => updateField("educational_institution", e.target.value)}
                    />
                    {errors.educational_institution && <div className="text-red-500">{errors.educational_institution}</div>}
                </div>

                {/* Year / Grade */}
                <div className="flex flex-col">
                    <label htmlFor="year">
                        Year / Grade<span className="text-red-500">*</span>
                    </label>
                    <input
                        className="p-1 border-1 border-black rounded-md"
                        type="text"
                        name="year"
                        required
                        value={data.year}
                        onChange={(e) => updateField("year", e.target.value)}
                    />
                    {errors.year && <div className="text-red-500">{errors.year}</div>}
                </div>

                {/* Semester Type */}
                <div className="flex flex-col">
                    <label htmlFor="semester_type">
                        Semester Type<span className="text-red-500">*</span>
                    </label>
                    <select
                        className="p-1 border-1 border-black rounded-md"
                        name="semester_type"
                        required
                        value={data.semester_type}
                        onChange={(e) => updateField("semester_type", e.target.value)}
                    >
                        <option value="">Select type</option>
                        <option value="Fall">Fall</option>
                        <option value="Spring">Spring</option>
                        <option value="Summer">Summer</option>
                        <option value="Winter">Winter</option>
                    </select>
                    {errors.semester_type && <div className="text-red-500">{errors.semester_type}</div>}
                </div>

                {/* Start Date */}
                <div className="flex flex-col">
                    <label htmlFor="start_date">
                        Start Date<span className="text-red-500">*</span>
                    </label>
                    <input
                        className="p-1 border-1 border-black rounded-md"
                        type="date"
                        name="start_date"
                        required
                        value={data.start_date}
                        onChange={(e) => updateField("start_date", e.target.value)}
                    />
                    {errors.start_date && <div className="text-red-500">{errors.start_date}</div>}
                </div>

                {/* End Date */}
                <div className="flex flex-col">
                    <label htmlFor="end_date">
                        End Date<span className="text-red-500">*</span>
                    </label>
                    <input
                        className="p-1 border-1 border-black rounded-md"
                        type="date"
                        name="end_date"
                        required
                        value={data.end_date}
                        onChange={(e) => updateField("end_date", e.target.value)}
                    />
                    {errors.end_date && <div className="text-red-500">{errors.end_date}</div>}
                </div>

                {/* Period schedule toggle */}
                <div className="flex gap-x-2 items-center">
                    <input
                        type="checkbox"
                        name="enable_period_schedule"
                        checked={periodScheduleInputEnabled}
                        onChange={handlePeriodScheduleInputChange}
                    />
                    <label htmlFor="enable_period_schedule">Use a period schedule</label>
                </div>

                {/* Period schedule inputs */}
                {periodScheduleInputEnabled && (
                    <PeriodScheduleInput initialPeriods={5} onChange={updatePeriods} savedPeriods={data.periods} />
                )}

                <SubmitButton text="Continue" />
            </form>
        </div>
    );
}

export default Step1;