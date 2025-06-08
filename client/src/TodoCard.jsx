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
import { MdDelete } from 'react-icons/md';
import { MdTipsAndUpdates } from 'react-icons/md';

const TodoCard = ({ title, body, id, delid, onEdit }) => {
  return (
    <div className="modern-todo-card">
      <div className="card-header">
        <div className="priority-indicator"></div>
        <div className="card-menu">
          <div className="menu-dot"></div>
          <div className="menu-dot"></div>
          <div className="menu-dot"></div>
        </div>
      </div>
      
      <div className="card-content">
        <h4 className="card-title">{title}</h4>
        <p className="card-description">
          {body.length > 75 ? body.substring(0, 75) + '...' : body}
        </p>
      </div>
      
      <div className="card-footer">
        <div className="action-buttons">
          <button className="action-btn edit-btn" onClick={onEdit}>
            <div className="btn-icon">
              <MdTipsAndUpdates />
            </div>
            <span className="btn-text">Edit</span>
            <div className="btn-shine"></div>
          </button>
          
          <button className="action-btn delete-btn" onClick={() => delid(id)}>
            <div className="btn-icon">
              <MdDelete />
            </div>
            <span className="btn-text">Delete</span>
            <div className="btn-shine"></div>
          </button>
        </div>
        
        <div className="card-timestamp">
          <div className="timestamp-dot"></div>
          <span>Task #{id + 1}</span>
        </div>
      </div>
      
      <div className="card-glow"></div>
    </div>
  );
};

export default TodoCard;