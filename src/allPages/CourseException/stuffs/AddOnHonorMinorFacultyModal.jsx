import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
<<<<<<< HEAD
=======
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import Modal from "@mui/material/Modal";
import { apiBaseUrl } from "../../../api/api";
import apiLoginHost from "../../login/LoginApi";
import "../styles/Facultymodal.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD
import StepperWithContent from "./StepperWithContent";
import WarningIcon from "@mui/icons-material/Warning";
=======
import { Margin } from "@mui/icons-material";
import StepperWithContent from "./StepperWithContent";
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98

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

<<<<<<< HEAD
=======
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

>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
<<<<<<< HEAD
  width: 210,
=======
  width: 200,
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
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
<<<<<<< HEAD
  maxWidth: "290px", // Maximum width for smaller screens
=======
  maxWidth: "360px", // Maximum width for smaller screens
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
  bgcolor: "background.paper",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
  borderRadius: "10px",
  p: 4,
};

<<<<<<< HEAD
const style4 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%", // Adjusted width for larger screens
  maxWidth: "290px", // Maximum width for smaller screens
  bgcolor: "background.paper",
  boxShadow: "rgb(250, 41, 41) 0px 3px 2px;",
  borderRadius: "10px",
  p: 4,
};

=======
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
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
<<<<<<< HEAD
  const [clearApplicationstate, setClearApplicationState] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  // purposely declared inside funcntion as it uses issuccss state
  const style1 = {
    position: "absolute",
    top: "5%",
    left: "50%",
    bottom: "90%",
    transform: "translate(-50%, -50%)",
    width: 280,
    bgcolor: "background.paper",
    boxShadow: isSuccess ? "green 0px 3px 2px" : "rgb(250, 41, 41) 0px 3px 2px",
    borderRadius: "10px",
    p: 4,
  };

  // logout function
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

  // getting up the login details and approvalmembers and made the necessary validation to set the clear application button
=======
  const [clearApplicationstate,setClearApplicationState] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [mentorCode, setmentorCode] = useState("22IT137");
  const [selectedOption, setSelectedOption] = useState("");


>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${apiLoginHost}/api/user-data`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setUserId(data.user_id);
<<<<<<< HEAD
          if (data.user_id === 2 && rowData.rejected_by === 1) {
            setClearApplicationState(true);
          } else if (data.user_id === 3 && rowData.rejected_by === 2) {
            setClearApplicationState(true);
          } else if (data.user_id === 4 && rowData.rejected_by === 3) {
            setClearApplicationState(true);
=======
          if((data.user_id===2)&&(rowData.rejected_by===1)){
            setClearApplicationState(true)
          }
          else if((data.user_id===3)&&(rowData.rejected_by===2)){
            setClearApplicationState(true)
          }
          else if((data.user_id===4)&&(rowData.rejected_by===3)){
            setClearApplicationState(true)
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
          }
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    const fetchApprovalMembers = async () => {
      try {
<<<<<<< HEAD
        const response = await axios.get(
          `${apiBaseUrl}/api/ce/AddHm/AddonHmApprovalMembers`,
          { withCredentials: true }
        );
        const jsonData = response.data;
=======
        const response = await fetch(
          `${apiBaseUrl}/api/ce/AddHm/AddonHmApprovalMembers`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
        const members = jsonData.map((item) => item.members);
        members.push("Approved");
        setApprovalMembers(members);
      } catch (error) {
<<<<<<< HEAD
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized, logging out:", error);
          handleLogout(); // Call logout function
        } else {
          console.log("Error while fetching data", error);
        }
=======
        console.log("Error while fetching data", error);
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
      }
    };
    fetchUserData();
    fetchApprovalMembers();
    setApprovalStatus(rowData.approval_status);
<<<<<<< HEAD
    if (rowData.mode_of_exemption === 1) {
      setSelectedOption("1");
    } else {
      setSelectedOption("0");
    }
  }, []);

  // Main function to Approve the student
  const handleApprove = () => {
    axios
      .post(
        `${apiBaseUrl}/api/ce/AddHm/ToApproveAddonHonorMinor`,
        {
          id: rowData.id,
          student: rowData.register_number,
          user_id: userId,
          mode_of_exemption: rowData.mode_of_exemption,
        },
        { withCredentials: true }
      )
=======
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
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
      .then((response) => {
        console.log("Student approved successfully");
        setResponseMessage("Student approved successfully");
        setIsSuccess(true);
        setResponseModalOpen(true);
      })
      .catch((error) => {
<<<<<<< HEAD
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized, logging out:", error);
          handleLogout(); // Call logout function
        } else {
          console.error("Error approving student:", error.message);
          setResponseMessage("Error approving student: " + error.message);
          setIsSuccess(false);
          setResponseModalOpen(true);
        }
      });
  };

  // list of functions to handle the closing of all the modals
=======
        console.error("Error approving student:", error.message);
        setResponseMessage("Error approving student: " + error.message);
        setIsSuccess(false);
        setResponseModalOpen(true);
      });
  };

>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
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

<<<<<<< HEAD
  // Main function to handle the rejection of the Application
  const handleRemarkSubmit = () => {
    axios
      .post(
        `${apiBaseUrl}/api/ce/AddHm/ToRejectAddonHonorMinor`,
        {
          remark,
          id: rowData.id,
          user_id: userId,
        },
        { withCredentials: true }
      )
=======
  const handleRemarkSubmit = () => {
    axios
      .post(`${apiBaseUrl}/api/ce/AddHm/ToRejectAddonHonorMinor`, {
        remark,
        id: rowData.id,
        user_id: userId,
      })
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
      .then((response) => {
        console.log("Remark submitted successfully");
        setRemarkResponseMsg("Remark Submitted SuccessFully");
        setIsSuccess(true);
        setRemarkResponse(true);
      })
      .catch((error) => {
<<<<<<< HEAD
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized, logging out:", error);
          handleLogout(); // Call logout function
        } else {
          console.error("Error submitting remark:", error.message);
          setRemarkResponseMsg("Failed to Update Remarks");
          setIsSuccess(false);
          setRemarkResponse(true);
        }
=======
        console.error("Error submitting remark:", error.message);
        setRemarkResponseMsg("Failed to Update Remarks");
        setIsSuccess(false);
        setRemarkResponse(true);
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
      });
  };

  return (
    <div>
<<<<<<< HEAD
      {/* Main Modal for dsiaplaying details */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div>
            <div className="modal">
              <div className="CourseTit">Course Details</div>
              <hr />
=======
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          {/* <div className='cross'><div className='symbol' >X</div></div> */}
          <div>
            <div className="modal">
              <div className="CourseTit">Course Details</div>
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
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
<<<<<<< HEAD
                <div className="fldData">
                  {rowData.mode_of_exemption === 1
                    ? "AddOn"
                    : rowData.mode_of_exemption === 2
                    ? "Honor"
                    : "Minor"}
                </div>
              </div>
              {rowData.remarks && (
                <div className="field">
                  <div className="fldClm">Remark</div>
                  <div className="remar">{rowData.remarks}</div>
                </div>
              )}
=======
                <div className="fldData">{rowData.mode_of_exemption === 1 ? "AddOn" : rowData.mode_of_exemption === 2 ? "Honor" : "Minor"}</div>
              </div>
              {rowData.remarks &&
            <div className='field'>
              <div className='fldClm'>Remark</div>
              <div className='remar'>{rowData.remarks}</div>
            </div>}
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
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
              {clearApplicationstate && (
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
<<<<<<< HEAD

=======
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
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
<<<<<<< HEAD

=======
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
      {/* Response Modal */}
      <Modal
        open={responseModalOpen}
        onClose={handleResponseModalClose}
        style={{ zIndex: 6000 }}
      >
        <Box sx={style1} className="success">
          <div>{responseMessage}</div>
          <div className="tick">
<<<<<<< HEAD
            {isSuccess ? (
              <CheckCircleIcon style={{ color: "green" }} />
            ) : (
              <AnnouncementIcon style={{ color: "rgb(250, 41, 41)" }} />
            )}
          </div>
        </Box>
      </Modal>

=======
            {isSuccess ? <CheckCircleIcon /> : <AnnouncementIcon />}
          </div>
        </Box>
      </Modal>
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
      {/* Remark submit modal */}
      <Modal
        open={remarkResponse}
        onClose={setRemarkResponseClose}
        style={{ zIndex: 6000 }}
      >
        <Box sx={style1} className="success">
          <div>{remarkResponseMsg}</div>
          <div className="tick">
<<<<<<< HEAD
            {isSuccess ? (
              <CheckCircleIcon style={{ color: "green" }} />
            ) : (
              <AnnouncementIcon style={{ color: "rgb(250, 41, 41)" }} />
            )}
          </div>
        </Box>
      </Modal>

=======
            {isSuccess ? <CheckCircleIcon /> : <AnnouncementIcon />}
          </div>
        </Box>
      </Modal>
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
      {/*Confirmation Modal */}
      <Modal open={confirmModal} onClose={() => setConfirmModal(false)}>
        <Box sx={style2}>
          <div>
<<<<<<< HEAD
            <div>Are you Sure want to approve this Application</div>
            <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
              <div>
                <button className="conformBtnApprove" onClick={handleApprove}>
                  Approve
=======
            <div>Are you Sure want to approve?</div>
            <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
              <div>
                <button className="conformBtnApprove" onClick={handleApprove}>
                  Yes
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
                </button>
              </div>
              <div>
                <button
                  className="conformBtnRemove"
                  onClick={() => setConfirmModal(false)}
                >
<<<<<<< HEAD
                  Cancel
=======
                  No
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
<<<<<<< HEAD

      {/*Notification Modal for Clearing the Rejection status of the application*/}
      <Modal open={revokeNotify} onClose={() => setRevokeNotify(false)}>
        <Box sx={style4}>
          <div className="DelTit">
            Confirmation{" "}
            <WarningIcon
              className="warningIcon"
              style={{ color: "rgb(250, 41, 41)" }}
            />
          </div>
          <hr style={{ marginBottom: "10px" }} />
=======
      <Modal open={revokeNotify} onClose={() => setRevokeNotify(false)}>
        <Box sx={style3}>
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
          <div>
            If you Clear this Application then student can able to apply Again
          </div>
          <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
            <div>
              <button
<<<<<<< HEAD
                className="conformBtnDelete"
                onClick={() => handleRevokeRejection(rowData.id)}
              >
                Clear
=======
                className="conformBtnApprove"
                onClick={() => handleRevokeRejection(rowData.id)}
              >
                Yes
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
              </button>
            </div>
            <div>
              <button
<<<<<<< HEAD
                className="conformBtnCancel"
                onClick={() => setRevokeNotify(false)}
              >
                Cancel
=======
                className="conformBtnRemove"
                onClick={() => setRevokeNotify(false)}
              >
                No
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AddOnHonorMinorFacultyModal;
