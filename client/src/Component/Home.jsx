import React from "react";
import { useNavigate } from "react-router-dom";
import "./home.css";
import {
  MdCheckCircle,
  MdPlayArrow,
  MdArrowForward,
  MdArrowBack,
  MdSync,
  MdBolt,
  MdDarkMode,
  MdAdd,
} from "react-icons/md";
import { FaApple, FaGooglePlay, FaCheckCircle, FaStar } from "react-icons/fa";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="container">
    
      

        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <div className="new-tag">
              <span
                style={{
                  width: 8,
                  height: 8,
                  background: "#2ed16c",
                  borderRadius: "50%",
                }}
              ></span>
              New iOS & Android App
            </div>
            <h1 className="hero-title">
              Organize your <br />
              life in <span className="text-focus">focus.</span>
            </h1>
            <p className="hero-subtitle">
              Experience the calm of organized productivity. Our new mobile app
              brings the power of TaskMaster to your pocket with a seamless,
              dark-mode-first design.
            </p>
            <div className="hero-buttons">
              <button
                className="btn-primary"
                onClick={() => navigate("/auth/signup")}
              >
                <span className="icon">↓</span> Download Now
              </button>
              <button className="btn-secondary">
                <MdPlayArrow size={20} /> Watch Video
              </button>
            </div>
            <div className="user-trust">
              <div className="avatars">
                <div className="avatar"></div>
                <div className="avatar"></div>
                <div className="avatar"></div>
              </div>
              <span className="trust-text">Joined by 20,000+ users</span>
            </div>
          </div>

          
        </section>

        {/* Features Section */}
        <section className="features-section" id="method">
          <h2 className="section-title">Streamlined for productivity</h2>
          <p className="section-subtitle">
            We removed the clutter so you can focus on what actually
            matters—getting things done.
          </p>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-box icon-green">
                <MdSync />
              </div>
              <h3 className="feature-title">Instant Sync</h3>
              <p className="feature-desc">
                Changes made on your phone appear instantly on your desktop.
                Your workflow, uninterrupted.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-box icon-purple">
                <MdBolt />
              </div>
              <h3 className="feature-title">Quick Actions</h3>
              <p className="feature-desc">
                Capture tasks in seconds with natural language processing and
                smart shortcuts.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-box icon-blue">
                <MdDarkMode />
              </div>
              <h3 className="feature-title">True Dark Mode</h3>
              <p className="feature-desc">
                Designed for OLED screens to save battery and reduce eye strain
                during night sessions.
              </p>
            </div>
          </div>
        </section>

        {/* Workflow Carousel (Simplification: Static Cards) */}
        <section className="workflow-section">
          <div className="workflow-header">
            <div>
              <h2 className="section-title">Designed for your workflow</h2>
              <p style={{ color: "#8b949e" }}>
                Swipe to explore the different views.
              </p>
            </div>
            <div className="nav-arrows">
              <button className="arrow-btn">
                <MdArrowBack />
              </button>
              <button className="arrow-btn">
                <MdArrowForward />
              </button>
            </div>
          </div>

          <div className="workflow-grid">
            <div className="workflow-card">
              <div
                className="card-bg-image"
                style={{
                  background:
                    "linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 100%)",
                }}
              ></div>{" "}
              {/* Placeholder for image */}
              <div className="workflow-card-content">
                <h3>Today View</h3>
                <p style={{ fontSize: "0.85rem", color: "#ccc" }}>
                  Focus on what's due now.
                </p>
              </div>
            </div>
            <div className="workflow-card">
              <div
                className="card-bg-image"
                style={{
                  background:
                    "linear-gradient(135deg, #e3c4a8 0%, #f5e4d3 100%)",
                }}
              ></div>
              <div className="workflow-card-content">
                <h3>Calendar</h3>
                <p style={{ fontSize: "0.85rem", color: "#ccc" }}>
                  Plan your month ahead.
                </p>
              </div>
            </div>
            <div className="workflow-card">
              <div
                className="card-bg-image"
                style={{ background: "#0d1117" }}
              ></div>
              <div className="workflow-card-content">
                <h3>Analytics</h3>
                <p style={{ fontSize: "0.85rem", color: "#ccc" }}>
                  Track your productivity trends.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cta-section">
          <div className="cta-box">
            <div className="cta-content">
              <h2 className="cta-title">Ready to get started?</h2>
              <p className="cta-desc">
                Join thousands of productive people. Download TaskMaster on iOS
                or Android today.
              </p>
              <div className="cta-buttons">
                <button className="store-btn">
                  <FaApple size={20} /> App Store
                </button>
                <button className="store-btn">
                  <FaGooglePlay size={18} /> Play Store
                </button>
              </div>
            </div>

            <div className="qr-card">
              <div className="qr-code-placeholder">
                <div className="qr-block"></div>
                <div className="qr-block"></div>
                <div className="qr-block"></div>
                <div className="qr-block"></div>
              </div>
              <p
                style={{
                  color: "#000",
                  fontWeight: "bold",
                  fontSize: "0.8rem",
                }}
              >
                Scan to install
              </p>
              <p style={{ color: "#666", fontSize: "0.7rem" }}>iOS & Android</p>
              <div style={{ marginTop: "10px", color: "#2ed16c" }}>
                <FaCheckCircle />
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="landing-footer">
          <div
            style={{
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              opacity: 0.7,
            }}
          >
            <FaCheckCircle /> TaskMaster
          </div>
          <p>© 2024 TaskMaster Inc. Built for focus.</p>
        </footer>
      </div>
    </div>
  );
}

export default Home;
