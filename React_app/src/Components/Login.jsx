import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState('');
  const navigate = useNavigate();

 
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    
    if (storedToken) {
      setToken(storedToken);
    
      navigate('/products');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/user/login', { email, password });
      const { token } = response.data;

      if (token) {
        localStorage.setItem('authToken', token); 
        setToken(token); 
        setEmail('');
        setPassword('');
        setError('');
        console.log('Login successful, token:', token);
        navigate('/products'); 
      } else {
        setError('No token received');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        {error && <p className="login-error">{error}</p>}
        <label htmlFor="email" className="login-label">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="login-input"
          placeholder="Enter your email"
        />
        <label htmlFor="password" className="login-label">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="login-input"
          placeholder="Enter your password"
        />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

localStorage.clear();


export default Login;