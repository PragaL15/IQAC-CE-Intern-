import React, { useState, useEffect } from "react";
import "../styles/Internship.css";
import InputBox from "../../../components/InputBox/inputbox";
import { DatePicker } from "antd";
import Select from "react-select";
import dayjs from "dayjs";
import axios from "axios";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import { Navigate, useNavigate } from 'react-router-dom';
//import { format } from 'date-fns';
const style1 = {
  position: 'absolute',
  top: '5%',
  left: '50%',
  bottom:'90%',
  transform: 'translate(-50%, -50%)',
  width: 280,
  bgcolor: 'background.paper',
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
  borderRadius:'10px',
  p: 4,
};


const InternshipForm = () => {
  const [studentName, setStudentName] = useState("");
  const [RegisterNumber, setRegisterNumber] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [degree, setDegree] = useState("");
  const [department, setDepartment] = useState("");
  const [specialLab, setSpecialLab] = useState("");
  const [mode, setMode] = useState("");
  const [Industry, setIndustry] = useState("");
  const [EndDate, setEndDate] = useState(null);
  const [StartDate, setStartDate] = useState(null);
  const [duration, setDuration] = useState("");
  const [stipend, setStipend] = useState("");
  const [amount, setAmount] = useState(null);
  const [courseException, setCourseException] = useState("0");
  const [certificateFile, setCertificateFile] = useState(null);
  const [reportFile, setReportFile] = useState(null);
  const [elective, setElective] = useState(null);
  const [elctiveData, setElectiveData] = useState([]);
  const [industryData,setindustryData] = useState([])
  const [fmtStartDate,setFmtStartDate] = useState(null)
  const [fmtEndDate,setFmtEndDate] = useState(null)
  const [dataRespModal,setDataRespModal] = useState(false);
  const [isSuccess,setIsSuccess] = useState(null);
  const [responseMessage,setResponseMessage] = useState("");


  const [durationError, setDurationError] = useState("");
  const [courseExceptionError, setCourseExceptionError] = useState("");

  const [studentData, setStudentData] = useState([]);
  const navigate = useNavigate()
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
   setStudentName(fetchedData[0].name)
    setRegisterNumber(fetchedData[0].rollNo)
    setYear(fetchedData[0].year)
    setDegree(fetchedData[0].degree)
   setDepartment(fetchedData[0].branch)

    fetcElectives();
  }, []);

  const fetcElectives = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/ce/AvailableElectives"
      );
      const response1 = await axios.get("http://localhost:5001/api/ce/in/AllIndustries")
      setElectiveData(response.data);
      setindustryData(response1.data)
    } catch (error) {
      console.log("error in fetching Elctives", error);
    }
  };



useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/user-data', {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setStudentName(data.name);
          setRegisterNumber(data.register_number);
          setDepartment(data.department);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
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
      { value: semester, name: "Semester" },
      { value: mode, name: "Mode" },
      { value: StartDate, name: "Start Date" },
      { value: EndDate, name: "End Date" },
      { value: duration, name: "Duration" },
      { value: stipend, name: "Stipend" },
      { value: certificateFile, name: "Certificate File" },
      { value: reportFile, name: "Report File" },
    ];

    // Check if all mandatory fields are filled
    for (const field of mandatoryFields) {
      if (!field.value) {
        alert(`Please fill the mandatory field: ${field.name}`);
        formValid = false;
        break;
      }
    }

    if(courseException==="1"){
      if(!elective){
        alert('Please select prefered Elective')
      }
    }

    if(stipend === "No"){
      setAmount(0)
    }

    if (formValid) {
      const formData = new FormData();
      formData.append("rollNo", RegisterNumber);
      formData.append("semester", semester);
      formData.append("mode", mode);
      formData.append("Industry", Industry);
      formData.append("StartDate", fmtStartDate);
      formData.append("EndDate", fmtEndDate);
      formData.append("duration", duration);
      //formData.append("stipend", stipend);
      //formData.append("amount", amount);
      //formData.append("courseException", courseException);
      formData.append("reportFile", reportFile);
      formData.append("certificateFile", certificateFile);
      formData.append("elective",elective)
      try {
        const response = await axios.post(
          "http://localhost:5001/api/ce/in/InternApply/internshipApply",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
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
        console.error("Error sending data to the backend:", error);
        setDataRespModal(true);
        setIsSuccess(false);
        setResponseMessage("Error While Applying the online course..Retry it!")
      }

      console.log("Form submitted:", {
        RegisterNumber,
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
        elective
      });
    }
  };

  const handleStartDateChange = (date) => {
    if (EndDate && date && date > EndDate) {
        // If start date is after end date, show error message
        alert("Start date cannot be after the end date. Please select a valid start date.");
        setStartDate(null); // Reset start date
      }
    else{
    setStartDate(date);
    if (date && typeof date === 'object' && date.$isDayjsObject) {
        const nativeDate = date.toDate();
        const formatdate = formatDate(nativeDate);
        console.log(formatdate);
        setFmtStartDate(formatdate)
    }
    }
  }

  // Function to handle End Date
  const handleEndDateChange = (date) => {
    if (StartDate && date && date < StartDate) {
      // If end date is before start date, show error message
      alert("End date cannot be before the start date. Please select a valid end date.");
      setEndDate(null); // Reset end date
    } else {
      // If end date is valid, update the state and calculate the number of days
      setEndDate(date);
      if (date && typeof date === 'object' && date.$isDayjsObject) {
        // Extract the native Date object from the Day.js object
        const nativeDate = date.toDate();
        const formatdate = formatDate(nativeDate);
        console.log(formatdate);
        setFmtEndDate(formatdate)
      }      
    }
  };


  const formatDate = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
    const dd = String(date.getDate()).padStart(2, '0');
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
    setDataRespModal(false)
    {isSuccess? navigate('/courseExcp'): navigate('/Internship')}
  }

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
              value={[{ value: RegisterNumber, label: RegisterNumber }]}
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
                {/* <div className="quesField">
                  <label className="inp">Degree of Student</label>
                  <Select
                    value={{ value: degree, label: degree }}
                    onChange={(selectedOption) =>
                      setDegree(selectedOption.value)
                    }
                    options={studentData.map((student) => ({
                      value: student.degree,
                      label: student.degree,
                    }))}
                    placeholder=""
                    isSearchable
                    isDisabled={true}
                    className="textField"
                  />
                </div> */}
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
                  <label className="inp">Special Lab</label>
                  <Select
                    value={{ value: specialLab, label: specialLab }}
                    onChange={(selectedOption) =>
                      setSpecialLab(selectedOption.value)
                    }
                    options={studentData.map((student) => ({
                      value: student.specialLab,
                      label: student.specialLab,
                    }))}
                    placeholder=""
                    isSearchable
                    className="textField"
                  />
                </div> */}
              </div>
            </div>

            <div className="Default">
              <div className="dfinside">
                <div className="quesField">
                  <label className="inp">Semester</label>
                  <Select
                    value={{ value: semester, label: semester }}
                    onChange={(selectedOption) =>
                      setSemester(selectedOption.value)
                    }
                    options={[
                      { value: "1", label: "1" },
                      { value: "2", label: "2" },
                      { value: "3", label: "3" },
                      { value: "4", label: "4" },
                      { value: "5", label: "5" },
                      { value: "6", label: "6" },
                      { value: "7", label: "7" },
                      { value: "8", label: "8" },
                    ]}
                    className="textField"
                    styles={{
                      menu: (provided, state) => ({
                        ...provided,
                        maxHeight: "400px",
                      }),
                    }}
                  />
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
                  />
                </div>
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
                  </div>
                )}
                {semester >= 3 && mode === "Offline" && (
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
            {semester < 3 && (mode === "Offline" || mode === "Online") && (
              <div>
                <div className="titdefault">
                  <h4>Apply for Reward Point</h4>
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
                            label: industry.company_name + " - " + industry.company_address,
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
                            label: industry.company_name + " - " + industry.company_address,
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
                            <button type="button" className="expCancelBtn">
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
                            label: industry.company_name + " - " + industry.company_address,
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
                        />
                      </div>
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
                    </div>
                  </div>
                </div>
              )}
          </div>
          <Modal open={dataRespModal} onClose={handleRespModalClose}>
      <Box sx={style1} className='success'>
          <div>
            {responseMessage}
          </div>
          <div className='tick'>
            {isSuccess?<CheckCircleIcon/>:<AnnouncementIcon/>}
          </div>
        </Box>
      </Modal>
        </div>
      </div>
    </form>
  );
};

export default InternshipForm;
