import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../api/config";
import { ToastContainer, toast } from "react-toastify";
import Sidebar from "./Sidebar";
import "./dashboard.css";
import "./taskdetails.css"; // Reuse the same CSS for consistent design
import {
  MdArrowBack,
  MdSave,
  MdDelete,
  MdLabel,
  MdFolder,
  MdCheckCircle,
  MdEdit,
} from "react-icons/md";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("projects");
  const [loading, setLoading] = useState(true);

  const [project, setProject] = useState({
    title: "",
    category: "Personal",
    color: "#8b949e",
    icon: "📁",
  });

  useEffect(() => {
    fetchProjectDetails();
  }, [id]);

  const fetchProjectDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/auth/login");

      // Fetch all projects and find the one (since we might not have a direct by-ID route active or to match pattern)
      // Actually we just added PUT /:id and DELETE /:id, but GET is still "get all".
      const res = await axios.get(`${API_URL}/api/projects`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const foundProject = res.data.find((p) => p._id === id);
      if (foundProject) {
        setProject(foundProject);
      } else {
        toast.error("Project not found");
        navigate("/projects");
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch project details");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({ ...project, [name]: value });
  };

  const handleSave = async (showToast = true) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${API_URL}/api/projects/${id}`, project, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (showToast) toast.success("Project updated successfully");
    } catch (err) {
      console.error(err);
      if (showToast) toast.error("Failed to save project");
    }
  };

  const handleBack = async () => {
    await handleSave(false);
    navigate(-1);
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this project? All tasks within it will also be deleted."
      )
    ) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`${API_URL}/api/projects/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Project deleted");
        navigate("/projects");
      } catch (err) {
        toast.error("Failed to delete project");
      }
    }
  };

  if (loading) return <div className="p-4 text-white">Loading...</div>;

  return (
    <div className="taskflow-dashboard">
      <ToastContainer position="top-right" theme="dark" />

      {/* Sidebar Overlay */}
      <div className={`sidebar-container ${sidebarOpen ? "open" : ""}`}>
        <Sidebar
          activeTab={activeTab}
          onSelect={(tab, route) => {
            setActiveTab(tab);
            if (route) navigate(route);
            else if (tab === "dashboard") navigate("/dashboard");
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
          {/* Header Action Bar */}
          <div className="details-top-bar">
            <button onClick={handleBack} className="back-btn">
              <MdArrowBack size={18} /> <span>Back to Projects</span>
            </button>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button onClick={handleDelete} className="delete-btn">
                <MdDelete /> <span>Delete Project</span>
              </button>
              <button onClick={() => handleSave(true)} className="save-btn">
                <MdSave /> <span>Save Changes</span>
              </button>
            </div>
          </div>

          <div className="task-details-container">
            {/* Left Column: Project Title & Preview */}
            <div className="task-main-editor">
              <label
                style={{
                  color: "#8b949e",
                  fontSize: "0.85rem",
                  fontWeight: "bold",
                }}
              >
                PROJECT NAME
              </label>
              <input
                type="text"
                name="title"
                value={project.title}
                onChange={handleChange}
                placeholder="Project Title"
                className="task-title-input"
                style={{ fontSize: "2.5rem" }}
              />

              <div
                style={{
                  marginTop: "2rem",
                  padding: "2rem",
                  background: "#161b22",
                  borderRadius: "12px",
                  border: "1px solid #30363d",
                  display: "flex",
                  alignItems: "center",
                  gap: "1.5rem",
                }}
              >
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "12px",
                    background: project.color,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2rem",
                  }}
                >
                  {project.icon}
                </div>
                <div>
                  <h3 style={{ margin: 0, color: "#e6edf3" }}>Preview</h3>
                  <p style={{ margin: "0.5rem 0 0", color: "#8b949e" }}>
                    This is how your project appears in the dashboard.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Properties Sidebar */}
            <div className="task-sidebar-properties">
              {/* Category Section */}
              <div className="property-section">
                <label className="property-label">Category</label>
                <select
                  name="category"
                  value={project.category}
                  onChange={handleChange}
                  className="sidebar-select"
                >
                  <option value="Personal">Personal</option>
                  <option value="Work">Work</option>
                  <option value="Teams">Teams</option>
                  <option value="Portfolio">Portfolio</option>
                </select>
              </div>

              {/* Color Section */}
              <div className="property-section">
                <label className="property-label">Color Theme</label>
                <div
                  style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}
                >
                  {[
                    "#6a9955", // Green
                    "#d19a66", // Orange
                    "#c678dd", // Purple
                    "#56b6c2", // Cyan
                    "#e06c75", // Red
                    "#61afef", // Blue
                    "#8b949e", // Gray
                  ].map((c) => (
                    <div
                      key={c}
                      onClick={() => setProject({ ...project, color: c })}
                      style={{
                        width: "30px",
                        height: "30px",
                        borderRadius: "50%",
                        background: c,
                        cursor: "pointer",
                        border:
                          project.color === c
                            ? "2px solid #fff"
                            : "2px solid transparent",
                        boxShadow:
                          project.color === c ? "0 0 0 2px #58a6ff" : "none",
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Icon Section (Simple version) */}
              <div className="property-section">
                <label className="property-label">Icon</label>
                <input
                  type="text"
                  name="icon"
                  value={project.icon}
                  onChange={handleChange}
                  className="sidebar-select"
                  maxLength="2"
                  placeholder="Emoji"
                  style={{ textAlign: "center", fontSize: "1.5rem" }}
                />
                <p
                  style={{
                    fontSize: "0.8rem",
                    color: "#8b949e",
                    marginTop: "0.5rem",
                  }}
                >
                  Enter an emoji (e.g. 🚀, 💻)
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
