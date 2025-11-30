// import React from 'react';
// import './todocard.css';
// import { MdDelete } from 'react-icons/md';
// import { MdTipsAndUpdates } from 'react-icons/md';

// const TodoCard = ({ title, body, id, delid, onEdit }) => {
//   return (
//     <div className="todo-card">
//       <div>
//         <h4>{title}</h4>
//         <p className="para">{body.length > 75 ? body.substring(0, 75) + '...' : body}</p>
//       </div>
//       <div className="up-del">
//         <div className="icon-btn" onClick={onEdit}>
//           <MdTipsAndUpdates className="card-icon" />
//           <span style={{ cursor: 'pointer' }}>Update</span>
//         </div>
//         <div className="icon-btn" onClick={() => delid(id)}>
//           <MdDelete className="card-icon del" />
//           <span style={{ cursor: 'pointer' }}>Delete</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TodoCard;


import React from 'react';
import './todocard.css';
import { MdCalendarToday, MdPerson } from 'react-icons/md';

const TodoCard = ({ title, body, id, delid, onEdit, status, onStatusChange, onClick, priority = 'medium' }) => {
  const getPriorityColor = () => {
    switch (priority) {
      case 'high': return '#ff6b6b';
      case 'medium': return '#5b68f4';
      case 'low': return '#51cf66';
      default: return '#5b68f4';
    }
  };

  return (
    <div className="kanban-card" onClick={onClick}>
      <div className="card-priority-bar" style={{ background: getPriorityColor() }}></div>

      <div className="kanban-card-content">
        <h4 className="kanban-card-title">{title}</h4>
        <p className="kanban-card-description">
          {body.length > 100 ? body.substring(0, 100) + '...' : body}
        </p>

        <div className="kanban-card-tags">
          <span className="task-tag">UI/UX</span>
          <span className="task-tag">Design</span>
        </div>

        <div className="kanban-card-footer">
          <div className="card-meta">
            <div className="meta-item">
              <MdCalendarToday className="meta-icon" />
              <span className="meta-text">Oct 25</span>
            </div>
          </div>
          <div className="card-avatar">AM</div>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
