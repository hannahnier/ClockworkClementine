// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import interactionPlugin from "@fullcalendar/interaction";

import { useEffect } from "react";
import { useCalContext } from "../utils/ContextProvider";
import MyCalendar from "../components/MyCalendar";
import Modal from "../components/Modal";
import CalOverview from "../components/CalOverview";

const CalendarsPage = () => {
  const {
    setCalendars,
    activeUser,
    setActiveUser,
    baseUrl,
    toggleUpdate,
    showModal,
    currentCalendar,
  } = useCalContext();

  useEffect(() => {
    const fetchCalendars = async () => {
      const rawData = await fetch(`${baseUrl}/calendars`, {
        credentials: "include",
      });
      const data = await rawData.json();
      setCalendars(data.calendars || []);
      setActiveUser(data.user || {});
    };

    fetchCalendars();
  }, [toggleUpdate]);

  return (
    <div>
      {showModal && <Modal />}

      <CalOverview />

      {currentCalendar && currentCalendar.events ? (
        <div>
          <MyCalendar calendar={currentCalendar} />
        </div>
      ) : (
        <h4>No calendar selected</h4>
      )}
    </div>
  );
};

export default CalendarsPage;
