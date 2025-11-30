import React, { useState, useEffect } from 'react';
import './TaskDetailsPanel.css';
import { MdClose, MdPerson, MdCalendarToday, MdFlag, MdFolder, MdAttachFile, MdDelete } from 'react-icons/md';

const TaskDetailsPanel = ({ task, onClose, onUpdate, onDelete }) => {
    const [editedTask, setEditedTask] = useState({
        title: '',
        body: '',
        status: 'incomplete',
        priority: 'medium',
        dueDate: '',
    });

    useEffect(() => {
        if (task) {
            setEditedTask({
                title: task.title || '',
                body: task.body || '',
                status: task.status || 'incomplete',
                priority: task.priority || 'medium',
                dueDate: task.dueDate || '',
            });
        }
    }, [task]);

    const handleChange = (field, value) => {
        setEditedTask(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        onUpdate(editedTask);
    };

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            onDelete(task._id);
            onClose();
        }
    };

    if (!task) return null;

    return (
        <div className="task-details-panel">
            <div className="panel-header">
                <h3 className="panel-title">Task Details</h3>
                <button className="close-btn" onClick={onClose}>
                    <MdClose />
                </button>
            </div>

            <div className="panel-content">
                {/* Title */}
                <div className="detail-section">
                    <label className="detail-label">Title</label>
                    <input
                        type="text"
                        className="detail-input"
                        value={editedTask.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        placeholder="Task title"
                    />
                </div>

                {/* Description */}
                <div className="detail-section">
                    <label className="detail-label">Description</label>
                    <textarea
                        className="detail-textarea"
                        value={editedTask.body}
                        onChange={(e) => handleChange('body', e.target.value)}
                        placeholder="Add description..."
                        rows="6"
                    />
                </div>

                {/* Assignee */}
                <div className="detail-section">
                    <label className="detail-label">
                        <MdPerson className="label-icon" />
                        Assignee
                    </label>
                    <div className="assignee-display">
                        <div className="avatar">AM</div>
                        <span className="assignee-name">Alex Morgan</span>
                    </div>
                </div>

                {/* Due Date */}
                <div className="detail-section">
                    <label className="detail-label">
                        <MdCalendarToday className="label-icon" />
                        Due Date
                    </label>
                    <input
                        type="date"
                        className="detail-input"
                        value={editedTask.dueDate}
                        onChange={(e) => handleChange('dueDate', e.target.value)}
                    />
                </div>

                {/* Project */}
                <div className="detail-section">
                    <label className="detail-label">
                        <MdFolder className="label-icon" />
                        Project
                    </label>
                    <select className="detail-select">
                        <option>Core Application</option>
                        <option>Marketing</option>
                        <option>Design</option>
                    </select>
                </div>

                {/* Priority */}
                <div className="detail-section">
                    <label className="detail-label">
                        <MdFlag className="label-icon" />
                        Priority
                    </label>
                    <select
                        className="detail-select"
                        value={editedTask.priority}
                        onChange={(e) => handleChange('priority', e.target.value)}
                    >
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>

                {/* Status */}
                <div className="detail-section">
                    <label className="detail-label">Status</label>
                    <select
                        className="detail-select"
                        value={editedTask.status}
                        onChange={(e) => handleChange('status', e.target.value)}
                    >
                        <option value="incomplete">To-Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="complete">Done</option>
                    </select>
                </div>

                {/* Attachments */}
                <div className="detail-section">
                    <label className="detail-label">
                        <MdAttachFile className="label-icon" />
                        Attachments
                    </label>
                    <div className="attachment-item">
                        <MdAttachFile className="attachment-icon" />
                        <div className="attachment-info">
                            <span className="attachment-name">API_Specs.pdf</span>
                            <span className="attachment-size">1.2 MB</span>
                        </div>
                    </div>
                </div>

                {/* Activity */}
                <div className="detail-section">
                    <label className="detail-label">Activity</label>
                    <div className="activity-feed">
                        <div className="activity-item">
                            <div className="activity-avatar">JD</div>
                            <div className="activity-content">
                                <p className="activity-text">
                                    <strong>Jane Doe</strong> added a comment.
                                </p>
                                <p className="activity-comment">"Let's make sure to include JWT refresh tokens."</p>
                                <span className="activity-time">2 hours ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="panel-footer">
                <button className="save-btn" onClick={handleSave}>
                    Save Changes
                </button>
                <button className="delete-btn-panel" onClick={handleDelete}>
                    <MdDelete /> Delete Task
                </button>
            </div>
        </div>
    );
};

export default TaskDetailsPanel;
