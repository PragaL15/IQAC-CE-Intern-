import React, { useState, useEffect } from "react";
import "../styles/Internship.css";
import { DatePicker } from "antd";
import Select from "react-select";
import dayjs from "dayjs";
import axios from 'axios';

const InternshipForm = () => {
  const [student_id, setstudent_id] = useState(1);
  const [rollNo, setRollNo] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [degree, setDegree] = useState("");
  const [branch, setBranch] = useState("");
  const [specialLab, setSpecialLab] = useState("");
  const [mode, setMode] = useState("");
  const [Industry, setIndustry] = useState("");
  const [EndDate, setEndDate] = useState(null);
  const [StartDate, setStartDate] = useState(null);
  const [duration, setDuration] = useState("");
  const [stipend, setStipend] = useState("");
  const [amount, setAmount] = useState("");
  const [courseException, setCourseException] = useState("");
  const [certificateFile, setCertificateFile] = useState(null);
  const [reportFile, setReportFile] = useState(null);

  const [durationError, setDurationError] = useState("");
  const [courseExceptionError, setCourseExceptionError] = useState("");

  const [studentData, setStudentData] = useState([]);


  
  const sendDataToBackend = async () => {
    try {
      if (certificateFile && reportFile) {
        const formData = new FormData();
        
        formData.append('certificateFile', certificateFile);
        formData.append('reportFile', reportFile);
  
        formData.append('student_id', student_id);
        formData.append('student', name);
        formData.append('rollNo', rollNo);
        formData.append('year', year);
        formData.append('semester', semester);
        formData.append('degree', degree);
        formData.append('branch', branch);
        formData.append('specialLab', specialLab);
        formData.append('mode', mode);
        formData.append('Industry', Industry);
        formData.append('StartDate', dayjs(StartDate).format('YYYY-MM-DD')); // Adjust the format
        formData.append('EndDate', dayjs(EndDate).format('YYYY-MM-DD')); // Adjust the format
        formData.append('duration', duration);
        formData.append('stipend', stipend);
        formData.append('amount', amount);
        formData.append('courseException', courseException);
  
        const response = await axios.post('http://localhost:3000/createIntern', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        });
  
        console.log('Response:', response.data);
        if (response.status === 200) {
          console.log('Data successfully sent to the backend');
        }
      } else {
        console.error('Certificate file or report file is missing');
      }
    } catch (error) {
      console.error('Error sending data to the backend:', error);
    }
  };
  const modifyPdf = async () => {
    if (!reportPdf) {
      alert('Failed to load PDF');
      return;
    }
    const existingPdfBytes = await reportPdf.arrayBuffer();
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const timesNewRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman);
    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    firstPage.drawText("B.E CSD", { x: 190, y: 440, size: 12, font: timesNewRomanFont });
    firstPage.drawText(course, { x: 190, y: 414, size: 12, font: timesNewRomanFont });
    firstPage.drawText("11/07/2024", { x: 720, y: 455, size: 12, font: timesNewRomanFont });
    firstPage.drawText("7376221CD132", { x: 35, y: 280, size: 12, font: timesNewRomanFont });
    firstPage.drawText("PRAGALYA K", { x: 125, y: 280, size: 12, font: timesNewRomanFont });
    firstPage.drawText("Front-end Developer", { x: 300, y: 280, size: 12, font: timesNewRomanFont });

    const modifiedPdfBytes = await pdfDoc.save();
    const blob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'modified_pdf.pdf';
    a.click();
    URL.revokeObjectURL(url);
  };
  const InputBox = ({ value }) => {
    return <input type="text" value={value} readOnly />;
  };
  
  
  useEffect(() => {
    // Simulated fetched data
    const fetchedData = [
      {
        id: 1,
        name: "Pragalya",
        rollNo: "CD132",
        year: "II",
        specialLab: "Blockchain",
        degree: "BE",
        branch: "CSD",
      },
    ];
    setStudentData(fetchedData);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    let formValid = true;
  
    if (mode === "Offline" && parseInt(duration) < 45) {
      setDurationError("Duration cannot be less than 45 days");
      formValid = false;
    } else {
      setDurationError("");
    }
  
    if (
      semester >= 3 &&
      mode === "Offline" &&
      parseInt(duration) < 45 &&
      courseException !== "Yes" // Corrected condition here
    ) {
      setCourseExceptionError(
        "Course exception cannot be selected if duration is less than 45 days"
      );
      formValid = false;
    } else {
      setCourseExceptionError("");
    }
  
    if (formValid) {
      sendDataToBackend(); // Call the function to send data to the backend
    }
  };
  

  const handleStartDateChange = (date) => {
    if (EndDate && date > EndDate) {
      alert(
        "Start date cannot be after the end date. Please select a valid start date."
      );
    } else {
      setStartDate(date);
    }
  };

  const handleEndDateChange = (date) => {
    if (StartDate && date < StartDate) {
      alert(
        "End date cannot be before the start date. Please select a valid end date."
      );
    } else {
      setEndDate(date);
    }
  };

  const handleCertificateFileChange = (event) => {
    setCertificateFile(event.target.files[0]);
  };

  const handleReportFileChange = (event) => {
    setReportFile(event.target.files[0]);
  };

  return (
    <form id="mandatory" onSubmit={handleSubmit} className="frm">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="titledfault">
              <h4>Default Details</h4>
            </div>
            <div className="Default">
              <div className="dfinside">
                <div className="quesField">
                  <label className="inp">Student:</label>
                  <Select
                    value={{ value: name, label: name }}
                    onChange={(selectedOption) => setName(selectedOption.value)}
                    options={studentData.map((student) => ({
                      value: student.name,
                      label: student.name,
                    }))}
                    placeholder=""
                    isSearchable
                    className="textField"
                  />
                </div>
                <div className="quesField">
                  <label className="inp">Roll no:</label>
                  <Select
                    value={{ value: rollNo, label: rollNo }}
                    onChange={(selectedOption) =>
                      setRollNo(selectedOption.value)
                    }
                    options={studentData.map((student) => ({
                      value: student.rollNo,
                      label: student.rollNo,
                    }))}
                    placeholder=""
                    isSearchable
                    className="textField"
                  />
                </div>
                <div className="quesField">
                  <label className="inp">Year:</label>
                  <Select
                    value={{ value: year, label: year }}
                    onChange={(selectedOption) => setYear(selectedOption.value)}
                    options={studentData.map((student) => ({
                      value: student.year,
                      label: student.year,
                    }))}
                    placeholder=""
                    isSearchable
                    className="textField"
                  />
                </div>
                <div className="quesField">
                  <label className="inp">Degree:</label>
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
                    className="textField"
                  />
                </div>
                <div className="quesField">
                  <label className="inp">Branch:</label>
                  <Select
                    value={{ value: branch, label: branch }}
                    onChange={(selectedOption) =>
                      setBranch(selectedOption.value)
                    }
                    options={studentData.map((student) => ({
                      value: student.branch,
                      label: student.branch,
                    }))}
                    placeholder=""
                    isSearchable
                    className="textField"
                  />
                </div>
                <div className="quesField">
                  <label className="inp">Special Lab:</label>
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
                </div>
              </div>
            </div>

            <div className="Default">
              <div className="dfinside">
                <div className="quesField">
                  <label className="inp">Semester:</label>
                  <Select
                    value={{ value: semester, label: semester }}
                    onChange={(selectedOption) =>
                      setSemester(selectedOption.value)
                    }
                    options={[
                      { value: "", label: "" },
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
                  <label className="inp">Mode:</label>
                  <Select
                    value={{ value: mode, label: mode }}
                    onChange={(selectedOption) => setMode(selectedOption.value)}
                    options={[
                      { value: "", label: "" },
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
                      <label className="inp">Start Date:</label>
                      <DatePicker
                        value={StartDate}
                        onChange={handleStartDateChange}
                        className="textField"
                      />
                    </div>
                    <div className="quesField">
                      <label className="inp">End Date:</label>
                      <DatePicker
                        value={EndDate}
                        onChange={handleEndDateChange}
                        className="textField"
                      />
                    </div>
                    <div className="quesField">
                      <label className="inp">Duration:</label>
                      <InputBox value={duration} disabled />
                    </div>
                  </div>
                )}
                {mode === "Offline" && (
                  <div>
                    <div className="quesField">
                      <label className="inp">Start Date:</label>
                      <DatePicker
                        value={StartDate}
                        onChange={handleStartDateChange}
                        className="textField"
                      />
                    </div>
                    <div className="quesField">
                      <label className="inp">End Date:</label>
                      <DatePicker
                        value={EndDate}
                        onChange={handleEndDateChange}
                        className="textField"
                      />
                    </div>
                    <div className="quesField">
                      <label className="inp">Duration:</label>
                      <InputBox value={duration} disabled />
                    </div>
                  </div>
                )}
                {semester >= 3 && mode === "Offline" && (
                  <div>
                    {parseInt(duration) > 45 && (
                      <div className="quesField">
                        <label className="inp">If you want CE:</label>
                        <Select
                          value={{
                            value: courseException,
                            label: courseException,
                          }}
                          onChange={(selectedOption) =>
                            setCourseException(selectedOption.value)
                          }
                          options={[
                            { value: "", label: "" },
                            { value: "Yes", label: "Yes" },
                            { value: "No", label: "No" },
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
                <div className="titledfault">
                  <h4>Apply for Reward Point</h4>
                </div>
                <div className="Default">
                  <div className="dfinside">
                    <div>
                      <div className="quesField">
                        <label className="inp">Industry:</label>
                        <Select
                          value={{ value: Industry, label: Industry }}
                          onChange={(selectedOption) =>
                            setIndustry(selectedOption.value)
                          }
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
                            { value: "", label: "" },
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
                          <input
                            type="number"
                            className="inputField"
                            value={amount}
                            onChange={(e) => {
                              const input = e.target.value;
                              if (!input || /^\d+$/.test(input)) {
                                setAmount(input);
                              }
                            }}
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
                            Upload PDF
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
                            Upload PDF
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
                    </div>
                  </div>
                </div>
              </div>
            )}
            {semester >= 3 &&
              (mode === "Online" || mode === "Offline") &&
              courseException !== "Yes" && (
                <div>
                  <div className="titledfault">
                    <h4>Apply for Reward Point</h4>
                  </div>
                  <div className="Default">
                    <div className="dfinside">
                      <div className="quesField">
                        <label className="inp">Industry:</label>
                        <Select
                          value={{
                            value: Industry,
                            label: Industry,
                          }}
                          onChange={(selectedOption) =>
                            setIndustry(selectedOption.value)
                          }
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
                            { value: "", label: "" },
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
                          <input
                            type="number"
                            className="inputField"
                            value={amount}
                            onChange={(e) => {
                              const input = e.target.value;
                              if (!input || /^\d+$/.test(input)) {
                                setAmount(input);
                              }
                            }}
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
                            Upload PDF
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
                            Upload PDF
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
                    </div>
                  </div>
                </div>
              )}

            {semester >= 3 &&
              mode === "Offline" &&
              courseException === "Yes" &&
              parseInt(duration) >= 45 && (
                <div>
                  <div className="titledfault">
                    <h4>Apply for Course Exception</h4>
                  </div>
                  <div className="Default">
                    <div className="dfinside">
                      <div className="quesField">
                        <label className="inp">Industry:</label>
                        <Select
                          value={{
                            value: Industry,
                            label: Industry,
                          }}
                          onChange={(selectedOption) =>
                            setIndustry(selectedOption.value)
                          }
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
                            { value: "", label: "" },
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
                          <input
                            type="number"
                            className="inputField"
                            value={amount}
                            onChange={(e) => {
                              const input = e.target.value;
                              if (!input || /^\d+$/.test(input)) {
                                setAmount(input);
                              }
                            }}
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
                            Upload PDF
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
                            Upload PDF
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
                    </div>
                  </div>
                </div>
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
    </form>
  );
};

export default InternshipForm;
