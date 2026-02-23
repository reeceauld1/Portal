import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./Login.css";

/**
 * Login component handles user authentication.
 * It allows users to sign in with their username and password.
 */
function Login() {
  // State to store fetched user data (currently unused in render)
  const [login, setLogin] = useState([]);
  // State to handle and display errors
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // State for form input fields
  const [loginName, setLoginName] = useState("");
  const [loginPass, setLoginPass] = useState("");

  // Function to fetch the user/password table from the API
  const fetchLogin = () => {
    fetch(`${import.meta.env.VITE_API_URL}/userpasstable`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => setLogin(data))
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
      });
  };

  // Fetch login data when the component mounts
  useEffect(() => {
    fetchLogin();
  }, []);

  // Handler for form submission to log the user in
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent default form submission
    setError(null);

    // Send POST request with credentials to the API
    fetch(`${import.meta.env.VITE_API_URL}/userpass`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: loginName, password: loginPass }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(`Server responded with ${response.status}: ${text}`);
          });
        }
        return response.json();
      })
      .then((data) => {
        // If login is successful, store user details in sessionStorage and redirect to Home
        if (data.success) {
          sessionStorage.setItem('username', loginName);
          sessionStorage.setItem('password', loginPass);
          sessionStorage.setItem('agegroup', String(data.agegroup));
          sessionStorage.setItem('avatar', data.avatar);
          sessionStorage.setItem('department', data.department);
          sessionStorage.setItem('staff', data.staff);
          sessionStorage.setItem('created_at', data.created_at);
          navigate('/Home');
        } else {
          // Alert the user if login failed
          alert(data.message);
        }
        // Reset input fields
        setLoginName("");
        setLoginPass("");
      })
      .catch((err) => {
        console.error("Login error:", err);
        alert("An error occurred during login. Please try again.");
      });
  };

  return (
    <div className="pageContainer">
    {/* Container for the login form */}
    <div className="loginContainer">
      <h1>Log-in</h1>
      <form onSubmit={handleLogin}>
          {/* Username Input */}
          <label htmlFor="username"></label>
          <input 
          type="text" 
          value={loginName}
          onChange={(e) => setLoginName(e.target.value)}
          required
          name="username" 
          placeholder='Username'/>
        {/* Link to Register page */}
        <div className='registerText'>
          <Link to="/Register">Register?</Link>
        </div>
          {/* Password Input */}
          <label htmlFor="password"></label>
          <input 
          type="password" 
          value={loginPass}
          onChange={(e) => setLoginPass(e.target.value)}
          required
          name="password" 
          placeholder='Password'/>
          {/* Submit Button */}
          <div className="submitButton">
          <button type="submit"><h2>Log-In</h2></button>
          </div>
      </form>
    </div>
    </div>
  );
}
export default Login;