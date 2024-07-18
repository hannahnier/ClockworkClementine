import { useState } from "react";
import { useCalContext } from "../utils/ContextProvider";
import deleteIcon from "../assets/deleteIcon.svg";
import createIcon from "../assets/plus.svg";
import editIcon from "../assets/editIcon.svg";
import checkIcon from "../assets/checkIcon.svg";
import { useNavigate } from "react-router-dom";
import ConfirmDelete from "./ConfirmDelete";

const CalControls = () => {
  // Get states from context:
  const {
    calendars = [],
    baseUrl,
    activeUser,
    setCurrentCalendar,
    displayCalendars,
    setDisplayCalendars,
    showConfirmation,
    setShowConfirmation,
  } = useCalContext();

  const navigate = useNavigate();

  const [titleInput, setTitleInput] = useState("");
  const [editThisTitle, setEditThisTitle] = useState(null);
  const [titleUpdate, setTitleUpdate] = useState("");

  // Add a calendar to list if it is not in there yet:
  const addNewCalendarToList = (calendar) => {
    if (displayCalendars && displayCalendars.length > 0) {
      setDisplayCalendars((array) => {
        return array.some((item) => item._id === calendar._id)
          ? array
          : [...array, calendar];
      });
    } else {
      setDisplayCalendars([calendar]);
    }
  };

  // Update the displayed calendars list according to user's selection:
  const handleCalendarSelection = (e, calendar) => {
    // Add selected calendar to list:
    if (e.target.checked) {
      addNewCalendarToList(calendar);
      // Remove unselected calendar from list:
    } else {
      setDisplayCalendars((array) => {
        return array.filter((item) => item._id !== calendar._id);
      });
    }
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
      addNewCalendarToList(data);
      setEditThisTitle(null);
      setTitleUpdate("");
      // Map through calendars list and replace title for the edited calendar:
      setDisplayCalendars((array) =>
        array.map((cal) =>
          cal._id === data._id ? { ...cal, title: data.title } : cal
        )
      );
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
    addNewCalendarToList(data);
    setTitleInput("");
    setDisplayCalendars((array) => [...array, data]);
  };

  return (
    <div className="container">
      {activeUser?.username && (
        <div className="calControls">
          {/* Input field for entering a new calendar title: */}
          <div className="titleBox">
            <input
              className="newTitleInput"
              type="text"
              id="titleInput"
              value={titleInput || ""}
              onChange={(e) => setTitleInput(e.target.value)}
              placeholder="Enter a title"
            />

            {/* "+"-Button for creating a new calendar: */}
            <button
              onClick={createCalendar}
              className="editButton editButtonSmall createButton"
            >
              <img src={createIcon} alt="icon for create" />
            </button>
          </div>

          {/* Checkbox for selection/unselection of calendar: */}
          {calendars &&
            calendars.length > 0 &&
            calendars.map((calendar, index) => (
              <div key={calendar._id || index}>
                <input
                  id={calendar._id}
                  type="checkbox"
                  checked={
                    displayCalendars &&
                    displayCalendars.length > 0 &&
                    displayCalendars.some((item) => item._id === calendar._id)
                  }
                  onChange={(e) => {
                    handleCalendarSelection(e, calendar);
                  }}
                  style={{ cursor: "pointer" }}
                />

                {/* Show calendar's color: */}
                <div
                  className="calColorBox"
                  style={{
                    backgroundColor: calendar.color,
                  }}
                ></div>

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

                {/* Edit and delete buttons: */}
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

      {/*  Confirmation panel (only visible when showConfirmation is active) */}
      {showConfirmation && <ConfirmDelete />}

      {/* Alternative message if no activeUser */}
      {!activeUser?.username && (
        <div>
          <p>Please log in to see your calendars</p>
          <button
            className="standardButton coloredButton"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </button>
        </div>
      )}
    </div>
  );
};

export default CalControls;
