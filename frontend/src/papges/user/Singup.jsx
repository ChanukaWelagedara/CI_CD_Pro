import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Singup.css'; 

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:5555/users/signup', formData);
  
      if (response.data.alert === 'email') {
        alert("Email is already in use");
      } else if (response.data.alert === 'success') {
        alert("Signup successful");
        localStorage.setItem('userDetails', JSON.stringify(formData));
        navigate('/user/Login');
        window.location.reload();
      } else {
        alert("Signup failed");
      }
    } catch (error) {
      console.error(error);
      alert("Signup failed");
    }
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
              handleSignup();
            }}
          >
            <h2>Signup</h2>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
              className="input-field"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
              className="input-field"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              className="input-field"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              className="input-field"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              onChange={handleChange}
              className="input-field"
            />
            <button type="submit" className="signup-button">
              Signup
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
  </div>


      
  
  );
};

export default Signup;
