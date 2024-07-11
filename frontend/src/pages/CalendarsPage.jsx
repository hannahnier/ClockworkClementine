import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useEffect } from "react";
import { useCalContext } from "../utils/ContextProvider";

const CalendarsPage = () => {
  const { calendars, setCalendars, activeUser, baseUrl } = useCalContext();

  useEffect(() => {
    const fetchCalendars = async () => {
      const rawData = await fetch(`${baseUrl}/calendars/${activeUser.id}`, {
        credentials: "include",
      });
      const data = await rawData.json();
      setCalendars(data);
    };

    if (activeUser) {
      fetchCalendars();
    }
  }, []);

  return (
    <div>
      <h2>My Calendars</h2>
      {/* <p> {activeUser?.id && `User: ${activeUser.email}`}</p> */}
      {calendars.length > 0 && calendars[0].title}
      {calendars.length > 0 && (
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={calendars[0].events}
        />
      )}
    </div>
  );
};

export default CalendarsPage;
