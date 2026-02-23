import React from 'react'
import { Link } from 'react-router-dom';
import "./Home.css";
import xrayImage1 from '../Assets/xray/xray1.jpg' 
import xrayImage2 from '../Assets/xray/xray4.jpg' 
import xrayImage3 from '../Assets/xray/xray7.jpg' 
import mriImage1 from "../Assets/mri/mri1.jpg"
import mriImage2 from "../Assets/mri/mri4.jpg"
import mriImage3 from "../Assets/mri/mri7.jpg"
import clinicsImage1 from "../Assets/clinics/clinic1.jpg"
import clinicsImage2 from "../Assets/clinics/clinic4.jpg"
import clinicsImage3 from "../Assets/clinics/clinic7.jpg"
import wardsImage1 from "../Assets/wards/wards1.jpg"
import wardsImage2 from "../Assets/wards/wards4.jpg"
import wardsImage3 from "../Assets/wards/wards7.jpg"
import wingMapImage1 from "../Assets/wingmap/wingmap.jpg"
import wingMapImage2 from "../Assets/wingmap/wingmap.jpg"
import wingMapImage3 from "../Assets/wingmap/wingmap.jpg"
import quizImage1 from "../Assets/quiz/quiz.jpg"
import quizImage2 from "../Assets/quiz/quiz.jpg"
import quizImage3 from "../Assets/quiz/quiz.jpg"
import { useAgeGroup } from '../AgeGroupContext';

/**
 * Home Page Component
 * Displays the main dashboard with navigation cards to different sections of the portal.
 * The images on the cards are dynamically selected based on the user's age group.
 */
export default function Home() {
  // Access the current age group from context
  const ageGroup = useAgeGroup();
  const age = parseInt(ageGroup) || 2;

  // Helper function to determine which set of images to use based on age range
  const getImageSet = () => {
    if (age >= 2 && age <= 6) return 1;
    if (age >= 7 && age <= 13) return 2;
    return 3;
  };

  const imageSet = getImageSet();

  // Select specific images for each category based on the determined image set
  const xrayImage = imageSet === 1 ? xrayImage1 : imageSet === 2 ? xrayImage2 : xrayImage3;
  const mriImage = imageSet === 1 ? mriImage1 : imageSet === 2 ? mriImage2 : mriImage3;
  const clinicsImage = imageSet === 1 ? clinicsImage1 : imageSet === 2 ? clinicsImage2 : clinicsImage3;
  const wardsImage = imageSet === 1 ? wardsImage1 : imageSet === 2 ? wardsImage2 : wardsImage3;
  const wingMapImage = imageSet === 1 ? wingMapImage1 : imageSet === 2 ? wingMapImage2 : wingMapImage3;
  const quizImage = imageSet === 1 ? quizImage1 : imageSet === 2 ? quizImage2 : quizImage3;

  return (
    <div className='homeContainer'>
      {/* Introduction Section */}
      <div className="homeIntro">
        <div className="homeText">
          <h1>Welcome to the Children’s Portal!</h1>
          <p>Our hospital’s brand-new Children’s Wing is all about making your stay as comfortable and fun as possible. This interactive portal is designed just for kids and their families — whether you’re at your bedside tablet or using your own device, you can explore helpful information about your visit. Stay entertained, learn about what’s happening around you, and feel right at home while you’re here.</p>
        </div>
      </div>
      {/* Navigation Cards Grid */}
      <div className="homeCards">
        {/* X-ray Card */}
        <div className="homeCard">
          <Link to="/Xray">
            <img src={xrayImage} alt="X-ray" />
            <div className="cardSpace"></div>
            <div className="homeTitle">
              <h1>X-ray</h1>
            </div>
          </Link>
        </div>
        {/* MRI Card */}
        <div className="homeCard">
          <Link to="/MRI">
            <img src={mriImage} alt="MRI" />
            <div className="cardSpace"></div>
            <div className="homeTitle">
              <h1>MRI</h1>
            </div>
          </Link>
        </div>
        {/* Clinics Card */}
        <div className="homeCard">
          <Link to="/Clinics">
            <img src={clinicsImage} alt="Clinics" />
            <div className="cardSpace"></div>
            <div className="homeTitle">
              <h1>Clinics</h1>
            </div>
          </Link>
        </div>
        {/* Wards Card */}
        <div className="homeCard">
          <Link to="/Wards">
            <img src={wardsImage} alt="Wards" />
            <div className="cardSpace"></div>
            <div className="homeTitle">
              <h1>Wards</h1>
            </div>
          </Link>
        </div>
        {/* Wing Map Card */}
        <div className="homeCard">
          <Link to="/WingMap">
            <img src={wingMapImage} alt="Wing Map" />
            <div className="cardSpace"></div>
            <div className="homeTitle">
              <h1>Wing Map</h1>
            </div>
          </Link>
        </div>
        {/* Quiz Card */}
        <div className="homeCard">
          <Link to="/Quiz">
            <img src={quizImage} alt="Quiz" />
            <div className="cardSpace"></div>
            <div className="homeTitle">
              <h1>Quiz</h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
