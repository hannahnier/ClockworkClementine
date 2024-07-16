import { Outlet } from "react-router-dom";
import Header from "./Header";
import CookieBox from "../utils/CookieBox";

const Layout = () => {
  return (
    <div className="layoutContainer">
      <Header />
      <CookieBox />
      <Outlet />
    </div>
  );
};

export default Layout;
