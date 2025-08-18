// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import SignUpLogin from "./components/SignUpLogin/SignUpLogin";
// import Navbar from "./pages/NavBar/NavBar";
// import Home from "./pages/Home/Home";
// import CustomerAuth from "./components/CustomerAuth/CustomerAuth";
// import ProfessionalAuth from "./components/ProfessionalAuth/ProfessionalAuth";
// import Footer from "./pages/Footer/Footer";
// import RecommendClick from "./components/RecommendClick/RecommendClick";

// function App() {
//   return (
//     <Router>
//       <Navbar />
//       <div className="page-content">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<SignUpLogin />} />
//           <Route path="/customer-auth" element={<CustomerAuth />} />
//           <Route path="/professional-auth" element={<ProfessionalAuth />} />
//            <Route path="/recommend-click" element={<RecommendClick />} />
         
//         </Routes>
//       </div>
//       {/* <Footer /> */}
//     </Router>
//   );
// }

// export default App;









import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignUpLogin from "./components/SignUpLogin/SignUpLogin";
import Navbar from "./pages/NavBar/NavBar";
import Home from "./pages/Home/Home";
import CustomerAuth from "./components/CustomerAuth/CustomerAuth";
import ProfessionalAuth from "./components/ProfessionalAuth/ProfessionalAuth";
import Footer from "./pages/Footer/Footer";
import RecommendClick from "./components/RecommendClick/RecommendClick";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  // Apply dark mode class to <body>
  useEffect(() => {
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  return (
    <Router>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignUpLogin />} />
          <Route path="/customer-auth" element={<CustomerAuth />} />
          <Route path="/professional-auth" element={<ProfessionalAuth />} />
          <Route path="/recommend-click" element={<RecommendClick />} />
        </Routes>
      </div>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
