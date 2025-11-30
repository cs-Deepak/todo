import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./home.css";
import { FaList, FaSync, FaUsers } from 'react-icons/fa';

function Home() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/auth/signup');
  };

  const handleSeeDemo = () => {
    navigate('/auth/login');
  };

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero-section-landing">
        <div className="hero-container">
          <h1 className="hero-heading">
            Organize Your Life,
            <br />
            Effortlessly
          </h1>
          <p className="hero-description">
            The modern to-do app that helps you focus on what truly matters.
            <br />
            Smart, collaborative, and beautifully simple.
          </p>
          <div className="hero-buttons">
            <button className="btn-primary" onClick={handleGetStarted}>
              Get Started
            </button>
            <button className="btn-secondary" onClick={handleSeeDemo}>
              See Demo
            </button>
          </div>
        </div>
      </section>

      {/* App Preview */}
      <section className="preview-section">
        <div className="preview-container">
          <div className="dashboard-preview">
            {/* Sidebar */}
            <div className="preview-sidebar">
              <div className="preview-logo">
                <div className="logo-icon">📋</div>
                <span>TaskFlow</span>
              </div>
              <div className="preview-nav">
                <div className="preview-nav-item active">📥 Today</div>
                <div className="preview-nav-item">📅 Upcoming</div>
                <div className="preview-nav-item">📁 Projects</div>
                <div className="preview-nav-item">🏷️ Tags</div>
                <div className="preview-nav-item">📦 Archived</div>
              </div>
            </div>

            {/* Main Content */}
            <div className="preview-main">
              <div className="preview-header">
                <h2 className="preview-title">Today</h2>
                <button className="preview-add-btn">+ Add Task</button>
              </div>

              {/* Kanban Columns */}
              <div className="preview-kanban">
                {/* To-Do Column */}
                <div className="preview-column">
                  <div className="preview-column-header">
                    <span>To-Do</span>
                    <span className="preview-count">3</span>
                  </div>
                  <div className="preview-card">
                    <div className="preview-card-bar blue"></div>
                    <div className="preview-card-content">
                      <h4>Design new landing page</h4>
                      <p>Create mockups and wireframes</p>
                    </div>
                  </div>
                  <div className="preview-card">
                    <div className="preview-card-bar orange"></div>
                    <div className="preview-card-content">
                      <h4>Review pull requests</h4>
                      <p>Check team submissions</p>
                    </div>
                  </div>
                </div>

                {/* In Progress Column */}
                <div className="preview-column">
                  <div className="preview-column-header">
                    <span>In Progress</span>
                    <span className="preview-count">2</span>
                  </div>
                  <div className="preview-card">
                    <div className="preview-card-bar orange"></div>
                    <div className="preview-card-content">
                      <h4>API Development</h4>
                      <p>Building REST endpoints</p>
                    </div>
                  </div>
                </div>

                {/* Done Column */}
                <div className="preview-column">
                  <div className="preview-column-header">
                    <span>Done</span>
                    <span className="preview-count">1</span>
                  </div>
                  <div className="preview-card">
                    <div className="preview-card-bar green"></div>
                    <div className="preview-card-content">
                      <h4>Setup database</h4>
                      <p>MongoDB configuration</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section-landing" id="features">
        <div className="features-container">
          <h2 className="section-heading">Features Designed for Productivity</h2>
          <p className="section-subheading">Everything you need to stay organized and achieve your goals.</p>

          <div className="features-grid-landing">
            <div className="feature-card-landing">
              <div className="feature-icon-landing">
                <FaList />
              </div>
              <h3 className="feature-title-landing">Smart Lists</h3>
              <p className="feature-desc-landing">
                Automatically organize and prioritize your tasks with intelligent filters.
              </p>
            </div>

            <div className="feature-card-landing">
              <div className="feature-icon-landing">
                <FaSync />
              </div>
              <h3 className="feature-title-landing">Recurring Tasks</h3>
              <p className="feature-desc-landing">
                Set up tasks to repeat on your schedule. Never miss a beat.
              </p>
            </div>

            <div className="feature-card-landing">
              <div className="feature-icon-landing">
                <FaUsers />
              </div>
              <h3 className="feature-title-landing">Collaboration</h3>
              <p className="feature-desc-landing">
                Work together with teams and track progress in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="testimonials-container">
          <h2 className="section-heading">Trusted by Professionals</h2>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="testimonial-avatar">
                <img src="https://i.pravatar.cc/150?img=1" alt="Sarah L." />
              </div>
              <h4 className="testimonial-name">Sarah L.</h4>
              <p className="testimonial-text">
                "This app has completely transformed how I manage my day. I can't imagine life without it!"
              </p>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-avatar">
                <img src="https://i.pravatar.cc/150?img=13" alt="Michael R." />
              </div>
              <h4 className="testimonial-name">Michael R.</h4>
              <p className="testimonial-text">
                "The collaboration features are a game-changer for my team. We're more productive than ever."
              </p>
            </div>

            <div className="testimonial-card">
              <div className="testimonial-avatar">
                <img src="https://i.pravatar.cc/150?img=5" alt="Alex S." />
              </div>
              <h4 className="testimonial-name">Alex S.</h4>
              <p className="testimonial-text">
                "I tried a thousand apps. That's the one I was really looking for. It's so easy and simple to use."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-brand">
              <h3 className="footer-logo">TaskFlow</h3>
              <p className="footer-tagline">Stay productive. It's that simple.</p>
              <div className="footer-newsletter">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="newsletter-input"
                />
                <button className="newsletter-btn">Subscribe</button>
              </div>
            </div>

            <div className="footer-links">
              <div className="footer-column">
                <h4 className="footer-heading">Product</h4>
                <a href="#features" className="footer-link">Features</a>
                <a href="#pricing" className="footer-link">Pricing</a>
                <a href="#integrations" className="footer-link">Integrations</a>
                <a href="#api" className="footer-link">API</a>
              </div>

              <div className="footer-column">
                <h4 className="footer-heading">Company</h4>
                <a href="#about" className="footer-link">About Us</a>
                <a href="#blog" className="footer-link">Blog</a>
                <a href="#careers" className="footer-link">Careers</a>
                <a href="#contact" className="footer-link">Contact</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copyright">© 2024 TaskFlow. All rights reserved.</p>
            <div className="footer-legal">
              <a href="#privacy" className="footer-legal-link">Privacy Policy</a>
              <a href="#terms" className="footer-legal-link">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
