import React from "react";
import "./Sidebar.css";
import {
  MdCheckCircle,
  MdCalendarToday,
  MdFolder,
  MdSettings,
  MdDashboard,
  MdInsertChartOutlined,
} from "react-icons/md";
import { NavLink, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const Sidebar = ({
  activeTab = "my_tasks",
  onSelect = () => {},
  onClose = () => {},
}) => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Alex Morgan";

  const handleSelect = (key, route) => {
    onSelect(key);
    if (route) navigate(route);
    onClose();
  };

  return (
    <div className="sidebar" role="navigation" aria-label="Main sidebar">
      <button
        type="button"
        className="mobile-close"
        aria-label="Close sidebar"
        onClick={onClose}
      >
        ✕
      </button>

    

      <nav className="sidebar-nav">
        <div className="nav-section">
          {/* Dashboard (New) */}
          {/* <button
            type="button"
            className={`nav-item ${activeTab === "dashboard" ? "active" : ""}`}
            onClick={() => handleSelect("dashboard", "/dashboard")}
          >
            <MdDashboard className="nav-icon" />
            <span className="nav-text">Dashboard</span>
          </button> */}

          <button
            type="button"
            className={`nav-item ${activeTab === "my_tasks" ? "active" : ""}`}
            onClick={() => handleSelect("my_tasks", "/dashboard")}
          >
            <MdCheckCircle className="nav-icon" />
            <span className="nav-text">My Tasks</span>
          </button>

          {/* <button
            type="button"
            className={`nav-item ${activeTab === "calendar" ? "active" : ""}`}
            onClick={() => handleSelect("calendar")}
          >
            <MdCalendarToday className="nav-icon" />
            <span className="nav-text">Calendar</span>
          </button> */}

          <button
            type="button"
            className={`nav-item ${activeTab === "projects" ? "active" : ""}`}
            onClick={() => handleSelect("projects", "/projects")}
          >
            <MdFolder className="nav-icon" />
            <span className="nav-text">Projects</span>
          </button>

          {/* Reports (New) */}
          {/* <button
            type="button"
            className={`nav-item ${activeTab === "reports" ? "active" : ""}`}
            onClick={() => handleSelect("reports")}
          >
            <MdInsertChartOutlined className="nav-icon" />
            <span className="nav-text">Reports</span>
          </button> */}

          <button
            type="button"
            className={`nav-item ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => handleSelect("settings", "/setting")}
          >
            <MdSettings className="nav-icon" />
            <span className="nav-text">Settings</span>
          </button>
        </div>
      </nav>

      {/* User Profile Section */}
      {/* <div className="sidebar-footer">
        <div className="user-profile-card">
          <div className="user-avatar">
            <img
              src={`https://ui-avatars.com/api/?name=${username}&background=random`}
              alt="User"
            />
          </div>
          <div className="user-info">
            <span className="user-name">{username}</span>
            <span className="user-plan">Pro Plan</span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default Sidebar;
