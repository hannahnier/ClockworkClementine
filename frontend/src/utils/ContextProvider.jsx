import { createContext, useState, useContext } from "react";

export const CalContext = createContext();

const ContextProvider = ({ children }) => {
  const [calendars, setCalendars] = useState(["test"]);
  const [events, setEvents] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", date: null });
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [firstVisit, setFirstVisit] = useState(false);

  const baseUrl = "http://clockworkclementineserver.onrender.com"; // "http://localhost:3000"

  return (
    <CalContext.Provider
      value={{
        calendars,
        setCalendars,
        events,
        setEvents,
        users,
        setUsers,
        activeUser,
        setActiveUser,
        errorMessage,
        setErrorMessage,
        firstVisit,
        setFirstVisit,
        baseUrl,
        showPopup,
        setShowPopup,
        newEvent,
        setNewEvent,
      }}
    >
      {children}
    </CalContext.Provider>
  );
};

export default ContextProvider;
export const useCalContext = () => useContext(CalContext);
