// // appLayout.jsx

// import React, { useState } from "react";
// import "./appLayout.css";
// import HorizontalNavbar from "../horizontalNavbar/horizontalNavbar";
// import VerticalNavbar from "../verticalNavbar/verticalNavbar";
// import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
// import Dashboard from "../../allPages/dashboard/Dashboard";
// import Login from "../../allPages/Login/login";
// import Home from "../../allPages/CourseException/Home";
// import OnlineForm from '../../allPages/CourseException/OnlineCourse/OnlineForm';
// import OneCredit from "../../allPages/CourseException/OneCredit/OneCredit";
// import OnlineHome from "../../allPages/CourseException/OnlineCourse/OnlineHome";
// import CreditHome from "../../allPages/CourseException/OneCredit/CreditHome";
// import CourseApproval from "../../allPages/CourseException/OnlineCourse/CourseApproval";
// import OnlineReports from "../../allPages/CourseException/OnlineCourse/OnlineReports";
// import OnlineRejected from "../../allPages/CourseException/OnlineCourse/OnlineRejected";
// import Internship from "../../allPages/CourseException/InternShip/Internship";
// import OnlineUpload from "../../allPages/CourseException/OnlineCourse/OnlineUpload";
// import ListOfCourses from "../../allPages/CourseException/OnlineCourse/ListOfCourses";
// import OneCreditUpload from "../../allPages/CourseException/OneCredit/OneCreditUpload";
// import OneCreditStudentMappings from "../../allPages/CourseException/OneCredit/OneCreditStudentMappings";
// import OveralReports from "../../allPages/CourseException/OveralReports/OveralReports";
// import InternshipHome from "../../allPages/CourseException/InternShip/InternshipHome";
// import InternshipForm from "../../allPages/CourseException/InternShip/InternshipForm";
// import AddOnHonorMinor from "../../allPages/CourseException/Add-onHonorsMinors/AddOnHonorMinor";
// import AddOnUpload from "../../allPages/CourseException/Add-onHonorsMinors/AddOnUpload";
// import HonorMinorUpload from "../../allPages/CourseException/Add-onHonorsMinors/HonorMinorUpload";
// import ListOfStudentsMappings from "../../allPages/CourseException/Add-onHonorsMinors/ListOfStudentsMappings";
// import InternshipUpload from "../../allPages/CourseException/InternShip/InternshipUpload";

// function AppLayout() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleVerticalNavbar = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const closeVerticalNavbar = () => {
//     setIsMenuOpen(false);
//   };

//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<LoginWrapper />} />
//         <Route path="/*" element={<MainLayout toggleVerticalNavbar={toggleVerticalNavbar} closeVerticalNavbar={closeVerticalNavbar} isMenuOpen={isMenuOpen} />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// function LoginWrapper() {
//   const location = useLocation();
//   const isLoginPage = location.pathname === "/";

//   return isLoginPage ? <Login /> : <MainLayout />;
// }

// function MainLayout({ toggleVerticalNavbar, closeVerticalNavbar, isMenuOpen }) {
//   return (
//     <div className="total-app-layout">
//       <div className="h-navbar">
//         <HorizontalNavbar toggleVerticalNavbar={toggleVerticalNavbar} />
//       </div>
//       <div className="v-nav-and-content">
//         <div className={`v-navbar ${isMenuOpen ? "open" : ""}`}>
//           <VerticalNavbar onClose={closeVerticalNavbar} />
//         </div>
//         <div className="content">
//           <div className="content-with-margin">
//             <Routes>
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/onlineCourseForm" element={<OnlineForm />} />
//               <Route path="/onecreditForm" element={<OneCredit />} />
//               <Route path="/courseExcp" element={<Home />} />
//               <Route path="/Online Course" element={<OnlineHome />} />
//               <Route path="/One Credit" element={<CreditHome />} />
//               <Route path="/courseApproval" element={<CourseApproval />} />
//               <Route path="/OnlineReports" element={<OnlineReports />} />
//               <Route path="/OnlineRejected" element={<OnlineRejected />} />
//               <Route path="/OnlineUpload" element={<OnlineUpload />} />
//               <Route path="/OnlineCourseList" element={<ListOfCourses />} />
//               <Route path="/OneCreditUpload" element={<OneCreditUpload />} />
//               <Route path="/OneCreditMappings" element={<OneCreditStudentMappings />} />
//               <Route path="/OveralReports" element={<OveralReports />} />
//               <Route path="/Internship" element={<InternshipHome />} />
//               <Route path="/InternshipForm" element={<InternshipForm />} />
//               <Route path="/InternUpload" element={<InternshipUpload />} />
//               <Route path="/Add-On/Honors And Minors" element={<AddOnHonorMinor />} />
//               <Route path="/AddOnUpload" element={<AddOnUpload />} />
//               <Route path="/HonorMinorUpload" element={<HonorMinorUpload />} />
//               <Route path="/ListOfStudentsMappings" element={<ListOfStudentsMappings />} />
//             </Routes>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AppLayout;


import React, { useState } from "react";
import "./appLayout.css";
import HorizontalNavbar from "../horizontalNavbar/horizontalNavbar";
import VerticalNavbar from "../verticalNavbar/verticalNavbar";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../../allPages/dashboard/Dashboard";
import Login from "../../allPages/Login/login";
import Home from "../../allPages/CourseException/Home";
import OnlineForm from '../../allPages/CourseException/OnlineCourse/OnlineForm';
import OneCredit from "../../allPages/CourseException/OneCredit/OneCredit";
import OnlineHome from "../../allPages/CourseException/OnlineCourse/OnlineHome";
import CreditHome from "../../allPages/CourseException/OneCredit/CreditHome";
import CourseApproval from "../../allPages/CourseException/OnlineCourse/CourseApproval";
import OnlineReports from "../../allPages/CourseException/OnlineCourse/OnlineReports";
import OnlineRejected from "../../allPages/CourseException/OnlineCourse/OnlineRejected";
import Internship from "../../allPages/CourseException/InternShip/InternshipForm";
import OnlineUpload from "../../allPages/CourseException/OnlineCourse/OnlineUpload";
import ListOfCourses from "../../allPages/CourseException/OnlineCourse/ListOfCourses";
import OneCreditUpload from "../../allPages/CourseException/OneCredit/OneCreditUpload";
import OneCreditStudentMappings from "../../allPages/CourseException/OneCredit/OneCreditStudentMappings";
import OveralReports from "../../allPages/CourseException/OveralReports/OveralReports";
import InternshipHome from "../../allPages/CourseException/InternShip/InternshipHome";
import InternshipForm from "../../allPages/CourseException/InternShip/InternshipForm";
import AddOnHonorMinor from "../../allPages/CourseException/Add-onHonorsMinors/AddOnHonorMinor";
import AddOnUpload from "../../allPages/CourseException/Add-onHonorsMinors/AddOnUpload";
import HonorMinorUpload from "../../allPages/CourseException/Add-onHonorsMinors/HonorMinorUpload";
import ListOfStudentsMappings from "../../allPages/CourseException/Add-onHonorsMinors/ListOfStudentsMappings";
import InternshipUpload from "../../allPages/CourseException/InternShip/InternshipUpload";

function AppLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleVerticalNavbar = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeVerticalNavbar = () => {
    setIsMenuOpen(false);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginWrapper />} />
        <Route path="/*" element={<MainLayout toggleVerticalNavbar={toggleVerticalNavbar} closeVerticalNavbar={closeVerticalNavbar} isMenuOpen={isMenuOpen} />} />
      </Routes>
    </BrowserRouter>
  );
}

function LoginWrapper() {
  const isAuthenticated = false; // Replace with actual authentication logic

  return isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />;
}

function MainLayout({ toggleVerticalNavbar, closeVerticalNavbar, isMenuOpen }) {
  return (
    <div className="total-app-layout">
      <div className="h-navbar">
        <HorizontalNavbar toggleVerticalNavbar={toggleVerticalNavbar} />
      </div>
      <div className="v-nav-and-content">
        <div className={`v-navbar ${isMenuOpen ? "open" : ""}`}>
          <VerticalNavbar onClose={closeVerticalNavbar} />
        </div>
        <div className="content">
          <div className="content-with-margin">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/onlineCourseForm" element={<OnlineForm />} />
              <Route path="/onecreditForm" element={<OneCredit />} />
              <Route path="/courseExcp" element={<Home />} />
              <Route path="/online-course" element={<OnlineHome />} />
              <Route path="/one-credit" element={<CreditHome />} />
              <Route path="/courseApproval" element={<CourseApproval />} />
              <Route path="/online-reports" element={<OnlineReports />} />
              <Route path="/online-rejected" element={<OnlineRejected />} />
              <Route path="/online-upload" element={<OnlineUpload />} />
              <Route path="/online-course-list" element={<ListOfCourses />} />
              <Route path="/one-credit-upload" element={<OneCreditUpload />} />
              <Route path="/one-credit-mappings" element={<OneCreditStudentMappings />} />
              <Route path="/overall-reports" element={<OveralReports />} />
              <Route path="/internship" element={<InternshipHome />} />
              <Route path="/internship-form" element={<InternshipForm />} />
              <Route path="/intern-upload" element={<InternshipUpload />} />
              <Route path="/add-on-honors-minors" element={<AddOnHonorMinor />} />
              <Route path="/addon-upload" element={<AddOnUpload />} />
              <Route path="/honor-minor-upload" element={<HonorMinorUpload />} />
              <Route path="/list-of-students-mappings" element={<ListOfStudentsMappings />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppLayout;

