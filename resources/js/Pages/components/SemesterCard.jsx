import { Trash2 } from "lucide-react";

function SemesterCard({ semester, onDelete }) {
    return (
        <div className="relative bg-white shadow-md rounded-xl p-4 border-2 hover:shadow-lg transition">
            {/* Delete Button */}
            <button
                onClick={() => onDelete(semester.id)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-500 active:scale-95 transition cursor-pointer"
            >
                <Trash2 size={18} />
            </button>

            {/* Content */}
            <h2 className="text-lg font-semibold mb-1">
                {semester.educational_institution}
            </h2>
            <p className="text-sm">{semester.year}</p>
            <p className="text-sm">{semester.type}</p>
            <p className="text-xs">
                {semester.start} – {semester.end}
            </p>
        </div>
    );
}

export default SemesterCard;
