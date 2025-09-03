import AddSemesterTutorial from "./components/AddSemesterTutorial";
import ClassesCalendar from "./components/ClassesCalendar";
import { selectedSemesterIdContext } from "./components/Layout";
import { useContext, useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";

function Dashboard(props) {
    const { selectedSemesterId, setselectedSemesterId } = useContext(selectedSemesterIdContext);
    const { user_semesters } = usePage().props;
    const [selectedSemester, setSelectedSemester] = useState(user_semesters.find((semester) => semester.id === selectedSemesterId));

    useEffect(() => {
        setSelectedSemester(user_semesters.find((semester) => semester.id === selectedSemesterId));
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

                    <h1 className="mt-16 text-center text-3xl font-bold mb-4">This week's classes</h1>
                    <div className="w-10/12 mx-auto bg-white p-8 rounded-md shadow-md">
                        <ClassesCalendar />
                    </div>
                </div>
            }
        </div>
    );
}

export default Dashboard;