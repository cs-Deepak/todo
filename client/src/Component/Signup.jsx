import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./auth.css";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";
import { MdClose } from "react-icons/md";

function Signup() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!inputs.username || !inputs.email || !inputs.password) {
      toast.error("Please fill all fields");
      return;
    }

    if (inputs.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      // Detect production environment and use appropriate API URL
      const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
      const API_URL = import.meta.env.VITE_API_URL ||
        (isProduction ? 'https://todo-1-6mzd.onrender.com' : 'http://localhost:6005');

      console.log('Environment:', isProduction ? 'Production' : 'Development');
      console.log('Attempting signup to:', `${API_URL}/auth/signup`);

      const res = await axios.post(
        `${API_URL}/auth/signup`,
        inputs
      );

      if (res.data.message === "User registered successfully") {
        setShowSuccess(true);
        // Auto close after 3 seconds and redirect
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      }
    } catch (err) {
      console.error("Signup error:", err);
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate("/dashboard");
  };

  return (
    <div className="auth-container signup-container">
      {/* Left Side - Features */}
      <div className="auth-left">
        <h1 className="left-title">Unlock Your Productivity</h1>
        <p className="left-subtitle">
          Organize your life, collaborate with your team, and achieve your goals
          faster than ever before.
        </p>

        <div className="features-list">
          <div className="feature-item">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
              </svg>
            </div>
            <div className="feature-content">
              <h3>Effortless Organization</h3>
              <p>Structure your tasks with intuitive projects, labels, and priorities.</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>
            </div>
            <div className="feature-content">
              <h3>Seamless Collaboration</h3>
              <p>Share projects, assign tasks, and communicate with your team in one place.</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z" />
              </svg>
            </div>
            <div className="feature-content">
              <h3>Track Your Progress</h3>
              <p>Visualize your productivity with insightful charts and reports.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="auth-right">
        <div className="auth-card">
          <div className="auth-header">
            <h1 className="auth-title">Create Your Account</h1>
            <p className="auth-subtitle">Get started in seconds. No credit card required.</p>
          </div>

          <form className="auth-form" onSubmit={submit}>
            {/* Google Signup Button (Disabled) */}
            <button type="button" className="google-signup-btn" disabled>
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Continue with Google
            </button>

            {/* Divider */}
            <div className="auth-divider">
              <span>OR</span>
            </div>

            {/* Full Name Input */}
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="input-wrapper">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your full name"
                  value={inputs.username}
                  onChange={change}
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="form-group">
              <label className="form-label">Email</label>
              <div className="input-wrapper">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="you@company.com"
                  value={inputs.email}
                  onChange={change}
                  className="form-input"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrapper">
                <FaLock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="••••••••"
                  value={inputs.password}
                  onChange={change}
                  className="form-input"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button type="submit" className="auth-button">
              Sign Up for Free
            </button>

            {/* Login Link */}
            <div className="auth-footer">
              <span>Already have an account? </span>
              <Link to="/auth/login" className="auth-link">
                Log In
              </Link>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccess && (
        <div className="success-modal-overlay">
          <div className="success-modal">
            <button className="modal-close-btn" onClick={handleSuccessClose}>
              <MdClose />
            </button>
            <div className="success-icon">
              <FaCheckCircle />
            </div>
            <h2 className="success-title">Success!</h2>
            <p className="success-message">Your account has been created.</p>
            <button className="success-btn" onClick={handleSuccessClose}>
              Go to Dashboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Signup;
