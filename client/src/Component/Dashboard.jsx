// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './dashboard.css';
// import TodoCard from '../TodoCard';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Updates from './Updates';



// function Dashboard() {
//   const [Inputs, setInputs] = useState({ title: '', body: '' });
//   const [Array, setArray] = useState([]);
//   const [showUpdate, setShowUpdate] = useState(false);
//   const [selectedTodo, setSelectedTodo] = useState(null);
//   const navigate = useNavigate();

//   const getUser = async () => {
//     try {
//       const response = await axios.get('http://localhost:6005/login/success', {
//         withCredentials: true,
//       });
//       console.log('response', response.data);
//     } catch (error) {
//       console.error('Auth failed, redirecting...');
//       navigate('*');
//     }
//   };

//   useEffect(() => {
//     getUser();
//   }, []);

//   const change = (e) => {
//     const { name, value } = e.target;
//     setInputs({ ...Inputs, [name]: value });
//   };

//   const submit = () => {
//     if (Inputs.title === '' || Inputs.body === '') {
//       toast.error('Title Or Body Should not be Empty');
//     } else {
//       setArray([...Array, Inputs]);
//       setInputs({ title: '', body: '' });
//       toast.success('Your Task Is Added');
//     }
//   };

//   const del = (id) => {
//     const updatedArray = [...Array];
//     updatedArray.splice(id, 1);
//     setArray(updatedArray);
//   };

//   const handleEdit = (item, index) => {
//     setSelectedTodo({ ...item, index });
//     setShowUpdate(true);
//   };

//   const handleUpdate = (updatedItem) => {
//     const updatedArray = [...Array];
//     updatedArray[selectedTodo.index] = updatedItem;
//     setArray(updatedArray);
//     setShowUpdate(false);
//     toast.success('Task Updated Successfully');
//   };

//   return (
//     <>
//       <ToastContainer />
//       <div style={{ textAlign: 'center' }}>
//         <h1>Todo</h1>
//         <div className="conatainer">
//           <input type="text" placeholder="TITLE" onChange={change} name="title" value={Inputs.title} />
//           <textarea name="body" placeholder="BODY" onChange={change} value={Inputs.body}></textarea>
//         </div>
//         <button className="button-add" onClick={submit}>
//           Add
//         </button>
//       </div>
//       <div className="todo-body">
//         <div className="container-todo">
//           <div className="row">
//             {Array.map((item, index) => (
//               <div className="col-lg-3-bg-success mx-5 my-2" key={index}>
//                 <TodoCard title={item.title} body={item.body} id={index} delid={del} onEdit={() => handleEdit(item, index)} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {showUpdate && selectedTodo && (
//         <div className="todo-update" id="todo-update">
//           <div className="container">
//             <Updates todo={selectedTodo} onUpdate={handleUpdate} onClose={() => setShowUpdate(false)} />
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default Dashboard;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './dashboard.css';
import TodoCard from '../TodoCard';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Updates from './Updates';

function Dashboard() {
  const [Inputs, setInputs] = useState({ title: '', body: '' });
  const [Array, setArray] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await axios.get('http://localhost:6005/login/success', {
        withCredentials: true,
      });
      console.log('response', response.data);
    } catch (error) {
      console.error('Auth failed, redirecting...');
      navigate('*');
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = () => {
    if (Inputs.title === '' || Inputs.body === '') {
      toast.error('Title Or Body Should not be Empty');
    } else {
      setArray([...Array, Inputs]);
      setInputs({ title: '', body: '' });
      toast.success('Your Task Is Added');
    }
  };

  const del = (id) => {
    const updatedArray = [...Array];
    updatedArray.splice(id, 1);
    setArray(updatedArray);
  };

  const handleEdit = (item, index) => {
    setSelectedTodo({ ...item, index });
    setShowUpdate(true);
  };

  const handleUpdate = (updatedItem) => {
    const updatedArray = [...Array];
    updatedArray[selectedTodo.index] = updatedItem;
    setArray(updatedArray);
    setShowUpdate(false);
    toast.success('Task Updated Successfully');
  };

  return (
    <>
      <ToastContainer 
        position="top-right"
        theme="dark"
        toastStyle={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: '12px'
        }}
      />
      
      <div className="dashboard-container">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="title-gradient">My Todo Dashboard</span>
            </h1>
            <p className="hero-subtitle">Organize your tasks with style and efficiency</p>
          </div>
        </div>

        {/* Input Section */}
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
                <div className="input-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
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
                <div className="textarea-icon">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
                </div>
              </div>
            </div>
            
            <button className="add-button" onClick={submit}>
              <span className="button-text">Add Task</span>
              <div className="button-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </button>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="tasks-section">
          <div className="tasks-header">
            <h2 className="section-title">Your Tasks</h2>
            <div className="tasks-count">
              <span className="count-badge">{Array.length}</span>
              <span className="count-text">Total Tasks</span>
            </div>
          </div>
          
          {Array.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="empty-title">No tasks yet!</h3>
              <p className="empty-subtitle">Create your first task to get started</p>
            </div>
          ) : (
            <div className="tasks-grid">
              {Array.map((item, index) => (
                <div className="task-card-wrapper" key={index}>
                  <TodoCard 
                    title={item.title} 
                    body={item.body} 
                    id={index} 
                    delid={del} 
                    onEdit={() => handleEdit(item, index)} 
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