import { useEffect } from "react";
import { useCalContext } from "./ContextProvider";

const CookieBox = () => {
  // Get states from context:
  const { showCookieBox, setShowCookieBox } = useCalContext();

  //   Check if the user has already given consent:
  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowCookieBox(true);
    }
  }, []);

  // Store the user's consent in localStorage:
  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowCookieBox(false);
  };

  //  If the user has already given consent, don't show the cookie box:
  if (!showCookieBox) {
    return null;
  }

  //  If the user hasn't given consent, show the cookie box:
  if (showCookieBox) {
    return (
      <div className="cookieOuter">
        <div className="cookie">
          <p>
            This website uses cookies for registration and login. Please give
            your permission or else it will not work.
          </p>
          <button className="standardButton" onClick={handleAccept}>
            Allow
          </button>
        </div>
      </div>
    );
  }
};

export default CookieBox;
