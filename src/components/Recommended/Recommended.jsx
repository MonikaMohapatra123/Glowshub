import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // ✅ import
import "./Recommended.css";


const Recommended = ({ recommendedData }) => {
  const scrollRef = useRef(null);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const navigate = useNavigate(); // ✅ hook

  const checkArrows = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeftArrow(el.scrollLeft > 0);
    setShowRightArrow(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  };

  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const handleCardClick = (index) => {
    if (index === 0) {
      navigate("/recommend-click"); // ✅ Navigate to RecommendClick page
    }
  };

  useEffect(() => {
    checkArrows();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener("scroll", checkArrows);
      window.addEventListener("resize", checkArrows);
    }
    return () => {
      if (el) {
        el.removeEventListener("scroll", checkArrows);
        window.removeEventListener("resize", checkArrows);
      }
    };
  }, []);

  return (
    <div className="recommended-container">
      <h2>Recommended</h2>

      {showLeftArrow && (
        <button className="arrow-btn left" onClick={scrollLeft}>
          ←
        </button>
      )}

      <div className="card-wrapper" ref={scrollRef}>
        {recommendedData.map((item, index) => (
          <div
            className="card"
            key={index}
            onClick={() => handleCardClick(index)} // ✅ click handler
          >
            <img src={item.img} alt={item.title} />
            <div className="card-content">
              <h3>{item.title}</h3>
              <p className="rating">
                ⭐ {item.rating} <span>{item.reviews}</span>
              </p>
              <p className="location">{item.location}</p>
              <span className="category">{item.category}</span>
            </div>
          </div>
        ))}
      </div>

      {showRightArrow && (
        <button className="arrow-btn right" onClick={scrollRight}>
          →
        </button>
      )}
    
    </div>
  );
};

export default Recommended;
