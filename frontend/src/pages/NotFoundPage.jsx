import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>404</h1>
      <h2>The page you were looking for does not exist.</h2>
      <button
        className="standardButton coloredButton"
        onClick={() => navigate("/")}
      >
        Back to Main Page
      </button>
    </div>
  );
};

export default NotFoundPage;
