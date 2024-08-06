import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import Modal from "@mui/material/Modal";
import { apiBaseUrl } from "../../../api/api";
import apiLoginHost from "../../login/LoginApi";
import "../styles/Facultymodal.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Margin } from "@mui/icons-material";
import StepperWithContent from "./StepperWithContent";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%", // Adjusted width for larger screens
  maxWidth: "430px", // Maximum width for smaller screens
  maxHeight: "80%",
  bgcolor: "background.paper",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
  p: 4,
  borderRadius: "10px",
  overflowY: "auto",
};

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

const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 200,
  bgcolor: "background.paper",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
  borderRadius: "10px",
  p: 4,
};

const style3 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%", // Adjusted width for larger screens
  maxWidth: "360px", // Maximum width for smaller screens
  bgcolor: "background.paper",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
  borderRadius: "10px",
  p: 4,
};

const AddOnHonorMinorFacultyModal = ({
  rowData,
  open,
  handleClose,
  fetchUserData,
  reviewed,
  handleRevokeRejection,
}) => {
  const navigate = useNavigate();
  const [remarkModalOpen, setRemarkModalOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [remarkResponse, setRemarkResponse] = useState(false);
  const [remark, setRemark] = useState("");
  const [responseModalOpen, setResponseModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [remarkResponseMsg, setRemarkResponseMsg] = useState(false);
  const [approvalMembers, setApprovalMembers] = useState([]);
  const [approvalStatus, setApprovalStatus] = useState(null);
  const [revokeNotify, setRevokeNotify] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [mentorCode, setmentorCode] = useState("22IT137");
  const [selectedOption, setSelectedOption] = useState("");


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${apiLoginHost}/api/user-data`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUserId(data.user_id);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    const fetchApprovalMembers = async () => {
      try {
        const response = await fetch(
          `${apiBaseUrl}/api/ce/AddHm/AddonHmApprovalMembers`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        const members = jsonData.map((item) => item.members);
        members.push("Approved");
        setApprovalMembers(members);
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    };
    fetchUserData();
    fetchApprovalMembers();
    setApprovalStatus(rowData.approval_status);
    if(rowData.mode_of_exemption===1){
        setSelectedOption("1")
    }
    else{
        setSelectedOption("0")
    }
  }, []);

  const handleApprove = () => {
    axios
      .post(`${apiBaseUrl}/api/ce/AddHm/ToApproveAddonHonorMinor`, {
        id: rowData.id,
        student: rowData.register_number,
        user_id: userId,
        mode_of_exemption: rowData.mode_of_exemption
      })
      .then((response) => {
        console.log("Student approved successfully");
        setResponseMessage("Student approved successfully");
        setIsSuccess(true);
        setResponseModalOpen(true);
      })
      .catch((error) => {
        console.error("Error approving student:", error.message);
        setResponseMessage("Error approving student: " + error.message);
        setIsSuccess(false);
        setResponseModalOpen(true);
      });
  };

  const handleConfirmation = () => {
    setConfirmModal(true);
  };

  const handleReject = () => {
    setRemarkModalOpen(true);
  };

  const handleRemarkClose = () => {
    setRemarkModalOpen(false);
  };

  const handleResponseModalClose = () => {
    setResponseModalOpen(false);
    setConfirmModal(false);
    handleClose();
    fetchUserData(selectedOption);
  };

  const setRemarkResponseClose = () => {
    setRemarkResponse(false);
    setRemarkModalOpen(false);
    handleClose();
    fetchUserData(selectedOption);
  };

  const handleRemarkChange = (event) => {
    setRemark(event.target.value);
  };

  const handleRemarkSubmit = () => {
    axios
      .post(`${apiBaseUrl}/api/ce/AddHm/ToRejectAddonHonorMinor`, {
        remark,
        id: rowData.id,
      })
      .then((response) => {
        console.log("Remark submitted successfully");
        setRemarkResponseMsg("Remark Submitted SuccessFully");
        setIsSuccess(true);
        setRemarkResponse(true);
      })
      .catch((error) => {
        console.error("Error submitting remark:", error.message);
        setRemarkResponseMsg("Failed to Update Remarks");
        setIsSuccess(false);
        setRemarkResponse(true);
      });
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          {/* <div className='cross'><div className='symbol' >X</div></div> */}
          <div>
            <div className="modal">
              <div className="CourseTit">Course Details</div>
              <div className="field">
                <div className="fldClm">Student</div>
                <div className="fldData">{rowData.student_name}</div>
              </div>
              <div className="field">
                <div className="fldClm">Register Number</div>
                <div className="fldData">{rowData.register_number}</div>
              </div>
              <div className="field">
                <div className="fldClm">Department</div>
                <div className="fldData">{rowData.branch}</div>
              </div>
              <div className="field">
                <div className="fldClm">Year</div>
                <div className="fldData">
                  {rowData.year === 1
                    ? "1st Year"
                    : rowData.year === 2
                    ? "2nd year"
                    : rowData.year === 3
                    ? "3rd Year"
                    : "4th Year "}
                </div>
              </div>
              {rowData.elective && (
                <div className="field">
                  <div className="fldClm">Elective</div>
                  <div className="fldData">{rowData.elective}</div>
                </div>
              )}
              <div className="field">
                <div className="fldClm">Course Code</div>
                <div className="fldData">{rowData.course_code}</div>
              </div>
              <div className="field">
                <div className="fldClm">Course Name</div>
                <div className="fldData">{rowData.course_name}</div>
              </div>
              <div className="field">
                <div className="fldClm">Academic Year</div>
                <div className="fldData">{rowData.academic_year}</div>
              </div>
              <div className="field">
                <div className="fldClm">Semester</div>
                <div className="fldData">{rowData.semester}</div>
              </div>
              <div className="field">
                <div className="fldClm">Mode Of Exemption</div>
                <div className="fldData">{rowData.mode_of_exemption === 1 ? "AddOn" : rowData.mode_of_exemption === 2 ? "Honor" : "Minor"}</div>
              </div>
              {reviewed ? (
                <div style={{ marginTop: "10px" }}>
                  <StepperWithContent
                    status={approvalStatus}
                    rejection={rowData.rejected_by}
                    data={approvalMembers}
                  />
                </div>
              ) : (
                <div className="fieldbtn">
                  <div>
                    <button className="btnApprove" onClick={handleConfirmation}>
                      Approve
                    </button>
                  </div>
                  <div>
                    <button className="btnRemove" onClick={handleReject}>
                      Reject
                    </button>
                  </div>
                </div>
              )}
              {rowData.approval_status === -1 && (
                <div>
                  <button
                    className="btnApprove"
                    onClick={() => setRevokeNotify(true)}
                  >
                    Clear This Application
                  </button>
                </div>
              )}
            </div>
          </div>
        </Box>
      </Modal>
      {/* Remark Modal */}
      <Modal open={remarkModalOpen} onClose={handleRemarkClose}>
        <Box sx={style3}>
          <div>
            <div className="rm">Remarks</div>
            <textarea
              id="remark-modal-description"
              value={remark}
              className="remarkArea"
              onChange={handleRemarkChange}
              rows={3}
              cols={38}
              placeholder="Enter your remark here..."
            ></textarea>
            {remark === "" ? (
              <button className="CourseBtn" disabled={true}>
                Submit Remark
              </button>
            ) : (
              <button className="btnApprove" onClick={handleRemarkSubmit}>
                Submit Remark
              </button>
            )}
          </div>
        </Box>
      </Modal>
      {/* Response Modal */}
      <Modal
        open={responseModalOpen}
        onClose={handleResponseModalClose}
        style={{ zIndex: 6000 }}
      >
        <Box sx={style1} className="success">
          <div>{responseMessage}</div>
          <div className="tick">
            {isSuccess ? <CheckCircleIcon /> : <AnnouncementIcon />}
          </div>
        </Box>
      </Modal>
      {/* Remark submit modal */}
      <Modal
        open={remarkResponse}
        onClose={setRemarkResponseClose}
        style={{ zIndex: 6000 }}
      >
        <Box sx={style1} className="success">
          <div>{remarkResponseMsg}</div>
          <div className="tick">
            {isSuccess ? <CheckCircleIcon /> : <AnnouncementIcon />}
          </div>
        </Box>
      </Modal>
      {/*Confirmation Modal */}
      <Modal open={confirmModal} onClose={() => setConfirmModal(false)}>
        <Box sx={style2}>
          <div>
            <div>Are you Sure want to approve?</div>
            <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
              <div>
                <button className="conformBtnApprove" onClick={handleApprove}>
                  Yes
                </button>
              </div>
              <div>
                <button
                  className="conformBtnRemove"
                  onClick={() => setConfirmModal(false)}
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
      <Modal open={revokeNotify} onClose={() => setRevokeNotify(false)}>
        <Box sx={style}>
          <div>
            If you Clear this Application then student can able to apply Again
          </div>
          <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
            <div>
              <button
                className="conformBtnApprove"
                onClick={() => handleRevokeRejection(rowData.id)}
              >
                Yes
              </button>
            </div>
            <div>
              <button
                className="conformBtnRemove"
                onClick={() => setRevokeNotify(false)}
              >
                No
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AddOnHonorMinorFacultyModal;
