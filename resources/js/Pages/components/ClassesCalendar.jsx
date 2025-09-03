import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { startOfWeek, addDays, formatISO } from "date-fns";

function mapWeeklyEventsToDates(events) {
    const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 }); // Monday as first day
    const dayIndex = { Monday: 0, Tuesday: 1, Wednesday: 2, Thursday: 3, Friday: 4 };

    return events.map(ev => {
        const dayOffset = dayIndex[ev.day];
        const startDateTime = new Date(weekStart);
        startDateTime.setDate(weekStart.getDate() + dayOffset);
        const [startHour, startMinute] = ev.start.split(":").map(Number);
        startDateTime.setHours(startHour, startMinute);

        const endDateTime = new Date(weekStart);
        endDateTime.setDate(weekStart.getDate() + dayOffset);
        const [endHour, endMinute] = ev.end.split(":").map(Number);
        endDateTime.setHours(endHour, endMinute);

        return {
            title: ev.title,
            start: formatISO(startDateTime),
            end: formatISO(endDateTime),
        };
    });
}


const weeklyEvents = [
    { title: "Team Standup", day: "Monday", start: "09:00", end: "09:30" },
    { title: "Project Kickoff", day: "Monday", start: "10:00", end: "11:30" },
    { title: "Client Call", day: "Tuesday", start: "11:00", end: "12:00" },
    { title: "Design Review", day: "Tuesday", start: "14:00", end: "15:00" },
    { title: "Code Review", day: "Wednesday", start: "10:00", end: "11:00" },
    { title: "Team Lunch", day: "Wednesday", start: "12:30", end: "13:30" },
    { title: "Sprint Planning", day: "Thursday", start: "09:30", end: "11:00" },
    { title: "Product Demo", day: "Thursday", start: "15:00", end: "16:00" },
    { title: "Marketing Sync", day: "Friday", start: "10:00", end: "11:00" },
    { title: "Weekly Wrap-Up", day: "Friday", start: "16:00", end: "17:00" },
];
const events = mapWeeklyEventsToDates(weeklyEvents);

export default function ClassesCalendar() {
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
