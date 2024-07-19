import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import '../styles/Facultymodal.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75%', // Adjusted width for larger screens
  maxWidth: '380px', // Maximum width for smaller screens
  bgcolor: 'background.paper',
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
  borderRadius: '10px',
  p: 4,
};

const AddonTable = ({ rowData, open, handleClose, onApproval, onRejection }) => {
  const [remarkModalOpen, setRemarkModalOpen] = useState(false);
  const [remark, setRemark] = useState("");
  const [status, setStatus] = useState("");
  const [showRemark, setShowRemark] = useState(false);
  const [approvedMessageOpen, setApprovedMessageOpen] = useState(false);
  const [remarkSubmitted, setRemarkSubmitted] = useState(false);

  useEffect(() => {
    if (rowData.approval_status === 1) {
      setStatus("Approved");
    } else if (rowData.approval_status === -1) {
      setStatus("Rejected");
      setShowRemark(true);
    } else {
      setStatus("Initiated");
    }
  }, [rowData]);

  useEffect(() => {
    if (remarkSubmitted) {
      onRejection(); 
      setRemarkSubmitted(false);
    }
  }, [remarkSubmitted, onRejection]);

  const handleApproval = () => {
    axios.post('http://localhost:3000/approveAddon', { id: rowData.id })
      .then(response => {
        console.log(response.data.message);
        setApprovedMessageOpen(true);
        onApproval();
      })
      .catch(error => {
        console.error("Error approving add-on:", error);
      });
  };

  const handleReject = () => {
    setRemarkModalOpen(true);
  };

  const handleRemarkSubmit = () => {
    axios.post('http://localhost:3000/rejectAddon', { id: rowData.id, remark })
      .then(response => {
        console.log(response.data.message);
        setRemarkModalOpen(false);
        setShowRemark(true);
        setRemarkSubmitted(true); // Indicate that remark has been submitted
        setRemark(""); // Clear the remark field
      })
      .catch(error => {
        console.error("Error rejecting add-on:", error);
      });
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className='BasicModal'>
          <div className='modal'>
            <div className="CourseTit">Add-on Details</div>
            <div className='field'>
              <div className='fldClm'>Student</div>
              <div className='fldData'>{rowData.name}</div>
            </div>
            <div className='field'>
              <div className='fldClm'>Register Number</div>
              <div className='fldData'>{rowData.register_number}</div>
            </div>
            <div className='field'>
              <div className='fldClm'>Year</div>
              <div className='fldData'>{rowData.year === 1 ? "1st Year" : rowData.year === 2 ? "2nd Year" : rowData.year === 3 ? "3rd Year" : "4th Year"}</div>
            </div>
            <div className='field'>
              <div className='fldClm'>Mode of exemption</div>
              <div className='fldData'>{rowData.Mode_of_exce}</div>
            </div>
            <div className='field'>
              <div className='fldClm'>Course code</div>
              <div className='fldData'>{rowData.course_code}</div>
            </div>
            <div className='field'>
              <div className='fldClm'>Course Name</div>
              <div className='fldData'>{rowData.course_name}</div>
            </div>
            <div className='field'>
              <div className='fldClm'>Elective ID</div>
              <div className='fldData'>{rowData.elective_id}</div>
            </div>
            {showRemark && (
              <div className='field remOpen'>
                <div className='fldClm'>Remark</div>
                <div className='remar'>{rowData.remark}</div>
              </div>
            )}
            <div className='field'>
              <div className='fldClm'>Status</div>
              <div className='fldData'>
                <button className={rowData.approval_status === 1 ? "btnApprove" : rowData.approval_status === -1 ? "btnRemove" : "btnInitiated"}>
                  {status}
                </button>
              </div>
            </div>
            {rowData.approval_status === 0 && (
              <div className='fieldbtn'>
                <button className='btnRemove' onClick={handleReject}>
                  Reject
                </button>
                <button className='btnApprove' onClick={handleApproval}>
                  Approve
                </button>
              </div>
            )}
            {/* Display the "Approved successfully" message box */}
            <Modal open={approvedMessageOpen} onClose={() => setApprovedMessageOpen(false)}>
              <Box sx={style}>
                <div>
                  <div className='rm'>Approved Successfully</div>
                </div>
              </Box>
            </Modal>
          </div>
        </Box>
      </Modal>

      <Modal open={remarkModalOpen} onClose={() => setRemarkModalOpen(false)}>
        <Box sx={style}>
          <div>
            <div className='rm'>Remarks</div>
            <textarea
              id='remark-modal-description'
              value={remark}
              className='remarkArea'
              onChange={e => setRemark(e.target.value)}
              rows={3}
              cols={38}
              placeholder='Enter your remark here...'
            ></textarea>
            {remark === '' ? (
              <button className='CourseBtn' disabled={true}>
                Submit Remark
              </button>
            ) : (
              <button className='btnApprove' onClick={handleRemarkSubmit}>
                Submit Remark
              </button>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default AddonTable;
