import React from "react";
import footerData from "../../json/data.json";
import "./Footer.css"; // Optional for styling

export default function Footer() {
  const data = footerData["2"];

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-logo">
          <h2>{data.logo}</h2>
          <button>
            {data.appButton} {data.appIcons.includes("apple") && ""}{" "}
            {data.appIcons.includes("google") && "G"}
          </button>
        </div>

        <div className="footer-links">
          <div>
            <h4>About Fresha</h4>
            {data.about.map((item, i) => (
              <p key={i}>{item}</p>
            ))}
          </div>

          <div>
            <h4>For business</h4>
            {data.forBusiness.map((item, i) => (
              <p key={i}>{item}</p>
            ))}
          </div>

          <div>
            <h4>Legal</h4>
            {data.legal.map((item, i) => (
              <p key={i}>{item}</p>
            ))}
          </div>

          <div>
            <h4>Find us on social</h4>
            {data.social.map((item, i) => (
              <p key={i}>{item}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>{data.language}</span>
        <span>{data.copyright}</span>
      </div>
    </footer>
  );
}
