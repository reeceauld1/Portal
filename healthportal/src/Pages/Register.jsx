import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Register.css";

/**
 * Register component handles new user registration.
 * It collects username, password, age group, and department information.
 */
export default function Register() {
  // State for form fields and selections
  const [selectedAge, setSelectedAge] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // State for storing the list of available departments
  const [departments, setDepartments] = useState([]);
  const [selectedDept, setSelectedDept] = useState("");
  const navigate = useNavigate();

  // Fetch the list of departments from the API when the component mounts
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/departments`)
      .then(res => res.json())
      .then(data => setDepartments(data))
      .catch(err => console.error("Failed to fetch departments:", err));
  }, []);

  // Handle form submission for registration
  const handleRegister = async (event) => {
    event.preventDefault();

    // Validate that an age group is selected
    if (!selectedAge) {
      alert("Please select an age range.");
      return;
    }

    // Validate that a department is selected
    if (!selectedDept) {
      alert("Please select a department.");
      return;
    }

    try {
      // Send registration data to the API
      const response = await fetch(`${import.meta.env.VITE_API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, agegroup: selectedAge, dept_id: selectedDept }),
      });

      const data = await response.json();

      // If registration is successful, redirect to Login page
      if (response.ok) {
        alert("Registration successful! Please log in.");
        navigate("/Login");
      } else {
        // Show error message if registration fails
        alert(`Registration failed: ${data.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred during registration. Please try again.");
    }
  };

  return (
    <div className="pageContainer">
      <div className="registerContainer">
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
          {/* Username Input */}
          <input 
            type="text" 
            name="username" 
            placeholder="Username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required />
          {/* Link to Login page if user already has an account */}
          <div className="registerText">
            <Link to="/Login">Already have an account?</Link>
          </div>
          {/* Password Input */}
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required />
          {/* Age Group Selection Buttons */}
          <div className="age-selection">
            <button 
              type="button" 
              className={selectedAge === '5' ? 'active' : ''}
              onClick={() => setSelectedAge('5')}
            >
              2 - 6
            </button>
            <button 
              type="button" 
              className={selectedAge === '12' ? 'active' : ''}
              onClick={() => setSelectedAge('12')}
            >7 - 13</button>
            <button 
              type="button" 
              className={selectedAge === '17' ? 'active' : ''}
              onClick={() => setSelectedAge('17')}
            >
              14 - 18</button>
          </div>
          {/* Department Selection Dropdown */}
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="department-select"
          >
            <option value="">Select Department</option>
            {departments.map(dept => (
              <option key={dept.id} value={dept.id}>{dept.department}</option>
            ))}
          </select>
          {/* Submit Button */}
          <div className="submitButton">
          <button type="submit"><h2>Register</h2></button>
          </div>
        </form>
      </div>
    </div>
  );
}