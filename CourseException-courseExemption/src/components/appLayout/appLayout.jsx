import React, { useState } from "react";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import "./appLayout.css";
import HorizontalNavbar from "../horizontalNavbar/horizontalNavbar";
import VerticalNavbar from "../verticalNavbar/verticalNavbar";
import Dashboard from "../../allPages/dashboard/Dashboard";
import Login from "../../allPages/login/Login";
import Home from "../../allPages/CourseException/Home";
import OnlineForm from "../../allPages/CourseException/OnlineCourse/OnlineForm";
import OneCredit from "../../allPages/CourseException/OneCredit/OneCredit";
import OnlineHome from "../../allPages/CourseException/OnlineCourse/OnlineHome";
import CreditHome from "../../allPages/CourseException/OneCredit/CreditHome";
import CourseApproval from "../../allPages/CourseException/OnlineCourse/CourseApproval";
import OnlineReports from "../../allPages/CourseException/OnlineCourse/OnlineReports";
import OnlineRejected from "../../allPages/CourseException/OnlineCourse/OnlineRejected";
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
import InternshipCompanies from "../../allPages/CourseException/InternShip/InternshipCompanies";
import PendingApproval from "../../allPages/CourseException/OneCredit/PendingApproval";
import ApprovedStudents from "../../allPages/CourseException/OneCredit/ApprovedStudents";
import RejectedStudents from "../../allPages/CourseException/OneCredit/RejectedStudents";
import PendingApprovals from "../../allPages/CourseException/InternShip/PendingApprovals";
import ApprovedStudent from "../../allPages/CourseException/InternShip/ApprovedStudents";
import RejectedStudent from "../../allPages/CourseException/InternShip/RejectedStudents";
import PendingApprovalsAddon from "../../allPages/CourseException/Add-onHonorsMinors/PendingApprovals";
import ApprovedStudentsAddon from "../../allPages/CourseException/Add-onHonorsMinors/ApprovedStudents";
import RejectedStudentsAddon from "../../allPages/CourseException/Add-onHonorsMinors/RejectedStudents";
import { useAuth } from "../AuthContext"; // Import useAuth

function AppLayout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleVerticalNavbar = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeVerticalNavbar = () => {
    setIsMenuOpen(false);
  };

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
              <Route path="/" element={<LoginWrapper />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/onlineCourseForm" element={<OnlineForm />} />
                <Route path="/courseExcp" element={<Home />} />
                <Route path="/Online Course" element={<OnlineHome />} />
                <Route path="/courseApproval" element={<CourseApproval />} />
                <Route path="/OnlineReports" element={<OnlineReports />} />
                <Route path="/OnlineRejected" element={<OnlineRejected />} />
                <Route path="/OnlineUpload" element={<OnlineUpload />} />
                <Route path="/OnlineCourseList" element={<ListOfCourses />} />
                <Route path="/One Credit" element={<CreditHome />} />
                <Route path="/OneCreditUpload" element={<OneCreditUpload />} />
                <Route path="/OneCreditMappings" element={<OneCreditStudentMappings />} />
                <Route path="/OneCreditPending" element={<PendingApproval />} />
                <Route path="/OneCreditApproved" element={<ApprovedStudents />} />
                <Route path="/OneCreditRejected" element={<RejectedStudents />} />
                <Route path="/OveralReports" element={<OveralReports />} />
                <Route path="/Internship" element={<InternshipHome />} />
                <Route path="/InternshipForm" element={<InternshipForm />} />
                <Route path="/InternUpload" element={<InternshipUpload />} />
                <Route path="/InternCompanyList" element={<InternshipCompanies />} />
                <Route path="/InternPending" element={<PendingApprovals />} />
                <Route path="/InternApproved" element={<ApprovedStudent />} />
                <Route path="/InternRejected" element={<RejectedStudent />} />
                <Route path="/Add-On/Honors And Minors" element={<AddOnHonorMinor />} />
                <Route path="/AddOnUpload" element={<AddOnUpload />} />
                <Route path="/HonorMinorUpload" element={<HonorMinorUpload />} />
                <Route path="/ListOfStudentsMappings" element={<ListOfStudentsMappings />} />
                <Route path="/AddonPending" element={<PendingApprovalsAddon />} />
                <Route path="/AddonApproved" element={<ApprovedStudentsAddon />} />
                <Route path="/AddonRejected" element={<RejectedStudentsAddon />} />
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

function LoginWrapper() {
  const { user } = useAuth(); // Use useAuth for authentication

  return user ? <Navigate to="/dashboard" replace /> : <Login />;
}

function ProtectedRoute() {
  const { user } = useAuth(); // Use useAuth for authentication
  return user ? <Outlet /> : <Navigate to="/" replace />;
}

export default AppLayout;












