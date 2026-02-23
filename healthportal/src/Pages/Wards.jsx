import React, { useState } from "react";
import "./Pages.css"
import { useAgeGroup } from '../AgeGroupContext';
import "../Components/Slideshow.css"

import wardsImage1 from '../Assets/wards/wards1.jpg';
import wardsImage2 from '../Assets/wards/wards2.jpg';
import wardsImage3 from '../Assets/wards/wards3.jpg';
import wardsImage4 from '../Assets/wards/wards4.jpg';
import wardsImage5 from '../Assets/wards/wards5.jpg';
import wardsImage6 from '../Assets/wards/wards6.jpg';
import wardsImage7 from '../Assets/wards/wards7.jpg';
import wardsImage8 from '../Assets/wards/wards8.jpg';
import wardsImage9 from '../Assets/wards/wards9.jpg';

/**
 * Wards Page Component
 * Displays information about hospital wards tailored to different age groups.
 * Includes a slideshow of ward images.
 */
export default function Wards() {
  // Access the current age group from the context
  const ageGroup = useAgeGroup();

      // Define image arrays for different age groups
      const images = [wardsImage1, wardsImage2, wardsImage3];
      const images2 = [wardsImage4, wardsImage5, wardsImage6];
      const images3 = [wardsImage7, wardsImage8, wardsImage9];
      
      // State to keep track of the current image index for the slideshow
      const [nextIndex, setNextIndex] = useState (0);
  
      const arrayLength = images.length;

      // Slideshow logic: Automatically cycles through images every 5 seconds.
      // Note: This runs on every render. Ideally, this should be inside a useEffect hook.
      setTimeout(() => {
        if (nextIndex < arrayLength - 1) {
            setNextIndex(nextIndex + 1);
        } else {
            setNextIndex(0);
        }
      }, 5000);
  
      
    
  return (
    <div>
      <div className="pagesContainer">
        <div className="pagesLeft">
        <div className="pagesBox">
          <div className="pagesBoxText">
          <h1>What is a Ward?</h1>
          {/* Content for Age Group 5 */}
          {(ageGroup === '5') && (
            <p>A ward is a special place in the hospital where you stay for a little while if you need extra care.
            It’s a bit like a big sleepover — but with hospital beds instead of bunk beds!
            You’ll have your own comfy bed, a table, and room for your things.
            Mum, Dad, or someone you love can stay close by, so you’re never alone.
            Friendly doctors and nurses will check on you, give you medicine, and help you feel better.
            There are toys, books, and games to play with — and sometimes new friends to meet too!</p>
        )}
          {/* Content for Age Group 12 */}
          {(ageGroup === '12') && (
            <p>A ward is the part of the hospital where children stay if they need to spend a night or a few days so doctors and nurses can take really good care of them.
            It’s kind of like a cosy sleepover, but with hospital beds instead of bunk beds!
            Each ward has bright rooms with comfy beds, tables, and space for your things.
            Parents or guardians can often stay nearby so you don’t feel alone.
            Friendly nurses and doctors visit to check how you’re doing, give medicine, and answer questions.
            You might also meet other children staying in the ward. There are usually play areas, books, and games to keep you busy and help you feel more at home.</p>
        )}
          {/* Content for Age Group 17 */}
          {(ageGroup === '17') && (
            <p>A ward is the part of the hospital where patients stay overnight or for a few days while doctors and nurses provide care and treatment.
            It’s designed to be comfortable and welcoming, with bright rooms, proper hospital beds, and space for your personal things.
            Parents or guardians can often stay nearby, so you’ll have support while you’re there.
            Nurses and doctors regularly check on you, give medication, and answer any questions you might have.
            Hospital wards are also social spaces — you might meet other young people staying there too.
            There are play or relaxation areas with books, games, or activities to help you feel more at ease.
            If you ever feel worried or unsure, the ward staff are always there to help you feel safe and supported.</p>
        )}
            </div>
          </div>
        </div>
          <div className="pagesRight">
                    <div id="slideshow-container">
            <div id="slideshow-image">
              {/* Slideshow Image for Age Group 5 */}
              {(ageGroup === '5') && (
                <img  src={images[nextIndex]} alt="" ></img>
              )}
              {/* Slideshow Image for Age Group 12 */}
              {(ageGroup === '12') && (
                <img  src={images2[nextIndex]} alt="" ></img>
              )}
              {/* Slideshow Image for Age Group 17 */}
              {(ageGroup === '17') && (
                <img  src={images3[nextIndex]} alt="" ></img>
              )}
            </div>
        </div>
          </div>
      </div>
    </div>
  )
}
