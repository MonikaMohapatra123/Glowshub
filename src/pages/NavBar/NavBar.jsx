import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import navbarData from "../../json/data.json"; // adjust path if needed
import "./NavBar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const data = navbarData["0"];

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close popup if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      {/* Logo */}
      <div className="logo">
        <span className="bold">{data.logo.bold}</span>
        <span className="normal">{data.logo.normal}</span>
      </div>

      {/* Right Side Buttons */}
      <div className="nav-buttons">
        {data.buttons.map((btn, index) => (
          <button
            key={index}
            className="nav-btn"
            onClick={() => navigate(btn.route)}
          >
            {btn.label}
          </button>
        ))}

        {/* Menu with popup */}
        <div className="menu-wrapper" ref={menuRef}>
          <button
            className="nav-btn menu-icon"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {data.menu.label} <span className="hamburger">&#9776;</span>
          </button>

          {menuOpen && (
            <div className="menu-popup">
              {data.menu.items.map((item, i) => (
                <p
                  key={i}
                  onClick={() => {
                    if (item.route && item.route !== "#") navigate(item.route);
                    setMenuOpen(false);
                  }}
                >
                  {item.label}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;










// import React, { useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import navbarData from "../../json/data.json"; // adjust path if needed
// import "./NavBar.css";

// const Navbar = ({ darkMode, setDarkMode }) => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const menuRef = useRef(null);
//   const navigate = useNavigate();

//   const data = navbarData["0"];

//   // Detect scroll
//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 0);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Close popup if clicked outside
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setMenuOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
//       {/* Logo */}
//       <div className="logo">
//         <span className="bold">{data.logo.bold}</span>
//         <span className="normal">{data.logo.normal}</span>
//       </div>

//       {/* Right Side Buttons */}
//       <div className="nav-buttons">
//         {data.buttons.map((btn, index) => (
//           <button
//             key={index}
//             className="nav-btn"
//             onClick={() => navigate(btn.route)}
//           >
//             {btn.label}
//           </button>
//         ))}

//         {/* Dark/Light Toggle Button */}
//         <button
//           className="nav-btn theme-toggle"
//           onClick={() => setDarkMode(!darkMode)}
//         >
//           {darkMode ? "☀️ Light" : "🌙 Dark"}
//         </button>

//         {/* Menu with popup */}
//         <div className="menu-wrapper" ref={menuRef}>
//           <button
//             className="nav-btn menu-icon"
//             onClick={() => setMenuOpen(!menuOpen)}
//           >
//             {data.menu.label} <span className="hamburger">&#9776;</span>
//           </button>

//           {menuOpen && (
//             <div className="menu-popup">
//               {data.menu.items.map((item, i) => (
//                 <p
//                   key={i}
//                   onClick={() => {
//                     if (item.route && item.route !== "#") navigate(item.route);
//                     setMenuOpen(false);
//                   }}
//                 >
//                   {item.label}
//                 </p>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;
