
import React, { useContext, useState } from 'react';
import { IoMail, IoLockClosed, IoPerson } from 'react-icons/io5';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './Register.css';
import { UserContext } from '../../assets/UserContext/UserContext';

const RegisterForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/v1/users/register', {
        username,
        password,
        email,
      });
      setUser({ username: response.data.username });
      alert('User Registered Successfully');
      navigate('/specialist');
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
      <span className="icon-right"></span>
      <span className="icon-left"></span>
      <div className="form-box login">
        <div className="logo">
          <img src="app_logo.png" alt="App Logo" />
        </div>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <span className="logIcon">
              <IoPerson />
            </span>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Username</label>
          </div>
          <div className="input-box">
            <span className="logIcon">
              <IoMail />
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>Email</label>
          </div>
          <div className="input-box">
            <span className="logIcon">
              <IoLockClosed />
            </span>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Password</label>
          </div>
          <button type="submit" className="btn">Register</button>
          <div className="login-register">
            <p>
              Already have an account? <Link to="/login" className="logIn-link">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
