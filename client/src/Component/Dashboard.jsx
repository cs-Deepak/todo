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
  const [todos, setTodos] = useState([]);
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

  const fetchTodos = async () => {
    try {
      const res = await axios.get('http://localhost:6005/api/todos', { withCredentials: true });
      setTodos(res.data);
    } catch (err) {
      console.error('Error fetching todos', err);
    }
  };

  useEffect(() => {
    getUser();
    fetchTodos();
  }, []);

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...Inputs, [name]: value });
  };

  const submit = async () => {
    if (Inputs.title === '' || Inputs.body === '') {
      toast.error('Title Or Body Should not be Empty');
    } else {
      try {
        const res = await axios.post('http://localhost:6005/api/todos', Inputs, { withCredentials: true });
        setTodos([...todos, res.data]);
        setInputs({ title: '', body: '' });
        toast.success('Your Task Is Added');
      } catch (err) {
        console.error('Error adding todo', err);
        toast.error('Failed to add task');
      }
    }
  };

  const del = async (id) => {
    try {
      await axios.delete(`http://localhost:6005/api/todos/${id}`, { withCredentials: true });
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (err) {
      console.error('Error deleting todo', err);
      toast.error('Failed to delete task');
    }
  };

  const handleEdit = (item) => {
    setSelectedTodo(item);
    setShowUpdate(true);
  };

  const handleUpdate = async (updatedItem) => {
    try {
      const res = await axios.put(`http://localhost:6005/api/todos/${selectedTodo._id}`, updatedItem, { withCredentials: true });
      const updatedTodos = todos.map(todo => (todo._id === selectedTodo._id ? res.data : todo));
      setTodos(updatedTodos);
      setShowUpdate(false);
      toast.success('Task Updated Successfully');
    } catch (err) {
      console.error('Error updating todo', err);
      toast.error('Failed to update task');
    }
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
            </div>
            
            <button className="add-button" onClick={submit}>
              <span className="button-text">Add Task</span>
            </button>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="tasks-section">
          <div className="tasks-header">
            <h2 className="section-title">Your Tasks</h2>
            <div className="tasks-count">
              <span className="count-badge">{todos.length}</span>
              <span className="count-text">Total Tasks</span>
            </div>
          </div>
          
          {todos.length === 0 ? (
            <div className="empty-state">
              <h3 className="empty-title">No tasks yet!</h3>
              <p className="empty-subtitle">Create your first task to get started</p>
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
