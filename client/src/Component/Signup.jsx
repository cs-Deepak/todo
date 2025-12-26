import React, { useState } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import axios from "axios";
import API_URL from "../api/config";
import { toast } from "react-toastify";
import "./auth.css";
import { FaCheck, FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

function Signup() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

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

    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/auth/signup`, inputs);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        const respUser = res.data.user || {};
        localStorage.setItem("username", respUser.username || inputs.username);
        localStorage.setItem("userEmail", respUser.email || inputs.email);
        window.dispatchEvent(new Event("user-changed"));
        setShowSuccess(true);
        setTimeout(() => navigate("/dashboard"), 1200);
      } else if (res.data.success) {
        setShowSuccess(true);
        setTimeout(() => navigate("/auth/login"), 1200);
      }
    } catch (err) {
      console.error("Signup error:", err);
      toast.error(
        err.response?.data?.message || err.message || "Signup failed"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate("/dashboard");
  };

  return (
    <div className="auth-container">
      {/* Logo/Icon Section */}
      <div className="auth-logo-section">
        <div className="logo-icon-wrapper">
          <FaCheck className="auth-logo-icon" />
        </div>
        <h1 className="auth-page-title">Create Account</h1>
        <p className="auth-page-subtitle">
          Join us to organize your tasks efficiently
        </p>
      </div>

      <div className="auth-card">
        {/* Tabs */}
        <div className="auth-tabs">
          <NavLink to="/auth/login" className="auth-tab">
            Log In
          </NavLink>
          <NavLink to="/auth/signup" className="auth-tab active">
            Sign Up
          </NavLink>
        </div>

        <form className="auth-form" onSubmit={submit}>
          {/* Full Name Input */}
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div className="input-container">
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
            <label className="form-label">Email Address</label>
            <div className="input-container">
              <input
                type="email"
                name="email"
                placeholder="name@company.com"
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
            <div className="input-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
                value={inputs.password}
                onChange={change}
                className="form-input"
                required
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn-primary-auth" disabled={loading}>
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {/* Divider */}
        <div className="divider-container">
          <div className="divider-line"></div>
          <span className="divider-text">OR CONTINUE WITH</span>
          <div className="divider-line"></div>
        </div>

        {/* Social Buttons */}
        <div className="social-login-grid">
          <button type="button" className="social-btn">
            <FcGoogle /> Google
          </button>
          <button type="button" className="social-btn">
            <FaApple /> Apple
          </button>
        </div>
      </div>

      <div className="auth-footer-text">
        Already have an account?
        <Link to="/auth/login" className="auth-footer-link">
          Log In
        </Link>
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
