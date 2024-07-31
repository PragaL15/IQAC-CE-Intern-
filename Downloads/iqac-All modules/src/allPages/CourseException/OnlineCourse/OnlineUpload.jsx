import React, { useEffect, useState } from "react";
import InputBox from "../../../components/InputBox/inputbox";
import TextField from "@mui/material/TextField";
import excel from "/excelSheetOnlineCourse/Book1.xlsx";
import "../styles/onlineUpload.css";
import { DatePicker } from "antd";
import Select from "react-select";
import axios from "axios";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import DescriptionIcon from "@mui/icons-material/Description";
import LoadingButton from "@mui/lab/LoadingButton";
import { InputNumber } from 'primereact/inputnumber';
        

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

const OnlineUpload = () => {
  const [multipleOpen, setMultipleOpen] = useState(false);
  const [platformData, setPlatformData] = useState([]);
  const [courseCode, setCourseCode] = useState(null);
  const [courseName, setCourseName] = useState(null);
  const [coursePlatform, setCoursePlatform] = useState(null);
  const [courseDuration, setCourseDuration] = useState(null);
  const [courseCredits, setCourseCredits] = useState(null);
  const [courseExepmtion, setCourseExemption] = useState(null);
  const [responseModalOpen, setResponseModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [issuccess, setIsSuccess] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleMultipleUpload = () => {
    setMultipleOpen(!multipleOpen);
  };

  useEffect(() => {
    const fetchPlatform = async () => {
      try {
        const type = await axios.get(
          "http://localhost:5001/api/ce/oc/platform"
        );
        setPlatformData(type.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchPlatform();
  }, []);

  const PlatformList = platformData.map((types) => ({
    value: types.id,
    label: types.name,
  }));

  const handleCourseCode = (event) => {
    setCourseCode(event.target.value);
  };

  const handleCourseName = (event) => {
    setCourseName(event.target.value);
  };

  const handleDuration = (event) => {
    setCourseDuration(event.target.value);
  };

  const handleCredits = (event) => {
    setCourseCredits(event.target.value);
  };

  const handlePlatform = (selectedOption) => {
    setCoursePlatform(selectedOption.value);
  };

  const handleExemption = (selectedOption) => {
    setCourseExemption(selectedOption.value);
  };

  const handleUpload = async () => {
    try {
      if (
        !courseCode ||
        !courseName ||
        !coursePlatform ||
        !courseDuration ||
        !courseCredits ||
        !courseExepmtion
      ) {
        alert("Fill Out All The Fields..");
      } else if (courseDuration < 0 || courseDuration === 0) {
        alert("Give Correct Duration");
      } else if (courseCredits < 0 || courseCredits === 0) {
        alert("Give correct Credits");
      } else {
        const response = await axios.post(
          "http://localhost:5001/api/ce/oc/SingleOnlineUpload",
          {
            courseCode,
            courseName,
            coursePlatform,
            courseDuration,
            courseCredits,
            courseExepmtion,
          }
        );
        console.log("Response:", response.data);
        if (response.status === 200) {
          console.log("Course Added Successfully");
          setResponseMessage("Course Added Successfully");
          setResponseModalOpen(true);
          setIsSuccess(true);
          setCourseCode("");
          setCourseName("");
          setCourseDuration(0);
          setCourseCredits(0);
        }
      }
    } catch (error) {
      console.log("Error in Adding the Course ", error);
      const errorMsg = error.response ? error.response.data.msg : "Error in Adding the Course";
      setResponseMessage(errorMsg);
      setResponseModalOpen(true);
      setIsSuccess(false);
      setCourseCode("");
      setCourseName("");
      setCourseDuration(0);
      setCourseCredits(0);
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
        "http://localhost:5001/api/ce/oc/UploadExcel",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setIsLoading(false);
      if (response.status === 200) {
        console.log(response.data);
        setResponseMessage(
          response.data.message +
            " Records Added: " +
            response.data.added + " skipped: " +
            response.data.skip + " Updated: " +
            response.data.updated
        );
        setIsSuccess(true);
        setSelectedFile(null);
      }
    } catch (error) {
      console.error("Error uploading file", error);
      setResponseMessage("Error Uploading File");
      setIsSuccess(false);
    }
  };

  return (
    <div className="updMain">
      <div className="titleBtn">
        <div className="titlehm">
          <h4>Online Course Upload</h4>
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
                <div className="inp">Course platform</div>
                <div>
                  <Select
                    className="textFieldUpload"
                    options={PlatformList}
                    placeholder=""
                    onChange={handlePlatform}
                  ></Select>
                </div>
              </div>
              <div className="quesField">
                <div className="inp">Valid For Exemption</div>
                <div>
                  <Select
                    className="textFieldUpload"
                    options={[
                      { value: "1", label: "Yes" },
                      { value: "0", label: "No" },
                    ]}
                    placeholder=""
                    onChange={handleExemption}
                  ></Select>
                </div>
              </div>
              <div className="quesField">
                <div className="inp">Course Duration</div>
                <div>
                  <input
                    className="number"
                    value={courseDuration}
                    type="number"
                    onChange={handleDuration}
                    min={0}
                    max={100}
                  />
                  {/* <InputNumber className="number" min={0} max={100} /> */}
                </div>
              </div>
              <div className="quesField">
                <div className="inp">Course Credits</div>
                <div>
                  <input
                    className="number"
                    value={courseCredits}
                    type="number"
                    onChange={handleCredits}
                    min={0}
                    max={3}
                  />
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
                  <label htmlFor="excel-upload" className="pdf-upload-button">
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
                  <a href={excel} download>
                    <button className="excel-upload-button">
                      Download Sample
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
                <h4 style={{marginTop:"5px"}} >Loading...</h4>
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

export default OnlineUpload;
