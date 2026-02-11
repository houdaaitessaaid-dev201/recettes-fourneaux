// components/NotFound.jsx
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound-container">
      <h1>404</h1>
      <h2>Oops! Page Not Found</h2>
      <p>The page you are looking for does not exist.</p>
      <button className="btn-main" onClick={() => navigate("/")}>
        Go Home 🏠
      </button>
    </div>
  );
}
