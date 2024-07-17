// import React, { useEffect, useState } from 'react';
// import Box from '@mui/material/Box';
// import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import AnnouncementIcon from '@mui/icons-material/Announcement';
// import Modal from '@mui/material/Modal';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import '../styles/Facultymodal.css';

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: '75%',
//   maxWidth: '390px',
//   bgcolor: 'background.paper',
//   boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
//   p: 4,
//   borderRadius: '10px',
// };

// const FacultyModal = ({ rowData, open, handleClose, fetchData }) => {
//   const navigate = useNavigate();
//   const [remarkModalOpen, setRemarkModalOpen] = useState(false);
//   const [remark, setRemark] = useState('');
//   const [responseModalOpen, setResponseModalOpen] = useState(false);
//   const [responseMessage, setResponseMessage] = useState('');
//   const [isSuccess, setIsSuccess] = useState(false);
//   const [confirmModal, setConfirmModal] = useState(false);
//   const [mentorCode] = useState('22IT137');
//   const [selectedOption] = useState('');

//   const handleApprove = () => {
//     axios
//       .post('http://localhost:3000/approve', { id: rowData.id })
//       .then(response => {
//         console.log('Student approved successfully');
//         setResponseMessage('Student approved successfully');
//         setIsSuccess(true);
//         setResponseModalOpen(true);
//       })
//       .catch(error => {
//         console.error('Error approving student:', error.message);
//         setResponseMessage('Error approving student: ' + error.message);
//         setIsSuccess(false);
//         setResponseModalOpen(true);
//       });
//   };

//   const handleReject = () => {
//     setRemarkModalOpen(true);
//   };

//   const handleRemarkClose = () => {
//     setRemarkModalOpen(false);
//   };

//   const handleRemarkChange = event => {
//     setRemark(event.target.value);
//   };

//   const handleRemarkSubmit = () => {
//     axios
//       .post('http://localhost:3000/reject', { remark, id: rowData.id })
//       .then(response => {
//         console.log('Remark submitted successfully');
//         setIsSuccess(true);
//         setResponseModalOpen(true);
//       })
//       .catch(error => {
//         console.error('Error submitting remark:', error.message);
//         setIsSuccess(false);
//         setResponseModalOpen(true);
//       });
//   };

//   const handleView = (fileType) => {
//     const filePath = fileType === 'certificate' ? rowData.certificateFilePath : rowData.reportFilePath;
//     const fileURL = `http://localhost:3000/images/${filePath}`;
//     window.open(fileURL, '_blank');
//   };

//   const handleResponseModalClose = () => {
//     setResponseModalOpen(false);
//     setConfirmModal(false);
//     handleClose();
//     fetchData(selectedOption, mentorCode);
//   };

//   const setRemarkResponseClose = () => {
//     setRemarkModalOpen(false);
//     handleClose();
//     fetchData(selectedOption, mentorCode);
//   };

//   const handleConfirmation = () => {
//     setConfirmModal(true);
//   };

//   return (
//     <div>
//       <Modal open={open} onClose={handleClose}>
//         <Box sx={style}>
//           <div className='modal'>
//             <div className='field'>
//               <div style={{ width: '150px' }}>Student</div>
//               <div>{rowData.name}</div>
//             </div>
//             <div className='field'>
//               <div style={{ width: '150px' }}>Register Number</div>
//               <div>{rowData.rollNo}</div>
//             </div>
//             <div className='field'>
//               <div style={{ width: '150px' }}>Year</div>
//               <div>{rowData.year === 1 ? '1st Year' : rowData.year === 2 ? '2nd year' : rowData.year === 3 ? '3rd Year' : '4th Year'}</div>
//             </div>
//             <div className='field'>
//               <div style={{ width: '150px' }}>Industry</div>
//               <div>{rowData.Industry}</div>
//             </div>
//             <div className='field'>
//               <div style={{ width: '150px' }}>Semester</div>
//               <div>{rowData.semester}</div>
//             </div>
//             <div className='field'>
//               <div style={{ width: '150px' }}>Start Date</div>
//               <div>{rowData.StartDate}</div>
//             </div>
//             <div className='field'>
//               <div style={{ width: '150px' }}>End Date</div>
//               <div>{rowData.EndDate}</div>
//             </div>
//             <div className='field'>
//               <div style={{ width: '150px' }}>Report</div>
//               <div>{rowData.reportFilePath}</div>
//             </div>
//             <div className='field'>
//               <div style={{ width: '150px' }}>Certificate Url</div>
//               <div>{rowData.certificateFilePath}</div>
//             </div>
//             <div className='field'>
//               <div style={{ width: '150px' }}>Certificate</div>
//               <div className='pdficon' onClick={() => handleView('certificate')}>
//                 <InsertDriveFileIcon />
//                 <div>View</div>
//               </div>
//             </div>
//             <div className='field'>
//               <div style={{ width: '150px' }}>Report</div>
//               <div className='pdficon' onClick={() => handleView('report')}>
//                 <InsertDriveFileIcon />
//                 <div>View</div>
//               </div>
//             </div>
//             <div className='fieldbtn'>
//               <div>
//                 <button className='btnApprove' onClick={handleConfirmation}>
//                   Approve
//                 </button>
//               </div>
//               <div>
//                 <button className='btnRemove' onClick={handleReject}>
//                   Reject
//                 </button>
//               </div>
//             </div>
//           </div>
//         </Box>
//       </Modal>

//       <Modal open={remarkModalOpen} onClose={handleRemarkClose}>
//         <Box sx={style}>
//           <div>
//             <div className='rm'>Remarks</div>
//             <textarea
//               id='remark-modal-description'
//               value={remark}
//               className='remarkArea'
//               onChange={handleRemarkChange}
//               rows={3}
//               cols={38}
//               placeholder='Enter your remark here...'
//             ></textarea>
//             {remark === '' ? (
//               <button className='CourseBtn' disabled={true}>
//                 Submit Remark
//               </button>
//             ) : (
//               <button className='btnApprove' onClick={handleRemarkSubmit}>
//                 Submit Remark
//               </button>
//             )}
//           </div>
//         </Box>
//       </Modal>

//       <Modal open={responseModalOpen} onClose={handleResponseModalClose} style={{ zIndex: 6000 }}>
//         <Box sx={style}>
//           <div>{responseMessage}</div>
//           <div className='tick'>{isSuccess ? <CheckCircleIcon /> : <AnnouncementIcon />}</div>
//         </Box>
//       </Modal>

//       <Modal open={confirmModal} onClose={() => setConfirmModal(false)} style={{ zIndex: 6000 }}>
//         <Box sx={style}>
//           <div>
//             <div>Are you Sure want to approve?</div>
//             <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
//               <div>
//                 <button className='conformBtnApprove' onClick={handleApprove}>
//                   Yes
//                 </button>
//               </div>
//               <div>
//                 <button className='conformBtnRemove' onClick={() => setConfirmModal(false)}>
//                   No
//                 </button>
//               </div>
//             </div>
//           </div>
//         </Box>
//       </Modal>
//     </div>
//   );
// };

// export default FacultyModal;




import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import Modal from '@mui/material/Modal';
import axios from 'axios';
import '../styles/Facultymodal.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75%',
  maxWidth: '390px',
  bgcolor: 'background.paper',
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
  p: 4,
  borderRadius: '10px',
};

const FacultyModal = ({ rowData, open, handleClose, fetchData }) => {
  const [remarkModalOpen, setRemarkModalOpen] = useState(false);
  const [remark, setRemark] = useState('');
  const [responseModalOpen, setResponseModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [mentorCode] = useState('22IT137');
  const [selectedOption] = useState('');

  const handleApprove = () => {
    const { id } = rowData;
    if (id > 0) {
      axios
        .post('http://localhost:3000/approve', { id })
        .then(response => {
          console.log('Student approved successfully');
          setResponseMessage('Student approved successfully');
          setIsSuccess(true);
          setResponseModalOpen(true);
          handleClose();
          fetchData(selectedOption, mentorCode);
        })
        .catch(error => {
          console.error('Error approving student:', error.message);
          setResponseMessage('Error approving student: ' + error.message);
          setIsSuccess(false);
          setResponseModalOpen(true);
        });
    }
  };

  const handleReject = () => {
    setRemarkModalOpen(true);
  };

  const handleRemarkSubmit = () => {
    const { id } = rowData;
    if (id > 0) {
      axios
        .post('http://localhost:3000/reject', { remark, id })
        .then(response => {
          console.log('Remark submitted successfully');
          setIsSuccess(true);
          setResponseModalOpen(true);
          handleClose();
          fetchData(selectedOption, mentorCode);
        })
        .catch(error => {
          console.error('Error submitting remark:', error.message);
          setIsSuccess(false);
          setResponseModalOpen(true);
        });
    }
  };

  const handleView = (fileType) => {
    const filePath = fileType === 'certificate' ? rowData.certificateFilePath : rowData.reportFilePath;
    const fileURL = `http://localhost:3000/images/${filePath}`;
    window.open(fileURL, '_blank');
  };

  const handleResponseModalClose = () => {
    setResponseModalOpen(false);
    setConfirmModal(false);
    handleClose();
    fetchData(selectedOption, mentorCode);
  };

  const setRemarkResponseClose = () => {
    setRemarkModalOpen(false);
    handleClose();
    fetchData(selectedOption, mentorCode);
  };

  const handleConfirmation = () => {
    setConfirmModal(true);
  };

  // Format StartDate and EndDate for display
  const formattedStartDate = new Date(rowData.StartDate).toLocaleDateString();
  const formattedEndDate = new Date(rowData.EndDate).toLocaleDateString();

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className='modal'>
            <div className='field'>
              <div style={{ width: '150px' }}>Student</div>
              <div>{rowData.name}</div>
            </div>
            <div className='field'>
              <div style={{ width: '150px' }}>Register Number</div>
              <div>{rowData.rollNo}</div>
            </div>
            <div className='field'>
              <div style={{ width: '150px' }}>Year</div>
              <div>{rowData.year === 1 ? '1st Year' : rowData.year === 2 ? '2nd year' : rowData.year === 3 ? '3rd Year' : '4th Year'}</div>
            </div>
            <div className='field'>
              <div style={{ width: '150px' }}>Industry</div>
              <div>{rowData.Industry}</div>
            </div>
            <div className='field'>
              <div style={{ width: '150px' }}>Semester</div>
              <div>{rowData.semester}</div>
            </div>
            <div className='field'>
              <div style={{ width: '150px' }}>Start Date</div>
              <div>{formattedStartDate}</div>
            </div>
            <div className='field'>
              <div style={{ width: '150px' }}>End Date</div>
              <div>{formattedEndDate}</div>
            </div>
            <div className='field'>
              <div style={{ width: '150px' }}>Certificate</div>
              <div className='pdficon' onClick={() => handleView('certificate')}>
                <InsertDriveFileIcon />
                <div>View</div>
              </div>
            </div>
            <div className='field'>
              <div style={{ width: '150px' }}>Report</div>
              <div className='pdficon' onClick={() => handleView('report')}>
                <InsertDriveFileIcon />
                <div>View</div>
              </div>
            </div>
            <div className='fieldbtn'>
              <div>
                <button className='btnApprove' onClick={handleConfirmation}>
                  Approve
                </button>
              </div>
              <div>
                <button className='btnRemove' onClick={handleReject}>
                  Reject
                </button>
              </div>
            </div>
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

      <Modal open={responseModalOpen} onClose={handleResponseModalClose} style={{ zIndex: 6000 }}>
        <Box sx={style}>
          <div>{responseMessage}</div>
          <div className='tick'>{isSuccess ? <CheckCircleIcon /> : <AnnouncementIcon />}</div>
        </Box>
      </Modal>

      <Modal open={confirmModal} onClose={() => setConfirmModal(false)} style={{ zIndex: 6000 }}>
        <Box sx={style}>
          <div>
            <div>Are you sure you want to approve?</div>
            <div style={{ display: 'flex', gap: '20px', marginTop: '10px' }}>
              <div>
                <button className='conformBtnApprove' onClick={handleApprove}>
                  Yes
                </button>
              </div>
              <div>
                <button className='conformBtnRemove' onClick={() => setConfirmModal(false)}>
                  No
                </button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default FacultyModal;
