import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCalContext } from "../utils/ContextProvider";
import eye from "../assets/eye.svg";
import eyeSlash from "../assets/eye-slash.svg";

const LoginPage = () => {
  // Get states from context:
  const { activeUser, setActiveUser, errorMessage, setErrorMessage, baseUrl } =
    useCalContext();
  const navigate = useNavigate();

  // Control the input fields:
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  // Control the password visibility:
  const [toggleShowPassword, setToggleShowPassword] = useState(false);

  // Default states when the component mounts:
  useEffect(() => {
    setErrorMessage("");
  }, []);

  useEffect(() => {
    if (activeUser) {
      navigate("/calendars");
    }
  }, [activeUser]);

  // Handle user login by sending a request to the server:
  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${baseUrl}/users/login`, {
        method: "POST",
        body: JSON.stringify(inputData),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      // Handle response from server:
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

      {/* Display login form: */}
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
              type="email"
              name="email"
              id="email"
              value={inputData.email}
              onChange={(e) => {
                setInputData({ ...inputData, [e.target.name]: e.target.value });
              }}
            />

            <label htmlFor="password">Password: </label>
            <div className="passwordBox">
              <input
                className="inputLogin inputInline"
                type={toggleShowPassword ? "text" : "password"}
                name="password"
                id="password"
                value={inputData.password}
                onChange={(e) => {
                  setInputData({
                    ...inputData,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
              <img
                onClick={() => {
                  setToggleShowPassword((prev) => !prev);
                }}
                className="eyeIcon"
                src={toggleShowPassword ? eye : eyeSlash}
                alt="icon for showing or hiding password"
              />
            </div>

            <button type="submit" className="standardButton submitButton ">
              Log in
            </button>
          </form>
          <p>
            Don&apos;t have an account yet?{" "}
            <Link onClick={() => navigate("/register")}>Sign up</Link>
          </p>
        </div>
      )}

      {/* Display Error Message: */}
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
