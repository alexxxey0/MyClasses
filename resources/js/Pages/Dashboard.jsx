import AddSemesterTutorial from "./components/AddSemesterTutorial";
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
                    <p>{selectedSemester.educational_institution}</p>
                    <p>{selectedSemester.year}</p>
                    <p>{selectedSemester.type} semester ({selectedSemester.start} — {selectedSemester.end})</p>
                </div>
            }
        </div>
    );
}

export default Dashboard;