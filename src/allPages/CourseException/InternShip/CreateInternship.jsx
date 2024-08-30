import React, { useState, useEffect } from "react";
import "../styles/Internship.css";
import InputBox from "../../../components/InputBox/inputbox";
import { DatePicker } from "antd";
import Select from "react-select";
import { apiBaseUrl } from "../../../api/api";
import apiLoginHost from "../../login/LoginApi";
import dayjs from "dayjs";
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
  const [specialLab, setSpecialLab] = useState("");
  const [studentName, setStudentName] = useState("");
  const [registerNumber, setRegisterNumber] = useState("");
  const [department, setDepartment] = useState("");
  const [mode, setMode] = useState("");
  const [Industry, setIndustry] = useState("");
  const [EndDate, setEndDate] = useState(null);
  const [StartDate, setStartDate] = useState(null);
  const [duration, setDuration] = useState("");
  const [courseException, setCourseException] = useState("");
  const [certificateFile, setCertificateFile] = useState(null);
  const [elective, setElective] = useState(null);
  const [elctiveData, setElectiveData] = useState([]);
  const [industryData, setindustryData] = useState([]);
  const [fmtStartDate, setFmtStartDate] = useState(null);
  const [fmtEndDate, setFmtEndDate] = useState(null);
  const [dataRespModal, setDataRespModal] = useState(false);
  const [isSuccess, setIsSuccess] = useState(null);
  const [responseMessage, setResponseMessage] = useState("");
  const [academicYearData, setAcademicYearData] = useState([]);
  const [academic_year, SetAcademic_year] = useState(null);
  const [semesterOptions, setSemesterOptions] = useState([]);
  const [reasonOpen, setReasonOpen] = useState(false);
  const [totalActive, setTotalActive] = useState(null);
  const [approvedIntern, setApprovedIntern] = useState(null);
  const [internActive, setInternActive] = useState(null);
  const [totalExemption, setTotalExemption] = useState(null);
  const [durationError, setDurationError] = useState("");
  const [studentData, setStudentData] = useState([]);
  const navigate = useNavigate();

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
    const fetchAcademicYear = async () => {
      const yearPromise = await axios.get(
        `${apiBaseUrl}/api/ce/AvailableAcademicYears`,
        { withCredentials: true }
      );
      setAcademicYearData(yearPromise.data);
    };

    const fetchAllActive = async () => {
      const Actives = await axios.get(
        `${apiBaseUrl}/api/ce/oc/AllActiveApplications?student=${student}`,
        { withCredentials: true }
      );
      const { internship, total } = Actives.data;
      setInternActive(internship);
      setTotalActive(total);
    };

    const fetchApprovedCount = async () => {
      const approved = await axios.get(
        `${apiBaseUrl}/api/ce/oc/ApprovedStatusAll?student=${student}`,
        { withCredentials: true }
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
        { value: academic_year, name: "Academic Year" },
        { value: semester, name: "Semester" },
        { value: mode, name: "Mode" },
        { value: StartDate, name: "Start Date" },
        { value: EndDate, name: "End Date" },
        { value: duration, name: "Duration" },
        { value: certificateFile, name: "Certificate File" },
    ];

    // Check if all mandatory fields are filled
    for (const field of mandatoryFields) {
        if (!field.value) {
            alert(`Please fill the mandatory field: ${field.name}`);
            formValid = false;
            break;
        }
    }

    if (formValid) {
        const formData = new FormData();
        formData.append("rollNo", rollNo);
        formData.append("academic_year", academic_year);
        formData.append("mode", mode);
        formData.append("semester", semester);
        formData.append("Industry", Industry);
        formData.append("StartDate", fmtStartDate); // Use formatted dates
        formData.append("EndDate", fmtEndDate); // Use formatted dates
        formData.append("duration", duration);
        if (certificateFile) {
            formData.append('certificateFile', certificateFile);
        }

        // Debugging FormData
        for (let pair of formData.entries()) {
            console.log(`${pair[0]}: ${pair[1]}`);
        }

        try {
            const response = await axios.post(
                `${apiBaseUrl}/api/ce/in/InternCreate`,
                formData,
                {
                    withCredentials: true,
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            );

            if (response.status === 200) {
                setDataRespModal(true);
                setIsSuccess(true);
                setResponseMessage("Internship tracker Applied Successfully");
            } else {
                setDataRespModal(true);
                setIsSuccess(false);
                setResponseMessage("Error While Applying the online course..Retry it!");
            }
        } catch (error) {
            if (error.response) {
                if (error.response.status === 401) {
                    handleLogout(); // Unauthorized
                } else {
                    setDataRespModal(true);
                    setIsSuccess(false);
                    setResponseMessage(`Error: ${error.response.data.message || "Error While Applying the online course..Retry it!"}`);
                }
            } else if (error.request) {
                setDataRespModal(true);
                setIsSuccess(false);
                setResponseMessage("No response received from the backend. Please check your connection and try again.");
            } else {
                setDataRespModal(true);
                setIsSuccess(false);
                setResponseMessage("Error setting up the request. Please try again.");
            }
        }
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

  const handleRespModalClose = () => {
    setDataRespModal(false);
    {
      isSuccess ? navigate("/courseExcp") : navigate("/Internship");
    }
  };

  const handleAcademicYear = async (selectedOption) => {
    SetAcademic_year(selectedOption.value);
    setSemester(null);
    setSemesterOptions([]);
    try {
      const response = await axios.get(
        `${apiBaseUrl}/api/ce/AvailableSemester?id=${selectedOption.value}`,
        { withCredentials: true }
      );
      const semesterData = response.data[0];

      const newSemesterOptions = [
        { value: semesterData.sem1, label: `Semester ${semesterData.sem1}` },
        { value: semesterData.sem2, label: `Semester ${semesterData.sem2}` },
        { value: semesterData.sem3, label: `Semester ${semesterData.sem3}` },
      ];
      setSemesterOptions(newSemesterOptions);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized, logging out:", error);
        handleLogout(); // Call logout function
      } else {
        console.error("Error fetching semester data:", error);
      }
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
                </div>

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
                    value={[{ value: 0, label: "Initiated" }]} // Setting value as 0 and label as Initiated
                    isDisabled={true}
                    placeholder=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="row">
              <div className="RPsubmits">
                <button
                  type="button"
                  onClick={() => navigate("/1")}
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
        </div>
      </div>
    </form>
  );
};

export default InternshipForm;
