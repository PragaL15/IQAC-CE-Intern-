import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Box } from '@mui/material';
import '../styles/table.css';
import InternBasicModal from './InternBasicModal';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';


const InternshipTable = ({ setFirstData }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [student,setStudent] = useState("7376222AD156")
  const [selectedRowData,setSelectedRowData] = useState(null)
  const [approvalMembers,setApprovalMembers] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/ce/in/Registered?student=${student}`);
        const response1 = await axios.get(`http://localhost:5001/api/ce/in/InternApprovalMembers`);
        const jsonData = response1.data;
        const members = jsonData.map(item => item.member);
        members.push("Approved");
        setApprovalMembers(members)
        setData(response.data);
        setLoading(false);
        setFirstData(false)
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message || 'Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  const columns = [
    {
      field: 'company_name',
      headerName: 'Industry Details',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Box >
          {params.value + '-' + params.row.company_address}
        </Box>
      ),
      width:200
    },
    {
      field: 'mode',
      headerName: 'Mode',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'start_date',
      headerName: 'Start Date',
      headerClassName: 'super-app-theme--header',
      // valueGetter: (params) => formatDate(params.row.StartDate)
    },
    {
      field: 'end_date',
      headerName: 'End Date',
      headerClassName: 'super-app-theme--header',
      // valueGetter: (params) => formatDate(params.row.EndDate)
    },
    {
      field: 'duration',
      headerName: 'Duration',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'stipend',
      headerName: 'Stipend',
      headerClassName: 'super-app-theme--header',
    },
    {
      field: 'certificate_path',
      headerName: 'Certificate',
      headerClassName: 'super-app-theme--header',
      width:120,
      renderCell: (params) => (
        <a style={{color:"black"}} href={`http://localhost:5001/api/ce/in/InternApply/pdfs/${params.value}`} target="_blank" rel="noopener noreferrer">
          View Certificate
        </a>
      )
    },
    {
      field: 'report_path',
      headerName: 'Report',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <a style={{color:"black"}} href={`http://localhost:5001/api/ce/in/InternApply/pdfs/${params.value}`} target="_blank" rel="noopener noreferrer">
          View Report
        </a>
      )
    },
    {
      field: 'view',
      headerName: 'View',
      headerClassName: 'super-app-theme--header',
      width:50,
      renderCell: (params) => (
        <Box style={{ cursor: 'pointer' }} onClick={() => setSelectedRowData(params.row)} >
          <RemoveRedEyeOutlinedIcon />
        </Box>
      ),
    },
    {
      field: 'approval_status',
      headerName: 'Status',
      headerClassName: 'super-app-theme--header',
      renderCell: (params) => (
        <Box
          style={{
            backgroundColor:
              params.value === 0
                ? 'grey'
                : params.value === 1
                ? 'green'
                : params.value === -1
                ? 'red'
                : 'inherit',
            color: 'white',
            padding: '6px 12px',
            borderRadius: '4px',
          }}
        >
          {params.value === 0
            ? 'Initiated'
            : params.value === 1
            ? 'Approved'
            : params.value === -1
            ? 'Rejected'
            : 'Unknown'}
        </Box>
      ),
    },
  ];

  const customLocaleText = {
    noRowsLabel: 'You have not yet applied any internship reports yet',
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='tableMain'>
      <div className="datagrid">
        <DataGrid
          autoHeight
          rows={data}
          columns={columns}
          localeText={customLocaleText}
          getRowId={(row) => row.id}
          sx={{
            "--DataGrid-overlayHeight": "100px",
            "& .super-app-theme--header": {
              color: "var(--heading-crsExp)", // Change header text color
            },
            "& .MuiDataGrid-root": {
              width: "100%", // Ensure the DataGrid fills the container width
              height: "100%", // Ensure the DataGrid fills the container height
            },
            "& .MuiDataGrid-columnsContainer": {
              gap: "70px",
              margin: "10px", // Add gap between columns
            },
            "& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell": {
              padding: "5px", // Add padding to column headers and cells
            },
          }}
        />
      </div>
      {selectedRowData && (
        <InternBasicModal
        open={true} // Always keep the modal open when there's selectedRowData
        handleClose={() => setSelectedRowData(null)}
        rowData={selectedRowData}
        approvalMembers={approvalMembers}
      />
      )}
    </div>
  );
}

export default InternshipTable;