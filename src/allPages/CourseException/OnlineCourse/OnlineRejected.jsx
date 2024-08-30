import React, { useEffect, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import FacultyModal from "../stuffs/FacultyModal";
import "../styles/courseApproval.css";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { apiBaseUrl } from "../../../api/api";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
=======
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
import  apiLoginHost  from "../../login/LoginApi"
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import BasicModal from "../stuffs/BasicModal";

const OnlineRejected = () => {
<<<<<<< HEAD
  const navigate = useNavigate();
=======
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
  const [selectedOption, setSelectedOption] = useState("1");
  const [data, setData] = useState([]);
  const [name,setName] = useState("")
  const [department,setDepartment] = useState(null)
  const [userId,setUserId] = useState(null)
  const [approvalMembers,setApprovalMembers] = useState([])
  const [selectedRowData, setSelectedRowData] = useState(null);
  // const [mentorCode, setmentorCode] = useState("22IT137");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

<<<<<<< HEAD
  const handleLogout = async () => {
    try {
      await axios.post(`${apiBaseUrl}/logout`, { withCredentials: true });
      // Clear local storage
      localStorage.removeItem('token');
      localStorage.removeItem('user_id');
      localStorage.removeItem('resources');
      
      // Redirect to login page
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

=======
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCourseExemptionClick = () => {
    handleOptionSelect("1");
    setAnchorEl(null);
  };

  const handleRewardsClick = () => {
    handleOptionSelect("0");
    setAnchorEl(null);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    fetchUserData(option);
  };

  const fetchUserData = async (selectedOption) => {
    try {
      const response = await axios.get(`${apiLoginHost}/api/user-data`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        const data = response.data;
        setName(data.name);
        setDepartment(data.departmentId);
        setUserId(data.user_id);
        
        let approvalStatus;
        let url;
        let rejected_by;
        switch (data.user_id) {
          case 5:
            approvalStatus = -1;
            rejected_by = 1
            url = `${apiBaseUrl}/api/ce/oc/RejectedOnlineCourse?type=${selectedOption}&approval_status=${approvalStatus}&rejected_by=${rejected_by}&department=${data.departmentId}`;
            break;
          case 6:
            approvalStatus = -1;
            rejected_by = 2
            url = `${apiBaseUrl}/api/ce/oc/RejectedOnlineCourse?type=${selectedOption}&approval_status=${approvalStatus}&rejected_by=${rejected_by}`;
            break;
          case 4:
            approvalStatus = -1;
            rejected_by = 3
            url = `${apiBaseUrl}/api/ce/oc/RejectedOnlineCourse?type=${selectedOption}&approval_status=${approvalStatus}&rejected_by=${rejected_by}`;
            break;
          default:
            console.error('Unknown user id');
            return;
        }
        // Fetch faculty approvals
<<<<<<< HEAD
        const approvalResponse = await axios.get(url, { withCredentials: true });
=======
        const approvalResponse = await axios.get(url);
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
        if (approvalResponse.status === 200) {
          const approvalData = approvalResponse.data;
          setData(approvalData)
          console.log('Faculty Approved Data: ', approvalData);
        } else {
          console.error('Failed to fetch faculty approvals');
        }
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
<<<<<<< HEAD
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized, logging out:", error);
        handleLogout(); // Call logout function
      }
      else { 
      console.error('Error fetching user data:', error);
      }
=======
      console.error('Error fetching user data:', error);
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
    }
  };

  useEffect(() => {
    fetchUserData(selectedOption);
    fetchApprovalMembers()
  }, []);

    const fetchApprovalMembers = async () => {
      try {
<<<<<<< HEAD
        const response1 = await fetch(`${apiBaseUrl}/api/ce/oc/OnlineCourseApprovalMembers`, { withCredentials: true });
=======
        const response1 = await fetch(`${apiBaseUrl}/api/ce/oc/OnlineCourseApprovalMembers`);
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
        if(!response1.ok){
          throw new Error('Failed to fetch approval Members');
        }
        const jsonData1 = await response1.json();
        const members = jsonData1.map(item => item.members);
        members.push("Approved");
        setApprovalMembers(members)
      } catch (error) {
<<<<<<< HEAD
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized, logging out:", error);
          handleLogout(); // Call logout function
        }
        else { 
        setError(error.message);
        }
=======
        setError(error.message);
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
      }
    };

  const columns = [
    { field: 'student_name', headerName: 'Student', headerClassName: 'super-app-theme--header', width:130 },
    { field: 'register_number', headerName: 'Register Number', headerClassName: 'super-app-theme--header', width:130 },
    { field: 'branch', headerName: 'Department', headerClassName: 'super-app-theme--header' },
    { field: 'year', headerName: 'Year Of Study', headerClassName: 'super-app-theme--header' ,
    renderCell: (params) => (
      <Box>
        {
          params.value === 1 ? "1st Year" : params.value === 2 ? "2nd Year" : params.value === 3 ? "3rd Year" : "4th year"
        }
      </Box>
    ),
  },
    { field: 'platform_name', headerName: 'Course Type', headerClassName: 'super-app-theme--header', width:100 },
    { field: 'course_code', headerName: 'Course Code', headerClassName: 'super-app-theme--header', width:100 },
    { field: 'course_name', headerName: 'Course Name', headerClassName: 'super-app-theme--header', width:150 },
    { field: 'duration', headerName: 'Duration', headerClassName: 'super-app-theme--header', width:100 ,
      renderCell: (params) => (
        <div>{params.value===12?"12 Weeks":params.value===4?"4 Weeks":"8 Weeks"}</div>
      ),
    },
    { field: 'credit', headerName: 'Credits', headerClassName: 'super-app-theme--header', width:100,
      renderCell: (params) => (
        <div>{params.value===1?"1 Credit":params.value===2?"2 Credits":"3 Credits"}</div>
      ),
     },
    { field: 'academic_year', headerName: 'Academic Year', headerClassName: 'super-app-theme--header', width:150 },
    { field: 'semester', headerName: 'Semester', headerClassName: 'super-app-theme--header', width:90 },
    { field: 'start_date', headerName: 'Start Date', headerClassName: 'super-app-theme--header', width:100 },
    { field: 'end_date', headerName: 'End Date', headerClassName: 'super-app-theme--header', width:100 },
    { field: 'exam_date', headerName: 'Exam Date', headerClassName: 'super-app-theme--header', width:100 },
    { field: 'mark', headerName: 'Marks', headerClassName: 'super-app-theme--header', width:60 },
    { field: 'certificate_url', headerName: 'Certificate URL', headerClassName: 'super-app-theme--header' , width:120,
      renderCell: (params) => (
        <a style={{color:"black"}} href={params.value}>
          {params.value}
        </a>
      ),
    },
    {
      field: 'certificate_path',
      headerName: 'Certificate',
      headerClassName: 'super-app-theme--header',
      width:120,
      renderCell: (params) => (
        <a style={{color:"black"}} href={`${apiBaseUrl}/api/ce/oc/onlineApply/pdfs/${params.value}`} target="_blank" rel="noopener noreferrer">
          View Certificate
        </a>
      )
    },
    { field: 'elective', headerName: 'Elective', headerClassName: 'super-app-theme--header' , width:90},
    {
      field: 'view',
      headerName: 'View',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Box style={{ cursor: 'pointer' }} onClick={() => setSelectedRowData(params.row)} >
          <RemoveRedEyeOutlinedIcon />
        </Box>
      ),
    },
  ]

  const customLocaleText = {
<<<<<<< HEAD
    noRowsLabel: `No Applications for ${selectedOption == "1" ? "Course Exemption" : "Rewards"} `, 
=======
    noRowsLabel: `You have not Yet Approved any students for ${selectedOption == "1" ? "Course Exemption" : "Rewards"} `, 
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
  };

  return (
    <>
<<<<<<< HEAD
      <div className="tableDefault">
=======
      <div>
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
        <div className="titFac">
          <div className="ti">
            <h4>Rejected Courses</h4>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h4 style={{ marginTop: "30px" }}>Filter</h4>
            <div
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              className="filtermenu"
            >
              <FilterAltIcon className="iconfilter" />
            </div>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleCourseExemptionClick}>
                Course Exemption
              </MenuItem>
              <MenuItem onClick={handleRewardsClick}>Rewards</MenuItem>
            </Menu>
          </div>
        </div>
        <div>
          <div className="titl">
            <div>{selectedOption == "1" ? "Course Exemption" : "Rewards"}</div>
          </div>
        </div>
        <div>
          <div className="hometable">
            <div className="tableMain">
              <div className="datagrid">
                <DataGrid
                  autoHeight
                  rows={data}
                  columns={columns}
                  localeText={customLocaleText}
                  sx={{
                    maxWidth: "100%", // Set width to 80%
                    overflowX: "auto", // Enable horizontal scrolling
                    "& .super-app-theme--header": {
                      color: "var(--heading-crsExp)",
                      justifyContent: "center",
                    },
                    "& .MuiDataGrid-columnsContainer": {
                      overflow: "visible", // Allow column headers to overflow for scrolling
                    },
                    "& .MuiDataGrid-colCell, .MuiDataGrid-cell": {
                      whiteSpace: "nowrap", // Prevent wrapping of cell content
                    },
                  }}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  pageSizeOptions={[5]}
                  disableRowSelectionOnClick
                />
              </div>
              {selectedRowData && (
                <BasicModal
                  faculty={true}
                  open={true} // Always keep the modal open when there's selectedRowData
                  handleClose={() => setSelectedRowData(null)}
                  rowData={selectedRowData}
                  approvalMembers={approvalMembers}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OnlineRejected;
