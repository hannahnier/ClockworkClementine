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
    toggleUpdate,
    showModal,
    currentCalendar,
    setCurrentCalendar,
  } = useCalContext();

  useEffect(() => {
    const fetchCalendars = async () => {
      const rawData = await fetch(`${baseUrl}/calendars`, {
        credentials: "include",
      });
      const data = await rawData.json();
      setCalendars(data.calendars || []);
      setActiveUser(data.user || {});
      if (!currentCalendar) {
        setCurrentCalendar(data.calendars[0] || null);
      }
    };

    if (activeUser?.username) {
      fetchCalendars();
    }
  }, [toggleUpdate]);

  return (
    <div>
      {showModal && <Modal />}

      <CalControls />

      {currentCalendar && currentCalendar.events ? (
        <div>
          <MyCalendar calendar={currentCalendar} />
        </div>
      ) : activeUser?.username ? (
        <h4>No calendar selected</h4>
      ) : null}
    </div>
  );
};

export default CalendarsPage;
