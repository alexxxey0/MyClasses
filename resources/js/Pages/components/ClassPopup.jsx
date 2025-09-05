import { format } from "date-fns";
import { X } from 'lucide-react';

export default function ClassPopup({ classInfo, setSelectedClass }) {
    return (
        <div className="bg-white p-4 rounded-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
            <div className="flex justify-between w-full mb-4">
                <p className="font-bold text-lg w-10/12">{classInfo.title}</p>
                <X className="scale-130 cursor-pointer text-red-500 hover:scale-140" onClick={() => setSelectedClass(null)} />
            </div>
            <div className="ml-4">
                <p>{format(classInfo.start, 'EEEE, MMMM d')}, {format(classInfo.start, 'HH:mm')} - {format(classInfo.end, 'HH:mm')}</p>
                <p>{classInfo.extendedProps.teacher}</p>
                <p>{classInfo.extendedProps.room}</p>
            </div>
        </div>
    );
}