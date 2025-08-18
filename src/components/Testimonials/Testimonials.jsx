import React, { useRef, useState, useEffect } from "react";
import "./Testimonials.css";

const Testimonials = ({ data }) => {
  const scrollRef = useRef(null);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [showLeftArrow, setShowLeftArrow] = useState(false);

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
    <div className="testimonials-container">
        <h2>Testimonials</h2>
      {showLeftArrow && (
        <button className="arrow-btn left" onClick={scrollLeft}>
          ←
        </button>
      )}

      <div className="card-wrapper" ref={scrollRef}>
        {data.map((item, index) => (
          <div className="card" key={index}>
            <div className="stars">{"★".repeat(item.stars)}</div>
            <h3>{item.title}</h3>
            <p className="review-text">{item.text}</p>
            <div className="user">
              <img src={item.img} alt={item.name} />
              <div>
                <p className="username">{item.name}</p>
                <p className="location">{item.location}</p>
              </div>
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

export default Testimonials;
