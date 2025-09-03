import React from "react";
import "./StatsSection.css";

const StatsSection = () => {
  return (
    <div className="stats-container">
      <h2 className="stats-title">
        The top-rated destination for beauty and wellness
      </h2>
      <p className="stats-subtitle">
        One solution, one software. Trusted by the best in the beauty and
        wellness industry
      </p>

      <h1 className="stats-main">1 billion+</h1>
      <p className="stats-desc">Appointments booked on Fresha</p>

      <div className="stats-grid">
        <div className="stats-item">
          <h3>130,000+</h3>
          <p>partner businesses</p>
        </div>
        <div className="stats-item">
          <h3>120+ countries</h3>
          <p>using Fresha</p>
        </div>
        <div className="stats-item">
          <h3>450,000+</h3>
          <p>stylists and professionals</p>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
