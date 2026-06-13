import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();

  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="logo">Smart Learning</div>

      <div className="nav-links">
        {user ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/courses">Courses</Link>
            <Link to="/assignments">Assignments</Link>
            <Link to="/jobs">Jobs</Link>

            <div className="profile-section">
              <FaUserCircle
                size={32}
                className="profile-icon"
                onClick={() => setShowProfile(!showProfile)}
              />

              {showProfile && (
                <div className="profile-dropdown">
                  <h4>{user?.name}</h4>
                  <p>{user?.email}</p>
                  <p>{user?.role}</p>

                  <button onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;