import React, { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../api/config";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import TodoCard from "../TodoCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Updates from "./Updates";
import Sidebar from "./Sidebar";
import TaskDetailsPanel from "./TaskDetailsPanel";
import Header from "./Headers";
import { MdSearch, MdAdd, MdFilterList, MdPerson } from "react-icons/md";

function Dashboard() {
  const [Inputs, setInputs] = useState({ title: "", body: "", status: "incomplete", priority: "medium" });
  const [todos, setTodos] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Filter & Sort State
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [sortBy, setSortBy] = useState("newest"); // newest, oldest, a-z, z-a

  // Toggle dropdowns
  const toggleDropdown = (name) => {
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.filter-btn') && !event.target.closest('.sort-btn')) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // ✅ Fetch Todos (with token)
  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first!");
        navigate("/auth/login");
        return;
      }

      const res = await axios.get(`${API_URL}/api/todos`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Ensure todos is always an array
      setTodos(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching todos", err);
      if (err.response?.status === 401) {
        toast.error("Session expired, please login again.");
        localStorage.removeItem("token");
        navigate("/auth/login");
      }
    }
  };

  useEffect(() => {
    fetchTodos();
    const toggleHandler = () => setSidebarOpen(s => !s);
    window.addEventListener('sidebar-toggle', toggleHandler);
    return () => window.removeEventListener('sidebar-toggle', toggleHandler);
  }, []);

  useEffect(() => {
    // prevent body scroll when sidebar overlay is open on mobile
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [sidebarOpen]);

  const del = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_URL}/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTodos(Array.isArray(todos) ? todos.filter((todo) => todo._id !== id) : []);
      toast.info("Task deleted");
    } catch (err) {
      console.error("Error deleting todo", err);
      toast.error("Failed to delete task");
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${API_URL}/api/todos/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedTodos = Array.isArray(todos) ? todos.map((t) => (t._id === id ? res.data : t)) : [];
      setTodos(updatedTodos);
      toast.success("Task status updated");
    } catch (err) {
      console.error("Error updating status", err);
      toast.error("Failed to update status");
    }
  };

  const handleEdit = (item) => {
    setSelectedTodo(item);
    setShowUpdate(true);
  };

  const handleUpdate = async (updatedItem) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${API_URL}/api/todos/${selectedTodo._id}`,
        updatedItem,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedTodos = Array.isArray(todos)
        ? todos.map((todo) => (todo._id === selectedTodo._id ? res.data : todo))
        : [];
      setTodos(updatedTodos);
      setShowUpdate(false);
      setShowTaskDetails(false);
      toast.success("Task Updated Successfully");
    } catch (err) {
      console.error("Error updating todo", err);
      toast.error("Failed to update task");
    }
  };

  const handleTaskClick = (task) => {
    setSelectedTodo(task);
    setShowTaskDetails(true);
  };

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = async () => {
    if (Inputs.title === "" || Inputs.body === "") {
      toast.error("Title or Body should not be empty");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const userEmail = localStorage.getItem("userEmail");

      const res = await axios.post(
        `${API_URL}/api/todos`,
        { ...Inputs, userEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTodos([...todos, res.data]);
      setInputs({ title: "", body: "", status: "incomplete", priority: "medium" });
      setShowAddModal(false);
      toast.success("Your Task Is Added");
    } catch (err) {
      console.error("Error adding todo", err);
      toast.error("Failed to add task");
    }
  };

  // ... (existing code) ...

  // Filter and Sort Logic
  const getFilteredTodos = () => {
    if (!Array.isArray(todos)) return [];

    let filtered = [...todos];

    // Filter by Priority
    if (filterPriority !== "All") {
      filtered = filtered.filter(t => (t.priority || "medium") === filterPriority.toLowerCase());
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      if (sortBy === "oldest") return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      if (sortBy === "a-z") return a.title.localeCompare(b.title);
      if (sortBy === "z-a") return b.title.localeCompare(a.title);
      return 0;
    });

    return filtered;
  };

  const filteredList = getFilteredTodos();

  // Filter tasks by status for columns
  // If "Status" filter is active, only show that column (or all if "All")
  const showTodoCol = filterStatus === "All" || filterStatus === "To-Do";
  const showInProgressCol = filterStatus === "All" || filterStatus === "In Progress";
  const showDoneCol = filterStatus === "All" || filterStatus === "Done";

  const todoTasks = showTodoCol ? filteredList.filter((t) => t.status === "incomplete") : [];
  const inProgressTasks = showInProgressCol ? filteredList.filter((t) => t.status === "in-progress") : [];
  const doneTasks = showDoneCol ? filteredList.filter((t) => t.status === "complete") : [];

  return (
    <>
      <ToastContainer
        position="top-right"
        theme="dark"
        toastStyle={{
          background: "#5b68f4",
          color: "white",
          borderRadius: "12px",
        }}
      />


      <div className="taskflow-dashboard">
        {/* Left Sidebar */}
        <div className={`sidebar-container ${sidebarOpen ? 'open' : ''}`}>
          <Sidebar activeTab="today" />
          <button className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></button>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Search and Add Task Bar */}
          <div className="dashboard-top-bar">
            <div className="search-container">
              <MdSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search tasks, projects, etc..."
                className="search-input"
              />
            </div>
            <button className="add-task-btn" onClick={() => setShowAddModal(true)}>
              <MdAdd /> Add Task
            </button>
          </div>

          {/* Page Header */}
          <div className="page-header">
            <div>
              <h1 className="page-title">Today</h1>
              <p className="page-subtitle">Here's a look at what's on your plate for today.</p>
            </div>
          </div>

          {/* Filters */}
          <div className="filters-bar">
            <div className="filter-group">
              {/* Status Filter */}
              <div className="filter-wrapper" style={{ position: 'relative' }}>
                <button className={`filter-btn ${filterStatus !== 'All' ? 'active' : ''}`} onClick={() => toggleDropdown('status')}>
                  Status: {filterStatus} <span className="dropdown-arrow">▼</span>
                </button>
                {activeDropdown === 'status' && (
                  <div className="dropdown-menu">
                    <div className={`dropdown-item ${filterStatus === 'All' ? 'active' : ''}`} onClick={() => { setFilterStatus('All'); setActiveDropdown(null); }}>All</div>
                    <div className={`dropdown-item ${filterStatus === 'To-Do' ? 'active' : ''}`} onClick={() => { setFilterStatus('To-Do'); setActiveDropdown(null); }}>To-Do</div>
                    <div className={`dropdown-item ${filterStatus === 'In Progress' ? 'active' : ''}`} onClick={() => { setFilterStatus('In Progress'); setActiveDropdown(null); }}>In Progress</div>
                    <div className={`dropdown-item ${filterStatus === 'Done' ? 'active' : ''}`} onClick={() => { setFilterStatus('Done'); setActiveDropdown(null); }}>Done</div>
                  </div>
                )}
              </div>

              {/* Priority Filter */}
              <div className="filter-wrapper" style={{ position: 'relative' }}>
                <button className={`filter-btn ${filterPriority !== 'All' ? 'active' : ''}`} onClick={() => toggleDropdown('priority')}>
                  Priority: {filterPriority} <span className="dropdown-arrow">▼</span>
                </button>
                {activeDropdown === 'priority' && (
                  <div className="dropdown-menu">
                    <div className={`dropdown-item ${filterPriority === 'All' ? 'active' : ''}`} onClick={() => { setFilterPriority('All'); setActiveDropdown(null); }}>All</div>
                    <div className={`dropdown-item ${filterPriority === 'High' ? 'active' : ''}`} onClick={() => { setFilterPriority('High'); setActiveDropdown(null); }}>High</div>
                    <div className={`dropdown-item ${filterPriority === 'Medium' ? 'active' : ''}`} onClick={() => { setFilterPriority('Medium'); setActiveDropdown(null); }}>Medium</div>
                    <div className={`dropdown-item ${filterPriority === 'Low' ? 'active' : ''}`} onClick={() => { setFilterPriority('Low'); setActiveDropdown(null); }}>Low</div>
                  </div>
                )}
              </div>

              {/* Labels Filter (Placeholder) */}
              <div className="filter-wrapper" style={{ position: 'relative' }}>
                <button className="filter-btn" onClick={() => toggleDropdown('labels')}>
                  Labels <span className="dropdown-arrow">▼</span>
                </button>
                {activeDropdown === 'labels' && (
                  <div className="dropdown-menu">
                    <div className="dropdown-item">No labels available</div>
                  </div>
                )}
              </div>

              {/* Collaborators Filter (Placeholder) */}
              <div className="filter-wrapper" style={{ position: 'relative' }}>
                <button className="filter-btn" onClick={() => toggleDropdown('collaborators')}>
                  Collaborators <span className="dropdown-arrow">▼</span>
                </button>
                {activeDropdown === 'collaborators' && (
                  <div className="dropdown-menu">
                    <div className="dropdown-item">No collaborators</div>
                  </div>
                )}
              </div>
            </div>

            {/* Sort Button */}
            <div className="filter-wrapper" style={{ position: 'relative' }}>
              <button className="sort-btn" onClick={() => toggleDropdown('sort')}>
                <MdFilterList /> Sort: {sortBy === 'newest' ? 'Newest' : sortBy === 'oldest' ? 'Oldest' : sortBy === 'a-z' ? 'A-Z' : 'Z-A'}
              </button>
              {activeDropdown === 'sort' && (
                <div className="dropdown-menu right-aligned">
                  <div className={`dropdown-item ${sortBy === 'newest' ? 'active' : ''}`} onClick={() => { setSortBy('newest'); setActiveDropdown(null); }}>Newest First</div>
                  <div className={`dropdown-item ${sortBy === 'oldest' ? 'active' : ''}`} onClick={() => { setSortBy('oldest'); setActiveDropdown(null); }}>Oldest First</div>
                  <div className={`dropdown-item ${sortBy === 'a-z' ? 'active' : ''}`} onClick={() => { setSortBy('a-z'); setActiveDropdown(null); }}>Title (A-Z)</div>
                  <div className={`dropdown-item ${sortBy === 'z-a' ? 'active' : ''}`} onClick={() => { setSortBy('z-a'); setActiveDropdown(null); }}>Title (Z-A)</div>
                </div>
              )}
            </div>
          </div>

          {/* Kanban Board */}
          <div className="kanban-board">
            {/* To-Do Column */}
            <div className="kanban-column">
              <div className="column-header">
                <h3 className="column-title">To-Do</h3>
                <span className="column-count">{todoTasks.length}</span>
              </div>
              <div className="column-content">
                {todoTasks.map((task) => (
                  <TodoCard
                    key={task._id}
                    title={task.title}
                    body={task.body}
                    id={task._id}
                    delid={del}
                    onEdit={() => handleEdit(task)}
                    status={task.status}
                    onStatusChange={updateStatus}
                    onClick={() => handleTaskClick(task)}
                    priority={task.priority || "medium"}
                  />
                ))}
              </div>
            </div>

            {/* In Progress Column */}
            <div className="kanban-column">
              <div className="column-header">
                <h3 className="column-title">In Progress</h3>
                <span className="column-count">{inProgressTasks.length}</span>
              </div>
              <div className="column-content">
                {inProgressTasks.map((task) => (
                  <TodoCard
                    key={task._id}
                    title={task.title}
                    body={task.body}
                    id={task._id}
                    delid={del}
                    onEdit={() => handleEdit(task)}
                    status={task.status}
                    onStatusChange={updateStatus}
                    onClick={() => handleTaskClick(task)}
                    priority={task.priority || "high"}
                  />
                ))}
              </div>
            </div>

            {/* Done Column */}
            <div className="kanban-column">
              <div className="column-header">
                <h3 className="column-title">Done</h3>
                <span className="column-count">{doneTasks.length}</span>
              </div>
              <div className="column-content">
                {doneTasks.map((task) => (
                  <TodoCard
                    key={task._id}
                    title={task.title}
                    body={task.body}
                    id={task._id}
                    delid={del}
                    onEdit={() => handleEdit(task)}
                    status={task.status}
                    onStatusChange={updateStatus}
                    onClick={() => handleTaskClick(task)}
                    priority={task.priority || "low"}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Task Details */}
        {showTaskDetails && selectedTodo && (
          <TaskDetailsPanel
            task={selectedTodo}
            onClose={() => setShowTaskDetails(false)}
            onUpdate={handleUpdate}
            onDelete={del}
          />
        )}
      </div>

      {/* Add Task Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="add-task-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Task</h2>
              <button className="close-modal-btn" onClick={() => setShowAddModal(false)}>
                ×
              </button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                placeholder="Task title..."
                onChange={change}
                name="title"
                value={Inputs.title}
                className="modal-input"
              />
              <textarea
                name="body"
                placeholder="Task description..."
                onChange={change}
                value={Inputs.body}
                className="modal-textarea"
                rows="6"
              />
              <div className="input-group" style={{ marginTop: '1rem' }}>
                <label style={{ color: '#9ca3af', marginBottom: '0.5rem', display: 'block', fontSize: '0.9rem' }}>Priority</label>
                <div className="priority-options" style={{ display: 'flex', gap: '1rem' }}>
                  {['low', 'medium', 'high'].map(p => (
                    <label key={p} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: '#fff' }}>
                      <input
                        type="radio"
                        name="priority"
                        value={p}
                        checked={Inputs.priority === p}
                        onChange={change}
                        style={{ accentColor: '#5b68f4' }}
                      />
                      {p.charAt(0).toUpperCase() + p.slice(1)}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="cancel-btn" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
              <button className="submit-btn" onClick={submit}>
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Modal */}
      {showUpdate && selectedTodo && (
        <div className="modal-overlay" id="todo-update">
          <div className="modal-container">
            <Updates
              todo={selectedTodo}
              onUpdate={handleUpdate}
              onClose={() => setShowUpdate(false)}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;

