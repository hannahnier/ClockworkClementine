import { createContext, useState, useContext } from "react";

export const CalContext = createContext();

const ContextProvider = ({ children }) => {
  const [calendars, setCalendars] = useState(["test"]);
  const [users, setUsers] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [firstVisit, setFirstVisit] = useState(false);
  const [activeUser, setActiveUser] = useState({ email: "", password: "" });

  const baseUrl = "http://localhost:3000";

  const logIn = async () => {
    const res = await fetch(`${baseUrl}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(activeUser),
    });
  };

  const signUp = async () => {
    const res = await fetch(`${baseUrl}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(activeUser),
    });
  };

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
        activeUser,
        setActiveUser,
        logIn,
        signUp,
      }}
    >
      {children}
    </CalContext.Provider>
  );
};

export default ContextProvider;
export const useCalContext = () => useContext(CalContext);
