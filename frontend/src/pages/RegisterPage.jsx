import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCalContext } from "../utils/ContextProvider";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { activeUser, setActiveUser, errorMessage, setErrorMessage, baseUrl } =
    useCalContext();

  const [inputData, setInputData] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setErrorMessage("");
  }, []);

  useEffect(() => {
    if (activeUser) {
      navigate("/calendars");
    }
  }, [activeUser]);

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${baseUrl}/users/register`, {
        method: "POST",
        body: JSON.stringify(inputData),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
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
    } catch (err) {
      setErrorMessage(err.message || "An unknown error occured.");
    }
  };

  return (
    <div>
      <h2> {errorMessage ? "Error" : "Registration"}</h2>
      {!errorMessage && !activeUser && (
        <div className="formContainer">
          <form
            onSubmit={(e) => {
              registerUser(e);
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
              type="text" // hier später wieder email
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
            <label className="labelInline" htmlFor="rememberMe">
              Remember me
            </label>
            <input
              className="inputInline"
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
            />
            <button type="submit">Sign up</button>
          </form>
          <p>
            Already have an account?{" "}
            <Link onClick={() => navigate("/login")}>Login</Link>
          </p>
        </div>
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
