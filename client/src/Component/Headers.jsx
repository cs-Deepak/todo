import React, { useEffect, useState, useRef } from "react";
import "./header.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaTasks, FaBell, FaPlus } from "react-icons/fa";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    const name = localStorage.getItem("username") || "Rohan"; // Default to Rohan as per design if not found
    const email = localStorage.getItem("userEmail") || "";
    setUsername(name);
    setUserEmail(email);
  }, []);

  useEffect(() => {
    const refresh = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
      const name = localStorage.getItem("username") || "Rohan";
      const email = localStorage.getItem("userEmail") || "";
      setUsername(name);
      setUserEmail(email);
    };

    refresh();
    window.addEventListener("user-changed", refresh);
    return () => window.removeEventListener("user-changed", refresh);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userEmail");
    setIsLoggedIn(false);
    navigate("/auth/login");
  };

  useEffect(() => {
    const onDocClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <header className="taskflow-header">
      <nav className="header-container">
        {/* Brand */}
        <div className="header-brand" onClick={() => navigate("/")}>
          <div className="brand-logo-container">
           
          </div>
          <span className="brand-name">TaskMaster</span>
        </div>

        {/* Center Navigation Pills */}
        <div className="header-center-nav">
          <div className="nav-pills">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-pill ${isActive ? "active" : ""}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `nav-pill ${isActive ? "active" : ""}`
              }
            >
              Dashboard
            </NavLink>
          </div>
        </div>

        {/* Right Actions */}
        <div className="header-actions">

          <button className="btn-icon-only">
            <FaBell />
          </button>

          <div className="user-separator"></div>

          {isLoggedIn ? (
            <div
              className="user-profile-section"
              ref={profileRef}
              onClick={() => setShowProfile(!showProfile)}
            >
              <div className="user-info-text">
                <span className="user-greeting-small">Welcome,</span>
                <span className="user-name-small">{username}</span>
              </div>
              <div className="user-avatar-small">
                <img src="https://i.pravatar.cc/150?img=3" alt="User" />
              </div>

              {showProfile && (
                <div className="profile-dropdown">
                  <div className="profile-header">
                    <div className="user-details">
                      <div className="user-full-name">{username}</div>
                      <div className="user-email-text">{userEmail}</div>
                    </div>
                  </div>
                  <button className="logout-button" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons">
              <NavLink to="/auth/login" className="login-link">
                Login
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
