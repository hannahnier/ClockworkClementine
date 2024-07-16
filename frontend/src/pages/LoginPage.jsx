import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCalContext } from "../utils/ContextProvider";

const LoginPage = () => {
  const navigate = useNavigate();
  const { activeUser, setActiveUser, errorMessage, setErrorMessage, baseUrl } =
    useCalContext();

  const [inputData, setInputData] = useState({
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

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${baseUrl}/users/login`, {
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
      <h2> {errorMessage ? "Error" : "Login"}</h2>
      {!errorMessage && !activeUser && (
        <div className="formContainer">
          <form
            onSubmit={(e) => {
              loginUser(e);
            }}
          >
            <label htmlFor="email">Email: </label>
            <input
              className="inputLogin"
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
              className="inputLogin"
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
              className="inputLogin inputInline"
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
            />
            <button type="submit" className="standardButton submitButton">
              Log in
            </button>
          </form>
          <p>
            Don&apos;t have an account yet?{" "}
            <Link onClick={() => navigate("/register")}>Sign up</Link>
          </p>
        </div>
      )}
      {errorMessage && (
        <div>
          <p>{errorMessage}</p>
          <button
            className="standardButton"
            onClick={() => {
              setErrorMessage(false);
              setInputData({ username: "", email: "", password: "" });
            }}
          >
            Try again
          </button>
          <button
            className="standardButton"
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

export default LoginPage;
