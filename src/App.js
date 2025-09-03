import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import SignUpLogin from "./components/SignUpLogin/SignUpLogin";
import Navbar from "./pages/NavBar/NavBar";
import Home from "./pages/Home/Home";
import CustomerAuth from "./components/CustomerAuth/CustomerAuth";
import ProfessionalAuth from "./components/ProfessionalAuth/ProfessionalAuth";
import Footer from "./pages/Footer/Footer";
import RecommendClick from "./components/RecommendClick/RecommendClick";

import Admin from "./pages/Admin/Admin";
import PrivateRoute from "./pages/PrivateRoute/PrivateRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignUpLogin />} />
          <Route path="/customer-auth" element={<CustomerAuth />} />
          <Route path="/professional-auth" element={<ProfessionalAuth />} />
           <Route path="/recommend-click" element={<RecommendClick />} />
          <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
         
         
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;





// import React, { lazy, Suspense } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// // Shared Components
// import Navbar from "./pages/NavBar/NavBar";
// import Footer from "./pages/Footer/Footer";
// import Loader from "./components/Loader/Loader";
// import PrivateRoute from "./pages/PrivateRoute/PrivateRoute";

// // Lazy-loaded Public Pages
// const Home = lazy(() => import("./pages/Home/Home"));
// const SignUpLogin = lazy(() => import("./components/SignUpLogin/SignUpLogin"));
// const CustomerAuth = lazy(() =>
//   import("./components/CustomerAuth/CustomerAuth")
// );
// const ProfessionalAuth = lazy(() =>
//   import("./components/ProfessionalAuth/ProfessionalAuth")
// );
// const RecommendClick = lazy(() =>
//   import("./components/RecommendClick/RecommendClick")
// );
// const NotFound = lazy(() => import("./pages/NotFound/NotFound"));

// // Lazy-loaded Admin Pages
// const Login = lazy(() => import("./pages/Login/Login"));
// const Admin = lazy(() => import("./pages/Admin/Admin"));
// const AdminProjects = lazy(() =>
//   import("./pages/AdminProjects/AdminProjects")
// );
// const AdminActivities = lazy(() =>
//   import("./pages/AdminActivities/AdminActivities")
// );
// const AdminNews = lazy(() => import("./pages/AdminNews/AdminNews"));
// const AdminHiring = lazy(() => import("./pages/AdminHiring/AdminHiring"));
// const AdminSubmission = lazy(() =>
//   import("./pages/AdminSubmission/AdminSubmission")
// );
// const AddProjectsPage = lazy(() =>
//   import("./pages/AddProjectsPage/AddProjectsPage")
// );
// const AddActivitiesPage = lazy(() =>
//   import("./pages/AddActivitiesPage/AddActivitiesPage")
// );
// const AddNewsPage = lazy(() => import("./pages/AddNewsPage/AddNewsPage"));
// const AddHiringPage = lazy(() =>
//   import("./pages/AddHiringPage/AddHiringPage")
// );
// const AdminEditProductPage = lazy(() =>
//   import("./pages/EditProjectsPage/EditProjectsPage")
// );
// const EditServicesPage = lazy(() =>
//   import("./pages/EditServicesPage/EditServicesPage")
// );
// const EditHiringPage = lazy(() =>
//   import("./pages/EditHiringPage/EditHiringPage")
// );
// const EditNewsPage = lazy(() => import("./pages/EditNewsPage/EditNewsPage"));
// const EditSubmissionPage = lazy(() =>
//   import("./pages/EditSubmissionPage/EditSubmissionPage")
// );

// // Layouts
// const PublicLayout = ({ children }) => (
//   <>
//     <Navbar />
//     {children}
//     <Footer />
//   </>
// );

// const PrivateLayout = ({ children }) => children;

// function App() {
//   return (
//     <Router>
//       <ToastContainer position="top-right" autoClose={3000} />
//       <Suspense fallback={<Loader />}>
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
//           <Route path="/signUp" element={<PublicLayout><SignUpLogin /></PublicLayout>} />
//           <Route path="/customer-auth" element={<PublicLayout><CustomerAuth /></PublicLayout>} />
//           <Route path="/professional-auth" element={<PublicLayout><ProfessionalAuth /></PublicLayout>} />
//           <Route path="/recommend-click" element={<PublicLayout><RecommendClick /></PublicLayout>} />

//           {/* Admin Routes */}
//           <Route path="/admin" element={<PrivateRoute><PrivateLayout><Admin /></PrivateLayout></PrivateRoute>} />
//           <Route path="/admin/projects" element={<PrivateRoute><PrivateLayout><AdminProjects /></PrivateLayout></PrivateRoute>} />
//           <Route path="/admin/activities" element={<PrivateRoute><PrivateLayout><AdminActivities /></PrivateLayout></PrivateRoute>} />
//           <Route path="/admin/news" element={<PrivateRoute><PrivateLayout><AdminNews /></PrivateLayout></PrivateRoute>} />
//           <Route path="/admin/hiring" element={<PrivateRoute><PrivateLayout><AdminHiring /></PrivateLayout></PrivateRoute>} />
//           <Route path="/admin/submission" element={<PrivateRoute><PrivateLayout><AdminSubmission /></PrivateLayout></PrivateRoute>} />

//           {/* Admin Add */}
//           <Route path="/admin/add-projects" element={<PrivateRoute><PrivateLayout><AddProjectsPage /></PrivateLayout></PrivateRoute>} />
//           <Route path="/admin/add-activities" element={<PrivateRoute><PrivateLayout><AddActivitiesPage /></PrivateLayout></PrivateRoute>} />
//           <Route path="/admin/add-news" element={<PrivateRoute><PrivateLayout><AddNewsPage /></PrivateLayout></PrivateRoute>} />
//           <Route path="/admin/add-hiring" element={<PrivateRoute><PrivateLayout><AddHiringPage /></PrivateLayout></PrivateRoute>} />

//           {/* Admin Edit */}
//           <Route path="/admin/projects/:id" element={<PrivateRoute><PrivateLayout><AdminEditProductPage /></PrivateLayout></PrivateRoute>} />
//           <Route path="/admin/activities/:id" element={<PrivateRoute><PrivateLayout><EditServicesPage /></PrivateLayout></PrivateRoute>} />
//           <Route path="/admin/hiring/:id" element={<PrivateRoute><PrivateLayout><EditHiringPage /></PrivateLayout></PrivateRoute>} />
//           <Route path="/admin/news/:id" element={<PrivateRoute><PrivateLayout><EditNewsPage /></PrivateLayout></PrivateRoute>} />
//           <Route path="/admin/submission/:id" element={<PrivateRoute><PrivateLayout><EditSubmissionPage /></PrivateLayout></PrivateRoute>} />

//           {/* 404 Page */}
//           <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
//         </Routes>
//       </Suspense>
//     </Router>
//   );
// }

// export default App;









