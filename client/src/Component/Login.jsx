import React, { useState } from "react";
import { useNavigate, Link, NavLink } from "react-router-dom";
import axios from "axios";
import API_URL from "../api/config";
import { toast } from "react-toastify";
import "./auth.css";
import { FaCheck, FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const change = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();

    if (!inputs.email || !inputs.password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${API_URL}/auth/login`, inputs);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        const respUser = res.data.user || {};
        localStorage.setItem("username", respUser.username || inputs.email);
        localStorage.setItem("userEmail", respUser.email || inputs.email);

        // Dispatch event to update header
        window.dispatchEvent(new Event("user-changed"));

        toast.success("Login Successful!");
        navigate("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
      const errorMessage =
        err.response?.data?.message || err.message || "Login failed.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      {/* Logo/Icon Section */}
      <div className="auth-logo-section">
        <div className="logo-icon-wrapper">
          <FaCheck className="auth-logo-icon" />
        </div>
        <h1 className="auth-page-title">Welcome Back</h1>
        <p className="auth-page-subtitle">
          Log in to manage your tasks effectively
        </p>
      </div>

      <div className="auth-card">
        {/* Tabs */}
        <div className="auth-tabs">
          <NavLink to="/auth/login" className="auth-tab active">
            Log In
          </NavLink>
          <NavLink to="/auth/signup" className="auth-tab">
            Sign Up
          </NavLink>
        </div>

        {/* Login Form */}
        <form className="auth-form" onSubmit={submit}>
          {/* Email Input */}
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="input-container">
              <input
                type="email"
                name="email"
                placeholder="user@example.com"
                value={inputs.email}
                onChange={change}
                className="form-input"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="form-group">
            <div className="form-options-row">
              <label className="form-label">Password</label>
              <Link to="/forgot-password" className="forgot-password-link">
                Forgot Password?
              </Link>
            </div>
            <div className="input-container">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
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
            {loading ? "Logging in..." : "Log In"}
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
        Don't have an account?
        <Link to="/auth/signup" className="auth-footer-link">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Login;
