import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../api/config";
import { useNavigate, useLocation } from "react-router-dom";
import "./dashboard.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Sidebar";
import Header from "./Headers"; // Keep simple header if needed, or remove if integrated
import {
  MdSearch,
  MdFilterList,
  MdAdd,
  MdCalendarToday,
  MdOutlineRadioButtonUnchecked,
  MdCheckCircle,
  MdAccessTime,
} from "react-icons/md";
import { FaCheck } from "react-icons/fa";

const TaskItem = ({ task, onStatusChange, onEdit, onDelete }) => {
  const isCompleted = task.status === "complete";

  const handleCheck = (e) => {
    e.stopPropagation();
    onStatusChange(task._id, isCompleted ? "incomplete" : "complete");
  };

  const getPriorityClass = (p) => {
    if (!p) return "priority-medium";
    return `priority-${p.toLowerCase()}`;
  };

  return (
    <div
      className={`task-row ${isCompleted ? "completed" : ""}`}
      onClick={() => onEdit(task)}
    >
      <div className="task-checkbox-wrapper" onClick={handleCheck}>
        {isCompleted ? (
          <div className="custom-checkbox checked">
            <FaCheck size={10} />
          </div>
        ) : (
          <div className="custom-checkbox"></div>
        )}
      </div>

      <div className="task-content">
        <div className="task-title-row">
          <span className={`task-title ${isCompleted ? "strikethrough" : ""}`}>
            {task.title}
          </span>
        </div>

        <div className="task-meta-row">
          {!isCompleted && (
            <span className={`priority-tag ${getPriorityClass(task.priority)}`}>
              ! {task.priority ? task.priority.toUpperCase() : "MEDIUM"}
            </span>
          )}
          <div className="meta-date">
            {isCompleted ? (
              <span>Completed Today • 10:30 AM</span>
            ) : (
              <>
                <MdAccessTime className="meta-icon-small" />
                <span>Today • 2:00 PM</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function Dashboard() {
  const navigate = useNavigate();
  const location = useLocation(); // Hook to access state passed from Projects

  // Data State
  const [todos, setTodos] = useState([]);
  const [projects, setProjects] = useState([]); // Store fetched projects
  const [filterProject, setFilterProject] = useState(
    location.state?.projectId || null
  ); // Project Filter

  // Form State
  const [Inputs, setInputs] = useState({
    title: "",
    body: "",
    status: "incomplete",
    priority: "medium",
    projectId: "", // Add projectId to form
  });

  // UI State
  // UI State
  const [showAddModal, setShowAddModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("my_tasks"); // Sidebar tab
  const [filterTab, setFilterTab] = useState("all"); // 'all', 'active', 'completed'

  const username = localStorage.getItem("username") || "Alex";
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  // Fetch Projects for Dropdown
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

  // Fetch Todos with Filter
  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first!");
        navigate("/auth/login");
        return;
      }

      const params = {};
      if (filterProject) params.projectId = filterProject; // Add filter param

      const res = await axios.get(`${API_URL}/api/todos`, {
        headers: { Authorization: `Bearer ${token}` },
        params: params, // Send params
      });
      setTodos(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      if (err.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/auth/login");
      }
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    // Re-fetch todos when filterProject changes
    fetchTodos();
  }, [filterProject]);

  // Update filter if location state changes (e.g. navigating from Projects)
  useEffect(() => {
    if (location.state?.projectId) {
      setFilterProject(location.state.projectId);
      // Clear location state to prevent stuck filter on refresh if handled by history?
      // Actually good to keep unless user explicitly clears.
    }
  }, [location.state]);

  // Actions
  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${API_URL}/api/todos/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTodos(todos.map((t) => (t._id === id ? res.data : t)));
      toast.success(
        newStatus === "complete" ? "Task Completed!" : "Task Reactivated!"
      );
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const submit = async () => {
    if (!Inputs.title) return toast.error("Title is required");
    try {
      const token = localStorage.getItem("token");
      const userEmail = localStorage.getItem("userEmail");

      // If we are in a project view, auto-assign that project?
      const payload = { ...Inputs, userEmail };
      if (filterProject && !payload.projectId) {
        payload.projectId = filterProject;
      }

      const res = await axios.post(`${API_URL}/api/todos`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos([...todos, res.data]);
      setInputs({
        title: "",
        body: "",
        status: "incomplete",
        priority: "medium",
        projectId: "",
      });
      setShowAddModal(false);
      toast.success("Task Added");
    } catch (err) {
      toast.error("Failed to add task");
    }
  };

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  // derived state
  const activeTasks = todos.filter((t) => t.status !== "complete");
  const completedTasks = todos.filter((t) => t.status === "complete");

  // Get current project name if filtering
  const currentProject = projects.find((p) => p._id === filterProject);

  return (
    <div className="taskflow-dashboard">
      <ToastContainer position="top-right" theme="dark" />

      {/* Sidebar Overlay for Mobile */}
      <div className={`sidebar-container ${sidebarOpen ? "open" : ""}`}>
        <Sidebar
          activeTab={activeTab}
          onSelect={setActiveTab}
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
          <div className="dashboard-header-section">
            <div className="header-titles">
              <h1 className="main-title">
                {currentProject
                  ? `Project: ${currentProject.title}`
                  : "My Tasks"}
              </h1>
              <div className="sub-header-info">
                {currentProject && (
                  <button
                    className="filter-btn-outline"
                    style={{
                      marginLeft: 0,
                      marginRight: "1rem",
                      fontSize: "0.8rem",
                      padding: "0.2rem 0.6rem",
                    }}
                    onClick={() => {
                      setFilterProject(null);
                      navigate("/dashboard", { state: {} }); // Clear state
                    }}
                  >
                    Clear Filter ✕
                  </button>
                )}
                <span className="weather-icon">☀</span>
                <span>
                  Good Morning, {username} • {currentDate}
                </span>
              </div>
            </div>
          </div>

          {/* Filter Tabs & Search */}
          <div className="controls-row">
            <div className="filter-tabs">
              <button
                className={`tab-btn ${filterTab === "all" ? "active" : ""}`}
                onClick={() => setFilterTab("all")}
              >
                All
              </button>
              <button
                className={`tab-btn ${filterTab === "active" ? "active" : ""}`}
                onClick={() => setFilterTab("active")}
              >
                Active
              </button>
              <button
                className={`tab-btn ${
                  filterTab === "completed" ? "active" : ""
                }`}
                onClick={() => setFilterTab("completed")}
              >
                Completed
              </button>
            </div>

            <div className="search-filter-wrapper">
              <div className="search-bar">
                <MdSearch className="search-icon-small" />
                <input type="text" placeholder="Search tasks..." />
              </div>
              <button className="filter-icon-btn">
                <MdFilterList />
              </button>
            </div>
          </div>

          {/* Task Lists */}
          <div className="task-lists-container">
            {/* Active Tasks Section */}
            {(filterTab === "all" || filterTab === "active") && (
              <div className="list-section">
                <h3 className="section-title">TODAY</h3>
                <div className="list-tasks">
                  {activeTasks.length > 0 ? (
                    activeTasks.map((task) => (
                      <TaskItem
                        key={task._id}
                        task={task}
                        onStatusChange={updateStatus}
                        onEdit={(t) => navigate(`/task/${t._id}`)}
                      />
                    ))
                  ) : (
                    <p className="empty-state-text">No active tasks found.</p>
                  )}
                </div>
              </div>
            )}

            {/* Completed Tasks Section */}
            {(filterTab === "all" || filterTab === "completed") && (
              <div className="list-section">
                <h3 className="section-title">COMPLETED</h3>
                <div className="list-tasks">
                  {completedTasks.length > 0 ? (
                    completedTasks.map((task) => (
                      <TaskItem
                        key={task._id}
                        task={task}
                        onStatusChange={updateStatus}
                        onEdit={(t) => navigate(`/task/${t._id}`)}
                      />
                    ))
                  ) : (
                    <p className="empty-state-text">No completed tasks yet.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Floating Add Button */}
        <button
          className="floating-add-btn"
          onClick={() => setShowAddModal(true)}
        >
          <MdAdd size={24} /> <span>Add Task</span>
        </button>
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="add-task-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Task</h2>
              <button
                className="close-modal-btn"
                onClick={() => setShowAddModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              {/* Main Title Input */}
              <input
                type="text"
                placeholder="What needs to be done?"
                onChange={change}
                name="title"
                value={Inputs.title}
                className="large-title-input"
              />

              {/* Description */}
              <div className="input-group full-width">
                <label>
                  Description <span className="optional-text">(Optional)</span>
                </label>
                <textarea
                  name="body"
                  placeholder="Add details regarding this task..."
                  onChange={change}
                  value={Inputs.body}
                  className="modal-textarea"
                  rows="4"
                />
              </div>

              {/* Details Grid */}
              <div className="modal-grid">
                {/* Due Date */}
                <div className="grid-item">
                  <label>Due Date</label>
                  <div className="date-input-wrapper">
                    <MdCalendarToday className="input-icon" />
                    <input type="date" className="styled-input" />
                  </div>
                </div>

                {/* Priority */}
                <div className="grid-item">
                  <label>Priority</label>
                  <div className="priority-segment">
                    {["low", "medium", "high"].map((p) => (
                      <button
                        key={p}
                        className={`segment-btn ${
                          Inputs.priority === p ? "active" : ""
                        }`}
                        onClick={() => setInputs({ ...Inputs, priority: p })}
                      >
                        {p.charAt(0).toUpperCase() + p.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project (Dynamic) */}
                <div className="grid-item">
                  <label>Project</label>
                  <select
                    className="styled-input"
                    name="projectId"
                    onChange={change}
                    value={
                      Inputs.projectId || (filterProject ? filterProject : "")
                    }
                  >
                    <option value="">No Project</option>
                    {projects.map((proj) => (
                      <option key={proj._id} value={proj._id}>
                        {proj.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Settings (Reminder) */}
                <div className="grid-item">
                  <label>Settings</label>
                  <div className="reminder-toggle-wrapper">
                    <div className="reminder-label">
                      <MdAccessTime /> Set Reminder
                    </div>
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="cancel-btn"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button className="submit-btn save-task-btn" onClick={submit}>
                <MdAdd /> Save Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
