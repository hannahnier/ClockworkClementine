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
    displayCalendars,
    setDisplayCalendars,
  } = useCalContext();

  const logoutUser = async () => {
    const res = await fetch(`${baseUrl}/users/logout`, {
      method: "POST",
      credentials: "include",
    });
    const data = await res.json();
    setActiveUser(data?.user);
    setDisplayCalendars([]);
    navigate("/");
  };

  return (
    <header>
      {activeUser?.username && <h2> {`Hi, ${activeUser.username}!`}</h2>}
      {activeUser && (
        <Link className="logoutLink" onClick={logoutUser}>
          <img src={logoutSign} alt="Logout logo" />
        </Link>
      )}
    </header>
  );
};

export default Header;
