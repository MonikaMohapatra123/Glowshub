import React, { useRef, useEffect, useState } from "react";
import "./ServicesSection.css";

export default function ServicesSection() {
  const rightRef = useRef(null);
  const containerRef = useRef(null);
  const [isFixed, setIsFixed] = useState(false);
  const [stopTop, setStopTop] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const container = containerRef.current;
      const rightCard = rightRef.current;

      if (!container || !rightCard) return;

      const containerRect = container.getBoundingClientRect();
      const rightHeight = rightCard.offsetHeight;
      const topOffset = 100; // distance from top of screen when fixed

      // If top of container has scrolled past offset, fix the card
      if (containerRect.top <= topOffset) {
        // If bottom of container is still below card’s bottom
        if (containerRect.bottom > rightHeight + topOffset) {
          setIsFixed(true);
          setStopTop(topOffset);
        } else {
          // bottom reached, stop fixing
          setIsFixed(false);
          setStopTop(containerRect.bottom - rightHeight);
        }
      } else {
        // before reaching fix position
        setIsFixed(false);
        setStopTop(0);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const items = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    title: "LADIES HAIRCUT",
    note: i % 2 ? "· Female only" : "",
    price: i % 3 ? 660 : 790,
  }));

  return (
    <section className="services-wrap" ref={containerRef}>
      {/* LEFT: services list */}
      <div className="left-col">
        {items.map((it) => (
          <article key={it.id} className="service-card">
            <div className="service-text">
              <h3>{it.title}</h3>
              <p>1 hr {it.note}</p>
              <span className="price">HK${it.price}</span>
            </div>
            <button className="book-btn">Book</button>
          </article>
        ))}
      </div>

      {/* RIGHT: sticky/fixed card */}
      <div
        className="right-col"
        ref={rightRef}
        style={{
          position: isFixed ? "fixed" : "absolute",
          top: stopTop,
          // aligns with container right side
        }}
      >
        <div className="biz-card">
          <h2>Sozo Hair Design</h2>
          <div className="rating">⭐ 4.9 (2,139)</div>
          <div className="tags">
            <span className="tag tag-featured">Featured</span>
            <span className="tag tag-deals">Deals</span>
          </div>
          <button className="book-now">Book now</button>
          <div className="meta">
            <div className="timing">
              <strong>Closed</strong> – opens on Friday at 10:00 am
            </div>
            <div className="address">
              34 Wyndham Street, 2/F, Central, Hong Kong Island
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
