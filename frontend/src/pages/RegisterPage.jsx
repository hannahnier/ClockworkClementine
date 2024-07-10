import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCalContext } from "../utils/ContextProvider";

const RegisterPage = () => {
  const navigate = useNavigate();
  const {
    calendars,
    setCalendars,
    users,
    setUsers,
    loggedIn,
    setLoggedIn,
    errorMessage,
    setErrorMessage,
    activeUser,
    setActiveUser,
    logIn,
  } = useCalContext();

  const [inputData, setInputData] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setErrorMessage("");
  }, []);

  useEffect(() => {
    if (loggedIn) {
      navigate("/calendars");
    }
  }, [loggedIn]);

  const postUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        body: JSON.stringify(inputData),
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) {
        const errorData = await res.json();
        let someError =
          errorData.error?.errorResponse?.errmsg ||
          errorData.error ||
          "Unknown error";
        if (errorData.error?.errorResponse?.code === 11000) {
          someError =
            "An account linked to this email already exists. Please try login or sign up with a different email address.";
        }
        setErrorMessage(someError);
        throw new Error(someError);
      }

      const resData = await res.json();
      setActiveUser(resData);
      logIn();
      setLoggedIn(true);
    } catch (err) {
      setErrorMessage(err.message || "An unknown error occured.");
    }
  };

  return (
    <div>
      <h2> {errorMessage ? "Error" : "Registration"}</h2>
      {!errorMessage && !loggedIn && (
        <form
          onSubmit={(e) => {
            postUser(e);
          }}
        >
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            value={inputData.username}
            onChange={(e) => {
              setInputData({ ...inputData, [e.target.name]: e.target.value });
            }}
          />

          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            value={inputData.email}
            onChange={(e) => {
              setInputData({ ...inputData, [e.target.name]: e.target.value });
            }}
          />

          <label htmlFor="password">Password: </label>
          <input
            type="password"
            name="password"
            id="password"
            value={inputData.password}
            onChange={(e) => {
              setInputData({ ...inputData, [e.target.name]: e.target.value });
            }}
          />
          <button type="submit">Sign up</button>
        </form>
      )}
      {errorMessage && (
        <div>
          <p>{errorMessage}</p>
          <button
            onClick={() => {
              setErrorMessage(false);
              setInputData({ username: "", email: "", password: "" });
            }}
          >
            Try again
          </button>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Go to Main Page
          </button>
        </div>
      )}
    </div>
  );
};

export default RegisterPage;
