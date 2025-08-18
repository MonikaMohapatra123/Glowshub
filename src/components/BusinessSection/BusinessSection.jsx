import React from "react";
import "./BusinessSection.css";

const BusinessSection = () => {
  return (
    <div className="business-container">
      {/* Left Section */}
      <div className="business-left">
        <h1>Fresha for <br /> Business</h1>
        <p>
          Supercharge your business for free with the world’s top booking platform
          for salons and spas. Independently voted no. 1 by industry professionals.
        </p>
        <button className="cta-btn">Find out more</button>

        <div className="review-section">
          <p><strong>Excellent 5/5</strong></p>
          <p className="stars">★★★★★</p>
          <p>Over 1250 reviews on <span>Capterra</span></p>
        </div>
      </div>

      {/* Right Section */}
      <div className="business-right">
        <div className="calendar-mockup">
          <img src="/color-salon.png" alt="Calendar" />
        </div>
        <div className="mobile-mockup">
          <img src="/color-salon.png" alt="Mobile App" />
        </div>
      </div>
    </div>
  );
};

export default BusinessSection;
