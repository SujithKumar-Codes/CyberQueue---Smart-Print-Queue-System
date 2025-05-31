import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav>
      <div className="nav-container">
        <Link to="/" className="logo">
          CyberQueue+
        </Link>
        <div className="nav-links">
          {user ? (
            <>
              <Link to="/">New Print</Link>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}