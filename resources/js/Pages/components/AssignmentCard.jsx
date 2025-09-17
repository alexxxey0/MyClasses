import { Trash2 } from "lucide-react";

function AssignmentCard({ assignment, onDelete }) {
    function getTimeRemaining(targetDateStr) {
        const targetDate = new Date(targetDateStr);
        const now = new Date();

        const diffMs = targetDate - now;

        if (diffMs <= 0) {
            return "The date has already passed!";
        }

        const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
        const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

        return `${diffDays} days, ${diffHours} hours, ${diffMinutes} minutes remaining`;
    }

    return (
        <div className="relative bg-white shadow-md rounded-xl p-4 border-2 hover:shadow-lg transition">
            {/* Delete Button */}
            <button
                onClick={() => onDelete(assignment.id)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500 active:scale-95 transition cursor-pointer"
            >
                <Trash2 size={18} />
            </button>

            {/* Content */}
            <h2 className="text-lg font-semibold mb-1">
                {assignment.class.name}
            </h2>
            <p className="text-sm">{assignment.type}</p>
            <p className="text-sm">{assignment.name}</p>
            <p className="text-sm">{assignment.description}</p>
            <div className="text-xs mt-1">
                <p>{assignment.deadline}</p>
                <p>{getTimeRemaining(assignment.deadline)}</p>
            </div>

        </div>
    );
}

export default AssignmentCard;