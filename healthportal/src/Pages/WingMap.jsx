import React, { useState } from "react";
import "./Pages.css"
import { useAgeGroup } from '../AgeGroupContext';
import "../Components/Slideshow.css"

/**
 * WingMap Page Component
 * Displays a map and information about the Children's Wing.
 * Content is tailored to different age groups.
 */
export default function WingMap() {
  // Access the current age group from the context
  const ageGroup = useAgeGroup();
  return (
    <div>
      <div className="pagesContainer">
        <div className="pagesLeft">
        <div className="pagesBox">
          <div className="pagesBoxText">
          <h1>Wing Map</h1>
          {/* Content for Age Group 5 */}
          {(ageGroup === '5') && (
            <p>
            <strong>Welcome to the Children’s Wing!</strong> <br />
            Here’s your special map to help you find your way around. <br />
            <strong>Wards</strong> – Cosy rooms where children rest and get better. <br />
            <strong>X-ray and MRI</strong> – The picture-taking rooms that help doctors see inside your body. <br />
            <strong>Clinics</strong> – Quick-visit rooms for check-ups and small treatments. <br />
            <strong>Play Area</strong> – Spaces full of toys, books, and games where you can relax and have fun. <br />
            <strong>Café and Family Lounge</strong> – A place where families can grab a snack and take a break. <br />
            <strong>Welcome Desk</strong> – The first stop to ask questions or get help finding your way. <br />
            This map helps you see all the different parts of the children’s wing. And remember, friendly staff are always nearby to guide you if you’re not sure where to go.</p>
        )}
          {/* Content for Age Group 12 */}
          {(ageGroup === '12') && (
            <p>
            <strong>Welcome to the Children’s Wing!</strong><br />
            This map will help you find your way around and see what’s where. <br /><br />
            <strong>Wards</strong> – Comfortable rooms where children stay while doctors and nurses help them feel better. <br />
            <strong>X-ray and MRI</strong> – Special rooms where machines take pictures inside your body to help doctors understand what’s going on. <br />
            <strong>Clinics</strong> – Rooms for appointments, check-ups, and smaller treatments. <br />
            <strong>Play Area</strong> – Fun spaces with games, books, and activities to help you relax and enjoy your time. <br />
            <strong>Café and Family Lounge</strong> – A place to get food, drinks, and take a break with your family. <br />
            <strong>Welcome Desk</strong> – The first place to go if you need help, directions, or have questions. <br />
            This map shows all the important places in the children’s wing. Staff are always nearby if you need help finding your way.</p>
        )}
          {/* Content for Age Group 17 */}
          {(ageGroup === '17') && (
            <p>
            <strong>Welcome to the Children’s Wing!</strong> <br />
            Use this map to help you navigate the department and find the areas you need. <br />
            <strong>Wards</strong> – Patient rooms where young people stay during treatment and recovery. <br />
            <strong>X-ray and MRI</strong> – Imaging rooms where scans are taken to help doctors diagnose and monitor conditions. <br />
            <strong>Clinics</strong> – Areas for appointments, assessments, and outpatient treatments. <br />
            <strong>Play Area</strong> – A relaxed space to unwind, read, or take a break between appointments. <br />
            <strong>Café and Family Lounge</strong> – A comfortable area for food, drinks, and time with family or carers. <br />
            <strong>Welcome Desk</strong> – our main point of contact for information, support, and directions. <br />
            This map highlights key locations within the children’s wing. If you’re unsure where to go, staff are always available to help.</p>
        )}
            </div>
          </div>
        </div>
          <div className="pagesRight">
            <div id="slideshow-container">
            <div id="slideshow-image">
              {/* Google Maps Embed showing the location */}
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2241.024728774967!2d-4.266137723113733!3d55.82753007311199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x488846fa8d7f7f69%3A0x5028e6d9c3fc4f06!2s50%20Prospecthill%20Rd%2C%20Glasgow%20G42%209LB!5e0!3m2!1sen!2suk!4v1770025959792!5m2!1sen!2suk"
                width=""
                height=""
                frameborder="0"
                style={{}}
                allowfullscreen=""
                aria-hidden="false"
                tabindex="0"
            />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
