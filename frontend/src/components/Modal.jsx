import { useCalContext } from "../utils/ContextProvider";
import deleteIcon from "../assets/deleteIcon.svg";
import { useEffect, useState } from "react";

const Modal = () => {
  // Get states from context:
  const {
    setShowModal,
    setErrorMessage,
    baseUrl,
    currentCalendar,
    setCurrentCalendar,
    eventInput,
    setEventInput,
    modalType,
    displayCalendars,
    setDisplayCalendars,
  } = useCalContext();

  // Set initial currentCalendar if it is not set or if displayCalendars changes
  useEffect(() => {
    if (!currentCalendar && displayCalendars.length > 0) {
      setCurrentCalendar(displayCalendars[0]);
    }
  }, [displayCalendars]);

  // Map through calendars and update events for the edited calendar:
  const updateCalendarEvents = (data) => {
    setDisplayCalendars((prev) => {
      return prev.map((cal) => {
        if (cal._id === data._id) {
          // Update events with new start and end dates
          const updatedEvents = data.events.map((event) => ({
            ...event,
            start: new Date(event.start),
            end: new Date(event.end),
          }));
          return { ...cal, events: updatedEvents };
        } else {
          return cal;
        }
      });
    });
  };

  // Control event input forms:
  const changeInput = (e) => {
    setEventInput({ ...eventInput, [e.target.name]: e.target.value });
  };

  const [calendarInput, setCalendarInput] = useState(
    currentCalendar?._id ? currentCalendar._id : ""
  );

  const changeCalendarInput = (e) => {
    setCalendarInput(e.target.value);
    setCurrentCalendar(
      displayCalendars.find((cal) => cal._id === e.target.value)
    );
  };

  // Reset everything when closing the modal:
  const resetModal = () => {
    setEventInput({
      title: "",
      start: "",
      startTime: "",
      end: "",
      endTime: "",
    });
    setCurrentCalendar(null);
    setShowModal(false);
  };

  // Send request with new/updated event data to the server:
  const sendEventData = (e) => {
    e.preventDefault();

    // Combine date and time fields:
    const start = new Date(
      `${eventInput.start}${
        eventInput.startTime ? `T${eventInput.startTime}` : ``
      }`
    );
    const end = new Date(
      `${eventInput.end}${eventInput.endTime ? `T${eventInput.endTime}` : ``}`
    );

    // Post/patch event data:
    const fetchEvent = async () => {
      const dataRaw = await fetch(
        `${baseUrl}/api/calendars/${currentCalendar._id}/events${
          modalType === "update" ? `/${eventInput._id}` : ``
        }`,
        {
          method: `${modalType === "create" ? "POST" : "PATCH"}`,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: eventInput.title,
            start,
            end,
            calendarId: currentCalendar._id,
          }),
          credentials: "include",
        }
      );
      const data = await dataRaw.json();

      // Handle response from server:
      if (!data) {
        setErrorMessage(data.error);
      }
      updateCalendarEvents(data);
      return data;
    };
    fetchEvent();
    resetModal();
  };

  // Send delete request to the server:
  const deleteEvent = async () => {
    const dataRaw = await fetch(
      `${baseUrl}/api/calendars/${currentCalendar._id}/events/${eventInput._id}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    );

    // Handle response from server:
    const data = await dataRaw.json();
    if (!data) {
      setErrorMessage(data.error);
    }
    updateCalendarEvents(data);
    resetModal();
  };

  return (
    <div className="modal">
      <form className="modalInner" onSubmit={(e) => sendEventData(e)}>
        {/* Delete button: (only visible in edit-mode) */}
        {eventInput._id && (
          <button className="editButton" onClick={deleteEvent}>
            <img src={deleteIcon} alt="Delete icon" />
          </button>
        )}
        <h3>{modalType === "create" ? "New event" : "Edit event"}</h3>

        {/* Calendar select field: (only visible in create-mode) */}
        {modalType === "create" && (
          <div className="inputFields">
            <label htmlFor="calendarSelect" className="labelBold">
              Calendar
            </label>
            <select
              name="calendar"
              id="calendarSelect"
              value={calendarInput || displayCalendars[0]._id || ""}
              onChange={changeCalendarInput}
            >
              {displayCalendars.map((calendar) => (
                <option key={calendar._id} value={calendar._id}>
                  {calendar.title}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Event input fields: */}
        <div className="inputFields">
          <label htmlFor="title" className="labelBold">
            Title{" "}
          </label>
          <input
            type="text"
            value={eventInput.title || ""}
            name="title"
            id="title"
            onChange={(e) => changeInput(e)}
            required
            placeholder="Meeting with..."
          />
        </div>
        <div className="inputFields">
          <label htmlFor="start" className="labelBold">
            Start{" "}
          </label>
          <input
            type="date"
            name="start"
            id="start"
            value={eventInput.start}
            onChange={(e) => changeInput(e)}
            required
          />
        </div>
        <div className="inputFields">
          <label
            htmlFor="startTime"
            className={eventInput.startTime ? "labelBold" : ""}
          >
            (Time)
          </label>
          <input
            type="text"
            pattern="(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]"
            placeholder="13:00"
            name="startTime"
            id="startTime"
            value={eventInput.startTime}
            onChange={(e) => changeInput(e)}
          />
        </div>
        <div className="inputFields">
          <label htmlFor="end" className="labelBold">
            End{" "}
          </label>
          <input
            type="date"
            name="end"
            id="end"
            value={eventInput.end}
            onChange={(e) => changeInput(e)}
            required
          />
        </div>
        <div className="inputFields">
          <label
            htmlFor="endTime"
            className={eventInput.endTime ? "labelBold" : ""}
          >
            (Time){" "}
          </label>
          <input
            type="text"
            pattern="(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]"
            placeholder="15:00"
            name="endTime"
            id="endTime"
            value={eventInput.endTime}
            onChange={(e) => changeInput(e)}
          />
        </div>

        {/* Create/Update and close buttons: */}
        <button
          type="submit"
          className="standardButton submitButton coloredButton"
        >
          {modalType === "create" ? "Create" : "Update"}
        </button>
        <button type="text" className="standardButton" onClick={resetModal}>
          Close
        </button>
      </form>
    </div>
  );
};

export default Modal;
