import "react-big-calendar/lib/css/react-big-calendar.css";
import { useCalContext } from "../utils/ContextProvider";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { de } from "date-fns/locale";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { useEffect, useState } from "react";

const locales = {
  de: de,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { locale: de }),
  getDay,
  locales,
});

const MyCalendar = ({ calendar }) => {
  const {
    errorMessage,
    setShowModal,
    currentEvent,
    setCurrentEvent,
    setModalType,
  } = useCalContext();

  const [events, setEvents] = useState([]);

  useEffect(() => {
    setEvents(
      calendar.events.map((event) => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      }))
    );
  }, [calendar.events]);

  //   const handleSelectEvent = useCallback(
  //     (event) => window.alert(event.title),
  //     []
  //   );

  return (
    <div>
      {!errorMessage && (
        <Calendar
          className="calendar"
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={(event) => {
            setModalType("update");
            const eventSanitized = {
              ...event,
              start: format(event.start, "yyyy-MM-dd"),
              end: format(event.end, "yyyy-MM-dd"),
            };
            setCurrentEvent(eventSanitized);
            setShowModal(true);
          }}
          onSelectSlot={(event) => {
            setCurrentEvent({
              ...currentEvent,
              ["start"]: format(event.slots[0], "yyyy-MM-dd"),
              ["end"]: format(event.slots[0], "yyyy-MM-dd"),
            });
            setModalType("create");
            setShowModal(true);
          }}
          selectable
          views={["month"]}
          style={{ height: 500, width: "500px" }}
        />
      )}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default MyCalendar;
