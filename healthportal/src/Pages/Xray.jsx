import React, { useState } from "react";
import "./Pages.css"
import { useAgeGroup } from '../AgeGroupContext';
import "../Components/Slideshow.css"

import xrayImage1 from '../Assets/xray/xray1.jpg';
import xrayImage2 from '../Assets/xray/xray2.jpg';
import xrayImage3 from '../Assets/xray/xray3.jpg';
import xrayImage4 from '../Assets/xray/xray4.jpg';
import xrayImage5 from '../Assets/xray/xray5.jpg';
import xrayImage6 from '../Assets/xray/xray6.jpg';
import xrayImage7 from '../Assets/xray/xray7.jpg';
import xrayImage8 from '../Assets/xray/xray8.jpg';
import xrayImage9 from '../Assets/xray/xray9.jpg';

/**
 * Xray Page Component
 * Displays information about X-rays tailored to different age groups.
 * Includes a slideshow of X-ray images.
 */
export default function Xray() {
  // Access the current age group from the context
  const ageGroup = useAgeGroup();

      // Define image arrays for different age groups
      const images = [xrayImage1, xrayImage2, xrayImage3];
      const images2 = [xrayImage4, xrayImage5, xrayImage6];
      const images3 = [xrayImage7, xrayImage8, xrayImage9];
      
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
          <h1>What is an X-ray?</h1>
          {/* Content for Age Group 5 */}
          {(ageGroup === '5') && (
            <p>An X-ray is a special kind of picture that lets doctors see your bones inside your body!
            If you have a sore arm or a bump, the doctor might use an X-ray to see what’s going on.
            It doesn’t hurt at all — you just need to sit or lie very still while the big camera goes click!
            The picture shows your bones, and the doctor looks at it to help you get better.
            X-rays are safe, super quick, and over before you know it —
            just like having your photo taken, but this one shows your bones!</p>
        )}
          {/* Content for Age Group 12 */}
          {(ageGroup === '12') && (
            <p>An X-ray is a special kind of picture that helps doctors see inside your body. It’s a bit like a super camera that can look through your skin and muscles to see your bones — and sometimes other parts too!
            Doctors use X-rays to find out what’s going on inside if you’ve hurt yourself, have a sore arm, or need a check-up. Getting an X-ray doesn’t hurt at all. You might be asked to sit, stand, or lie very still for a few seconds while the machine takes the picture.
            The X-ray machine might look a little strange, but it only makes a quiet click sound when it takes the image. The picture appears almost right away, and doctors use it to help figure out the best way to make you feel better.
            X-rays are safe, quick, and over before you know it — kind of like having your photo taken, except this picture shows your bones!</p>
        )}
          {/* Content for Age Group 17 */}
          {(ageGroup === '17') && (
            <p>An X-ray is a special type of image that lets doctors see inside your body. It works a bit like a high-tech camera that can look through your skin and muscles to show your bones — and sometimes other internal parts too.
            Doctors use X-rays to find out what’s happening if you’ve been injured, have pain, or need a closer look during a check-up. Getting an X-ray doesn’t hurt at all. You might be asked to sit, stand, or lie still for a few seconds while the machine takes the picture.
            The X-ray machine might look large or unusual, but it only makes a quiet click when it captures the image. The results are ready almost instantly, helping doctors understand what’s going on and decide the best treatment for you.
            X-rays are safe, fast, and simple — it’s a lot like having your photo taken, except this picture shows what’s inside your body.</p>
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
