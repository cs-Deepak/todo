import React, { useEffect, useState } from "react";
import axios from "axios";
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
  const [Inputs, setInputs] = useState({ title: "", body: "", status: "incomplete" });
  const [todos, setTodos] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const navigate = useNavigate();

  // ✅ Fetch Todos (with token)
  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first!");
        navigate("/auth/login");
        return;
      }

      const res = await axios.get("https://todo-5v1r.onrender.com/api/todos", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTodos(res.data);
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
  }, []);

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
        "https://todo-5v1r.onrender.com/api/todos",
        { ...Inputs, userEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTodos([...todos, res.data]);
      setInputs({ title: "", body: "", status: "incomplete" });
      setShowAddModal(false);
      toast.success("Your Task Is Added");
    } catch (err) {
      console.error("Error adding todo", err);
      toast.error("Failed to add task");
    }
  };

  const del = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://todo-5v1r.onrender.com/api/todos/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTodos(todos.filter((todo) => todo._id !== id));
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
        `https://todo-5v1r.onrender.com/api/todos/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedTodos = todos.map((t) => (t._id === id ? res.data : t));
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
        `https://todo-5v1r.onrender.com/api/todos/${selectedTodo._id}`,
        updatedItem,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedTodos = todos.map((todo) =>
        todo._id === selectedTodo._id ? res.data : todo
      );
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

  // Filter tasks by status
  const todoTasks = todos.filter((t) => t.status === "incomplete");
  const inProgressTasks = todos.filter((t) => t.status === "in-progress");
  const doneTasks = todos.filter((t) => t.status === "complete");

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
        <Sidebar activeTab="today" />

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
              <button className="filter-btn">
                Status: All <span className="dropdown-arrow">▼</span>
              </button>
              <button className="filter-btn">
                Priority <span className="dropdown-arrow">▼</span>
              </button>
              <button className="filter-btn">
                Labels <span className="dropdown-arrow">▼</span>
              </button>
              <button className="filter-btn">
                Collaborators <span className="dropdown-arrow">▼</span>
              </button>
            </div>
            <button className="sort-btn">
              <MdFilterList /> Sort
            </button>
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
                    priority="medium"
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
                    priority="high"
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
                    priority="low"
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

