import React, { useState } from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHospital } from "@fortawesome/free-solid-svg-icons";

/**
 * Footer Component
 * Renders the site-wide footer containing navigation links, legal information, and copyright notice.
 */
export default function Footer() {
  return (
    <div>
        <footer>
            <div className="footerContainer">
                {/* Footer Header with Icon */}
                <div className="footerHeader">
                    <FontAwesomeIcon icon={faHospital} size="2x" />
                </div>
                <div className="footerText">
                    {/* Left section: Main Navigation Links */}
                    <div className="footerLeft">
                        <ul>
                            <li><Link to="/Home">Home</Link></li>
                            <li><Link to="/Xray">X-ray</Link></li>
                            <li><Link to="/MRI">MRI</Link></li>
                            <li><Link to="/Clinics">Clinics</Link></li>
                            <li><Link to="/Wards">Wards</Link></li>
                            <li><Link to="/WingMap">Wing Map</Link></li>
                            <li><Link to="/Quiz">Quiz</Link></li>
                            <li><Link to="/Profile">Profile</Link></li>
                            <li><Link to="/Department">Department</Link></li>
                        </ul>
                    </div>
                    {/* Right section: Legal and Utility Links */}
                    <div className="footerRight">
                        <ul>
                            <li><p>Privacy Policy</p></li>
                            <li><p>Terms and Conditions</p></li>
                            <li><p>Site Map</p></li>
                        </ul>
                    </div>
                </div>
                {/* Bottom section: Copyright Notice */}
                <div className="footerBottom">
                    <p>©2025 GCC Portal. All rights reserved.</p>
                </div>
            </div>
        </footer>
    </div>
  )
}
