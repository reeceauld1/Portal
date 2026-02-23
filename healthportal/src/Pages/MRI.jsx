import React, { useState } from "react";
import "./Pages.css"
import { useAgeGroup } from '../AgeGroupContext';
import "../Components/Slideshow.css"

import mriImage1 from '../Assets/mri/mri1.jpg';
import mriImage2 from '../Assets/mri/mri2.jpg';
import mriImage3 from '../Assets/mri/mri3.jpg';
import mriImage4 from '../Assets/mri/mri4.jpg';
import mriImage5 from '../Assets/mri/mri5.jpg';
import mriImage6 from '../Assets/mri/mri6.jpg';
import mriImage7 from '../Assets/mri/mri7.jpg';
import mriImage8 from '../Assets/mri/mri8.jpg';
import mriImage9 from '../Assets/mri/mri9.jpg';

/**
 * MRI Page Component
 * Displays information about MRI scans tailored to different age groups.
 * Includes a slideshow of MRI images.
 */
export default function MRI() {
  // Access the current age group from the context
  const ageGroup = useAgeGroup();

      // Define image arrays for different age groups
      const images = [mriImage1, mriImage2, mriImage3];
      const images2 = [mriImage4, mriImage5, mriImage6];
      const images3 = [mriImage7, mriImage8, mriImage9];
      
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
          <h1>What is an MRI?</h1>
          {/* Content for Age Group 5 */}
          {(ageGroup === '5') && (
            <p>An MRI is a big camera that takes special pictures inside your body!
            It helps doctors see your brain, muscles, and bones to help you feel better.
            You lie down on a soft bed that moves into a round tunnel — it looks a bit like a giant doughnut!
            The machine makes funny banging and tapping sounds, but that’s okay — you can wear headphones or listen to music.
            It doesn’t hurt at all, and nothing touches you.
            You just lie very still, like a statue, while the pictures are taken.
            When it’s done, the doctors use the pictures to help make you feel better!</p>
        )}
          {/* Content for Age Group 12 */}
          {(ageGroup === '12') && (
            <p>An MRI is a special kind of scan that takes really detailed pictures of the inside of your body.
            It doesn’t use X-rays — instead, it uses a big magnet and radio waves to show your brain, muscles, and other parts very clearly.
            When you have an MRI, you lie on a comfy bed that slides into a tunnel-shaped machine.
            It can make loud tapping or thumping noises, but you’ll get headphones or earplugs — sometimes even music to listen to!
            The scan doesn’t hurt at all, and nothing touches you.
            You just have to stay very still so the pictures come out nice and clear.
            It’s a bit like being in a space rocket while the doctors take amazing pictures of what’s inside you!</p>
        )}
          {/* Content for Age Group 17 */}
          {(ageGroup === '17') && (
            <p>An MRI (Magnetic Resonance Imaging) scan is a medical test that creates detailed images of the inside of your body.
            Unlike X-rays, it uses a strong magnet and radio waves to produce clear pictures of areas like your brain, muscles, and organs.
            During an MRI, you’ll lie on a padded bed that slides into a tunnel-shaped machine.
            The scanner makes loud tapping or thumping sounds, but you’ll be given earplugs or headphones — sometimes with music to help you relax.
            It’s completely painless, and nothing actually touches you while the scan is happening.
            The main thing is to stay very still so the images are sharp and accurate.
            Afterward, doctors study the pictures to understand what’s going on and plan the best care for you.</p>
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
