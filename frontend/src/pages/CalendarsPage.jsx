// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";

import { useEffect } from "react";
import { useCalContext } from "../utils/ContextProvider";
import MyCalendar from "../components/Calendar";
import Modal from "../components/Modal";

const CalendarsPage = () => {
  const {
    calendars,
    setCalendars,
    activeUser,
    setActiveUser,
    baseUrl,
    toggleUpdate,
    showModal,
    setCurrentCalendar,
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
      setCurrentCalendar(data.calendars[0]);
    };

    fetchCalendars();
  }, [toggleUpdate]);

  return (
    <div>
      {activeUser?.username && <h2> {`Hi, ${activeUser.username}!`}</h2>}
      {showModal && <Modal />}
      {calendars &&
        calendars.length > 0 &&
        calendars.map((calendar, index) => (
          <div key={calendar._id || index}>
            <h3>
              Calendar {index + 1}: {calendar.title}
            </h3>
            <MyCalendar key={calendar._id} calendar={calendar} />
          </div>
        ))}
    </div>
  );
};

export default CalendarsPage;
