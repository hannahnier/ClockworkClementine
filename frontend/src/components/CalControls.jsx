import { useState } from "react";
import { useCalContext } from "../utils/ContextProvider";
import deleteIcon from "../assets/deleteIcon.svg";
import createIcon from "../assets/plus.svg";
import editIcon from "../assets/editIcon.svg";
import checkIcon from "../assets/checkIcon.svg";
import { useNavigate } from "react-router-dom";
import Confirmation from "./Confirmation";

const CalControls = () => {
  const {
    calendars = [],
    setCurrentCalendar,
    baseUrl,
    activeUser,
    setToggleUpdate,
    currentCalendar,
    setCalendars,
    showConfirmation,
    setShowConfirmation,
  } = useCalContext();

  const navigate = useNavigate();

  const [titleInput, setTitleInput] = useState("");
  const [editThisTitle, setEditThisTitle] = useState(null);
  const [titleUpdate, setTitleUpdate] = useState("");

  // Update the displayed calendar according to user's selection:
  const handleCalendarSelection = (e, calendar) => {
    // If the calendar is already selected, unselect it:
    setCurrentCalendar((prev) =>
      prev && prev._id === calendar._id ? null : calendar
    );
  };

  // Edit the title of a calendar:
  const handleTitleEdit = async (calendar) => {
    //  When editing ends: Update the calendar title:
    if (editThisTitle) {
      const res = await fetch(`${baseUrl}/calendars/${calendar._id}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: titleUpdate || calendar.title,
        }),
      });
      const data = await res.json();
      setCurrentCalendar(data);
      setEditThisTitle(null);
      setTitleUpdate("");
      setToggleUpdate((prev) => !prev);
      // When editing starts: Set the calendar to be edited:
    } else {
      setEditThisTitle((prev) =>
        prev && prev._id === calendar._id ? {} : calendar
      );
    }
  };

  // Ask for confirmation before deleting a calendar:
  const handleDeleteCalendar = (calendar) => {
    setCurrentCalendar(calendar);
    setShowConfirmation(true);
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
        title: titleInput || "Untitled Calendar",
        events: [],
        user: activeUser.id,
      }),
    });
    const data = await res.json();
    setCurrentCalendar(data);
    setTitleInput("");
    setToggleUpdate((prev) => !prev);
  };

  return (
    <div className="container">
      {activeUser?.username && (
        <div className="calControls">
          <div className="titleBox">
            <input
              className="newTitleInput"
              type="text"
              id="titleInput"
              value={titleInput || ""}
              onChange={(e) => setTitleInput(e.target.value)}
              placeholder="Enter a title"
            />
            <button
              onClick={createCalendar}
              className="editButton editButtonSmall"
            >
              <img src={createIcon} alt="icon for create" />
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

                {/* Show text label OR (if editing) input for calendar title: */}
                {editThisTitle && editThisTitle._id === calendar._id ? (
                  <input
                    className="titleListItem"
                    type="text"
                    placeholder={calendar.title}
                    value={titleUpdate || ""}
                    onChange={(e) => setTitleUpdate(e.target.value)}
                  />
                ) : (
                  <label
                    className="titleListItem"
                    htmlFor={calendar._id}
                    style={{ cursor: "pointer" }}
                  >
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
                      handleDeleteCalendar(calendar);
                    }}
                  />{" "}
                </button>
              </div>
            ))}
        </div>
      )}
      {showConfirmation && <Confirmation />}
      {!activeUser?.username && (
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

export default CalControls;
