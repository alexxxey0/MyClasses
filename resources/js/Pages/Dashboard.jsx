import AddSemesterTutorial from "./components/AddSemesterTutorial";
import ClassesCalendar from "./components/ClassesCalendar";
import ClassPopup from "./components/ClassPopup";
import { selectedSemesterIdContext } from "./components/Layout";
import { selectedClassContext } from "./components/Layout";
import { useContext, useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";

function Dashboard(props) {

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


    // Update the current semester's data when the user selects a different semester
    useEffect(() => {
        if (selectedSemesterId !== null && selectedSemesterId !== undefined) {
            setSelectedSemester(user_semesters.find((semester) => semester.id === selectedSemesterId));
            setSelectedSemesterPeriods(user_periods.filter((period) => period.semester_id === selectedSemesterId));
            setSelectedSemesterEvents(user_events.filter((event) => event.class.semester_id === selectedSemesterId));
        }
    }, [selectedSemesterId]);

    return (
        <div className="my-8">
            {!props.hasSemester &&
                <AddSemesterTutorial />
            }
            {props.hasSemester &&
                <div>
                    <div className="text-lg">
                        <p>{selectedSemester.educational_institution}</p>
                        <p>{selectedSemester.year}</p>
                        <p>{selectedSemester.type} semester ({selectedSemester.start} — {selectedSemester.end})</p>
                    </div>

                </div>
            }


        </div>
    );
}

export default Dashboard;