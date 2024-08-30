<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import "../styles/courseApproval.css";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { apiBaseUrl } from "../../../api/api";
import { useNavigate } from "react-router-dom";
import apiLoginHost from "../../login/LoginApi";
import Menu from "@mui/material/Menu";
import axios from "axios";
import MenuItem from "@mui/material/MenuItem";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import AddOnHonorMinorFacultyModal from "../stuffs/AddOnHonorMinorFacultyModal";

const PendingApprovals = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState("1"); //selected filter option as addon / honorMinor
  const [name, setName] = useState("");
  const [department, setDepartment] = useState(null);
  const [userId, setUserId] = useState(null);
  const [data, setData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null); // use state for handling the filter menu
  const open = Boolean(anchorEl);

  // functions for filter menu
=======
import React, { useEffect, useState } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FacultyModal from '../stuffs/FacultyModal';
import '../styles/courseApproval.css';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { apiBaseUrl } from "../../../api/api";
import  apiLoginHost  from "../../login/LoginApi"
import Menu from '@mui/material/Menu';
import axios from "axios";
import MenuItem from '@mui/material/MenuItem';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import AddOnHonorMinorFacultyModal from '../stuffs/AddOnHonorMinorFacultyModal';

const PendingApprovals = () => {
  const [selectedOption, setSelectedOption] = useState("1");
  const [name,setName] = useState("")
  const [department,setDepartment] = useState(null)
  const [userId,setUserId] = useState(null)
  const [data, setData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  // const [mentorCode,setmentorCode] = useState("22IT137");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

<<<<<<< HEAD
  // functions for swithcing purpose incorporated with filter icon at top right
  const handleCourseExemptionClick = () => {
    handleOptionSelect("1");
    setAnchorEl(null);
  };

  const handleRewardsClick = () => {
    handleOptionSelect("0");
    setAnchorEl(null);
  };
=======
  const handleCourseExemptionClick = () => {
    handleOptionSelect("1")
    setAnchorEl(null);
  }

  const handleRewardsClick = () => {
    handleOptionSelect("0")
    setAnchorEl(null);
  }
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    fetchUserData(option);
  };

<<<<<<< HEAD
  // logout Function
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

  // Main function to fetch the pending courses
=======
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
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
<<<<<<< HEAD

=======
        
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
        let approvalStatus;
        let url;
        switch (data.user_id) {
          case 2:
            approvalStatus = 0;
            url = `${apiBaseUrl}/api/ce/AddHm/PendingAddonHonorMinor?type=${selectedOption}&approval_status=${approvalStatus}`;
            break;
          case 3:
            approvalStatus = 1;
            url = `${apiBaseUrl}/api/ce/AddHm/PendingAddonHonorMinor?type=${selectedOption}&approval_status=${approvalStatus}`;
            break;
          case 4:
            approvalStatus = 2;
            url = `${apiBaseUrl}/api/ce/AddHm/PendingAddonHonorMinor?type=${selectedOption}&approval_status=${approvalStatus}`;
            break;
          default:
<<<<<<< HEAD
            console.error("Unknown user id");
            return;
        }
        // Fetch faculty approvals
        const approvalResponse = await axios.get(url, {
          withCredentials: true,
        });
        if (approvalResponse.status === 200) {
          const approvalData = approvalResponse.data;
          setData(approvalData);
          console.log("Pending Addon Honor Minor:", approvalData);
        } else {
          console.error("Failed to fetch pending addon honor minor approvals");
        }
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized, logging out:", error);
        handleLogout(); // Call logout function
      } else {
        console.error("Error fetching user data:", error);
      }
    }
  };

=======
            console.error('Unknown user id');
            return;
        }
        // Fetch faculty approvals
        const approvalResponse = await axios.get(url, { withCredentials: true });
        if (approvalResponse.status === 200) {
          const approvalData = approvalResponse.data;
          setData(approvalData)
          console.log('Pending Addon Honor Minor:', approvalData);
        } else {
          console.error('Failed to fetch faculty approvals');
        }
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
  useEffect(() => {
    fetchUserData(selectedOption);
  }, []);

  const columns = [
<<<<<<< HEAD
    {
      field: "student_name",
      headerName: "Student",
      headerClassName: "super-app-theme--header",
      width: 130,
    },
    {
      field: "register_number",
      headerName: "Register Number",
      headerClassName: "super-app-theme--header",
      width: 130,
    },
    {
      field: "branch",
      headerName: "Department",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "year",
      headerName: "Year Of Study",
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Box>
          {params.value === 1
            ? "1st Year"
            : params.value === 2
            ? "2nd Year"
            : params.value === 3
            ? "3rd Year"
            : "4th year"}
        </Box>
      ),
    },
    {
      field: "course_code",
      headerName: "Course Code",
      headerClassName: "super-app-theme--header",
      width: 100,
    },
    {
      field: "course_name",
      headerName: "Course Name",
      headerClassName: "super-app-theme--header",
      width: 150,
    },
    {
      field: "academic_year",
      headerName: "Academic Year",
      headerClassName: "super-app-theme--header",
      width: 150,
    },
    {
      field: "semester",
      headerName: "Semester",
      headerClassName: "super-app-theme--header",
      width: 90,
    },
    {
      field: "mode_of_exemption",
      headerName: "Mode Of Exemption",
      headerClassName: "super-app-theme--header",
      width: 120,
      renderCell: (params) => (
        <div>
          {params.value === 1
            ? "AddOn"
            : params.value === 2
            ? "Honors"
            : "Minors"}
        </div>
      ),
    },
    {
      field: "elective",
      headerName: "Elective",
      headerClassName: "super-app-theme--header",
      width: 90,
    },
    {
      field: "view",
      headerName: "View",
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Box
          style={{ cursor: "pointer" }}
          onClick={() => setSelectedRowData(params.row)}
        >
=======
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
    { field: 'course_code', headerName: 'Course Code', headerClassName: 'super-app-theme--header', width:100 },
    { field: 'course_name', headerName: 'Course Name', headerClassName: 'super-app-theme--header', width:150 },
    { field: 'academic_year', headerName: 'Academic Year', headerClassName: 'super-app-theme--header', width:150 },
    { field: 'semester', headerName: 'Semester', headerClassName: 'super-app-theme--header', width:90 },
    { field: 'mode_of_exemption', headerName: 'Mode Of Exemption', headerClassName: 'super-app-theme--header' , width:120,
      renderCell: (params) => (
        <div>
          {params.value===1?"AddOn":params.value===2?"Honors":"Minors"}
        </div>
      ),
    },
    { field: 'elective', headerName: 'Elective', headerClassName: 'super-app-theme--header' , width:90},
    {
      field: 'view',
      headerName: 'View',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Box style={{ cursor: 'pointer' }} onClick={() => setSelectedRowData(params.row)} >
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
          <RemoveRedEyeOutlinedIcon />
        </Box>
      ),
    },
<<<<<<< HEAD
  ];

  const customLocaleText = {
    noRowsLabel: `No Students Have Applied Yet for ${
      selectedOption == 1 ? "AddOns" : "Honors/Minors"
    } `,
=======
  ]

  const customLocaleText = {
    noRowsLabel: `No Students Have Applied Yet for ${selectedOption == 1 ? "AddOns" : "Honors/Minors"} `, 
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
  };

  return (
    <>
<<<<<<< HEAD
      <div className="tableDefault">
        <div className="titFac">
          <div className="ti">
            <h4 style={{ marginRight: "5px" }}>
              {selectedOption === "1" ? "AddOn" : "Honors Minors"}
            </h4>{" "}
            <p>/ Pending Applications</p>
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
              <MenuItem onClick={handleCourseExemptionClick}>Addon</MenuItem>
              <MenuItem onClick={handleRewardsClick}>Honors/Minors</MenuItem>
            </Menu>
          </div>
        </div>
        <div>
          <div className="titl">
            <div>Course Exemption</div>
          </div>
        </div>
        <div>
          <div className="hometable">
            <div className="tableMain">
              <div className="datagrid">
                <DataGrid
                  className="dat"
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
              {/* modal for viewing and making decision as approve or reject the application */}
              {selectedRowData && (
                <AddOnHonorMinorFacultyModal
                  open={true} // Always keep the modal open when there's selectedRowData
                  handleClose={() => setSelectedRowData(null)}
                  rowData={selectedRowData}
                  fetchUserData={fetchUserData}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PendingApprovals;
=======
    <div className='pendingTable'>
      <div className="titFac">
        <div className="ti">
          <h4 style={{marginRight:"5px"}}>{selectedOption==="1"?"AddOn":"Honors/Minors"}</h4> <p>Pending Applications</p>
        </div>
         <div  style={{ display: "flex", flexDirection: "row" }} >
         <h4 style={{ marginTop: "30px" }}>Filter</h4>
      <div
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className='filtermenu'
      >
        <FilterAltIcon className="iconfilter" />
      </div>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleCourseExemptionClick}>Addon</MenuItem>
        <MenuItem onClick={handleRewardsClick}>Honors/Minors</MenuItem>
      </Menu>
    </div>
      </div>
      <div>
        <div className="titl">
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
            <AddOnHonorMinorFacultyModal
              open={true} // Always keep the modal open when there's selectedRowData
              handleClose={() => setSelectedRowData(null)}
              rowData={selectedRowData}
              fetchUserData={fetchUserData}
            />
          )}
        </div>
      </div>
      </div>
    </div>
    </>
  )
}

export default PendingApprovals
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
