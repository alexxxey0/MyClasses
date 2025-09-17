import AddAssignmentButton from "./components/AddAssignmentButton";
import { usePage } from "@inertiajs/react";
import AssignmentCard from "./components/AssignmentCard";

export default function Assignments() {

    const { user_assignments } = usePage().props;

    function deleteAssignment(idToDelete) {
        router.post('/delete_assignment', { id: idToDelete });
    }

    console.log(user_assignments);

    return (
        <div className="w-3/12 mx-auto">
            <AddAssignmentButton />
            <div className="mt-8 mb-8 flex flex-col gap-y-8">
                {user_assignments.map((assignment) => (
                    <div key={assignment.id}>
                        <AssignmentCard assignment={assignment} onDelete={() => deleteAssignment(assignment.id)} />
                    </div>
                ))}
            </div>
        </div>
    );
}