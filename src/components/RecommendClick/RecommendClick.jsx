import React from "react";
import { FaStar } from "react-icons/fa";
import "./RecommendClick.css";
import ServicesSection from "../ServicesSection/ServicesSection";
import BusinessSection from "../BusinessSection/BusinessSection";

const RecommendClick = () => {
  return (
    <div className="recommend-click">
      {/* Breadcrumb */}
      <div className="breadcrumb">
        <span>Home</span> &gt; <span>Medspas</span> &gt; <span>Singapore</span> &gt; <span>Central Area</span> &gt; 
        <span className="active"> HairFreeSG Electrolysis Permanent Hair Removal Studio</span>
      </div>

      {/* Title */}
      <h1>HairFreeSG Electrolysis Permanent Hair Removal Studio</h1>

      {/* Ratings and Details */}
      <div className="details">
        <div className="rating">
          <span className="score">5.0</span>
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} color="#000" />
          ))}
          <span className="reviews">(709)</span>
        </div>
        <span className="status">● Open until 9:00 pm</span>
        <span className="location">River Valley, Singapore</span>
        <a href="#" className="link">Get directions</a>
      </div>

      {/* Images */}
      <div className="image-grid">
        <img src="/salon-3.png" alt="Main View" className="main-img" />
        <div className="side-images">
          <img src="/salon-1.png" alt="Side 1" />
          <img src="/salon-2.png" alt="Side 2" />
        </div>
      </div>
      <ServicesSection/>
      <BusinessSection/>
    </div>
  );
};

export default RecommendClick;
