import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import BasicModal from './BasicModal';
import axios from 'axios';
=======
import BasicModal from './BasicModal';
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
import '../styles/table.css';
import { apiBaseUrl } from "../../../api/api";
import { useMediaQuery } from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';

const OnlineTable = ({ setFirstData }) => {
<<<<<<< HEAD
  const navigate = useNavigate();
=======
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
  const [student,setStudent] = useState("7376222AD156");
  const [data, setData] = useState([]);
  const [approvalMembers,setApprovalMembers] = useState([])
  const [error, setError] = useState(null);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const isLargeScreen = useMediaQuery('(min-width: 1600px)');

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

  const [columns, setColumns] = useState([
    { field: 'platform_name', headerName: 'Course Type', headerClassName: 'super-app-theme--header', renderCell: (params) => <Box sx={{ color: 'var(--basicTextColor)' }}>{params.value}</Box> },
    { field: 'course_name', headerName: 'Course Name', headerClassName: 'super-app-theme--header', width: 150, renderCell: (params) => <Box sx={{ color: 'var(--basicTextColor)' }}>{params.value}</Box> },
    { field: 'academic_year', headerName: 'Academic Year', headerClassName: 'super-app-theme--header', width: 160 , renderCell: (params) => <Box sx={{ color: 'var(--basicTextColor)' }}>{params.value}</Box>},
    { field: 'semester', headerName: 'Semester', headerClassName: 'super-app-theme--header', renderCell: (params) => <Box sx={{ color: 'var(--basicTextColor)' }}>{params.value}</Box> },
    { field: 'start_date', headerName: 'Start Date', headerClassName: 'super-app-theme--header', width: 100 , renderCell: (params) => <Box sx={{ color: 'var(--basicTextColor)' }}>{params.value}</Box>},
    { field: 'end_date', headerName: 'End Date', headerClassName: 'super-app-theme--header', width: 100, renderCell: (params) => <Box sx={{ color: 'var(--basicTextColor)' }}>{params.value}</Box> },
    { field: 'type', headerName: 'Applied For', headerClassName: 'super-app-theme--header', width: 100, renderCell: (params) => (
      <Box sx={{ color: 'var(--basicTextColor)' }}>
        {params.value === "1" ? 'Exemption' : params.value === "0" ? 'Rewards' : 'Unknown'}
      </Box>
    )},
    { field: 'certificate_url', headerName: 'Certificate URL', headerClassName: 'super-app-theme--header', width: 160, renderCell: (params) => <Box sx={{ color: 'var(--basicTextColor)' }}>{params.value}</Box> },
    { field: 'view', headerName: 'View', headerClassName: 'super-app-theme--header',width: 120, renderCell: (params) => (
      <Box sx={{ color: 'var(--basicTextColor)' }} style={{ cursor: 'pointer' }} onClick={() => setSelectedRowData(params.row)}>
        <RemoveRedEyeOutlinedIcon />
      </Box>
    )},
    { field: 'approval_status', headerName: 'Status', headerClassName: 'super-app-theme--header', renderCell: (params) => (
      <Box  sx={{ color: 'var(--basicTextColor)' }} style={{
        backgroundColor: (params.value >=0 && params.value <3) ? 'grey' : params.value === 3 ? 'green' : params.value === -1 ? 'red' : 'inherit',
        color: 'white', padding: '6px 12px', borderRadius: '4px'
      }}>
        {params.value >= 0 && params.value < 3 ? 'Initiated' : params.value === 3 ? 'Approved' : params.value === -1 ? 'Rejected' : 'Unknown'}
      </Box>
    )},
]);

  const customLocaleText = {
    noRowsLabel: 'You have Not yet Applied any Courses', // Change this to your desired text
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
<<<<<<< HEAD
        const response = await axios.get(`${apiBaseUrl}/api/ce/oc/registered?student=${student}`, {
          withCredentials: true
        });
        const jsonData = response.data;
        setData(jsonData);
        setFirstData(false);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized, logging out:", error);
          handleLogout(); // Call logout function
        } else {
          console.log("error in fetching registered studnets",error);
          setError(error.message);
        }
      }
    };

    const ApprovalMembers =  async () => {
      try{
        const response1 = await axios.get(`${apiBaseUrl}/api/ce/oc/OnlineCourseApprovalMembers`, {
          withCredentials: true
        });
        const jsonData1 = response1.data;
        const members = jsonData1.map(item => item.members);
        members.push("Approved");
        setApprovalMembers(members);
      }
      catch(error){
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized, logging out:", error);
          handleLogout(); // Call logout function
        } else {
          console.log("error in fetching approvalMembers",error);
          setError(error.message);
        }
      }
    }

    fetchData();
    ApprovalMembers();
  }, []);


=======
        const response = await fetch(`${apiBaseUrl}/api/ce/oc/registered?student=${student}`);
        const response1 = await fetch(`${apiBaseUrl}/api/ce/oc/OnlineCourseApprovalMembers`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        else if(!response1.ok){ 
          throw new Error('Failed to fetch approval Members');
        }
        const jsonData = await response.json();
        const jsonData1 = await response1.json();
        const members = jsonData1.map(item => item.members);
        members.push("Approved");
        setData(jsonData);
        setApprovalMembers(members)
        setFirstData(false);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
  useEffect(() => {
    if (isLargeScreen) {
      setColumns((prevColumns) =>
        prevColumns.map((column) => ({
          ...column,
          flex: 1,
          width: undefined // Remove fixed width for large screens
        }))
      );
    } else {
      setColumns((prevColumns) =>
        prevColumns.map((column) => ({
          ...column,
          flex: undefined,
          width: column.field === 'course_name' || column.field === 'academic_year' ? 150 : column.field === 'start_date' || column.field === 'end_date' ? 100 : column.field === 'certificate_url' ? 160 : column.field === 'view' ? 50 : undefined
        }))
      );
    }
  }, [isLargeScreen]);

  // const renderViewCell = (params) => (
  //   <Box>
  //     <Button onClick={() => setSelectedRowData(params.row)}>
  //       <RemoveRedEyeOutlinedIcon />
  //     </Button>
  //   </Box>
  // );

  // const renderStatusCell = (params) => (
  //   <Box
  //     style={{
  //       backgroundColor:
  //         params.value === 0
  //           ? 'grey'
  //           : params.value === 1
  //           ? 'green'
  //           : params.value === -1
  //           ? 'red'
  //           : 'inherit',
  //       color: 'white',
  //       padding: '6px 12px',
  //       borderRadius: '4px',
  //     }}
  //   >
  //     {params.value === 0
  //       ? 'Initiated'
  //       : params.value === 1
  //       ? 'Approved'
  //       : params.value === -1
  //       ? 'Rejected'
  //       : 'Unknown'}
  //   </Box>
  // );

  return (
    <div className="tableMain" >
      <div className="datagrid">
        <DataGrid
          autoHeight
          rows={data}
          columns={columns}
          localeText={customLocaleText}
          classes={{
            root: 'custom-border',
            cell: 'custom-cell',
            columnHeader: 'custom-header',
          }}
          sx={{
            maxWidth: '100%', // Set width to 80%
            overflowX: 'auto', // Enable horizontal scrolling
            '& .super-app-theme--header': {
              color: 'var(--heading-crsExp)',
              justifyContent: 'center',
            },
        // '& .MuiDataGrid-columnHeaders': {
        //   borderColor: 'var(--basicTextColor)',
        // },
       
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
          open={true} // Always keep the modal open when there's selectedRowData
          handleClose={() => setSelectedRowData(null)}
          rowData={selectedRowData}
          approvalMembers={approvalMembers}
        />
      )}
    </div>
  );
};

export default OnlineTable;
