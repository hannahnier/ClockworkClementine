import { createContext, useState, useContext } from "react";

export const CalContext = createContext();

const ContextProvider = ({ children }) => {
  const baseUrl = import.meta.env.VITE_BASE_URL;

  // utils:
  const [showCookieBox, setShowCookieBox] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [firstVisit, setFirstVisit] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  // calendars:
  const [calendars, setCalendars] = useState([]);
  const [events, setEvents] = useState([]);
  const [currentCalendar, setCurrentCalendar] = useState(null);
  const [displayCalendars, setDisplayCalendars] = useState([]);
  const [eventInput, setEventInput] = useState({
    title: "",
    start: "",
    startTime: "",
    end: "",
    endTime: "",
  });

  // user:
  const [users, setUsers] = useState([]);
  const [activeUser, setActiveUser] = useState(null);

  return (
    <CalContext.Provider
      value={{
        // utils:
        baseUrl,
        showCookieBox,
        setShowCookieBox,
        errorMessage,
        setErrorMessage,
        firstVisit,
        setFirstVisit,
        showModal,
        setShowModal,
        modalType,
        setModalType,
        showConfirmation,
        setShowConfirmation,

        // calendars:
        calendars,
        setCalendars,
        events,
        setEvents,
        currentCalendar,
        setCurrentCalendar,
        displayCalendars,
        setDisplayCalendars,
        eventInput,
        setEventInput,

        // user:
        users,
        setUsers,
        activeUser,
        setActiveUser,
      }}
    >
      {children}
    </CalContext.Provider>
  );
};

export default ContextProvider;
export const useCalContext = () => useContext(CalContext);
