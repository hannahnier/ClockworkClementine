import { createContext, useState, useContext } from "react";

export const CalContext = createContext();

const ContextProvider = ({ children }) => {
  const [calendars, setCalendars] = useState([]);
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [firstVisit, setFirstVisit] = useState(false);
  const [toggleUpdate, setToggleUpdate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentCalendar, setCurrentCalendar] = useState(null);
  const [displayCalendars, setDisplayCalendars] = useState([]);
  const [modalType, setModalType] = useState("");
  const [currentEvent, setCurrentEvent] = useState({
    title: "",
    start: "",
    startTime: "",
    end: "",
    endTime: "",
  });

  // const baseUrl = "https://clockworkclementineserver.onrender.com";
  const baseUrl = "http://localhost:3000";

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
        toggleUpdate,
        setToggleUpdate,
        showModal,
        setShowModal,
        currentCalendar,
        setCurrentCalendar,
        modalType,
        setModalType,
        currentEvent,
        setCurrentEvent,
        displayCalendars,
        setDisplayCalendars,
      }}
    >
      {children}
    </CalContext.Provider>
  );
};

export default ContextProvider;
export const useCalContext = () => useContext(CalContext);
