import React, { useState } from "react";
import "./appLayout.css";
import HorizontalNavbar from "../horizontalNavbar/horizontalNavbar";
import VerticalNavbar from "../verticalNavbar/verticalNavbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "../../allPages/dashboard/Dashboard";
import Home from "../../allPages/CourseException/Home";
// import OnlineForm from "../../allPages/CourseException/OnlineCourse/OnlineForm";
// import OneCredit from "../../allPages/CourseException/OneCredit/OneCredit";
// import OnlineHome from "../../allPages/CourseException/OnlineCourse/OnlineHome";
// import CreditHome from "../../allPages/CourseException/OneCredit/CreditHome";
// import CourseApproval from "../../allPages/CourseException/OnlineCourse/CourseApproval";
// import OnlineReports from "../../allPages/CourseException/OnlineCourse/OnlineReports";
// import OnlineRejected from "../../allPages/CourseException/OnlineCourse/OnlineRejected";
import InternshipForm from "../../allPages/CourseException/InternShip/InternshipForm";
import Internship from "../../allPages/CourseException/InternShip/Internship";
import AddonHome  from "../../allPages/CourseException/Add-on/AddonHome";
import AddonPending from "../../allPages/CourseException/Add-on/AddonPending";
import AddonRejected from "../../allPages/CourseException/Add-on/AddonRejected";
import AddonApproval from "../../allPages/CourseException/Add-on/AddonApproval";
import InternshipPen from "../../allPages/CourseException/InternShip/InternshipPen";
import FacultyModal from "../../allPages/CourseException/InternShip/FacultyModal";
import InternshipRej from "../../allPages/CourseException/InternShip/InternshipRej";
import InternshipApp from "../../allPages/CourseException/InternShip/InternshipApp";
import InternshipHome from "../../allPages/CourseException/InternShip/Internship";
import FacAddForm from "../../allPages/CourseException/Add-on/FacAddForm";
import UploadPage from "../../allPages/CourseException/InternShip/UploadPage";

function AppLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleVerticalNavbar = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeVerticalNavbar = () => {
    setIsMenuOpen(false); // Set isMenuOpen to false to close the vertical navbar
  };
  return (
    <div className="total-app-layout">
      <Router>
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
                <Route path="/" element={<Dashboard />} />
                {/* <Route path="/onlineCourseForm" element={<OnlineForm />} />
                <Route path="/onecreditForm" element={<OneCredit />} />
                <Route path="/courseExcp" element={<Home />} />
                <Route path="/onlineCourse" element={<OnlineHome />} />
                <Route path="/oneCredit" element={<CreditHome />} />
                <Route path="/courseApproval" element={<CourseApproval />} />
                <Route path="/onlineReports" element={<OnlineReports />} />
                <Route path="/onlineRejected" element={<OnlineRejected />} /> */}
                <Route path="/internship" element={<Internship />} />
                <Route path="/InternshipPen" element={<InternshipPen />} />
                <Route path="/internshipForm" element={<InternshipForm />} />
                 <Route path="/addonApproval" element={<AddonApproval />} />
                <Route path="/addonRejected" element={<AddonRejected />} /> 
                <Route path="/addonPending" element={<AddonPending />} />
                <Route path="/addonHome" element={<AddonHome />} />
                <Route path="/FacultyModal" element={<FacultyModal />} />
                <Route path="/InternshipRej" element={<InternshipRej />} />
                <Route path="/InternshipApp" element={<InternshipApp />} />
                <Route path="/InternshipHome" element={<InternshipHome />} />
                <Route path="/FacAddForm" element={<FacAddForm />} />
                <Route path="/UploadPage" element={<UploadPage />} />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default AppLayout;
