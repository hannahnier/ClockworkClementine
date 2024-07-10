import { Link, useNavigate } from "react-router-dom";
import logoutSign from "../assets/logout.svg";
import { useCalContext } from "../utils/ContextProvider";

const Header = () => {
  const navigate = useNavigate();
  const { calendars, setCalendars, users, setUsers, loggedIn, setLoggedIn } =
    useCalContext();

  const logoutUser = () => {
    setLoggedIn(false);
    navigate("/");
  };

  return (
    <header>
      {loggedIn && (
        <Link className="logoutLink" onClick={logoutUser}>
          <img src={logoutSign} alt="Logout logo" />
        </Link>
      )}
    </header>
  );
};

export default Header;
