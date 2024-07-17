import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import '../styles/Facultymodal.css';
import { useEffect, useState } from 'react';

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

const BasicModal = ({ rowData, open, handleClose, faculty }) => {
  const [status, setStatus] = useState("");
  const [appliedFor, setAppliedFor] = useState("");
  const [remOpen, setRemOpen] = useState("");
  const [certificatePath, setCertificatePath] = useState("");
  const [reportPath, setReportPath] = useState("");

  useEffect(() => {
    if (rowData.approval_status === 1) {
      setStatus("Approved");
    } else if (rowData.approval_status === -1) {
      setStatus("Rejected");
      setRemOpen(true);
    } else {
      setStatus("Initiated");
    }

    if (rowData.type === "1") {
      setAppliedFor("Exemption");
    } else {
      setAppliedFor("Rewards");
    }
    setCertificatePath(rowData.certificateFilePath);
    setReportPath(rowData.reportFilePath);
  }, [rowData]);

  const handleView = (filePath) => {
    const fileURL = `http://localhost:3000/images/${filePath}`;
    window.open(fileURL, '_blank');
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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
            <div className="CourseTit">Internship Details</div>
            {faculty && <>
              <div className='field'>
                <div className='fldClm'>Student</div>
                <div className='fldData'>{rowData.name}</div>
              </div>
              <div className='field'>
                <div className='fldClm'>Register Number</div>
                <div className='fldData'>{rowData.rollNo}</div>
              </div>
              <div className='field'>
                <div className='fldClm'>Year</div>
                <div className='fldData'>{rowData.year === 1 ? "1st Year" : rowData.year === 2 ? "2nd Year" : rowData.year === 3 ? "3rd Year" : "4th Year"}</div>
              </div>
            </>}
            <div className='field'>
                <div className='fldClm'>Student</div>
                <div className='fldData'>{rowData.name}</div>
              </div>
              <div className='field'>
                <div className='fldClm'>Register Number</div>
                <div className='fldData'>{rowData.rollNo}</div>
              </div>
              <div className='field'>
                <div className='fldClm'>Year</div>
                <div className='fldData'>{rowData.year === 1 ? "1st Year" : rowData.year === 2 ? "2nd Year" : rowData.year === 3 ? "3rd Year" : "4th Year"}</div>
              </div>
            <div className='field'>
              <div className='fldClm'>Industry</div>
              <div className='fldData'>{rowData.Industry}</div>
            </div>
            <div className='field'>
              <div className='fldClm'>Start Date</div>
              <div className='fldData'>{formatDate(rowData.StartDate)}</div>
            </div>
            <div className='field'>
              <div className='fldClm'>End Date</div>
              <div className='fldData'>{formatDate(rowData.EndDate)}</div>
            </div>
            <div className='field'>
              <div className='fldClm'>Duration</div>
              <div className='fldData'>{rowData.duration}</div>
            </div>
            <div className='field'>
              <div className='fldClm'>Mode</div>
              <div className='fldData'>{rowData.mode}</div>
            </div>
          
            <div className='field'>
              <div className='fldClm'>Applied For:</div>
              <div className='fldData'>{appliedFor}</div>
            </div>
            <div className='field'>
              <div className='fldClm'>Certificate</div>
              <div className='pdficon' onClick={() => handleView(certificatePath)}><InsertDriveFileIcon /><div>View certificate</div></div>
            </div>
            <div className='field'>
              <div className='fldClm'>Report</div>
              <div className='pdficon' onClick={() => handleView(reportPath)}><InsertDriveFileIcon /><div>View report</div></div>
            </div>
            {rowData.approval_status === -1 && remOpen && (
              <div className='field remOpen'>
                <div className='fldClm'>Remark</div>
                <div className='remar'>{rowData.remark}</div>
              </div>
            )}

            <div className='field'>
              <div className='fldClm'>Status</div>
              <div className='fldData'><button className={rowData.approval_status === 1 ? "btnApprove" : rowData.approval_status === -1 ? "btnRemove" : "btnInitiated"}>{status}</button></div>
            </div>

          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default BasicModal;
