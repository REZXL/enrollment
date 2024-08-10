import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './LoginPage.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student', // Default role
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:2999/login', formData);
      alert('Login successful');
      // Redirect based on the selected role
      if (formData.role === 'student') {
        navigate('/studentview'); // Redirect to Studentview
      } else if (formData.role === 'instructor') {
        navigate('/instructorview'); // Redirect to Instructorview
      }
    } catch (error) {
      alert('Incorrect email or password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="role">Role</label>
            <select id="role" name="role" value={formData.role} onChange={handleChange}>
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
          </div>
          <button type="submit" className="btn login-btn">Login</button>
        </form>
        <p className="signup-prompt">
          Don’t have an account? <a href="/signuppage">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
