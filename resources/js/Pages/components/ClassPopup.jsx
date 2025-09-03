import { format } from "date-fns";
import { X } from 'lucide-react';

export default function ClassPopup({classInfo, setSelectedClass}) {
    console.log(classInfo);
    return (
        <div className="bg-white p-2 rounded-md fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
            <X className="ml-auto mb-4 cursor-pointer" onClick={() => setSelectedClass(null)}/>
            <p className="font-bold">{classInfo.title}</p>
            <div className="ml-4">
                <p>{format(classInfo.start, 'EEEE, MMMM d')}, {format(classInfo.start, 'HH:mm')} - {format(classInfo.end, 'HH:mm')}</p>
                <p>{classInfo.extendedProps.teacher}</p>
                <p>{classInfo.extendedProps.room}</p>
            </div>
        </div>
    );
}