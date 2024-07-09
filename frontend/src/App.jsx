import "./App.css";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { useEffect, useState } from "react";

function App() {
  const [calendars, setCalendars] = useState([]);

  useEffect(() => {
    const fetchCalendars = async () => {
      const rawData = await fetch("http://localhost:3000/calendars");
      const data = await rawData.json();
      setCalendars(data);
    };
    fetchCalendars();
  }, []);

  return (
    <>
      <h1>My Calendar</h1>
      {calendars.length > 0 && calendars[0].title}
      {calendars.length > 0 && (
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          events={calendars[0].events}
        />
      )}
    </>
  );
}

export default App;
