import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../api/config";
import { ToastContainer, toast } from "react-toastify";
import Sidebar from "./Sidebar";
import "./dashboard.css";
import "./taskdetails.css"; // Import custom CSS
import {
  MdArrowBack,
  MdSave,
  MdDelete,
  MdLabel,
  MdFolder,
  MdCheckCircle,
} from "react-icons/md";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("my_tasks");
  const [loading, setLoading] = useState(true);

  const [task, setTask] = useState({
    title: "",
    body: "",
    priority: "medium",
    status: "incomplete",
    projectId: "",
  });

  const [initialTask, setInitialTask] = useState(null);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchTaskDetails();
    fetchProjects();
  }, [id]);

  const fetchTaskDetails = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/auth/login");

      const res = await axios.get(`${API_URL}/api/todos`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const foundTask = res.data.find((t) => t._id === id);
      if (foundTask) {
        setTask(foundTask);
        setInitialTask(foundTask);
      } else {
        toast.error("Task not found");
        navigate("/dashboard");
      }
      setLoading(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch task details");
      setLoading(false);
    }
  };

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await axios.get(`${API_URL}/api/projects`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data);
    } catch (err) {
      console.error("Failed to fetch projects");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask({ ...task, [name]: value });
  };

  const handleSave = async (showToast = true) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`${API_URL}/api/todos/${id}`, task, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (showToast) toast.success("Task updated successfully");
    } catch (err) {
      console.error(err);
      if (showToast) toast.error("Failed to save task");
    }
  };

  const handleBack = async () => {
    await handleSave(false); // Auto-save silently
    navigate(-1);
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`${API_URL}/api/todos/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success("Task deleted");
        navigate("/dashboard");
      } catch (err) {
        toast.error("Failed to delete task");
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
              <MdArrowBack size={18} /> <span>Back to Dashboard</span>
            </button>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button onClick={handleDelete} className="delete-btn">
                <MdDelete /> <span>Delete</span>
              </button>
              <button onClick={() => handleSave(true)} className="save-btn">
                <MdSave /> <span>Save Changes</span>
              </button>
            </div>
          </div>

          <div className="task-details-container">
            {/* Left Column: Main Content */}
            <div className="task-main-editor">
              <input
                type="text"
                name="title"
                value={task.title}
                onChange={handleChange}
                placeholder="Task Title"
                className="task-title-input"
              />

              <div className="description-container">
                <textarea
                  name="body"
                  value={task.body}
                  onChange={handleChange}
                  placeholder="Add details..."
                  className="description-textarea"
                />
              </div>
            </div>

            {/* Right Column: Properties Sidebar */}
            <div className="task-sidebar-properties">
              {/* Status Section */}
              <div className="property-section">
                <label className="property-label">Status</label>
                <select
                  name="status"
                  value={task.status}
                  onChange={handleChange}
                  className="sidebar-select"
                >
                  <option value="incomplete">Incomplete</option>
                  <option value="complete">Completed</option>
                </select>
              </div>

              {/* Project Section */}
              <div className="property-section">
                <label className="property-label">Project</label>
                <select
                  name="projectId"
                  value={task.projectId || ""}
                  onChange={handleChange}
                  className="sidebar-select"
                >
                  <option value="">No Project</option>
                  {projects.map((p) => (
                    <option key={p._id} value={p._id}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Priority Section */}
              <div className="property-section">
                <label className="property-label">Priority</label>
                <select
                  name="priority"
                  value={task.priority}
                  onChange={handleChange}
                  className="sidebar-select"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
