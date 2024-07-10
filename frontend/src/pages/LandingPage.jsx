import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const [animate, setAnimate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="landingContainer">
      <h1>Clockwork Clementine</h1>
      <div className={`clementine ${animate ? "transition" : ""}`}>
        <div className="leaf1"></div>
        <div className="leaf2"></div>
        <div className={`clockHand1 ${animate ? "transition" : ""}`}></div>
        <div className={`clockHand2 ${animate ? "transition" : ""}`}></div>
      </div>
      <button
        className={`startButton ${animate ? "transition" : ""}`}
        onClick={() => navigate("/login")}
      >
        Login
      </button>
      <button
        className={`startButton ${animate ? "transition" : ""}`}
        onClick={() => navigate("/register")}
      >
        Sign up
      </button>
    </div>
  );
};

export default LandingPage;
