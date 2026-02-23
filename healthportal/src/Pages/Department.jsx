import React, { useState, useEffect } from 'react';
import "./Department.css"
import { useAgeGroup } from '../AgeGroupContext.jsx'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import defaultAvatar from "../Assets/avatar.jpg";
import avatar1 from "../Assets/avatar1.jpg";
import avatar2 from "../Assets/avatar2.jpg";
import avatar3 from "../Assets/avatar3.jpg";
import avatar4 from "../Assets/avatar4.jpg";
import avatar5 from "../Assets/avatar5.jpg";
import Xray from "../Pages/Xray.jsx"
import Mri from "../Pages/MRI.jsx"
import Clinics from "../Pages/Clinics.jsx"      

// Mapping for department names to their respective routes and labels
const departmentPages = {
  'X-ray': { path: '/xray', label: 'X-Ray Department' },
  'MRI': { path: '/mri', label: 'MRI Department' },
  'Clinics': { path: '/clinics', label: 'Clinics' },
  'Wards': { path: '/wards', label: 'Wards' },
};

/**
 * Department Page Component
 * Displays detailed information about the user's assigned department,
 * including staff, treatment dates, and a link to the department page.
 */
export default function Profile() {
  // State for user and department information
  const [username, setUsername] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [avatar, setAvatar] = useState(defaultAvatar);
  const [ageGroupDisplay, setAgeGroupDisplay] = useState('');
  const [department, setCurrentDepartment] = useState('');
  const [newDepartment, setNewDepartment] = useState('');
  const [staff, setStaff] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

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

  // Effect to load user and department data from sessionStorage on component mount
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
    const storedStaff = sessionStorage.getItem('staff');
    if (storedStaff) {
      setStaff(storedStaff);
    }
    // Calculate and format start and end dates based on account creation time
    const storedCreatedAt = sessionStorage.getItem('created_at');
    if (storedCreatedAt) {
      const start = new Date(storedCreatedAt);
      setStartDate(start.toLocaleDateString());
      const end = new Date(start);
      end.setMonth(end.getMonth() + 2); // Assuming a 2-month treatment period
      setEndDate(end.toLocaleDateString());
    }
    const storedAvatar = sessionStorage.getItem('avatar');
    if (storedAvatar) {
      setAvatar(presetAvatars[storedAvatar] || defaultAvatar);
    }
    setAgeGroupDisplay(ageGroupMap[ageGroup] || '');
  }, [ageGroup, avatar]);




  return (
    <div>
      <div className="profileContainer">

        <div className="profileIntro">

            <div className="profileBackButton">
                {/* Back button to navigate to the Profile page */}
                <Link to="/Profile">
              <FontAwesomeIcon icon={faArrowLeft} size="2x" />
                </Link>
              </div>

          <div className="profileHeader">

          <h1>My Department</h1>
          </div>
          <div className="profileIntroContainer">
          <div className="profileLeft">
            {/* User Avatar Display */}
            <div className="avatarContainer">
            <div className="avatarIcon">
              <img src={avatar} alt="User Avatar" />
            </div>
            </div>
              <div className="avatarBottom">
                <h2>Patient Name: {username}</h2>
                <h2>Age Group: {ageGroupDisplay}</h2>
              </div>
          </div>
          <div className="profileRight">
            <div className="profileInfo">
              {/* Department Information Display */}
              <h2>Department: {departmentPages[department] ? (
                <Link to={departmentPages[department].path}>{department}</Link>
              ) : department}</h2>
              <h2>Staff Team: {staff}</h2>
              <h2>Start of treatment: {startDate}</h2>
              <h2>End of treatment: {endDate}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
