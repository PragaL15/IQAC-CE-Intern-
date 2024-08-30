import React, { useState, useEffect } from "react";
import "../styles/Internship.css";
import InputBox from "../../../components/InputBox/inputbox";
import { DatePicker } from "antd";
import Select from "react-select";
import { apiBaseUrl } from "../../../api/api";
import apiLoginHost from "../../login/LoginApi";
<<<<<<< HEAD
import dayjs from "dayjs";
=======
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
import axios from "axios";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import { Navigate, useNavigate } from "react-router-dom";
//import { format } from 'date-fns';
const style1 = {
  position: "absolute",
  top: "5%",
  left: "50%",
  bottom: "90%",
  transform: "translate(-50%, -50%)",
  width: 280,
  bgcolor: "background.paper",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
  borderRadius: "10px",
  p: 4,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 290,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
  p: 4,
};

const InternshipForm = () => {
  const [name, setName] = useState("");
  const [student, setstudent] = useState("7376222AD156");
  const [rollNo, setRollNo] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [degree, setDegree] = useState("");
  const [branch, setBranch] = useState("");
<<<<<<< HEAD
  const [approvalStatus, setApprovalStatus] = useState(0);
=======
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
  const [studentName, setStudentName] = useState("");
  const [registerNumber, setRegisterNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [mode, setMode] = useState("");
  const [Industry, setIndustry] = useState("");
  const [EndDate, setEndDate] = useState(null);
  const [StartDate, setStartDate] = useState(null);
  const [duration, setDuration] = useState("");
  const [stipend, setStipend] = useState("");
  const [amount, setAmount] = useState(null);
  const [courseException, setCourseException] = useState("");
  const [certificateFile, setCertificateFile] = useState(null);
  const [reportFile, setReportFile] = useState(null);
<<<<<<< HEAD
  const [AimFile, setAimFile] = useState(null);
=======
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
  const [elective, setElective] = useState(null);
  const [elctiveData, setElectiveData] = useState([]);
  const [industryData, setindustryData] = useState([]);
  const [fmtStartDate, setFmtStartDate] = useState(null);
  const [fmtEndDate, setFmtEndDate] = useState(null);
  const [dataRespModal, setDataRespModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [academicYearData, setAcademicYearData] = useState([]);
  const [selectedAcademicYear, SetSelectedAcademicYear] = useState(null);
  const [semesterOptions, setSemesterOptions] = useState([]);
  const [reasonOpen, setReasonOpen] = useState(false);
  const [totalActive, setTotalActive] = useState(null);
  const [approvedIntern, setApprovedIntern] = useState(null);
  const [internActive, setInternActive] = useState(null);
  const [totalExemption, setTotalExemption] = useState(null);

  const [durationError, setDurationError] = useState("");
<<<<<<< HEAD
  const [courseExceptionError, setCourseExceptionError] = useState("");
=======
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98

  const [studentData, setStudentData] = useState([]);
  const navigate = useNavigate();

<<<<<<< HEAD
  const handleLogout = async () => {
    try {
      await axios.post(`${apiBaseUrl}/logout`, { withCredentials: true });
      // Clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("resources");

      // Redirect to login page
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

=======
  // useEffect to set initial student data
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
  useEffect(() => {
    const fetchedData = [
      {
        id: 1,
        name: "Pragalya",
        rollNo: "7376222AD156",
        year: "II",
        specialLab: "Blockchain",
        degree: "BE",
        branch: "CSD",
        Industry: "J.P Morgan",
      },
    ];
    setStudentData(fetchedData);
    setName(fetchedData[0].name);
    setRollNo(fetchedData[0].rollNo);
    setYear(fetchedData[0].year);
    setDegree(fetchedData[0].degree);
    setBranch(fetchedData[0].branch);
<<<<<<< HEAD
    const fetchAcademicYear = async () => {
      const yearPromise = await axios.get(
        `${apiBaseUrl}/api/ce/AvailableAcademicYears`,
        { withCredentials: true }
=======

    // Function to fetch academic years
    const fetchAcademicYear = async () => {
      const yearPromise = await axios.get(
        `${apiBaseUrl}/api/ce/AvailableAcademicYears`
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
      );
      setAcademicYearData(yearPromise.data);
    };

<<<<<<< HEAD
    const fetchAllActive = async () => {
      const Actives = await axios.get(
        `${apiBaseUrl}/api/ce/oc/AllActiveApplications?student=${student}`,
        { withCredentials: true }
=======
    // Function to fetch all active applications
    const fetchAllActive = async () => {
      const Actives = await axios.get(
        `${apiBaseUrl}/api/ce/oc/AllActiveApplications?student=${student}`
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
      );
      const { internship, total } = Actives.data;
      setInternActive(internship);
      setTotalActive(total);
    };

<<<<<<< HEAD
    const fetchApprovedCount = async () => {
      const approved = await axios.get(
        `${apiBaseUrl}/api/ce/oc/ApprovedStatusAll?student=${student}`,
        { withCredentials: true }
=======
    // Function to fetch approved applications count
    const fetchApprovedCount = async () => {
      const approved = await axios.get(
        `${apiBaseUrl}/api/ce/oc/ApprovedStatusAll?student=${student}`
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
      );
      const { approved_internship, approved_total } = approved.data;
      setApprovedIntern(approved_internship);
      setTotalExemption(approved_total);
    };

    fetcElectives();
    fetchAcademicYear();
    fetchAllActive();
    fetchApprovedCount();
    fetchCompanies();
  }, []);

<<<<<<< HEAD
  const fetcElectives = async () => {
    try {
      const response = await axios.get(
        `${apiBaseUrl}/api/ce/AvailableElectives`,
        { withCredentials: true }
      );
      setElectiveData(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized, logging out:", error);
        handleLogout(); // Call logout function
      } else {
        console.log("error in fetching Elctives", error);
      }
    }
  };

  const fetchCompanies = async () => {
    try {
      const response1 = await axios.get(
        `${apiBaseUrl}/api/ce/in/AllIndustries?student=${student}`,
        { withCredentials: true }
      );
      setindustryData(response1.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized, logging out:", error);
        handleLogout(); // Call logout function
      } else {
        console.log("error in fetching Companies", error);
      }
    }
  };

=======
  // Function to fetch electives
  const fetcElectives = async () => {
    try {
      const response = await axios.get(
        `${apiBaseUrl}/api/ce/AvailableElectives`
      );
      setElectiveData(response.data);
    } catch (error) {
      console.log("error in fetching Elctives", error);
    }
  };

  // Function to fetch companies
  const fetchCompanies = async () => {
    try {
      const response1 = await axios.get(
        `${apiBaseUrl}/api/ce/in/AllIndustries?student=${student}`
      );
      setindustryData(response1.data);
    } catch (error) {
      console.log("error in fetching Companies", error);
    }
  };

  // useEffect to fetch user data
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${apiLoginHost}/api/user-data`, {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
          setStudentName(data.name);
          setRegisterNumber(data.register_number);
          setDepartment(data.department);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

<<<<<<< HEAD
=======
  // useEffect to calculate duration based on StartDate and EndDate
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
  useEffect(() => {
    if (StartDate && EndDate) {
      const days = calculateDuration(StartDate, EndDate);
      setDuration(days.toString());

      if (mode === "Offline" && parseInt(days) < 45) {
        setDurationError("Duration cannot be less than 45 days");
      } else {
        setDurationError("");
      }
    }
  }, [StartDate, EndDate, mode]);

  const AcademicYearList = academicYearData.map((year) => ({
    value: year.id,
    label: year.academic_year,
  }));

<<<<<<< HEAD
=======
  // Function to calculate duration between two dates
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
  const calculateDuration = (start, end) => {
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(start);
    const secondDate = new Date(end);
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    return diffDays;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formValid = true;

    // List of mandatory fields
    const mandatoryFields = [
      { value: selectedAcademicYear, name: "Academic Year" },
      { value: semester, name: "Semester" },
      { value: mode, name: "Mode" },
      { value: StartDate, name: "Start Date" },
      { value: EndDate, name: "End Date" },
      { value: duration, name: "Duration" },
      { value: stipend, name: "Stipend" },
      { value: certificateFile, name: "Certificate File" },
      { value: reportFile, name: "Report File" },
<<<<<<< HEAD
      { value: AimFile, name: "Aim File" },
      { value: create_status, name: "create_status" },
    ];

    // Check if all mandatory fields are filled
=======
    ];

    // Loop through mandatory fields to check for validation
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
    for (const field of mandatoryFields) {
      if (!field.value) {
        alert(`Please fill the mandatory field: ${field.name}`);
        formValid = false;
        break;
      }
    }

    if (courseException === "1") {
      if (!elective) {
        alert("Please select prefered Elective");
      }
    }

    if (stipend === "No") {
      setAmount(0);
    }

<<<<<<< HEAD
    const activeApplicationsResponse = await axios.get(
      `${apiBaseUrl}/api/ce/oc/AllActiveApplications?student=${student}`,
      { withCredentials: true }
=======
    // Check active applications
    const activeApplicationsResponse = await axios.get(
      `${apiBaseUrl}/api/ce/oc/AllActiveApplications?student=${student}`
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
    );

    const { total, internship } = activeApplicationsResponse.data;

    // Check if total applications are less than 4
<<<<<<< HEAD
    if (courseException === "1") {
      if (total >= 4 || internship === 1) {
        alert("You have reached the maximum number of applications allowed.");
        return;
      }
=======
    if (total >= 4 || internship === 1) {
      alert("You have reached the maximum number of applications allowed.");
      return;
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
    }

    if (formValid) {
      const formData = new FormData();
      formData.append("rollNo", rollNo);
      formData.append("academic_year", selectedAcademicYear);
      formData.append("semester", semester);
      formData.append("mode", mode);
      formData.append("Industry", Industry);
      formData.append("StartDate", fmtStartDate);
      formData.append("EndDate", fmtEndDate);
      formData.append("duration", duration);
      formData.append("stipend", stipend);
      formData.append("amount", amount);
      formData.append("courseException", courseException);
      formData.append("reportFile", reportFile);
      formData.append("certificateFile", certificateFile);
      formData.append("elective", elective);
<<<<<<< HEAD
      formData.append("Aim", AimFile);
=======
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
      try {
        const response = await axios.post(
          `${apiBaseUrl}/api/ce/in/InternApply/internshipApply`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
<<<<<<< HEAD
            withCredentials: true,
=======
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
          }
        );

        console.log("Response:", response.data);
        if (response.status === 200) {
          console.log("Data successfully sent to the backend");
          setDataRespModal(true);
          setIsSuccess(true);
          setResponseMessage("Online Course Applied Successfully");
        }
      } catch (error) {
<<<<<<< HEAD
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized, logging out:", error);
          handleLogout(); // Call logout function
        } else {
          console.error("Error sending data to the backend:", error);
          setDataRespModal(true);
          setIsSuccess(false);
          setResponseMessage(
            "Error While Applying the online course..Retry it!"
          );
        }
=======
        console.error("Error sending data to the backend:", error);
        setDataRespModal(true);
        setIsSuccess(false);
        setResponseMessage("Error While Applying the online course..Retry it!");
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
      }

      console.log("Form submitted:", {
        rollNo,
        selectedAcademicYear,
        semester,
        mode,
        Industry,
        StartDate,
        EndDate,
        duration,
        stipend,
        amount,
        courseException,
        certificateFile,
        reportFile,
        elective,
<<<<<<< HEAD
        create_status,
=======
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
      });
    }
  };

  const handleStartDateChange = (date) => {
    if (EndDate && date && date > EndDate) {
      // If start date is after end date, show error message
      alert(
        "Start date cannot be after the end date. Please select a valid start date."
      );
      setStartDate(null); // Reset start date
    } else {
      setStartDate(date);
      if (date && typeof date === "object" && date.$isDayjsObject) {
        const nativeDate = date.toDate();
        const formatdate = formatDate(nativeDate);
        console.log(formatdate);
        setFmtStartDate(formatdate);
      }
    }
  };

  // Function to handle End Date
  const handleEndDateChange = (date) => {
    if (StartDate && date && date < StartDate) {
      // If end date is before start date, show error message
      alert(
        "End date cannot be before the start date. Please select a valid end date."
      );
      setEndDate(null); // Reset end date
    } else {
      // If end date is valid, update the state and calculate the number of days
      setEndDate(date);
      if (date && typeof date === "object" && date.$isDayjsObject) {
        // Extract the native Date object from the Day.js object
        const nativeDate = date.toDate();
        const formatdate = formatDate(nativeDate);
        console.log(formatdate);
        setFmtEndDate(formatdate);
      }
    }
  };

  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0"); // January is 0!
    const dd = String(date.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const handleCertificateFileChange = (event) => {
    setCertificateFile(event.target.files[0]);
  };

  const handleReportFileChange = (event) => {
    setReportFile(event.target.files[0]);
  };

  const handleAmountChange = (e) => {
    const input = e.target.value;
    if (!input || /^\d+$/.test(input)) {
      setAmount(input);
    }
  };

  const handleRespModalClose = () => {
    setDataRespModal(false);
    {
      isSuccess ? navigate("/courseExcp") : navigate("/Internship");
    }
  };

  const handleAcademicYear = async (selectedOption) => {
    SetSelectedAcademicYear(selectedOption.value);
    setSemester(null);
    setSemesterOptions([]);
    try {
      const response = await axios.get(
<<<<<<< HEAD
        `${apiBaseUrl}/api/ce/AvailableSemester?id=${selectedOption.value}`,
        { withCredentials: true }
=======
        `${apiBaseUrl}/api/ce/AvailableSemester?id=${selectedOption.value}`
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
      );
      const semesterData = response.data[0];

      const newSemesterOptions = [
        { value: semesterData.sem1, label: `Semester ${semesterData.sem1}` },
        { value: semesterData.sem2, label: `Semester ${semesterData.sem2}` },
        { value: semesterData.sem3, label: `Semester ${semesterData.sem3}` },
      ];
      setSemesterOptions(newSemesterOptions);
    } catch (error) {
<<<<<<< HEAD
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized, logging out:", error);
        handleLogout(); // Call logout function
      } else {
        console.error("Error fetching semester data:", error);
      }
=======
      console.error("Error fetching semester data:", error);
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
    }
  };

  const handleSem = (selectedOption) => {
    setSemester(selectedOption.value);
  };

  const handleValidation = () => {
    if (totalActive < 4 && internActive < 1) {
      return true;
    } else {
      return false;
    }
  };

  const handleModalOpen = (e) => {
    e.preventDefault();
    setReasonOpen(true);
  };

  return (
    <form id="mandatory" onSubmit={handleSubmit} className="frm">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="titdefault">
              <h4>Default Details</h4>
            </div>
            <div className="Default">
              <div className="dfinside">
                <div className="quesField">
                  <label className="inp">Student Name</label>
                  <Select
                    className="textField"
                    value={[{ value: studentName, label: studentName }]}
                    isDisabled={true}
                    placeholder=""
                  />
                </div>
                <div className="quesField">
                  <label className="inp">Register Number</label>
                  <Select
                    className="textField"
                    value={[{ value: registerNumber, label: registerNumber }]}
                    isDisabled={true}
                    placeholder=""
                  />
                </div>
                <div className="quesField">
                  <label className="inp">Branch of student</label>
                  <Select
                    className="textField"
                    value={[{ value: department, label: department }]}
                    isDisabled={true}
                    placeholder=""
                  />
                </div>
                {/* <div className="quesField">
                  <label className="inp">Year Of Study</label>
                  <Select
                    value={{ value: year, label: year }}
                    onChange={(selectedOption) => setYear(selectedOption.value)}
                    options={studentData.map((student) => ({
                      value: student.year,
                      label: student.year,
                    }))}
                    isDisabled={true}
                    placeholder=""
                    isSearchable
                    className="textField"
                  />
                </div> */}
              </div>
            </div>
            <div className="titdefault">
              <h4>InternShip Details</h4>
            </div>
            <div className="Default">
              <div className="dfinside">
                <div className="quesField">
                  <div className="inp">Academic Year</div>
                  <div>
                    <Select
                      onChange={handleAcademicYear}
                      placeholder=""
                      isSearchable
                      className="textField"
                      options={AcademicYearList}
                    />
                  </div>
                </div>
                <div className="quesField">
                  <div className="inp">Semester</div>
                  <div>
                    <Select
                      value={{
                        value: semester,
                        label: semester ? `Semester ${semester}` : "",
                      }}
                      onChange={handleSem}
                      className="textField"
                      options={semesterOptions}
                      isSearchable={false}
                      placeholder=""
                    />
                    {/* {selectedSem && <div> Semester : {selectedSem} </div>} */}
                  </div>
                </div>
                <div className="quesField">
                  <label className="inp">Mode of Completion</label>
                  <Select
                    value={{ value: mode, label: mode }}
                    onChange={(selectedOption) => setMode(selectedOption.value)}
                    options={[
                      { value: "Online", label: "Online" },
                      { value: "Offline", label: "Offline" },
                    ]}
                    isSearchable
                    className="textField"
                    menuPlacement="top"
                  />
                </div>
<<<<<<< HEAD

                <div className="quesDoc">
                  <div>Aim and obj:</div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <label
                      htmlFor="pdf-upload-certificate"
                      className="pdf-upload-button"
                    >
                      aim obj PDF
                      <input
                        id="pdf-upload-certificate"
                        type="file"
                        accept=".pdf"
                        onChange={handleCertificateFileChange}
                        style={{ display: "none" }}
                      />
                    </label>
                    <div style={{ margin: "5px" }}>
                      {certificateFile && (
                        <p>Selected file: {certificateFile.name}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="quesField">
                  <label className="inp">Approval Status:</label>
                  <Select
                    className="textField"
                    value={{ value: approvalStatus, label: "Initiated" }} // Display "Initiated" with value 0
                    isDisabled={true}
                    placeholder=""
                  />
                </div>
           

                {approvalStatus === 0 && (
                  <div className="container">
                    <div className="row">
                      <div className="RPsubmits">
                        <button
                          type="button"
                          onClick={() => navigate("/3")}
                          className="expCancelBtn"
                        >
                          Cancel
                        </button>
                        <button type="submit" className="expCreateBtn">
                          Create
                        </button>
                      </div>
                    </div>
                  </div>
                )}

=======
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
                {mode === "Online" && (
                  <div>
                    <div className="quesField">
                      <label className="inp">Start Date</label>
                      <DatePicker
                        value={StartDate}
                        onChange={handleStartDateChange}
                        className="textField"
                      />
                    </div>
                    <div className="quesField">
                      <label className="inp">End Date</label>
                      <DatePicker
                        value={EndDate}
                        onChange={handleEndDateChange}
                        className="textField"
                      />
                    </div>
                    <div className="quesField">
                      <label className="inp">Duration in Days</label>
                      <InputBox value={duration} disabled />
                    </div>
<<<<<<< HEAD

                    <div className="quesDoc">
                  <div>Aim and obj:</div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <label
                      htmlFor="pdf-upload-certificate"
                      className="pdf-upload-button"
                    >
                      aim obj PDF
                      <input
                        id="pdf-upload-certificate"
                        type="file"
                        accept=".pdf"
                        onChange={handleCertificateFileChange}
                        style={{ display: "none" }}
                      />
                    </label>
                    <div style={{ margin: "5px" }}>
                      {certificateFile && (
                        <p>Selected file: {certificateFile.name}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="quesField">
                  <label className="inp">Approval Status:</label>
                  <Select
                    className="textField"
                    value={{ value: approvalStatus, label: "Initiated" }} // Display "Initiated" with value 0
                    isDisabled={true}
                    placeholder=""
                  />
                </div>


=======
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
                  </div>
                )}
                {mode === "Offline" && (
                  <div>
                    <div className="quesField">
                      <label className="inp">Start Date</label>
                      <DatePicker
                        value={StartDate}
                        onChange={handleStartDateChange}
                        className="textField"
                      />
                    </div>
                    <div className="quesField">
                      <label className="inp">End Date</label>
                      <DatePicker
                        value={EndDate}
                        onChange={handleEndDateChange}
                        className="textField"
                      />
                    </div>
                    <div className="quesField">
                      <label className="inp">Duration in Days</label>
                      <InputBox value={duration} disabled={true} />
                    </div>
<<<<<<< HEAD


                    <div className="quesDoc">
                  <div>Aim and obj:</div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <label
                      htmlFor="pdf-upload-certificate"
                      className="pdf-upload-button"
                    >
                      aim obj PDF
                      <input
                        id="pdf-upload-certificate"
                        type="file"
                        accept=".pdf"
                        onChange={handleCertificateFileChange}
                        style={{ display: "none" }}
                      />
                    </label>
                    <div style={{ margin: "5px" }}>
                      {certificateFile && (
                        <p>Selected file: {certificateFile.name}</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="quesField">
                  <label className="inp">Approval Status:</label>
                  <Select
                    className="textField"
                    value={{ value: approvalStatus, label: "Initiated" }} // Display "Initiated" with value 0
                    isDisabled={true}
                    placeholder=""
                  />
                </div>


=======
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
                  </div>
                )}
                {semester >= 3 && mode === "Offline" && handleValidation() && (
                  <div>
                    {parseInt(duration) > 45 && (
                      <div className="quesField">
                        <label className="inp">If you want CE:</label>
                        <Select
                          onChange={(selectedOption) =>
                            setCourseException(selectedOption.value)
                          }
                          options={[
                            { value: "1", label: "Yes" },
                            { value: "0", label: "No" },
                          ]}
                          isSearchable
                          className="textField"
                        />
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="space"> </div>
          <div className="col-md-6">
            {semester &&
              semester < 3 &&
              (mode === "Offline" || mode === "Online") && (
                <div>
                  <div className="titdefault">
                    <h4>Apply for Reward Point</h4>
                    <div>
                      you are not eligible for course exemption
                      <button className="ReasonBtn" onClick={handleModalOpen}>
                        View Reason
                      </button>
                    </div>
                  </div>
                  <div className="Default">
                    <div className="dfinside">
                      <div>
                        <div className="quesField">
                          <label className="inp">Industry:</label>
                          <Select
                            onChange={(selectedOption) =>
                              setIndustry(selectedOption.value)
                            }
                            options={industryData.map((industry) => ({
                              value: industry.id,
                              label:
                                industry.company_name +
                                " - " +
                                industry.company_address,
                            }))}
                            placeholder=""
                            isSearchable
                            className="textField"
                          />
                        </div>
                        <div className="quesField">
                          <label className="inp">Stipend:</label>
                          <Select
                            value={{ value: stipend, label: stipend }}
                            onChange={(selectedOption) =>
                              setStipend(selectedOption.value)
                            }
                            options={[
                              { value: "Yes", label: "Yes" },
                              { value: "No", label: "No" },
                            ]}
                            isSearchable
                            className="textField"
                          />
                        </div>
                        {stipend === "Yes" && (
                          <div className="quesField">
                            <label className="inp">Amount:</label>
                            <InputBox
                              type="number"
                              className="inputField"
                              value={amount}
                              onchange={handleAmountChange}
                              min={0}
                            />
                          </div>
                        )}
                        <div className="quesDoc">
                          <div>Upload Certificate</div>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <label
                              htmlFor="pdf-upload-certificate"
                              className="pdf-upload-button"
                            >
                              Certificate PDF
                              <input
                                id="pdf-upload-certificate"
                                type="file"
                                accept=".pdf"
                                onChange={handleCertificateFileChange}
                                style={{ display: "none" }}
                              />
                            </label>
                            <div style={{ margin: "5px" }}>
                              {certificateFile && (
                                <p>Selected file: {certificateFile.name}</p>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="quesDoc">
                          <div>Upload Full Report</div>
                          <div
                            style={{ display: "flex", flexDirection: "row" }}
                          >
                            <label
                              htmlFor="pdf-upload-report"
                              className="pdf-upload-button"
                            >
                              Full Report PDF
                              <input
                                id="pdf-upload-report"
                                type="file"
                                accept=".pdf"
                                onChange={handleReportFileChange}
                                style={{ display: "none" }}
                              />
                            </label>
                            <div style={{ margin: "5px" }}>
                              {reportFile && (
                                <p>Selected file: {reportFile.name}</p>
                              )}
                            </div>
                          </div>
                        </div>
<<<<<<< HEAD
                        {approvalStatus === 0 && (
                          <div className="container">
                            <div className="row">
                              <div className="RPsubmits">
                                <button
                                  type="button"
                                  onClick={() => navigate("/3")}
                                  className="expCancelBtn"
                                >
                                  Cancel
                                </button>
                                <button type="submit" className="expCreateBtn">
                                  Create
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
=======
                        <div className="container">
                          <div className="row">
                            <div className="RPsubmits">
                              <button type="button" className="expCancelBtn">
                                Cancel
                              </button>
                              <button type="submit" className="expCreateBtn">
                                Create
                              </button>
                            </div>
                          </div>
                        </div>
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
                      </div>
                    </div>
                  </div>
                </div>
              )}
            {semester >= 3 &&
              (mode === "Online" || mode === "Offline") &&
              courseException !== "1" && (
                <div>
                  <div className="titdefault">
                    <h4>Apply for Reward Point</h4>
                    {(courseException != "" ||
                      mode === "Online" ||
                      !handleValidation() ||
                      parseInt(duration) < 45) && (
                      <div>
                        you are not eligible for course exemption
                        <button className="ReasonBtn" onClick={handleModalOpen}>
                          View Reason
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="Default">
                    <div className="dfinside">
                      <div className="quesField">
                        <label className="inp">Industry:</label>
                        <Select
                          onChange={(selectedOption) =>
                            setIndustry(selectedOption.value)
                          }
                          options={industryData.map((industry) => ({
                            value: industry.id,
                            label:
                              industry.company_name +
                              " - " +
                              industry.company_address,
                          }))}
                          placeholder=""
                          isSearchable
                          className="textField"
                        />
                      </div>
                      <div className="quesField">
                        <label className="inp">Stipend:</label>
                        <Select
                          value={{ value: stipend, label: stipend }}
                          onChange={(selectedOption) =>
                            setStipend(selectedOption.value)
                          }
                          options={[
                            { value: "Yes", label: "Yes" },
                            { value: "No", label: "No" },
                          ]}
                          isSearchable
                          className="textField"
                        />
                      </div>
                      {stipend === "Yes" && (
                        <div className="quesField">
                          <label className="inp">Amount:</label>
                          <InputBox
                            type="number"
                            className="inputField"
                            value={amount}
                            onchange={handleAmountChange}
                            min={0}
                          />
                        </div>
                      )}
                      <div className="quesDoc">
                        <div>Upload Certificate</div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <label
                            htmlFor="pdf-upload-certificate"
                            className="pdf-upload-button"
                          >
                            Certficate PDF
                            <input
                              id="pdf-upload-certificate"
                              type="file"
                              accept=".pdf"
                              onChange={handleCertificateFileChange}
                              style={{ display: "none" }}
                            />
                          </label>
                          <div style={{ margin: "5px" }}>
                            {certificateFile && (
                              <p>Selected file: {certificateFile.name}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="quesDoc">
                        <div>Upload Full Report</div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <label
                            htmlFor="pdf-upload-report"
                            className="pdf-upload-button"
                          >
                            Full Report PDF
                            <input
                              id="pdf-upload-report"
                              type="file"
                              accept=".pdf"
                              onChange={handleReportFileChange}
                              style={{ display: "none" }}
                            />
                          </label>
                          <div style={{ margin: "5px" }}>
                            {reportFile && (
                              <p>Selected file: {reportFile.name}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="container">
                        <div className="row">
                          <div className="RPsubmits">
<<<<<<< HEAD
                            <button
                              type="button"
                              onClick={() => navigate("/3")}
                              className="expCancelBtn"
                            >
=======
                            <button type="button" className="expCancelBtn">
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
                              Cancel
                            </button>
                            <button type="submit" className="expCreateBtn">
                              Create
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            {semester >= 3 &&
              mode === "Offline" &&
              courseException === "1" &&
              parseInt(duration) >= 45 && (
                <div>
                  <div className="titdefault">
                    <h4>Apply for Course Exception</h4>
                  </div>
                  <div className="Default">
                    <div className="dfinside">
                      <div className="quesField">
                        <label className="inp">Industry:</label>
                        <Select
                          onChange={(selectedOption) =>
                            setIndustry(selectedOption.value)
                          }
                          options={industryData.map((industry) => ({
                            value: industry.id,
                            label:
                              industry.company_name +
                              " - " +
                              industry.company_address,
                          }))}
                          placeholder=""
                          isSearchable
                          className="textField"
                        />
                      </div>

                      <div className="quesField">
                        <label className="inp">Stipend:</label>
                        <Select
                          value={{
                            value: stipend,
                            label: stipend,
                          }}
                          onChange={(selectedOption) =>
                            setStipend(selectedOption.value)
                          }
                          options={[
                            { value: "Yes", label: "Yes" },
                            { value: "No", label: "No" },
                          ]}
                          isSearchable
                          className="textField"
                        />
                      </div>
                      {stipend === "Yes" && (
                        <div className="quesField">
                          <label className="inp">Amount:</label>
                          <InputBox
                            type="number"
                            className="inputField"
                            value={amount}
                            onchange={handleAmountChange}
                            min={0}
                          />
                        </div>
                      )}
                      <div className="quesDoc">
                        <div>Upload Certificate</div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <label
                            htmlFor="pdf-upload-certificate"
                            className="pdf-upload-button"
                          >
                            Certificate PDF
                            <input
                              id="pdf-upload-certificate"
                              type="file"
                              accept=".pdf"
                              onChange={handleCertificateFileChange}
                              style={{ display: "none" }}
                            />
                          </label>
                          <div style={{ margin: "5px" }}>
                            {certificateFile && (
                              <p>Selected file: {certificateFile.name}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="quesDoc">
                        <div>Upload Full Report</div>
                        <div style={{ display: "flex", flexDirection: "row" }}>
                          <label
                            htmlFor="pdf-upload-report"
                            className="pdf-upload-button"
                          >
                            Full Report PDF
                            <input
                              id="pdf-upload-report"
                              type="file"
                              accept=".pdf"
                              onChange={handleReportFileChange}
                              style={{ display: "none" }}
                            />
                          </label>
                          <div style={{ margin: "5px" }}>
                            {reportFile && (
                              <p>Selected file: {reportFile.name}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="quesField">
                        <label className="inp">Prefered Elective</label>
                        <Select
                          onChange={(selectedOption) =>
                            setElective(selectedOption.value)
                          }
                          options={elctiveData.map((student) => ({
                            value: student.id,
                            label: student.elective,
                          }))}
                          placeholder=""
                          isSearchable
                          className="textField"
                          menuPlacement="top"
                        />
                      </div>
                      <div className="container">
                        <div className="row">
                          <div className="RPsubmits">
<<<<<<< HEAD
                            <button
                              type="button"
                              onClick={() => navigate("/1")}
                              className="expCancelBtn"
                            >
                              Cancel
                            </button>
                            <button
                              type="submit"
                              className="expCreateBtn"
                              disabled={!createdStatus} // Disable the button if createdStatus is false
                            >
=======
                            <button type="button" className="expCancelBtn">
                              Cancel
                            </button>
                            <button type="submit" className="expCreateBtn">
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
                              Create
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
          </div>
          <Modal open={dataRespModal} onClose={handleRespModalClose}>
            <Box sx={style1} className="success">
              <div>{responseMessage}</div>
              <div className="tick">
                {isSuccess ? <CheckCircleIcon /> : <AnnouncementIcon />}
              </div>
            </Box>
          </Modal>
          <Modal open={reasonOpen} onClose={() => setReasonOpen(false)}>
            <Box sx={style}>
              <div className="reasonModal">
                <div style={{ fontWeight: "bold", marginBottom: "5px" }}>
                  Reason :
                </div>
                <div>
                  {semester < 3 ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "5px",
                      }}
                    >
                      <div style={{ marginTop: "8px" }}>
                        <AnnouncementIcon />
                      </div>
                      <div style={{ marginTop: "5px" }}>
                        Excemption is valid only from 3rd semester
                      </div>
                    </div>
                  ) : mode === "Online" ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "5px",
                      }}
                    >
                      <div style={{ marginTop: "8px" }}>
                        <AnnouncementIcon />
                      </div>
                      <div style={{ marginTop: "5px" }}>
                        Excemption is valid only for Offline Internship
                      </div>
                    </div>
                  ) : internActive === 1 && approvedIntern === 1 ? (
                    <div>
                      You have Already Completed One Exemption in Internship
                    </div>
                  ) : internActive === 1 && approvedIntern === 0 ? (
                    <div>
                      You have Sufficient Application Applied Wait for the
                      Approval Status..till that yiu could not able to apply
                    </div>
                  ) : parseInt(duration) < 45 ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        gap: "5px",
                      }}
                    >
                      <div style={{ marginTop: "8px" }}>
                        <AnnouncementIcon />
                      </div>
                      <div style={{ marginTop: "5px" }}>
                        Excemption is valid only from duration greater than or
                        equal to 45 days
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </form>
  );
};

export default InternshipForm;
