import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import "./CustomerAuth.css";

const CustomerAuth = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleFacebookLogin = () => {
    alert("Facebook Login");
  };

  const handleGoogleLogin = () => {
    alert("Google Login");
  };

  const handleEmailSubmit = () => {
    if (!email) {
      alert("Please enter your email address");
      return;
    }
    alert(`Email submitted: ${email}`);
  };

  return (
    <div className="auth-container">
      {/* Left Side */}
      <div className="auth-left">
        <button className="back-btn" onClick={() => navigate("/")}>←</button>

        <h2 className="auth-title">Fresha for customers</h2>
        <p className="auth-subtitle">
          Create an account or log in to book and manage your appointments.
        </p>

        <button className="social-btn fb" onClick={handleFacebookLogin}>
          <FaFacebookF size={18} /> Continue with Facebook
        </button>

        <button className="social-btn google" onClick={handleGoogleLogin}>
          <FcGoogle size={20} /> Continue with Google
        </button>

        <div className="divider">
          <span>OR</span>
        </div>

        <input
          type="email"
          placeholder="Email address"
          className="input-field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="continue-btn" onClick={handleEmailSubmit}>
          Continue
        </button>

        <p className="business-link">
          Have a business account?{" "}
          
          <Link to="/professional-auth">Sign in as a professional</Link>
        </p>
      </div>

      {/* Right Side */}
      <div className="auth-right">
        <img src="/customer-signin.png" alt="Customer" />
      </div>
    </div>
  );
};

export default CustomerAuth;
