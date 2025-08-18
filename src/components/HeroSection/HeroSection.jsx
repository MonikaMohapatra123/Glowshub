import React, { useState, useEffect } from "react";
import "./HeroSection.css";

const HeroSection = ({ heroData }) => {
  const [treatment, setTreatment] = useState(heroData.treatments[0]);
  const [location, setLocation] = useState(heroData.defaultLocation);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [count, setCount] = useState(heroData.startCount);

  // Live counter effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 5) + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation(
          `Lat: ${position.coords.latitude.toFixed(2)}, Lng: ${position.coords.longitude.toFixed(2)}`
        );
      });
    } else {
      alert("Geolocation not supported");
    }
  };

  const handleSearch = () => {
    alert(`Searching for:
Treatment: ${treatment}
Location: ${location}
Date: ${date || "Any date"}
Time: ${time || "Any time"}`);
  };

  return (
    <div className="hero-container">
      <h1 className="hero-title">{heroData.title}</h1>

      <div className="search-bar">
        <select
          value={treatment}
          onChange={(e) => setTreatment(e.target.value)}
        >
          {heroData.treatments.map((t, i) => (
            <option key={i}>{t}</option>
          ))}
        </select>

        <button className="location-btn" onClick={handleLocationClick}>
          {location}
        </button>

        <input type="date" onChange={(e) => setDate(e.target.value)} />
        <input type="time" onChange={(e) => setTime(e.target.value)} />

        <button className="search-btn" onClick={handleSearch}>
          {heroData.searchButton}
        </button>
      </div>

      <p className="appointment-count">
        <strong>{count.toLocaleString()}</strong> {heroData.appointmentText}
      </p>
    </div>
  );
};

export default HeroSection;
