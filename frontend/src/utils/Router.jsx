import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CalendarsPage from "../pages/CalendarsPage";
import App from "../App";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import CalendarsProvider from "./ContextProvider";

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <NotFoundPage />,
      children: [
        { path: "/", element: <LandingPage /> },
        { path: "/login", element: <LoginPage /> },
        { path: "/register", element: <RegisterPage /> },
        { path: "/calendars", element: <CalendarsPage /> },
      ],
    },
  ]);

  return (
    <CalendarsProvider>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </CalendarsProvider>
  );
};

export default Router;
