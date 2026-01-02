import React, { useEffect, useState, useRef } from "react";
import "./header.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import {

  FaBell,
  FaBars,
  FaTimes,
  
} from "react-icons/fa";

import { 
  IoLogOutOutline,
  IoLogInOutline
 } from "react-icons/io5";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  return (
    <header className="taskflow-header">
      <nav className="header-container">
        {/* Hamburger Menu Toggle (Mobile) */}
        <button
          className="menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Brand */}
        <div className="header-brand" onClick={() => navigate("/")}>
          <div className="brand-logo-container"></div>
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
            <>
              <div className="user-profile-section">
                <div className="user-info-text">
                  <span className="user-greeting-small">Welcome,</span>
                  <span className="user-name-small">{username}</span>
                </div>
                <div className="user-avatar-small">
                  <img src="https://i.pravatar.cc/150?img=3" alt="User" />
                </div>
              </div>
              <button
                className="logout-icon-btn "
                onClick={handleLogout}
                title="Logout"
              >
                <IoLogOutOutline size={24}/>
              </button>
            </>
          ) : (
            <div className="auth-buttons">
              <NavLink to="/auth/login" className="login-link">
              <IoLogInOutline className="icon" size={24}/>
             
              </NavLink>
            </div>
          )}
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="mobile-menu">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `mobile-nav-item ${isActive ? "active" : ""}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                `mobile-nav-item ${isActive ? "active" : ""}`
              }
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </NavLink>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
