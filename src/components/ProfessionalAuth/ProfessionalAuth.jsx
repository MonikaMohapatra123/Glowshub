// src/pages/ProfessionalAuth/ProfessionalAuth.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import this
import { FaFacebookF } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import "./ProfessionalAuth.css";

const ProfessionalAuth = () => {
  const navigate = useNavigate(); // ✅ Initialize navigate
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Email entered: ${email}`);
  };

  return (
    <div className="professional-auth-container">
      {/* Left Side - Form */}
      <div className="auth-left">
        <button className="back-btn" onClick={() => navigate("/")}>←</button>
        <h2>Fresha for professionals</h2>
        <p>Create an account or log in to manage your business.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit">Continue</button>
        </form>

        <div className="or-divider">OR</div>

        <button className="social-btn fb">
          <FaFacebookF /> Continue with Facebook
        </button>
        <button className="social-btn google">
          <FcGoogle /> Continue with Google
        </button>
        <button className="social-btn apple">
          <FaApple /> Continue with Apple
        </button>

        <p className="customer-link">
          Are you a customer looking to book an appointment?{" "}
          <a href="/customer-auth">Go to Fresha for customers</a>
        </p>
      </div>

      {/* Right Side - Image */}
      <div className="auth-right">
        <img src="/perfessional sign.png" alt="Professional" />
      </div>
    </div>
  );
};

export default ProfessionalAuth;
