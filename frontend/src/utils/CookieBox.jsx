import { useEffect, useState } from "react";
import { useCalContext } from "./ContextProvider";

const CookieBox = () => {
  const { showCookieBox, setShowCookieBox } = useCalContext();

  //   Store the user's consent in localStorage:
  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowCookieBox(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowCookieBox(false);
  };

  if (!showCookieBox) {
    return null;
  }

  return (
    <div className="cookieOuter">
      <div className="cookie">
        <p>
          This website uses cookies for registration and login. Please give your
          permission or it won't work.
        </p>
        <button className="standardButton" onClick={handleAccept}>
          Allow
        </button>
      </div>
    </div>
  );
};

export default CookieBox;
