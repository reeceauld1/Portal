import React, { useState, useEffect } from 'react';
import "./Profile.css"
import { useAgeGroup } from '../AgeGroupContext.jsx'
import { Link } from 'react-router-dom';

import defaultAvatar from "../Assets/avatar.jpg";
import avatar1 from "../Assets/avatar1.jpg";
import avatar2 from "../Assets/avatar2.jpg";
import avatar3 from "../Assets/avatar3.jpg";
import avatar4 from "../Assets/avatar4.jpg";
import avatar5 from "../Assets/avatar5.jpg";

/**
 * Profile Page Component
 * Allows users to view and edit their profile information, including username, password, and avatar.
 * Displays current age group and department.
 */
export default function Profile() {
  // State for user credentials and profile data
  const [username, setUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  // State for avatar management
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [newAvatar, setNewAvatar] = useState(null);
  const [isSelectingAvatar, setIsSelectingAvatar] = useState(false);
  // State for UI editing modes
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  // State for display information
  const [ageGroupDisplay, setAgeGroupDisplay] = useState('');
    const [department, setCurrentDepartment] = useState('');
  const [newDepartment, setNewDepartment] = useState('');
  
  // Mapping for age group codes to display strings
  const ageGroupMap = {
    '5': '2 - 6',
    '12': '7 - 13',
    '17': '14 - 18',
  };

  // Mapping for avatar filenames to imported assets
  const presetAvatars = {
    'avatar.jpg': defaultAvatar,
    'avatar1.jpg': avatar1,
    'avatar2.jpg': avatar2,
    'avatar3.jpg': avatar3,
    'avatar4.jpg': avatar4,
    'avatar5.jpg': avatar5,
  };

  const ageGroup = useAgeGroup();

  // Effect to load user data from sessionStorage on component mount
  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
      setNewUsername(storedUsername);
    }
    const storedPassword = sessionStorage.getItem('password');
    if (storedPassword) {
      setCurrentPassword(storedPassword);
      setNewPassword(storedPassword);
    }
            const storedDepartment = sessionStorage.getItem('department');
    if (storedDepartment) {
      setCurrentDepartment(storedDepartment);
      setNewDepartment(storedDepartment);
    }
    const storedAvatar = sessionStorage.getItem('avatar');
    if (storedAvatar) {
      // Set avatar from storage if it exists in presets, otherwise default
      setAvatar(presetAvatars[storedAvatar] || defaultAvatar);
    }
    setAgeGroupDisplay(ageGroupMap[ageGroup] || '');
  }, [ageGroup, avatar]);


  // Handler to update username and password
  const handleUpdate = async (e) => {
    e.preventDefault();

    if (newUsername.trim() === '' || newPassword.trim() === '') {
      alert('Username and password cannot be empty.');
      return;
    }

    try {
      // API call to update user credentials
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${username}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newUsername, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('Profile updated successfully!');
        // Update session storage and local state on success
        sessionStorage.setItem('username', newUsername);
        sessionStorage.setItem('password', newPassword);
        setUsername(newUsername);
        setIsEditingUsername(false);
        setIsEditingPassword(false);
      } else {
        alert(`Update failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('An error occurred during the update. Please try again.');
    }
  };

  // Handler to save selected avatar
  const handleSaveAvatar = async () => {
    if (!newAvatar) {
      setIsSelectingAvatar(false);
      return;
    }

    try {
      // API call to update user avatar
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${username}/avatar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ avatar: newAvatar }),
      });

      const data = await response.json();

      if (response.ok) {
        // Update session storage and local state on success
        sessionStorage.setItem('avatar', newAvatar);
        setAvatar(presetAvatars[newAvatar]);
        // Dispatch event to notify other components (like Navbar) of avatar change
        window.dispatchEvent(new Event('avatarChanged'));
        setIsSelectingAvatar(false);
        setNewAvatar(null);
      } else {
        alert(`Avatar update failed: ${data.message}`);
      }
    } catch (error) {
      console.error('Avatar update error:', error);
      alert('An error occurred while updating the avatar.');
    }
  };

  return (
    <div>
      <div className="profileContainer">

        <div className="profileIntro">
          <div className="profileHeader">
          <h1>My Profile</h1>
          </div>
          <div className="profileIntroContainer">
          <div className="profileLeft">
            {/* Avatar Display Section */}
            <div className="avatarContainer">
            <div className="avatarIcon">
              <img src={avatar} alt="User Avatar" />
            </div>
            {!isSelectingAvatar && (
              <p onClick={() => setIsSelectingAvatar(true)}>Change Avatar</p>
            )}
            </div>
            {/* Avatar Selection Modal/Area */}
            {isSelectingAvatar && (
              <div className="avatarSelection">
                <h3>Select an Avatar</h3>
                <div className="avatarOptions">
                  {Object.entries(presetAvatars).map(([key, imgSrc]) => (
                    <img
                      key={key}
                      src={imgSrc}
                      alt={`Avatar option ${key}`}
                      className={newAvatar === key ? 'selected' : ''}
                      onClick={() => setNewAvatar(key)}
                    />
                  ))}
                </div>
                <div className="avatarActions">
                  <button onClick={() => { setIsSelectingAvatar(false); setNewAvatar(null); }}>Cancel</button>
                  <button onClick={handleSaveAvatar}>Save</button>
                </div>
              </div>
            )}
            {!isSelectingAvatar && (
              <div className="avatarBottom">
                <h2>Patient Name: {username}</h2>
                <h2>Age Group: {ageGroupDisplay}</h2>
              </div>
            )}
          </div>
          <div className="profileRight">
            <div className="profileForm">
              {/* Profile Update Form */}
              <form onSubmit={handleUpdate}>
        <div>
          <label htmlFor="username"></label>
          <input 
          type="text" 
          name="username" 
          className={`usernameInput ${!isEditingUsername ? 'disabled' : ''}`}
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          disabled={!isEditingUsername}
          required />
        </div>
        <div className='formText'>
          <p onClick={() => setIsEditingUsername(true)}>Change Username?</p>
        </div>
        <div>
          <label htmlFor="password"></label>
          <input 
          type="password" 
          name="password" 
          className={`passwordInput ${!isEditingPassword ? 'disabled' : ''}`}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          disabled={!isEditingPassword}
          required />
        </div>
        <div className='formText'>
          <p onClick={() => setIsEditingPassword(true)}>Change Password?</p>
        </div>
        {(isEditingUsername || isEditingPassword) && (
          <div className="submitButtonProfile">
            <button type="submit"><h2>Save Changes</h2></button>
          </div>
        )}
      </form>
            </div>
            <div className="profileDetails">
              <div className="profileCalender">
                <h2>Calender</h2>
                <div className="calenderBox">
                  <h1>No appointments</h1>
                </div>
              </div>
              <div className="profileDepartment">
                <h2>Department</h2>
                <div className="departmentBox">
                  <Link to="/Department">
                  <button className="departmentButton">
                    <h3>{department}</h3>
                  </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}
