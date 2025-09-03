import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { startOfWeek, addDays, formatISO, isBefore, addWeeks } from "date-fns";

export default function ClassesCalendar({ weeklyEvents, selectedSemester }) {

    function getWeekStarts(fromDate, toDate) {
        const result = [];

        // align "fromDate" to the start of its week
        let current = startOfWeek(fromDate, { weekStartsOn: 1 }); // Monday

        while (isBefore(current, toDate) || current.getTime() === toDate.getTime()) {
            result.push(current);
            current = addWeeks(current, 1); // go to next week
        }

        return result;
    }

    const semesterStart = new Date(selectedSemester.start);
    const semesterEnd = new Date(selectedSemester.end);
    const weekStarts = getWeekStarts(semesterStart, semesterEnd);

    const events = [];
    // For each event (class), create a copy of it for every week from the beginning of the semester to the end of the semester
    weeklyEvents.forEach(ev => {
        weekStarts.forEach((weekStart) => {
            const dayOffset = ev.day - 1;
            const startDateTime = new Date(weekStart);
            startDateTime.setDate(weekStart.getDate() + dayOffset);
            const [startHour, startMinute] = ev.start_time.substring(0, 5).split(":").map(Number);
            startDateTime.setHours(startHour, startMinute);

            const endDateTime = new Date(weekStart);
            endDateTime.setDate(weekStart.getDate() + dayOffset);
            const [endHour, endMinute] = ev.end_time.substring(0, 5).split(":").map(Number);
            endDateTime.setHours(endHour, endMinute);

            events.push({
                title: ev.title,
                start: formatISO(startDateTime),
                end: formatISO(endDateTime),
            });
        });
    });

    return (
        <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="timeGridWeek"  // vertical time grid with side time scale
            firstDay={1}                // week starts on Monday
            hiddenDays={[0, 6]}         // hide Sunday (0) and Saturday (6)
            slotMinTime="08:00:00"      // start of day (8 AM)
            slotMaxTime="22:00:00"      // end of day (10 PM)
            slotDuration="00:30:00"
            allDaySlot={false}
            nowIndicator={true}
            events={events}
            eventClick={info => alert(`${info.event.title}\n${info.event.start} - ${info.event.end}`)}
            slotLabelFormat={{
                hour: '2-digit',
                minute: '2-digit',
                hour12: false   // force 24-hour format
            }}
            eventTimeFormat={{
                hour: '2-digit',
                minute: '2-digit',
                hour12: false   // force 24-hour format
            }}
            headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "timeGridWeek"
            }}
            dayHeaderFormat={{
                weekday: 'long',         // Monday, Tuesday...
                month: 'long',           // September, October...
                day: 'numeric',          // 1, 2, 3...
                dayPeriod: undefined
            }}
        />
    );
}
