import React from 'react';
import './Sidebar.css';
import { MdInbox, MdToday, MdUpcoming, MdFolder, MdLabel, MdArchive, MdSettings, MdHelp } from 'react-icons/md';
import { FaTasks } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ activeTab = 'today' }) => {
    return (
        <div className="sidebar">
            <button className="mobile-close" onClick={() => { try { window.dispatchEvent(new CustomEvent('sidebar-toggle')); } catch (e) { const ev = document.createEvent('Event'); ev.initEvent('sidebar-toggle', true, true); window.dispatchEvent(ev); } }}>✕</button>
            {/* <div className="sidebar-header">
                <div className="logo-container">
                    <FaTasks className="logo-icon" />
                    <span className="logo-text">TaskFlow</span>
                </div>
            </div> */}

            <nav className="sidebar-nav">
                <div className="mobile-top-links">
                    <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <span className="nav-text">Home</span>
                    </NavLink>
                    <NavLink to="/dashboard" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
                        <span className="nav-text">Dashboard</span>
                    </NavLink>
                </div>
                <div className="nav-section">
                    <div className={`nav-item ${activeTab === 'inbox' ? 'active' : ''}`}>
                        <MdInbox className="nav-icon" />
                        <span className="nav-text">Inbox</span>
                        <span className="nav-badge">3</span>
                    </div>

                    <div className={`nav-item ${activeTab === 'today' ? 'active' : ''}`}>
                        <MdToday className="nav-icon" />
                        <span className="nav-text">Today</span>
                    </div>

                    <div className={`nav-item ${activeTab === 'upcoming' ? 'active' : ''}`}>
                        <MdUpcoming className="nav-icon" />
                        <span className="nav-text">Upcoming</span>
                    </div>

                    <div className={`nav-item ${activeTab === 'projects' ? 'active' : ''}`}>
                        <MdFolder className="nav-icon" />
                        <span className="nav-text">Projects</span>
                    </div>

                    <div className={`nav-item ${activeTab === 'tags' ? 'active' : ''}`}>
                        <MdLabel className="nav-icon" />
                        <span className="nav-text">Tags</span>
                    </div>

                    <div className={`nav-item ${activeTab === 'archived' ? 'active' : ''}`}>
                        <MdArchive className="nav-icon" />
                        <span className="nav-text">Archived</span>
                    </div>
                </div>
            </nav>

            <div className="sidebar-footer">
                <div className="nav-item">
                    <MdSettings className="nav-icon" />
                    <span className="nav-text">Settings</span>
                </div>
                <div className="nav-item">
                    <MdHelp className="nav-icon" />
                    <span className="nav-text">Help & Feedback</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
