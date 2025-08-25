import React from "react";
import {
  FaApple,
  FaGooglePlay,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import "./Footer.css";
import data from "../../json/data.json"; // adjust the path

const iconMap = {
  apple: <FaApple />,
  google: <FaGooglePlay />,
  Facebook: <FaFacebook className="icon" />,
  Twitter: <FaTwitter className="icon" />,
  Linkedin: <FaLinkedin className="icon" />,
  Instagram: <FaInstagram className="icon" />,
};

const Footer = () => {
  const footerData = data["2"]; 

  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Logo + App Button */}
        <div className="footer-logo">
          <h1 className="logo">{footerData.logo}</h1>
          <button className="app-button">
            {footerData.appButton}{" "}
            {footerData.appIcons.map((icon, idx) => (
              <span key={idx}>{iconMap[icon]}</span>
            ))}
          </button>
        </div>

        {/* About Fresha */}
        <div>
          <h3 className="footer-heading">About {footerData.logo}</h3>
          <ul>
            {footerData.about.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        {/* For Business */}
        <div>
          <h3 className="footer-heading">For business</h3>
          <ul>
            {footerData.forBusiness.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="footer-heading">Legal</h3>
          <ul>
            {footerData.legal.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="footer-heading">Find us on social</h3>
          <ul>
            {footerData.social.map((platform, idx) => (
              <li key={idx}>{iconMap[platform]} {platform}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p className="language">🌐 {footerData.language}</p>
        <p>{footerData.copyright}</p>
      </div>
    </footer>
  );
};

export default Footer;
