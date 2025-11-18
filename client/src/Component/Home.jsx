

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

    
    <div class="features-section">
        <div class="section-header">
            <h2 class="section-title">Powerful Features at Your Fingertips</h2>
            <p class="section-subtitle">Everything you need to manage your tasks efficiently</p>
        </div>
        
        <div class="features-grid">
            <div class="feature-card">
                <div class="feature-icon">
                    <svg viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="2"/>
                    </svg>
                </div>
                <h3 class="feature-title">Add Tasks Instantly</h3>
                <p class="feature-desc">Create new todos with a single click. Organize your day effortlessly and stay on top of everything.</p>
            </div>

            <div class="feature-card">
                <div class="feature-icon">
                    <svg viewBox="0 0 24 24">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                </div>
                <h3 class="feature-title">Update Anytime</h3>
                <p class="feature-desc">Edit task details on the go. Keep your todos always up-to-date with real-time changes.</p>
            </div>

            <div class="feature-card">
                <div class="feature-icon">
                    <svg viewBox="0 0 24 24">
                        <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
                    </svg>
                </div>
                <h3 class="feature-title">Track Status</h3>
                <p class="feature-desc">Mark tasks as Incomplete, In-Process, or Completed with ease. Monitor your progress visually.</p>
            </div>

            <div class="feature-card">
                <div class="feature-icon">
                    <svg viewBox="0 0 24 24">
                        <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        <line x1="10" y1="11" x2="10" y2="17"/>
                        <line x1="14" y1="11" x2="14" y2="17"/>
                    </svg>
                </div>
                <h3 class="feature-title">Delete with Ease</h3>
                <p class="feature-desc">Remove unwanted tasks instantly. Keep your list clean, focused, and clutter-free.</p>
            </div>
        </div>
    </div>


    <div class="status-section">
        <div class="section-header">
            <h2 class="section-title">Track Every Stage of Your Tasks</h2>
            <p class="section-subtitle">Visualize your progress with three intuitive status levels</p>
        </div>
        
        <div class="status-grid">
            <div class="status-card incomplete">
                <div class="status-icon">
                    <svg viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10"/>
                        <polyline points="12 6 12 12 16 14"/>
                    </svg>
                </div>
                <h3 class="status-title">Incomplete</h3>
                <p class="status-desc">Tasks waiting to begin. Set your priorities and start when ready.</p>
            </div>

            <div class="status-card in-process">
                <div class="status-icon">
                    <svg viewBox="0 0 24 24">
                        <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2"/>
                    </svg>
                </div>
                <h3 class="status-title">In-Process</h3>
                <p class="status-desc">Tasks you're actively working on. Stay focused on what matters most.</p>
            </div>

            <div class="status-card completed">
                <div class="status-icon">
                    <svg viewBox="0 0 24 24">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                </div>
                <h3 class="status-title">Completed</h3>
                <p class="status-desc">Tasks you've successfully finished. Celebrate your achievements!</p>
            </div>
        </div>
    </div>

  
    <div class="cta-section">
        <h2 class="cta-title">Ready to Get Organized?</h2>
      
      <button className='button' onClick={handleClick}>
            <span className='button-text'>Try Now</span>
            <svg className='button-icon' width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14"></path>
              <path d="m12 5 7 7-7 7"></path>
            </svg>
          </button>
    </div>

      


    </>
  );
}


export default Home;




