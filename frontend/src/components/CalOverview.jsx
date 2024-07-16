import { useState } from "react";
import { useCalContext } from "../utils/ContextProvider";
import deleteIcon from "../assets/deleteIcon.svg";
import createIcon from "../assets/plus.svg";
import editIcon from "../assets/editIcon.svg";
import checkIcon from "../assets/checkIcon.svg";
import { useNavigate } from "react-router-dom";

const CalOverview = () => {
  const {
    calendars = [],
    setCurrentCalendar,
    baseUrl,
    activeUser,
    setToggleUpdate,
    currentCalendar,
    setCalendars,
  } = useCalContext();

  const navigate = useNavigate();

  const [titleInput, setTitleInput] = useState("New Calendar");
  const [editThisTitle, setEditThisTitle] = useState(null);
  const [titleUpdate, setTitleUpdate] = useState("");

  // Update the displayed calendar according to user selection:
  const handleCalendarSelection = (e, calendar) => {
    setCurrentCalendar((prev) =>
      prev && prev._id === calendar._id ? null : calendar
    );
  };

  // Edit the title of a calendar:
  const handleTitleEdit = async (calendar) => {
    if (editThisTitle) {
      const res = await fetch(`${baseUrl}/calendars/${calendar._id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: titleUpdate,
        }),
      });
      const data = await res.json();
      setCurrentCalendar(data);
      setEditThisTitle(null);
      setTitleUpdate("");
      setToggleUpdate((prev) => !prev);
    } else
      setEditThisTitle((prev) =>
        prev && prev._id === calendar._id ? {} : calendar
      );
  };

  // Delete a calendar:
  const deleteCalendar = async (cal) => {
    const res = await fetch(`${baseUrl}/calendars/${cal._id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await res.json();

    if (currentCalendar && currentCalendar._id === cal._id) {
      setCurrentCalendar(null);
    }
    setCalendars(data.calendars);
    setToggleUpdate((prev) => !prev);
  };

  // Create a new calendar:
  const createCalendar = async () => {
    const res = await fetch(`${baseUrl}/calendars`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: titleInput || "New Calendar",
        events: [],
        user: activeUser.id,
      }),
    });
    const data = await res.json();
    setCurrentCalendar(data);
    setTitleInput("New Calendar");
    setToggleUpdate((prev) => !prev);
  };

  return (
    <div className="container">
      {activeUser && (
        <div className="calOverview">
          <div className="titleBox">
            <input
              className="newTitleInput"
              type="text"
              id="titleInput"
              value={titleInput || ""}
              onChange={(e) => setTitleInput(e.target.value)}
            />
            <button
              onClick={createCalendar}
              className="editButton editButtonSmall"
            >
              <img src={createIcon} alt="create icon" />
            </button>
          </div>
          {calendars &&
            calendars.length > 0 &&
            calendars.map((calendar, index) => (
              <div key={calendar._id || index}>
                <input
                  id={calendar._id}
                  type="checkbox"
                  checked={Boolean(
                    currentCalendar && currentCalendar._id === calendar._id
                  )}
                  onChange={(e) => {
                    handleCalendarSelection(e, calendar);
                  }}
                  style={{ cursor: "pointer" }}
                />

                {editThisTitle && editThisTitle._id === calendar._id ? (
                  <input
                    type="text"
                    value={titleUpdate || calendar.title}
                    onChange={(e) => setTitleUpdate(e.target.value)}
                  />
                ) : (
                  <label htmlFor={calendar._id} style={{ cursor: "pointer" }}>
                    {calendar.title}
                  </label>
                )}

                <button
                  className="editButton editButtonSmall"
                  onClick={() => handleTitleEdit(calendar)}
                >
                  <img
                    src={
                      editThisTitle && editThisTitle._id === calendar._id
                        ? checkIcon
                        : editIcon
                    }
                    alt="edit icon"
                  />
                </button>
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
      )}
      {!activeUser && (
        <div>
          <p>Please log in to see your calendars</p>
          <button className="standardButton" onClick={() => navigate("/login")}>
            Go to Login
          </button>
        </div>
      )}
    </div>
  );
};

export default CalOverview;
