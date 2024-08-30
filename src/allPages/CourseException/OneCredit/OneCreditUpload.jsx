import React, { useEffect, useState } from "react";
import InputBox from "../../../components/InputBox/inputbox";
import TextField from "@mui/material/TextField";
import excel from "/excelSheetOneCredit/SampleFormatOneCredit.xlsx";
import "../styles/onlineUpload.css";
import { apiBaseUrl } from "../../../api/api";
import { DatePicker } from "antd";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
=======
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
import Select from "react-select";
import axios from "axios";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import DescriptionIcon from "@mui/icons-material/Description";
import LoadingButton from "@mui/lab/LoadingButton";
import { InputNumber } from "primereact/inputnumber";
<<<<<<< HEAD
import DownloadIcon from '@mui/icons-material/Download';
=======
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98

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

const OneCreditUpload = () => {
<<<<<<< HEAD
  const navigate = useNavigate();
=======
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
  const [multipleOpen, setMultipleOpen] = useState(false);
  const [courseCode, setCourseCode] = useState(null);
  const [courseName, setCourseName] = useState(null);
  const [student, setStudent] = useState(null);
  const [semester, setSemester] = useState(null);
  const [responseModalOpen, setResponseModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [issuccess, setIsSuccess] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rollNumberData, setRollNumberData] = useState([]);
  const [academicYearData, setAcademicYearData] = useState([]);
  const [selectedAcademicYear, SetSelectedAcademicYear] = useState(null);
  const [semesterOptions, setSemesterOptions] = useState([]);

<<<<<<< HEAD
  const handleLogout = async () => {
    try {
      await axios.post(`${apiBaseUrl}/logout`, { withCredentials: true });
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user_id');
      localStorage.removeItem('resources');
      
      // Redirect to login page
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  useEffect(() => {
    const fetchPlatform = async () => {
      try {
        const type = await axios.get(`${apiBaseUrl}/api/ce/availableRollNumbers`, { withCredentials: true });
        setRollNumberData(type.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized, logging out:", error);
          handleLogout(); // Call logout function
        }
        else { 
        console.error("Error fetching users:", error);
        }
=======
  useEffect(() => {
    const fetchPlatform = async () => {
      try {
        const type = await axios.get(`${apiBaseUrl}/api/ce/availableRollNumbers`);
        setRollNumberData(type.data);
      } catch (error) {
        console.error("Error fetching users:", error);
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
      }
    };
    const fetchAcademicYear = async () => {
      const yearPromise = await axios.get(
<<<<<<< HEAD
        `${apiBaseUrl}/api/ce/AvailableAcademicYears`, { withCredentials: true }
=======
        `${apiBaseUrl}/api/ce/AvailableAcademicYears`
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
      );
      setAcademicYearData(yearPromise.data);
    };
    fetchPlatform();
    fetchAcademicYear();
  }, []);

  const RollNumberList = rollNumberData.map((types) => ({
    value: types.register_number,
    label: types.register_number,
  }));

  const AcademicYearList = academicYearData.map((year) => ({
    value: year.id,
    label: year.academic_year,
  }));

  const handleMultipleUpload = () => {
    setMultipleOpen(!multipleOpen);
  };

  const handleCourseCode = (event) => {
    setCourseCode(event.target.value);
  };

  const handleCourseName = (event) => {
    setCourseName(event.target.value);
  };

  const handleStudent = (selectedOption) => {
    setStudent(selectedOption.value);
  };

  const handleSemester = (selectedOption) => {
    setSemester(selectedOption.value);
  };

  const handleUpload = async () => {
    try {
      if (!courseCode || !courseName || !student || !semester || !selectedAcademicYear) {
        alert("Fill Out All The Fields..");
      } else {
        const response = await axios.post(
          `${apiBaseUrl}/api/ce/oc/OneCreditSingleUpload`,
          {
            courseCode,
            courseName,
            student,
            semester,
            selectedAcademicYear
<<<<<<< HEAD
          }, { withCredentials: true }
=======
          }
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
        );
        console.log("Response:", response.data);
        if (response.status === 200) {
          console.log("Course Added Successfully");
          setResponseMessage("Course Added Successfully");
          setResponseModalOpen(true);
          setIsSuccess(true);
          setCourseCode("");
          setCourseName("");
        }
      }
    } catch (error) {
<<<<<<< HEAD
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized, logging out:", error);
        handleLogout(); // Call logout function
      }
      else { 
=======
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
      console.log("Error in Adding the Course ", error);
      const errorMsg = error.response
        ? error.response.data.msg
        : "Error in Adding the Course";
      setResponseMessage(errorMsg);
      setResponseModalOpen(true);
      setIsSuccess(false);
      setCourseCode("");
      setCourseName("");
<<<<<<< HEAD
      }
=======
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
    }
  };

  const handleSheetUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadSheet = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setIsLoading(true);
    setResponseModalOpen(true);

    try {
      const response = await axios.post(
        `${apiBaseUrl}/api/ce/oc/UploadExcelOneCredit`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
<<<<<<< HEAD
        }, { withCredentials: true }
=======
        }
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
      );

      setIsLoading(false);
      if (response.status === 200) {
        console.log(response.data);
        setResponseMessage(
          response.data.message +
            " Records Added: " +
            response.data.added +
            " skipped: " +
            response.data.skip +
            " Updated: " +
            response.data.updated
        );
        setIsSuccess(true);
        setSelectedFile(null);
      }
    } catch (error) {
<<<<<<< HEAD
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized, logging out:", error);
        handleLogout(); // Call logout function
      }
      else { 
      console.error("Error uploading file", error);
      setResponseMessage("Error Uploading File");
      setIsSuccess(false);
      }
=======
      console.error("Error uploading file", error);
      setResponseMessage("Error Uploading File");
      setIsSuccess(false);
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
    }
  };

  const handleAcademicYear = async (selectedOption)=>{
    SetSelectedAcademicYear(selectedOption.value);
    setSemester(null);
    setSemesterOptions([]);
    try {
<<<<<<< HEAD
      const response = await axios.get(`${apiBaseUrl}/api/ce/AvailableSemester?id=${selectedOption.value}`, { withCredentials: true });
=======
      const response = await axios.get(`${apiBaseUrl}/api/ce/AvailableSemester?id=${selectedOption.value}`);
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
      const semesterData = response.data[0];

      const newSemesterOptions = [
        { value: semesterData.sem1, label: `Semester ${semesterData.sem1}` },
        { value: semesterData.sem2, label: `Semester ${semesterData.sem2}` },
        { value: semesterData.sem3, label: `Semester ${semesterData.sem3}` }
      ];
      setSemesterOptions(newSemesterOptions)
    } catch (error) {
<<<<<<< HEAD
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized, logging out:", error);
        handleLogout(); // Call logout function
      }
      else { 
      console.error("Error fetching semester data:", error);
      }
=======
      console.error("Error fetching semester data:", error);
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
    }
  }

  
  const handleSem = (selectedOption) => {
    setSemester(selectedOption.value)
  }

  return (
    <div className="updMain">
      <div className="titleBtn">
        <div className="titlehm">
          <h4>One Credit Upload</h4>
        </div>
      </div>
      <div className="subTit">
        <div className="singleTit">
          {multipleOpen ? "Single" : "Multiple"} Upload
        </div>
        <div className="multipleDiv">
          <button className="multipleBtn" onClick={handleMultipleUpload}>
            {multipleOpen ? "Multiple" : "Single"} Upload
          </button>
        </div>
      </div>
      {multipleOpen ? (
        <div className={`frmUpload ${multipleOpen ? "Open" : ""}`}>
          <div className="DefaultUpload">
            <div className="dfinsideUpload">
              <div className="quesField">
                <div className="inp">Course Code</div>
                <div>
                  <TextField
                    className="text"
                    variant="outlined"
                    size="small"
                    value={courseCode}
                    onChange={handleCourseCode}
                  />
                </div>
              </div>
              <div className="quesField">
                <div className="inp">Course Name</div>
                <div>
                  <TextField
                    className="text"
                    variant="outlined"
                    size="small"
                    value={courseName}
                    onChange={handleCourseName}
                  />
                </div>
              </div>
              <div className="quesField">
                <div className="inp">Roll Number</div>
                <div>
                  <Select
                    className="textFieldUpload"
                    options={RollNumberList}
                    placeholder=""
                    maxMenuHeight={130}
                    onChange={handleStudent}
                  ></Select>
                </div>
              </div>
              <div className="quesField">
                <div className="inp">Academic Year</div>
                <div>
                  <Select
                    onChange={handleAcademicYear}
                    placeholder=""
                    isSearchable
                    className="textFieldUpload"
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
                      className="textFieldUpload"
                      options={semesterOptions}
                      isSearchable={false}
                      placeholder=""
                    />
                    {/* {selectedSem && <div> Semester : {selectedSem} </div>} */}
                  </div>
                </div>
              <div className="EXPsubmits">
                <button className="expCreateBtn" onClick={handleUpload}>
                  Create Course
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="singleMain">
          <div className="uploadDiv">
            <div className="updBtnMain">
              <div className="updBtn">
                {!selectedFile && (
<<<<<<< HEAD
                  <label htmlFor="excel-upload" className="single-upload-button">
=======
                  <label htmlFor="excel-upload" className="pdf-upload-button">
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
                    Choose File
                    <input
                      id="excel-upload"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleSheetUpload}
                    />
                  </label>
                )}
                {selectedFile && (
                  <div className="filename">
                    {" "}
                    <div style={{ display: "flex", gap: "5px" }}>
                      <DescriptionIcon /> {selectedFile.name}{" "}
                    </div>
                    <button
                      className="excel-upload-button"
                      onClick={uploadSheet}
                    >
                      Upload Sheet
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className="rules">
              <div className="rules">
                Refer Below Link to Download the Excel Sheet Sample Format For
                Reference
              </div>
              <div className="btns">
                <div>
<<<<<<< HEAD
                  <a href={excel} download style={{textDecoration:"none"}}>
                    <button className="excel-upload-button">
                    <DownloadIcon/>Download Sample
=======
                  <a href={excel} download>
                    <button className="excel-upload-button">
                      Download Sample
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
                    </button>
                  </a>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Modal
        open={responseModalOpen}
        onClose={() => setResponseModalOpen(false)}
        style={{ zIndex: 6000 }}
      >
        <Box sx={style1} className="success">
          <div>
            {isLoading ? (
              <div style={{ display: "flex", flexDirection: "row" }}>
                <LoadingButton loading variant="text">
                  submit
                </LoadingButton>
                <h4 style={{ marginTop: "5px" }}>Loading...</h4>
              </div>
            ) : (
              responseMessage
            )}
          </div>
          <div className="tick">
            {!isLoading &&
              (issuccess ? <CheckCircleIcon /> : <AnnouncementIcon />)}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default OneCreditUpload;
