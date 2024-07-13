import "react-big-calendar/lib/css/react-big-calendar.css";
import { useCalContext } from "../utils/ContextProvider";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { de } from "date-fns/locale";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { useEffect } from "react";

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
  const { baseUrl, events, setEvents, errorMessage, setErrorMessage } =
    useCalContext();

  const handleSelectSlot = ({ start, end }) => {
    const title = window.prompt("New Event Name");
    if (title) {
      const createEvent = async () => {
        const dataRaw = await fetch(
          `${baseUrl}/api/calendars/${calendar._id}/events`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              start,
              end,
              title,
            }),
            credentials: "include",
          }
        );
        const data = await dataRaw.json();

        if (!data) {
          setErrorMessage(data.error);
        }
        if (data) {
          setEvents((prev) => [...prev, data]);
        }
        return data;
      };
      createEvent();
    }
  };

  //   const handleSelectEvent = useCallback(
  //     (event) => window.alert(event.title),
  //     []
  //   );

  return (
    <div>
      {!errorMessage && (
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          // onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          selectable
          style={{ height: 500, width: "500px" }}
        />
      )}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default MyCalendar;
