

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
        <p class="cta-subtitle">Join thousands of users who are achieving their goals with our powerful todo manager</p>
        <button class="cta-button" onclick="window.location.href='/auth/login'">
            <span>Start Free Today</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
            </svg>
        </button>
    </div>

      


    </>
  );
}


export default Home;


