import React from "react";
import "./AnimatedCard.css";

export default function AnimatedCard() {
  return (
    <div className="Animated-card">
      <h3>Hover Me</h3>
      <span className="edge left"></span>
      <span className="edge top"></span>
      <span className="edge right"></span>
      <span className="edge bottom"></span>
    </div>
  );
}
