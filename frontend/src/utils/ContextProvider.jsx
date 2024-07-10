import { createContext, useState, useContext } from "react";

export const CalContext = createContext();

const ContextProvider = ({ children }) => {
  const [calendars, setCalendars] = useState(["test"]);
  const [users, setUsers] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [firstVisit, setFirstVisit] = useState(false);

  return (
    <CalContext.Provider
      value={{
        calendars,
        setCalendars,
        users,
        setUsers,
        loggedIn,
        setLoggedIn,
        errorMessage,
        setErrorMessage,
        firstVisit,
        setFirstVisit,
      }}
    >
      {children}
    </CalContext.Provider>
  );
};

export default ContextProvider;
export const useCalContext = () => useContext(CalContext);
