import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import TodoCard from "../TodoCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Updates from "./Updates";

function Dashboard() {
  const [Inputs, setInputs] = useState({ title: "", body: "", status: "incomplete" });
  const [todos, setTodos] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const navigate = useNavigate();

  // ✅ Fetch Todos (with token)
  const fetchTodos = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please login first!");
        navigate("/login");
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
        navigate("/login");
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
      const userEmail = localStorage.getItem("userEmail"); // 👈 get user email saved during login

      const res = await axios.post(
        "https://todo-5v1r.onrender.com/api/todos",
        { ...Inputs, userEmail }, // includes title, body, status
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setTodos([...todos, res.data]);
      setInputs({ title: "", body: "" });
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

  // Update status of a todo
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
      toast.success("Task Updated Successfully");
    } catch (err) {
      console.error("Error updating todo", err);
      toast.error("Failed to update task");
    }
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        theme="dark"
        toastStyle={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          borderRadius: "12px",
        }}
      />

      <div className="dashboard-container">
        {/* Header */}
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="title-gradient">My Todo Dashboard</span>
            </h1>
            <p className="hero-subtitle">
              Organize your tasks with style and efficiency
            </p>
          </div>
        </div>

        {/* Add Task */}
        <div className="input-section">
          <div className="input-container">
            <div className="input-header">
              <h2 className="section-title">Add New Task</h2>
              <div className="title-underline"></div>
            </div>

            <div className="form-group">
              <div className="input-wrapper">
                <input
                  type="text"
                  placeholder="Enter task title..."
                  onChange={change}
                  name="title"
                  value={Inputs.title}
                  className="modern-input title-input"
                />
              </div>

              <div className="textarea-wrapper">
                <textarea
                  name="body"
                  placeholder="Describe your task in detail..."
                  onChange={change}
                  value={Inputs.body}
                  className="modern-textarea"
                  rows="4"
                ></textarea>
              </div>
              {/* <div style={{ marginTop: 12, display: 'flex', gap: 8, alignItems: 'center' }}>
                <label style={{ color: '#666' }}>Status:</label>
                <select name="status" value={Inputs.status} onChange={change} style={{ padding: '6px 8px', borderRadius: 6 }}>
                  <option value="incomplete">Incomplete</option>
                  <option value="in-progress">In-Progress</option>
                  <option value="complete">Complete</option>
                </select>
              </div> */}
            </div>
            <div className="image-adding">
              <button className="add-button" onClick={submit}>
                <span className="button-text">Add Task</span>
              </button>
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="tasks-section">
          <div className="tasks-header">
            <h2 className="section-title">Your Tasks</h2>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <div className="tasks-count">
                <span className="count-badge">{todos.length}</span>
                <span className="count-text">Total</span>
              </div>
              <div className="tasks-count">
                <span className="count-badge">{todos.filter(t => t.status === 'complete').length}</span>
                <span className="count-text">Completed</span>
              </div>
            </div>
          </div>

          {todos.length === 0 ? (
            <div className="empty-state">
              <h3 className="empty-title">No tasks yet!</h3>
              <p className="empty-subtitle">
                Create your first task to get started
              </p>
            </div>
          ) : (
            <div className="tasks-grid">
              {todos.map((item) => (
                <div className="task-card-wrapper" key={item._id}>
                  <TodoCard
                    title={item.title}
                    body={item.body}
                    id={item._id}
                    delid={del}
                    onEdit={() => handleEdit(item)}
                    status={item.status}
                    onStatusChange={updateStatus}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

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
