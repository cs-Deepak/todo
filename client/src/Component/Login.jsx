import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://todo-5v1r.onrender.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        // ✅ Save token + user info
        localStorage.setItem("token", data.token);
        localStorage.setItem("userEmail", data.user.email);
        // Save username so we can show initial in header
        if (data.user?.username) localStorage.setItem("username", data.user.username);

        // notify other parts of the app (Header) that user info changed
        try {
          window.dispatchEvent(new Event("user-changed"));
        } catch (e) {
          // ignore
        }

        alert("Login successful!");
        navigate("/dashboard");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="login-page">
      <h1>Todo</h1>
      <p>Start having a Super Day!</p>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Login</button>
      </form>

      <p>
        Don’t have an account?{" "}
        <a href="#/auth/signup" style={{ textDecoration: "underline" }}>
          Signup
        </a>
      </p>
    </div>
  );
};

export default Login;
