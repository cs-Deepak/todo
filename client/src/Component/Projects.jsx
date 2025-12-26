import React, { useState, useEffect } from "react";
import "./projects.css";
import axios from "axios";
import API_URL from "../api/config";
import { ToastContainer, toast } from "react-toastify";
import Sidebar from "./Sidebar";
import {
  MdSearch,
  MdFilterList,
  MdAdd,
  MdViewModule,
  MdViewList,
  MdMoreHoriz,
} from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("projects");
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const [newProject, setNewProject] = useState({
    title: "",
    category: "Personal",
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(`${API_URL}/api/projects`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch projects");
      setLoading(false);
    }
  };

  const handleCreateProject = async () => {
    if (!newProject.title) return toast.error("Project title is required");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("You must be logged in to create a project.");
        return;
      }

      const categoryColors = {
        Work: "#58a6ff",
        Personal: "#2ed16c",
        Education: "#a371f7",
        Shopping: "#f0883e",
      };
      const categoryIcons = {
        Work: "💼",
        Personal: "🛒",
        Education: "📚",
        Shopping: "🛍️",
      };

      const payload = {
        title: newProject.title,
        category: newProject.category,
        color: categoryColors[newProject.category] || "#8b949e", // Default color if undefined
        icon: categoryIcons[newProject.category] || "📁", // Default icon if undefined (fixed)
      };

      console.log(
        "Sending project create request to:",
        `${API_URL}/api/projects`
      );
      const { data } = await axios.post(`${API_URL}/api/projects`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProjects([...projects, { ...data, total: 0, completed: 0 }]); // Optimistic update
      setShowCreateModal(false);
      setNewProject({ title: "", category: "Personal" });
      toast.success("Project Created!");
    } catch (error) {
      console.error(error);
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Failed to create project";
      toast.error(msg);
    }
  };

  const handleProjectClick = (projectId) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <div className="taskflow-dashboard">
      <ToastContainer position="top-right" theme="dark" />

      {/* Sidebar Overlay for Mobile */}
      <div className={`sidebar-container ${sidebarOpen ? "open" : ""}`}>
        <Sidebar
          activeTab={activeTab}
          onSelect={(tab, route) => {
            setActiveTab(tab);
            if (route) navigate(route);
            else if (tab === "dashboard") navigate("/dashboard");
            else if (tab === "my_tasks") navigate("/dashboard");
          }}
          onClose={() => setSidebarOpen(false)}
        />
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      </div>

      <div className="main-content">
        <div className="content-padding">
          {/* Header Section */}
          <div className="projects-header-row">
            <div>
              <h1 className="main-title">Projects</h1>
              <p className="sub-header-info">
                Manage your work and personal tasks effectively.
              </p>
            </div>
            <button
              className="create-project-btn"
              onClick={() => setShowCreateModal(true)}
            >
              <MdAdd size={20} /> Create Project
            </button>
          </div>

          {/* Controls: Search & Filter */}
          <div className="project-controls">
            <div className="project-search-bar">
              <MdSearch className="search-icon-small" />
              <input type="text" placeholder="Search projects by name..." />
            </div>
            <div className="view-toggle-group">
              <button
                className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                onClick={() => setViewMode("grid")}
              >
                <MdViewModule />
              </button>
              <button
                className={`view-btn ${viewMode === "list" ? "active" : ""}`}
                onClick={() => setViewMode("list")}
              >
                <MdViewList />
              </button>
              <button className="filter-btn-outline">
                <MdFilterList /> Filter
              </button>
            </div>
          </div>

          {/* Projects Grid */}
          <div
            className={`projects-grid ${
              viewMode === "list" ? "list-view" : ""
            }`}
          >
            {!loading &&
              projects.map((project) => (
                <div
                  key={project._id}
                  className="project-card"
                  onClick={() => handleProjectClick(project._id)}
                >
                  <div className="card-header-row">
                    <div
                      className="project-icon"
                      style={{
                        backgroundColor: `${project.color}20`,
                        color: project.color,
                      }}
                    >
                      {project.icon}
                    </div>
                    {/* Add more options menu here if needed */}
                  </div>

                  <h3 className="project-title">{project.title}</h3>
                  <div className="project-meta">
                    <span className="meta-category">{project.category}</span>
                    <span className="meta-dot">•</span>
                    <span className="meta-due">Active</span>
                  </div>

                  <div className="progress-section">
                    <div className="progress-labels">
                      <span>
                        {project.completed || 0}/{project.total || 0} Tasks
                      </span>
                      <span>
                        {project.total > 0
                          ? Math.round(
                              (project.completed / project.total) * 100
                            )
                          : 0}
                        %
                      </span>
                    </div>
                    <div className="progress-bar-bg">
                      <div
                        className="progress-bar-fill"
                        style={{
                          width: `${
                            project.total > 0
                              ? (project.completed / project.total) * 100
                              : 0
                          }%`,
                          backgroundColor: project.color,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}

            {/* Add New Project Card (Dashed) */}
            <button
              className="add-project-card-dashed"
              onClick={() => setShowCreateModal(true)}
            >
              <div className="plus-circle">
                <MdAdd size={24} />
              </div>
              <span>Create New Project</span>
            </button>
          </div>
        </div>
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <div
          className="modal-overlay"
          onClick={() => setShowCreateModal(false)}
        >
          <div className="add-task-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Project</h2>
              <button
                className="close-modal-btn"
                onClick={() => setShowCreateModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                placeholder="Project Name"
                className="large-title-input"
                value={newProject.title}
                onChange={(e) =>
                  setNewProject({ ...newProject, title: e.target.value })
                }
                autoFocus
              />

              <div className="grid-item">
                <label>Category</label>
                <select
                  className="styled-input"
                  value={newProject.category}
                  onChange={(e) =>
                    setNewProject({ ...newProject, category: e.target.value })
                  }
                >
                  <option>Personal</option>
                  <option>Work</option>
                  <option>Education</option>
                  <option>Shopping</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="cancel-btn"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </button>
              <button
                className="submit-btn save-task-btn"
                onClick={handleCreateProject}
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
