import { useEffect, useState } from "react";
import { useCalContext } from "../utils/ContextProvider";
import deleteIcon from "../assets/deleteIcon.svg";
import createIcon from "../assets/plus.svg";

const CalOverview = () => {
  const {
    calendars,
    setCurrentCalendar,
    displayCalendars,
    setDisplayCalendars,
    baseUrl,
    activeUser,
    setToggleUpdate,
  } = useCalContext();

  const [newCalendarTitle, setNewCalendarTitle] = useState("New Calendar");

  // Update list of displayed calendars according to user selection:
  const updateDisplayCalendars = (e, calendar) => {
    if (!e.target.checked) {
      setDisplayCalendars(
        displayCalendars.filter((item) => item._id !== calendar._id)
      );
    }
    if (
      e.target.checked &&
      !displayCalendars.some((item) => item.id === calendar.id)
    ) {
      setDisplayCalendars([...displayCalendars, calendar]);
    }
  };

  const deleteCalendar = async (cal) => {
    console.log("test");
    const res = await fetch(`${baseUrl}/calendars/${cal._id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();

    setDisplayCalendars(
      displayCalendars.filter((item) => item._id !== cal._id)
    );
    setToggleUpdate((prev) => !prev);
  };

  const createCalendar = async () => {
    const res = await fetch(`${baseUrl}/calendars`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: newCalendarTitle,
        events: [],
        user: activeUser.id,
      }),
    });
    const data = await res.json();
    console.log(data);
    setCurrentCalendar(data);
    setToggleUpdate((prev) => !prev);
  };

  return (
    <div className="calOverview">
      <p>Your calendars:</p>
      <input
        className="newTitleInput"
        type="text"
        id="newCalendarTitle"
        value={newCalendarTitle}
        onChange={(e) => setNewCalendarTitle(e.target.value)}
      />
      <button onClick={createCalendar} className="editButton editButtonSmall">
        <img src={createIcon} alt="create icon" />
      </button>
      {calendars &&
        calendars.length > 0 &&
        calendars.map((calendar, index) => (
          <div key={calendar._id || index}>
            <input
              id={calendar._id}
              type="checkbox"
              onChange={(e) => {
                updateDisplayCalendars(e, calendar);
              }}
              style={{ cursor: "pointer" }}
            />
            <label htmlFor={calendar._id} style={{ cursor: "pointer" }}>
              {calendar.title}
            </label>
            <button className="editButton editButtonSmall">
              <img
                src={deleteIcon}
                alt="delete icon"
                onClick={() => {
                  deleteCalendar(calendar);
                }}
              />{" "}
            </button>
          </div>
        ))}
    </div>
  );
};

export default CalOverview;
