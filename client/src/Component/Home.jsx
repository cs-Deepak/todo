

import React from 'react';
import { Link } from "react-router-dom";
import "./home.css";
import { useNavigate } from 'react-router-dom';
import checkImg from '../assets/check.png';
function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/auth/login');
  };

  return (
    <>
      <div className='main'>
        <div className="righheading">
          <h1 className='title'>
            Track Long-Term <br />
            Goals and <br />
            Progress
          </h1>
          <p className='para'>
            Make life easier for both you and your team with the top-rated <br />
            task manager and to-do list application in the world.
          </p>
          
          <button className='button' onClick={handleClick}>
            <span className='button-text'>Try Now</span>
            <svg className='button-icon' width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </button>
        </div>
        
        <div className="leftheading">
          <div className="image-container">
            <img src={checkImg} alt="check-box" className='check-box'/>
            <div className="image-overlay"></div>
          </div>
        </div>
      </div>

      <section className="features">
  <h2 className="features-title">Everything You Need To Stay Organized</h2>
  <p className="features-subtitle">
    Add tasks, update progress, change status, and manage your work with a simple and powerful interface.
  </p>

  <div className="features-grid">

    <div className="feature-card">
      <h3>Add Tasks Instantly</h3>
      <p>
        Quickly add new todos with a clean and simple input box.  
        Plan your day in seconds, not minutes.
      </p>
    </div>

    <div className="feature-card">
      <h3>Update & Edit Anytime</h3>
      <p>
        Change task titles or descriptions anytime without losing data.  
        Edit smoothly with our flexible editor.
      </p>
    </div>

    <div className="feature-card">
      <h3>Status Management</h3>
      <p>
        Track where your tasks stand in real-time with three powerful modes:  
        <strong>Completed, In-Process, Incomplete</strong>.
      </p>
    </div>

    <div className="feature-card">
      <h3>Delete With One Click</h3>
      <p>
        Clean your workspace by deleting finished or unnecessary tasks  
        in a fast and easy way.
      </p>
    </div>

  </div>
</section>

    </>
  );
}


export default Home;
