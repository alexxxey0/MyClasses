import React, { useState } from "react";

export default function PeriodScheduleInput({ initialPeriods = 5, onChange }) {
    const [periods, setPeriods] = useState(
        Array.from({ length: initialPeriods }, () => ({ start: "", end: "" }))
    );

    // Handle input change
    const handleChange = (index, field, value) => {
        const updated = [...periods];
        updated[index][field] = value;
        setPeriods(updated);
        onChange && onChange(updated);
    };

    // Add a new period
    const handleAdd = () => {
        setPeriods([...periods, { start: "", end: "" }]);
    };

    // Remove a period (if more than one)
    const handleRemove = (index) => {
        if (periods.length > 1) {
            const updated = periods.filter((_, i) => i !== index);
            setPeriods(updated);
            onChange && onChange(updated);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <label className="font-semibold">Period schedule</label>
            {periods.map((period, index) => (
                <div key={index} className="flex items-center gap-2">
                    <span className="w-6 text-center font-medium">{index + 1}</span>
                    <input
                        type="time"
                        className="p-1 border rounded-md w-28"
                        placeholder="Start"
                        value={period.start}
                        onChange={(e) => handleChange(index, "start", e.target.value)}
                    />
                    <span>to</span>
                    <input
                        type="time"
                        className="p-1 border rounded-md w-28"
                        placeholder="End"
                        value={period.end}
                        onChange={(e) => handleChange(index, "end", e.target.value)}
                    />
                    <button
                        type="button"
                        className="ml-2 px-2 py-1 bg-red-200 text-red-800 rounded hover:bg-red-300 cursor-pointer"
                        onClick={() => handleRemove(index)}
                        disabled={periods.length === 1}
                    >
                        ❌
                    </button>
                </div>
            ))}

            <button
                type="button"
                className="mt-2 px-4 py-2 bg-violet-200 text-violet-800 rounded hover:bg-violet-300 cursor-pointer"
                onClick={handleAdd}
            >
                ➕ Add Period
            </button>
        </div>
    );
}
