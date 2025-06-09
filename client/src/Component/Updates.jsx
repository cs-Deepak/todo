

import React, { useState } from 'react';
import './Updates.css';

const Updates = ({ todo, onUpdate, onClose }) => {
  const [title, setTitle] = useState(todo.title);
  const [body, setBody] = useState(todo.body);

  const handleSubmit = () => {
    if (title.trim() === '' || body.trim() === '') {
      alert('Title or Body cannot be empty');
      return;
    }
    onUpdate({ title, body });
  };

  return (
    <div className="update-overlay">
      <div className="update-container">
        <div className="update-header">
          <h3 className="update-title">Update Your Task</h3>
          <button className="close-btn" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div className="update-content">
          <div className="input-group">
            <label className="input-label">Task Title</label>
            <input
              type="text"
              className="todo-inputs"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title..."
            />
          </div>
          
          <div className="input-group">
            <label className="input-label">Description</label>
            <textarea
              className="todo-text"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Describe your task in detail..."
              rows="4"
            ></textarea>
          </div>
          
          <div className="btn-update">
            <button className="update-btn primary" onClick={handleSubmit}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                <polyline points="17,21 17,13 7,13 7,21"></polyline>
                <polyline points="7,3 7,8 15,8"></polyline>
              </svg>
              Update Task
            </button>
            <button className="update-btn secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
        
        <div className="update-accent"></div>
      </div>
    </div>
  );
};

export default Updates;
