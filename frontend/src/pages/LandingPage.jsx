import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCalContext } from "../utils/ContextProvider";

const LandingPage = () => {
  // Get states from context:
  const { activeUser, firstVisit, setFirstVisit, showCookieBox } =
    useCalContext();
  const navigate = useNavigate();

  // Set firstVisit to true after 100ms (important for animations):
  useEffect(() => {
    const timer = setTimeout(() => setFirstVisit(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="landingContainer">
      <h1>Clockwork Clementine</h1>

      {/* Show clementine-clock animation */}
      <div
        className={`clementine ${
          firstVisit && !showCookieBox ? "transition" : ""
        }`}
      >
        <div className="leaf1"></div>
        <div className="leaf2"></div>
        <div
          className={`clockHand1 ${
            firstVisit && !showCookieBox ? "transition" : ""
          }`}
        ></div>
        <div
          className={`clockHand2 ${
            firstVisit && !showCookieBox ? "transition" : ""
          }`}
        ></div>

        {/* Buttons for register & login: */}
      </div>
      {!activeUser && (
        <button
          className={`startButton standardButton ${
            firstVisit && !showCookieBox ? "transition" : ""
          }`}
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      )}
      {!activeUser && (
        <button
          className={`startButton standardButton coloredButton ${
            firstVisit && !showCookieBox ? "transition" : ""
          }`}
          onClick={() => navigate("/register")}
        >
          Sign up
        </button>
      )}

      {/* Alternatively: Button for directly navigating to the calendars page: */}
      {activeUser && (
        <button
          className={`startButton standardButton ${
            firstVisit && !showCookieBox ? "transition" : ""
          }`}
          onClick={() => navigate("/calendars")}
        >
          My Calendars
        </button>
      )}
    </div>
  );
};

export default LandingPage;
