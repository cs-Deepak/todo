import React, { useEffect, useState } from "react";
import "./header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { SiTodoist } from "react-icons/si";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/auth/login"); // redirect to login
  };

  return (
    <header className="modern-header">
      <nav className="nav-container">
        {/* ===== Brand Section ===== */}
        <div className="brand-section">
          <div className="brand-content">
            <SiTodoist className="brand-icon" />
            <span className="brand-text">Todo</span>
          </div>
        </div>

        {/* ===== Navigation ===== */}
        <div className="nav-section">
          {isLoggedIn ? (
            <div className="user-nav">
              <NavLink to="/" className="nav-link">
                <span>Home</span>
              </NavLink>

              <NavLink to="/dashboard" className="nav-link">
                <span>Todo</span>
              </NavLink>

              <button onClick={handleLogout} className="logout-btn">
                <svg
                  className="logout-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <NavLink to="/auth/login" className="login-btn">
                <svg
                  className="login-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                Login
              </NavLink>

              {/* <NavLink to="/auth/signup" className="signup-btn">
                <svg
                  className="signup-icon"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Signup
              </NavLink> */}
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
