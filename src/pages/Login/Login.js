import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const expirationTime = localStorage.getItem('expirationTime');
    if (expirationTime && new Date().getTime() > expirationTime) {
      console.log("Session expired. Clearing local storage.");
      localStorage.removeItem('authenticated');
      localStorage.removeItem('expirationTime');
    }
  }, []);

  const handleLogin = async () => {
    try {
      console.log("Attempting login with:", username, password);

      const response = await axios.post('https://aspwppl-backend.vercel.app/auth/login', {
        email: username,
        password: password
      });

      console.log("Response from backend:", response.data);

      if (response.data.token) {
        console.log("Login successful. Saving token...");
        localStorage.setItem('authenticated', 'true');
        localStorage.setItem('token', response.data.token);

        const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;
        localStorage.setItem('expirationTime', expirationTime);

        navigate('/admin');
      } else {
        console.error("Login failed: Invalid username or password");
        setError('Invalid username or password');
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError('Invalid username or password');
    }
  };

  return (
    <div className="auth-login-page">
      <div className="auth-login-container">
        <h2>Login</h2>
        <div className="auth-form-group">
          <label className='auth-form-label'>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='auth-form-input'
          />
        </div>
        <div className="auth-form-group">
          <label className='auth-form-label'>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='auth-form-input'
          />
        </div>
        {error && <p className="auth-error">{error}</p>}
        <button className="auth-login-button" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default Login;
