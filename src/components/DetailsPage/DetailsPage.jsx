import React from "react";
import "./DetailsPage.css";

const DetailsPage = ({ detailsData }) => {
  return (
    <div className="details-container">
      {/* Left Content */}
      <div className="details-left">
        <p className="store-icons">
          {detailsData.storeText}{" "}
          <span className="apple">{detailsData.apple}</span>{" "}
          <span className="google">{detailsData.google}</span>
        </p>
        <h1 className="title">{detailsData.title}</h1>
        <p className="subtext">{detailsData.subtext}</p>
      </div>

      {/* Right Image */}
      <div className="details-right">
        <img
          src={detailsData.image}
          alt="Phone Mockup"
          className="phone-img"
        />
      </div>
    </div>
  );
};

export default DetailsPage;
