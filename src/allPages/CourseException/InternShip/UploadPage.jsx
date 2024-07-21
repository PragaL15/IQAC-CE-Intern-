import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import "../styles/Upload.css";
import DescriptionIcon from "@mui/icons-material/Description";
import { Box, Modal } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";

const style1 = {
  position: "absolute",
  top: "5%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 280,
  bgcolor: "background.paper",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
  borderRadius: "10px",
  p: 4,
};

const UploadPage = () => {
  const [multipleOpen, setMultipleOpen] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [responseModalOpen, setResponseModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleMultipleUpload = () => {
    setMultipleOpen(!multipleOpen);
  };

  const handleCompanyName = (event) => {
    setCompanyName(event.target.value.toUpperCase());
  };

  const handleCompanyAddress = (event) => {
    setCompanyAddress(event.target.value.toUpperCase());
  };

  const handleCompanyPhone = (event) => {
    setCompanyPhone(event.target.value.toUpperCase());
  };

  const handleUpload = async () => {
    if (!companyName || !companyAddress || !companyPhone) {
      alert("Fill Out All The Fields.");
      return;
    }

    if (isNaN(companyPhone) || companyPhone <= 0) {
      alert("Enter a Valid Phone Number.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/upload/single",
        {
          company_name: companyName,
          company_address: companyAddress,
          company_phone: companyPhone,
        }
      );

      if (response.status === 200) {
        setResponseMessage("Company Added Successfully");
        setIsSuccess(true);
        setCompanyName("");
        setCompanyAddress("");
        setCompanyPhone("");
      }
    } catch (error) {
      const errorMsg = error.response ? error.response.data.message : "Error Adding the Company";
      setResponseMessage(errorMsg);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
      setResponseModalOpen(true);
    }
  };

  const handleSheetUpload = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadSheet = async () => {
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/upload/multiple",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        setResponseMessage(
          response.data.message + " Number Of Companies Added: " + response.data.count
        );
        setIsSuccess(true);
        setSelectedFile(null);
      }
    } catch (error) {
      const errorMsg = error.response ? error.response.data.message : "Error Uploading File";
      setResponseMessage(errorMsg);
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
      setResponseModalOpen(true);
    }
  };

  return (
    <div className="updMain">
      <div className="titleBtn">
        <div className="titlehm">
          <h4>Company Upload</h4>
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
        <div className={`frmUpload ${multipleOpen ? "frmUploadOpen" : ""}`}>
          <div className="DefaultUpload">
            <div className="dfinsideUpload">
              <div className="quesField">
                <div className="inp">Company Name</div>
                <div>
                  <TextField
                    className="text"
                    variant="outlined"
                    size="small"
                    value={companyName}
                    onChange={handleCompanyName}
                  />
                </div>
              </div>
              <div className="quesField">
                <div className="inp">Company Address</div>
                <div>
                  <TextField
                    className="text"
                    variant="outlined"
                    size="small"
                    value={companyAddress}
                    onChange={handleCompanyAddress}
                  />
                </div>
              </div>
              <div className="quesField">
                <div className="inp">Company Phone</div>
                <div>
                  <TextField
                    className="text"
                    variant="outlined"
                    size="small"
                    value={companyPhone}
                    onChange={handleCompanyPhone}
                    type="number"
                  />
                </div>
              </div>
              <div className="EXPsubmits">
                <button className="expCreateBtn" onClick={handleUpload}>
                  Add Company List
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
                    <div style={{ display: "flex", gap: "5px" }}>
                      <DescriptionIcon /> {selectedFile.name}
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
                  <a href="/assets/excel.xlsx" download>
                    <button className="excel-upload-button">
                      Download Sample
                    </button>
                  </a>
                </div>
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
            {!isLoading && (isSuccess ? <CheckCircleIcon /> : <AnnouncementIcon />)}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default UploadPage;
