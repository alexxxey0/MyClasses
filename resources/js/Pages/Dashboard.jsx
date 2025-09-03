import AddSemesterTutorial from "./components/AddSemesterTutorial";
import ClassesCalendar from "./components/ClassesCalendar";
import { selectedSemesterIdContext } from "./components/Layout";
import { useContext, useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";

function Dashboard(props) {
    const { selectedSemesterId, setselectedSemesterId } = useContext(selectedSemesterIdContext);

    const { user_semesters } = usePage().props;
    const [selectedSemester, setSelectedSemester] = useState(user_semesters.find((semester) => semester.id === selectedSemesterId));

    const { user_periods } = usePage().props;
    const [selectedSemesterPeriods, setSelectedSemesterPeriods] = useState(user_periods.filter((period) => period.semester_id === selectedSemesterId));

    const { user_events } = usePage().props;
    const [selectedSemesterEvents, setSelectedSemesterEvents] = useState(user_events.filter((event) => event.class.semester_id === selectedSemesterId));

    //console.log(user_events);


    // Update current semester's data when user changes the semester
    useEffect(() => {
        setSelectedSemester(user_semesters.find((semester) => semester.id === selectedSemesterId));
        setSelectedSemesterPeriods(user_periods.filter((period) => period.semester_id === selectedSemesterId));
        setSelectedSemesterEvents(user_events.filter((event) => event.class.semester_id === selectedSemesterId));
    }, [selectedSemesterId]);
    

    // Process classes to a format that FullCalendar accepts
    const weeklyEvents = selectedSemesterEvents.map((event) => {
        return {
            title: event.class.name,
            day: event.day_of_week,
            start_time: event.start_time !== null ? event.start_time : selectedSemesterPeriods.find((period) => period.period_number === event.period_number).start_time,
            end_time: event.end_time !== null ? event.end_time : selectedSemesterPeriods.find((period) => period.period_number === event.period_number).end_time
        }
    });



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

                    <h1 className="mt-16 text-center text-3xl font-bold mb-4">My schedule</h1>
                    <div className="w-10/12 mx-auto bg-white p-8 rounded-md shadow-md">
                        <ClassesCalendar weeklyEvents={weeklyEvents} selectedSemester={selectedSemester}/>
                    </div>
                </div>
            }
        </div>
    );
}

export default Dashboard;