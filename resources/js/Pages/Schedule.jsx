import ClassesCalendar from "./components/ClassesCalendar";
import ClassPopup from "./components/ClassPopup";
import { selectedSemesterIdContext } from "./components/Layout";
import { selectedClassContext } from "./components/Layout";
import { useContext, useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";

function Schedule() {
    const { selectedClass, setSelectedClass } = useContext(selectedClassContext);

    // Currently selected semester's ID (initialized in Layout.jsx)
    const { selectedSemesterId, setSelectedSemesterId } = useContext(selectedSemesterIdContext);


    const { user_semesters } = usePage().props;
    const initialSelectedSemesterId = user_semesters.length > 0 ? user_semesters[0].id : null;

    // Currently selected semester (object)
    const [selectedSemester, setSelectedSemester] = useState(user_semesters.find((semester) => semester.id === initialSelectedSemesterId));

    const { user_periods } = usePage().props;
    // Periods belonging to the currently selected semester
    const [selectedSemesterPeriods, setSelectedSemesterPeriods] = useState(user_periods.filter((period) => period.semester_id === initialSelectedSemesterId));

    const { user_events } = usePage().props;
    // Events (classes) belonging to the currently selected semester
    const [selectedSemesterEvents, setSelectedSemesterEvents] = useState(user_events.filter((event) => event.class.semester_id === initialSelectedSemesterId));

    // Process classes to a format that FullCalendar accepts - title, start_time, end_time
    const weeklyEvents = selectedSemesterEvents.map((event) => {
        return {
            title: event.class.name,
            day: event.day_of_week,
            // If event (class) has a start time defined, use it, otherwise use the start time of the corresponding period
            start_time: event.start_time !== null ? event.start_time : selectedSemesterPeriods.find((period) => period.period_number === event.period_number).start_time,
            // Same logic as the start time
            end_time: event.end_time !== null ? event.end_time : selectedSemesterPeriods.find((period) => period.period_number === event.period_number).end_time,
            extendedProps: {
                teacher: event.class.teacher,
                room: event.class.room
            }
        }
    });

    // Update the current semester's data when the user selects a different semester
    useEffect(() => {
        if (selectedSemesterId !== null && selectedSemesterId !== undefined) {
            setSelectedSemester(user_semesters.find((semester) => semester.id === selectedSemesterId));
            setSelectedSemesterPeriods(user_periods.filter((period) => period.semester_id === selectedSemesterId));
            setSelectedSemesterEvents(user_events.filter((event) => event.class.semester_id === selectedSemesterId));
        }
    }, [selectedSemesterId]);

    return (
        <div className="w-10/12 mx-auto bg-white p-8 rounded-md shadow-md my-8">
            <ClassesCalendar weeklyEvents={weeklyEvents} selectedSemester={selectedSemester} setSelectedClass={setSelectedClass} />
            {selectedClass !== null && <ClassPopup classInfo={selectedClass} setSelectedClass={setSelectedClass} />}
        </div>
    );
}

export default Schedule;