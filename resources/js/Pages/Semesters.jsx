import AddSemesterButton from "./components/AddSemesterButton";
import SemesterCard from "./components/SemesterCard";
import { usePage } from "@inertiajs/react";
import { router } from '@inertiajs/react';
import { useContext } from "react";
import { selectedSemesterIdContext } from "./components/Layout";

function Semesters() {
    const { user_semesters } = usePage().props;
    const { selectedSemesterId, setSelectedSemesterId } = useContext(selectedSemesterIdContext);

    function deleteSemester(idToDelete) {
        const semestersWithoutDeleted = user_semesters.filter((semester) => semester.id !== idToDelete);
        setSelectedSemesterId(semestersWithoutDeleted[0].id);
        router.post('/delete_semester', { id: idToDelete });
    }

    return (
        <div className="w-3/12 mx-auto">
            <AddSemesterButton />
            <div className="mt-8 flex flex-col gap-y-8">
                {user_semesters.map((semester) => (
                    <div key={semester.id}>
                        <SemesterCard semester={semester} onDelete={() => deleteSemester(semester.id)} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Semesters;