import { useEffect } from "react";
import { useCalContext } from "../utils/ContextProvider";
import MyCalendar from "../components/MyCalendar";
import Modal from "../components/Modal";
import CalControls from "../components/CalControls";

const CalendarsPage = () => {
  const {
    setCalendars,
    activeUser,
    setActiveUser,
    baseUrl,
    showModal,
    displayCalendars,
    currentCalendar,
    events,
  } = useCalContext();

  // Fetch all of the active user's calendars:
  useEffect(() => {
    console.log("refetching calendars");
    const fetchCalendars = async () => {
      const rawData = await fetch(`${baseUrl}/calendars`, {
        credentials: "include",
      });
      const data = await rawData.json();
      setCalendars(data.calendars || []);
      setActiveUser(data.user || {});
    };
    fetchCalendars();
  }, [displayCalendars, currentCalendar, events]);

  return (
    <div>
      {/* Display modal (only when showModal is true) */}
      {showModal && <Modal />}

      {/* Block for controlling the user's calendars */}
      <CalControls />

      {/* Display the calendar (or an alternative message) */}
      {displayCalendars && displayCalendars.length > 0 ? (
        <div>
          <MyCalendar />
        </div>
      ) : activeUser?.username ? (
        <h4>No calendar selected</h4>
      ) : null}
    </div>
  );
};

export default CalendarsPage;
