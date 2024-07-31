import React, { useEffect, useState } from "react";
import InputBox from "../../../components/InputBox/inputbox";
import TextField from "@mui/material/TextField";
import excel from "/excelSheetHonorMinor/sampleFormatforHonorMinor.xlsx";
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

const HonorMinorUpload = () => {
    const [multipleOpen, setMultipleOpen] = useState(false);
    const [platformData, setPlatformData] = useState([]);
    const [courseCode, setCourseCode] = useState(null);
    const [courseName, setCourseName] = useState(null);
    const [responseModalOpen, setResponseModalOpen] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const [issuccess, setIsSuccess] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [modeOfExemption,setModeOfExemption] = useState(null)
    const [rollNumberData,setRollNumberData] = useState([])
    const [student,setStudent] = useState(null)
    const [selectedSem,setSelectedSem] = useState(null)
    const [modeOfExemptionData,setModeOfExemptionData] = useState([])
    const [electiveId, setElectiveId] = useState(null);
    const [electiveData,setElectiveData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const type = await axios.get(
          "http://localhost:5001/api/ce/availableRollNumbers"
        );
        const type1 = await axios.get(
            "http://localhost:5001/api/ce/AddHM/AvailableModeOfExemption"
          );
        const type2 = await axios.get(
            "http://localhost:5001/api/ce/AvailableElectives"
          );
        setRollNumberData(type.data);
        setModeOfExemptionData(type1.data)
        setElectiveData(type2.data)
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchData();
  }, []);

  const RollNumberList = rollNumberData.map((types) => ({
    value: types.register_number,
    label: types.register_number,
  }));

  const ModeOfExemptions = modeOfExemptionData.map((data) => ({
    value: data.id,
    label: data.mode_of_exemption
  }))

    const handleMultipleUpload = () => {
      setMultipleOpen(!multipleOpen);
    };
  
    const handleModeOfexemption = (selectedOption) => {
      setModeOfExemption(selectedOption.value)
    }
  
    const handleCourseCode = (event) => {
      setCourseCode(event.target.value);
    };
  
    const handleCourseName = (event) => {
      setCourseName(event.target.value);
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
          "http://localhost:5001/api/ce/AddHm/HonorMinorExcelUpload",
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
              response.data.skip
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

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        if (!student || !selectedSem || !modeOfExemption || !courseCode || !courseName ) {
          alert('Please fill all the fields');
          return;
        }
    
        const formData = {
          student: student.toUpperCase(),
          semester: selectedSem,
          modeOfExemption: modeOfExemption,
          courseCode: courseCode.toUpperCase(),
          courseName: courseName.toUpperCase(),
        };
    
        try {
          const response = await axios.post('http://localhost:5001/api/ce/AddHm/HonorMinorSingleUpload', formData);
          if (response.status === 200) {
            setResponseMessage("Course Added Successfully");
            setResponseModalOpen(true);
            setIsSuccess(true);
            // Clear form fields
            setStudent('');
            setSelectedSem(null);
            // setDepartment( );
            setModeOfExemption(null);
            setCourseCode('');
            setCourseName('');
          } else {
            alert('Form submission failed');
          }
        } catch (error) {
          console.error('Error submitting form:', error);
          const errorMsg = "Error in Adding the Course";
        setResponseMessage(errorMsg);
        setResponseModalOpen(true);
        setIsSuccess(false);
        }
      };

    const handleRegisterNumber = (selectedOption) => {
        setStudent(selectedOption.value)
    }

    const handleSem = (selectedOption) => {
        setSelectedSem(selectedOption.value)
    }

  
    return (
      <div className="updMain">
        <div className="titleBtn">
          <div className="titlehm">
            <h4>Honor Minor Uploads</h4>
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
          <form onSubmit={handleSubmit} className="DefaultUpload" >
            <div className="dfinsideUpload">
              <div className="quesField">
                <div className="inp">Register Number</div>
                <Select
                  className="text"
                  onChange={handleRegisterNumber}
                  options={RollNumberList}
                  placeholder="Select Register Number"
                />
              </div>
              <div className="quesField">
                <div className="inp">Semester</div>
                <Select
                      value={{
                        value: selectedSem,
                        label: selectedSem ? `Semester ${selectedSem}` : "",
                      }}
                      onChange={handleSem}
                      className="text"
                      options={[
                        { value: 1, label: "I" },
                        { value: 2, label: "II" },
                        { value: 3, label: "III" },
                        { value: 4, label: "IV" },
                        { value: 5, label: "V" },
                        { value: 6, label: "VI" },
                        { value: 7, label: "VII" },
                        { value: 8, label: "VIII" },
                      ]}
                      isSearchable={false}
                      placeholder=""
                    />
              </div>
              {/* <div className="quesField">
                <div className="inp">Department</div>
                <Select
                  className="textField"
                  value={departments.find(option => option.value === department)}
                  onChange={handleSelectChange(setDepartment)}
                  options={departments}
                  placeholder="Select Department"
                />
              </div> */}
              <div className="quesField">
                <div className="inp">Honor/Minor</div>
                <Select
                  className="text"
                  onChange={handleModeOfexemption}
                  options={ModeOfExemptions}
                />
              </div>
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
              {/* <div className="quesField">
                <div className="inp">Elective Name</div>
                <Select
                  className="text"
                  value={electiveId}
                  onChange={handleElective}
                  options={ElectiveList}
                  placeholder="Select Elective Name"
                  menuPlacement="top"
                />
              </div> */}
              <div className="EXPsubmits">
                <button type="submit" className="expCreateBtn">
                  Create Course
                </button>
              </div>
            </div>
          </form>
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
}

export default HonorMinorUpload
