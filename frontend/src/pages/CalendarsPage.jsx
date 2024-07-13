// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";

import { useEffect, useState } from "react";
import { useCalContext } from "../utils/ContextProvider";
import MyCalendar from "../components/Calendar";

const CalendarsPage = () => {
  const {
    calendars,
    setCalendars,
    activeUser,
    setActiveUser,
    baseUrl,
    events,
    setEvents,
  } = useCalContext();

  // const handleDateClick = () => {
  //   setShowPopup(true);
  // };

  useEffect(() => {
    const fetchCalendars = async () => {
      const rawData = await fetch(`${baseUrl}/calendars`, {
        credentials: "include",
      });
      const data = await rawData.json();
      setCalendars(data.calendars);
      setActiveUser(data.user);
    };

    fetchCalendars();
  }, []);

  return (
    <div>
      {activeUser?.username && <h2> {`Hi, ${activeUser.username}!`}</h2>}
      <h3>My Calendars</h3>

      {calendars && calendars.length > 0 && calendars[0].title}
      {/* calendars[0] später durch map ersetzen */}
      {calendars &&
        calendars.length > 0 &&
        calendars.map((calendar, index) => (
          <MyCalendar key={calendar._id || index} calendar={calendar} />
        ))}
    </div>
  );
};

export default CalendarsPage;
