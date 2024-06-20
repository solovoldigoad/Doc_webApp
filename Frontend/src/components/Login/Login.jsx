import React, { useState } from 'react';
import { IoClose, IoMail, IoLockClosed } from 'react-icons/io5';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Login.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/v1/users/login', {
        email,
        password
      }, { withCredentials: true });
      alert(response.data.message);
      console.log('User logged in successfully');
    } catch (error) {
      if (error.response) {
        alert('Error: ' + error.response.data.message);
      } else {
        alert('Error: ' + error.message);
      }
    }
  };

  return (
    <div className="Wrapper">
      <span className="icon-close">
      </span>
      <div className="form-box login">
        <div className="logo">
          <img src="app_logo.png" alt="App Logo" />
        </div>
        <h2>LogIn</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <span className="logIcon">
              <IoMail />
            </span>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            <label>Email</label>
          </div>
          <div className="input-box">
            <span className="logIcon">
              <IoLockClosed />
            </span>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            <label>Password</label>
          </div>
          <button type="submit" className="btn">Login</button>
          <div className="login-register">
            <p>
              Don't have an account? <Link to="/register" className="register-link">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

