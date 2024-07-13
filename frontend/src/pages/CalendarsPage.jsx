import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import { useEffect, useState } from "react";
import { useCalContext } from "../utils/ContextProvider";

const CalendarsPage = () => {
  const {
    calendars,
    setCalendars,
    activeUser,
    baseUrl,
    events,
    setEvents,
    showPopup,
    setShowPopup,
    newEvent,
    setNewEvent,
  } = useCalContext();

  const handleDateClick = () => {
    setShowPopup(true);
  };

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
      <h2> {`Hi, ${activeUser.username}!`}</h2>
      <h3>My Calendars</h3>

      {showPopup && (
        <div>
          <p>New event</p>
          <p>Title: </p>
        </div>
      )}
      {/* setEvents([...events, { title, start: arg.date, allDay: true }]); */}

      {calendars.length > 0 && calendars[0].title}
      {calendars.length > 0 && (
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={calendars[0].events}
          dateClick={handleDateClick}
        />
      )}
    </div>
  );
};

export default CalendarsPage;
