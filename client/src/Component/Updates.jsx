import React, { useState } from "react";
// import './Updates.css'; // Using dashboard.css classes for consistency
import "./dashboard.css";

const Updates = ({ todo, onUpdate, onClose, onDelete }) => {
  const [title, setTitle] = useState(todo.title);
  const [body, setBody] = useState(todo.body);
  const [priority, setPriority] = useState(todo.priority || "medium");

  const handleSubmit = () => {
    if (title.trim() === "" || body.trim() === "") {
      // You might want to use a toast here if available, but for now generic alert or nothing
      return;
    }
    onUpdate({ title, body, priority });
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      onDelete(todo._id);
    }
  };

  return (
    <div className="add-task-modal" style={{ width: "100%", border: "none" }}>
      {/* Reusing add-task-modal class for styling consistency. 
        Inline style overrides width/border because this component is rendered INSIDE a wrapper in Dashboard */}

      <div className="modal-header">
        <h2>Update Task</h2>
        <button className="close-modal-btn" onClick={onClose}>
          ×
        </button>
      </div>

      <div className="modal-body">
        <input
          type="text"
          className="modal-input"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title..."
        />

        <textarea
          className="modal-textarea"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Task description..."
          rows="5"
        ></textarea>

        <div className="input-group">
          <label
            className="priority-label"
            style={{
              color: "#8b949e",
              marginBottom: "0.5rem",
              display: "block",
              fontSize: "0.9rem",
            }}
          >
            Priority
          </label>
          <div
            className="priority-select-row"
            style={{ display: "flex", gap: "0.75rem" }}
          >
            {["low", "medium", "high"].map((p) => (
              <button
                key={p}
                className={`priority-select-btn ${
                  priority === p ? "selected " + p : ""
                }`}
                onClick={() => setPriority(p)}
              >
                {p.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="modal-footer" style={{ justifyContent: "space-between" }}>
        <button
          className="cancel-btn"
          style={{ borderColor: "#ff7b72", color: "#ff7b72" }}
          onClick={handleDelete}
        >
          Delete
        </button>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="submit-btn" onClick={handleSubmit}>
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Updates;
