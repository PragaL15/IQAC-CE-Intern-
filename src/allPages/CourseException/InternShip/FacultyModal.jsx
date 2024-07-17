// FacultyModal.jsx
import React, { useState } from 'react';
import  '../styles/Facultymodal.css';
const FacultyModal = ({ open, handleClose, rowData, fetchData }) => {
  const [remark, setRemark] = useState('');

  const handleApprove = async () => {
    try {
      const response = await fetch('http://localhost:3000/approve', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: rowData.id })
      });
      if (response.ok) {
        alert('Application approved successfully');
        fetchData(); // Refresh data after approval
        handleClose(); // Close the modal
      } else {
        const errorData = await response.json();
        alert(`Failed to approve application: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error approving application:', error);
      alert('Error approving application');
    }
  };

  const handleReject = async () => {
    try {
      const response = await fetch('http://localhost:3000/reject', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: rowData.id, remark })
      });
      if (response.ok) {
        alert('Application rejected successfully');
        fetchData(); // Refresh data after rejection
        handleClose(); // Close the modal
      } else {
        const errorData = await response.json();
        alert(`Failed to reject application: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error rejecting application:', error);
      alert('Error rejecting application');
    }
  };

  return (
    <div style={{ display: open ? 'block' : 'none' }}>
      <div>
        <h4>Application Details</h4>
        <p>Name: {rowData.name}</p>
        <p>Roll Number: {rowData.rollNo}</p>
        <p>Industry: {rowData.Industry}</p>
        <p>Start Date: {rowData.StartDate}</p>
        <p>End Date: {rowData.EndDate}</p>
        <p>Approval Status: {rowData.approval_status}</p>
        <input
          type="text"
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          placeholder="Enter remark for rejection"
        />
        <button onClick={handleApprove}>Approve</button>
        <button onClick={handleReject}>Reject</button>
        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default FacultyModal;
