import React from "react";
import "./SignUpLogin.css";
import { useNavigate } from "react-router-dom";

const SignUpLogin = () => {
  const navigate = useNavigate();

  return (
    <div className="signup-container">
      <div className="left-panel">
        <h1 className="title">Sign up/log in</h1>

        <div className="option-card" onClick={() => navigate("/customer-auth")}>
          <div>
            <h3>Fresha for customers</h3>
            <p>Book salons and spas near you</p>
          </div>
          <span>&#x279C;</span>
        </div>

           <div
                className="option-card"
                onClick={() => navigate("/professional-auth")}
                >
                <div>
                    <h3>Fresha for professionals</h3>
                    <p>Manage and grow your business</p>
                </div>
                <span>&#x279C;</span>
                </div>


        <div className="footer-links">
          <span>🌐 English</span>
          <span>Help and support</span>
        </div>
      </div>

      <div className="right-panel">
        <img src="/customer-signin.png" alt="Customer" />
      </div>
    </div>
  );
};

export default SignUpLogin;
