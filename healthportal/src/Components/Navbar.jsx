import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

import defaultAvatar from "../Assets/avatar.jpg";
import avatar1 from "../Assets/avatar1.jpg";
import avatar2 from "../Assets/avatar2.jpg";
import avatar3 from "../Assets/avatar3.jpg";
import avatar4 from "../Assets/avatar4.jpg";
import avatar5 from "../Assets/avatar5.jpg";

/**
 * Navbar Component
 * Renders the top navigation bar, including the user avatar, desktop links, and mobile menu.
 * Handles avatar synchronization with session storage.
 */
export default function Navbar() {
  // State for toggling menus and storing the current avatar
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [avatar, setAvatar] = useState(defaultAvatar);

  // Map of avatar filenames to imported image assets
  const presetAvatars = {
    'avatar.jpg': defaultAvatar,
    'avatar1.jpg': avatar1,
    'avatar2.jpg': avatar2,
    'avatar3.jpg': avatar3,
    'avatar4.jpg': avatar4,
    'avatar5.jpg': avatar5,
  };

  // Effect to load the avatar from session storage and listen for updates
  useEffect(() => {
    // Initial load
    const storedAvatar = sessionStorage.getItem('avatar');
    if (storedAvatar && presetAvatars[storedAvatar]) {
      setAvatar(presetAvatars[storedAvatar]);
    }

    // Event handler for custom 'avatarChanged' event
    const handleAvatarChange = () => {
      const newAvatar = sessionStorage.getItem('avatar');
      if (newAvatar && presetAvatars[newAvatar]) {
        setAvatar(presetAvatars[newAvatar]);
      }
    };

    // Listen for the custom event dispatched by Profile.jsx
    window.addEventListener('avatarChanged', handleAvatarChange);

    // Cleanup listener on unmount
    return () => window.removeEventListener('avatarChanged', handleAvatarChange);
  }, []);

  // Toggle the user profile dropdown
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  // Toggle the mobile hamburger menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close menus when a link is clicked
  const handleLinkClick = () => {
    setDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <nav>
      {/* User Avatar and Dropdown Section */}
      <div className="navButton">
        <button onClick={toggleDropdown} className="dropdown-toggle">
          <img src={avatar} alt="User Avatar" className="navbar-avatar" />
        </button>
        {dropdownOpen && (
          <div className="dropdown-menu">
            <Link to="/Profile" onClick={handleLinkClick}>Profile</Link>
            <Link to="/Login" onClick={handleLinkClick}>Log out</Link>
          </div>
        )}
      </div>
      {/* Desktop Navigation Links */}
      <div className="navText">
        <Link to="/Home">
        Home
        </Link>
        <Link to="/Xray">
        X-ray
        </Link>
        <Link to="/MRI">
        MRI
        </Link>
        <Link to="/Clinics">
        Clinics
        </Link>
        <Link to="/Wards">
        Wards
        </Link>
        <Link to="/WingMap">
        Wing Map
        </Link>
        <Link to="/Quiz">
        Quiz
      </Link>
      </div>
      {/* Mobile Hamburger Icon */}
      <div className={`burger-menu ${mobileMenuOpen ? 'open' : ''}`} onClick={toggleMobileMenu}>
        <div className="burger-bar"></div>
        <div className="burger-bar"></div>
        <div className="burger-bar"></div>
      </div>
      {/* Mobile Navigation Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <Link to="/Home" onClick={handleLinkClick}>
        Home
        </Link>
        <Link to="/Xray" onClick={handleLinkClick}>
        X-ray
        </Link>
        <Link to="/MRI" onClick={handleLinkClick}>
        MRI
        </Link>
        <Link to="/Clinics" onClick={handleLinkClick}>
        Clinics
        </Link>
        <Link to="/Wards" onClick={handleLinkClick}>
        Wards
        </Link>
        <Link to="/WingMap" onClick={handleLinkClick}>
        Wing Map
        </Link>
        <Link to="/Quiz" onClick={handleLinkClick}>
        Quiz
      </Link>
      </div>
    </nav>
  );
}
