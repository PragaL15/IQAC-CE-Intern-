import React, { useEffect, useState } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FacultyModal from '../stuffs/FacultyModal';
import '../styles/courseApproval.css';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import api from '../../../api/apiH.jsx'; // Use the configured api instance
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import OneCreditFacultyModal from '../stuffs/OneCreditFacultyModal';

const PendingApproval = () => {
  const [data, setData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [name, setName] = useState("");
  const [department, setDepartment] = useState(null);
  const [userId, setUserId] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await api.get('/api/user-data', { withCredentials: true });
      if (response.status === 200) {
        const data = response.data;
        setName(data.name);
        setDepartment(data.departmentId);
        setUserId(data.user_id);
        fetchApprovalData(data.user_id);
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchApprovalData = async (userId) => {
    let approvalStatus;
    let url;
    switch (userId) {
      case 2:
        approvalStatus = 0;
        url = `/api/ce/oneCredit/PendingOneCredit?&approval_status=${approvalStatus}`;
        break;
      case 3:
        approvalStatus = 1;
        url = `/api/ce/oneCredit/PendingOneCredit?&approval_status=${approvalStatus}`;
        break;
      case 4:
        approvalStatus = 2;
        url = `/api/ce/oneCredit/PendingOneCredit?&approval_status=${approvalStatus}`;
        break;
      default:
        console.error('Unknown user id');
        return;
    }

    try {
      const approvalResponse = await api.get(url, { withCredentials: true });
      if (approvalResponse.status === 200) {
        const approvalData = approvalResponse.data;
        setData(approvalData);
      } else if (approvalResponse.status === 401) {
        console.error('Unauthorized request for faculty approvals');
      } else {
        console.error('Failed to fetch faculty approvals');
      }
    } catch (error) {
      console.error('Error fetching faculty approvals:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const columns = [
    { field: 'student_name', headerName: 'Student', headerClassName: 'super-app-theme--header', width: 130 },
    { field: 'register_number', headerName: 'Register Number', headerClassName: 'super-app-theme--header', width: 130 },
    { field: 'year', headerName: 'Year Of Study', headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Box>
          {
            params.value === 1 ? "1st Year" : params.value === 2 ? "2nd Year" : params.value === 3 ? "3rd Year" : "4th Year"
          }
        </Box>
      ),
    },
    { field: 'branch', headerName: 'Branch', headerClassName: 'super-app-theme--header', width: 70 },
    { field: 'course_1_code', headerName: 'Course Code 1', headerClassName: 'super-app-theme--header', width: 120 },
    { field: 'course_1_name', headerName: 'Course Name 1', headerClassName: 'super-app-theme--header', width: 150 },
    { field: 'academic_year_1', headerName: 'Academic Year 1', headerClassName: 'super-app-theme--header', width: 140 },
    { field: 'semester_1', headerName: 'Semester 1', headerClassName: 'super-app-theme--header', width: 90 },
    { field: 'course_2_code', headerName: 'Course Code 2', headerClassName: 'super-app-theme--header', width: 120 },
    { field: 'course_2_name', headerName: 'Course Name 2', headerClassName: 'super-app-theme--header', width: 150 },
    { field: 'academic_year_2', headerName: 'Academic Year 2', headerClassName: 'super-app-theme--header', width: 140 },
    { field: 'semester_2', headerName: 'Semester 2', headerClassName: 'super-app-theme--header', width: 90 },
    { field: 'course_3_code', headerName: 'Course Code 3', headerClassName: 'super-app-theme--header', width: 120 },
    { field: 'course_3_name', headerName: 'Course Name 3', headerClassName: 'super-app-theme--header', width: 150 },
    { field: 'academic_year_3', headerName: 'Academic Year 3', headerClassName: 'super-app-theme--header', width: 140 },
    { field: 'semester_3', headerName: 'Semester 3', headerClassName: 'super-app-theme--header', width: 90 },
    { field: 'elective', headerName: 'Elective', headerClassName: 'super-app-theme--header', width: 100 },
    {
      field: 'view',
      headerName: 'View',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Box style={{ cursor: 'pointer' }} onClick={() => setSelectedRowData(params.row)}>
          <RemoveRedEyeOutlinedIcon />
        </Box>
      ),
    },
  ];

  const customLocaleText = {
    noRowsLabel: `No Students Have Applied Yet for Course Exemption`, 
  };

  return (
    <div className="pendingTable">
      <div className="titFac">
        <div className="ti">
          <h4 style={{ marginRight: "5px" }}>One Credit</h4>{" "}
          <p>Pending Applications</p>
        </div>
      </div>
      <div>
        <div className="subtit">
          <div>Course Exemption</div>
        </div>
      </div>
      <div>
        <div className="hometable">
          <div className="tableMain">
            <div className="datagrid">
              <DataGrid
                className='dat'
                autoHeight
                rows={data}
                columns={columns}
                localeText={customLocaleText}
                sx={{
                  maxWidth: "100%", // Set width to 80%
                  overflowX: "auto", // Enable horizontal scrolling
                  "& .super-app-theme--header": {
                    color: "var(--heading-crsExp)",
                  },
                  "& .MuiDataGrid-columnsContainer": {
                    overflow: "visible", // Allow column headers to overflow for wrapping
                  },
                  "& .MuiDataGrid-cellContent": {
                    whiteSpace: "normal", // Allow cell content to wrap
                    wordWrap: "break-word",
                  },
                }}
              />
              {selectedRowData && <OneCreditFacultyModal data={selectedRowData} handleClose={() => setSelectedRowData(null)} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingApproval;
