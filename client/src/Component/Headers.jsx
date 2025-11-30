import React, { useEffect, useState, useRef } from "react";
import "./header.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { FaTasks } from "react-icons/fa";

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
    const name = localStorage.getItem("username") || "";
    const email = localStorage.getItem("userEmail") || "";
    setUsername(name);
    setUserEmail(email);
  }, []);

  useEffect(() => {
    const refresh = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
      const name = localStorage.getItem("username") || "";
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
        <div className="header-brand">
          <FaTasks className="brand-logo" />
          <span className="brand-name">TaskFlow</span>
        </div>

        {/* Navigation Links */}
        <div className="header-nav">
          <NavLink to="/" className="nav-item">Home</NavLink>
          <NavLink to="auth/login" className="nav-item">Dashboard</NavLink>
        </div>

        {/* Auth Section */}
        <div className="header-actions">
          {isLoggedIn ? (
            <div className="user-welcome">
              <div className="user-avatar-small">
                {username ? username.charAt(0).toUpperCase() : "U"}
              </div>
              <span className="welcome-text">Welcome, {username || "User"}</span>
              <div className="user-menu" ref={profileRef}>
                <button
                  className="menu-toggle"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowProfile((s) => !s);
                  }}
                >
                  ▼
                </button>

                {showProfile && (
                  <div className="profile-dropdown">
                    <div className="profile-header">
                      <div className="user-avatar-large">
                        {username ? username.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div className="user-details">
                        <div className="user-full-name">{username || "User"}</div>
                        <div className="user-email-text">{userEmail}</div>
                      </div>
                    </div>
                    <button className="logout-button" onClick={handleLogout}>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <NavLink to="/auth/login" className="signup-button">
              Login
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
