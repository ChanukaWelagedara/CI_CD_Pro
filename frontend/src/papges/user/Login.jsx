import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Use the same CSS file as in Signup component

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5555/users/login', formData);

      if (response.data.alert) {
        alert(response.data.message);
        localStorage.setItem('userDetails', JSON.stringify(response.data.user));
        navigate('/account');
        window.location.reload();
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error(error);
      alert('Login failed');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ backgroundImage: 'url(/Back.png)', width:'100%', height:'2200px'  }}>
      <div className="logingUo">
<div className="register">
  <div className="form-container">
    <div className="content">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="input-field"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="input-field"
        />
        <button type="submit" className="signup-button">
          Login
        </button>
      </form>
    </div>
  </div>
</div>
</div>
   
  </div>
  
  );
};

export default Login;
