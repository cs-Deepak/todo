import React, { useEffect, useState, useRef } from "react";
import "./header.css";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { SiTodoist } from "react-icons/si";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    const name = localStorage.getItem("username") || "";
    const email = localStorage.getItem("userEmail") || "";
    setUsername(name);
    setUserEmail(email);
  }, []);

  // Refresh header state on route change or when other parts dispatch `user-changed`
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
    navigate("/auth/login"); // redirect to login
  };

  // close profile when clicking outside
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
              {/* Profile icon + dropdown */}
              <div className="user-menu" ref={profileRef}>
                <button
                  className="user-info"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowProfile((s) => !s);
                  }}
                  aria-haspopup="true"
                  aria-expanded={showProfile}
                >
                  <div className="user-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', color: '#4b2e83', fontWeight: 700 }}>
                    {username ? username.charAt(0).toUpperCase() : "U"}
                  </div>
                  <div className="user-name">{username ? (username.charAt(0).toUpperCase() + username.slice(1)) : "User"}</div>
                </button>

                {showProfile && (
                  <div className="profile-panel" role="dialog" aria-label="User profile">
                    <div className="profile-head">
                      <div className="user-avatar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fff', color: '#4b2e83', fontWeight: 700, width: 56, height: 56 }}>
                        {username ? username.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div style={{ marginLeft: 12 }}>
                        <div style={{ fontWeight: 700 }}>{username ? (username.charAt(0).toUpperCase() + username.slice(1)) : 'User'}</div>
                        <div style={{ fontSize: 12, opacity: 0.9 }}>{userEmail}</div>
                      </div>
                    </div>
                    <div style={{ marginTop: 12 }}>
                      <button className="logout-btn" onClick={handleLogout}>Logout</button>
                    </div>
                  </div>
                )}
              </div>
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
