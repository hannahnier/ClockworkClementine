import { Link, useNavigate } from "react-router-dom";
import logoutSign from "../assets/logout.svg";
import { useCalContext } from "../utils/ContextProvider";

const Header = () => {
  const navigate = useNavigate();
  const {
    calendars,
    setCalendars,
    users,
    setUsers,
    activeUser,
    setActiveUser,
    baseUrl,
  } = useCalContext();

  const logoutUser = async () => {
    const res = await fetch(`${baseUrl}/users/logout`, {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    setActiveUser(data?.user);
    navigate("/");
  };

  return (
    <header>
      {activeUser && (
        <ul>
          <li>
            <Link>New calendar</Link>
          </li>
          <li>
            <Link>Delete calendar</Link>
          </li>
        </ul>
      )}
      {activeUser && (
        <Link className="logoutLink" onClick={logoutUser}>
          <img src={logoutSign} alt="Logout logo" />
        </Link>
      )}
    </header>
  );
};

export default Header;
