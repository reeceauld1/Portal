import React, { useState } from "react";
import "./Pages.css"
import { useAgeGroup } from '../AgeGroupContext';
import "../Components/Slideshow.css"

import clinicsImage1 from '../Assets/clinics/clinic1.jpg';
import clinicsImage2 from '../Assets/clinics/clinic2.jpg';
import clinicsImage3 from '../Assets/clinics/clinic3.jpg';
import clinicsImage4 from '../Assets/clinics/clinic4.jpg';
import clinicsImage5 from '../Assets/clinics/clinic5.jpg';
import clinicsImage6 from '../Assets/clinics/clinic6.jpg';
import clinicsImage7 from '../Assets/clinics/clinic7.jpg';
import clinicsImage8 from '../Assets/clinics/clinic8.jpg';
import clinicsImage9 from '../Assets/clinics/clinic9.jpg';


/**
 * Clinics Page Component
 * Displays information about clinics tailored to different age groups.
 * Includes a slideshow of clinic images.
 */
export default function Clinics() {
  // Access the current age group from the context
  const ageGroup = useAgeGroup();

        // Define image arrays for different age groups
        const images = [clinicsImage1, clinicsImage2, clinicsImage3]

        const images2 = [clinicsImage4, clinicsImage5, clinicsImage6]

        const images3 = [clinicsImage7, clinicsImage8, clinicsImage9]

      
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
          <h1>What is a Clinic?</h1>
          {/* Content for Age Group 5 */}
          {(ageGroup === '5') && (
            <p>A clinic is a special place in the hospital where you go to see the doctor or nurse.
            You don’t stay overnight — you just visit, have your check-up, and then go home!
            The children’s clinic is bright and colourful, with fun pictures and toys to play with while you wait.
            The doctors and nurses are friendly — they might check your height, listen to your breathing, or look in your ears.
            It’s quick and easy, and before you know it, you’re all done and ready to go home!</p>
        )}
          {/* Content for Age Group 12 */}
          {(ageGroup === '12') && (
            <p>A clinic is a special part of the hospital where children go for check-ups, advice, or small treatments.
            You don’t need to stay overnight — you just visit for your appointment and go home afterwards.
            In the children’s area, the clinics are bright and welcoming, with colourful walls, books, and games to help pass the time.
            Friendly nurses and doctors will talk with you, check how you’re doing, and sometimes do simple tests — like measuring your height, checking your breathing, or looking in your ears.
            It’s like a mini-hospital inside the hospital, made just for kids!</p>
        )}
          {/* Content for Age Group 17 */}
          {(ageGroup === '17') && (
            <p>A clinic is a department in the hospital where patients come for check-ups, advice, or minor treatments.
            You don’t stay overnight — you just attend your appointment and then go home.
            In the children’s section, the clinics are bright, comfortable, and designed to feel friendly and relaxed.
            Doctors and nurses will talk with you about how you’re feeling, check your health, and may do a few simple tests such as measuring your height, checking your breathing, or examining your ears.
            Clinics are like smaller, specialised parts of the hospital — perfect for when you need care or advice, but don’t need to stay on a ward. Most visits are short, and the waiting areas often have books, toys, or games to keep you occupied.</p>
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
