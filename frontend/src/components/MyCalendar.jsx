import "react-big-calendar/lib/css/react-big-calendar.css";
import { useCalContext } from "../utils/ContextProvider";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { de } from "date-fns/locale";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { useEffect } from "react";

// Configuration for React Big Calendar:
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

const MyCalendar = () => {
  // Get states from context:
  const {
    errorMessage,
    setShowModal,
    eventInput,
    setEventInput,
    setModalType,
    displayCalendars,
    setCurrentCalendar,
    events,
    setEvents,
  } = useCalContext();

  // Convert the events dates to JavaScript Date objects and add color:
  useEffect(() => {
    const nestedEvents = displayCalendars.flatMap((calendar) =>
      calendar.events.map((event) => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
        color: calendar.color,
      }))
    );
    setEvents(nestedEvents);
  }, [displayCalendars]);

  // Get the color of the event:
  const getEventColor = (event) => {
    const style = {
      backgroundColor: event.color,
    };
    return {
      style: style,
    };
  };

  // Handle click on an event: Open modal & sanitize event data
  const handleClickOnEvent = (event) => {
    setModalType("update");
    const eventSanitized = {
      ...event,
      start: format(event.start, "yyyy-MM-dd"),
      end: format(event.end, "yyyy-MM-dd"),
    };
    setCurrentCalendar(
      displayCalendars.find((cal) => cal._id === event.calendar)
    );
    setEventInput(eventSanitized);
    setShowModal(true);
  };

  // Handle click on a date: Open modal & set start & end dates
  const handleClickOnDate = (event) => {
    setEventInput({
      ...eventInput,
      ["start"]: format(event.slots[0], "yyyy-MM-dd"),
      ["end"]: format(event.slots[0], "yyyy-MM-dd"),
    });
    setCurrentCalendar(displayCalendars[0] || null);
    setModalType("create");
    setShowModal(true);
  };

  return (
    <div className="calendarBox">
      {/* Integrate React Big Calendar Component: */}
      {!errorMessage && (
        <Calendar
          className="calendar"
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={(event) => {
            handleClickOnEvent(event);
          }}
          onSelectSlot={(event) => {
            handleClickOnDate(event);
          }}
          eventPropGetter={getEventColor}
          selectable
          views={["month"]}
          style={{
            height: 500,
            minWidth: "300px",
            width: "clamp(320px, 70vw, 600px)",
            border: "4px solid #05c79d",
            borderRadius: "10px",
            padding: "10px",
          }}
        />
      )}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default MyCalendar;
