import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import AddonTable from '../stuffs/AddonTable'; // Adjust the import path as needed
import '../styles/courseApproval.css';

const AddonHome = ({ register_number }) => {
  const [data, setData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const columns = [
    { field: "register_number", headerName: "Register Number", headerClassName: "super-app-theme--header", width: 150 },
    { field: "department", headerName: "Department", headerClassName: "super-app-theme--header", width: 150 },
    { field: "semester", headerName: "Semester", headerClassName: "super-app-theme--header", width: 100 },
    { field: "Mode_of_exce", headerName: "Mode of Exemption", headerClassName: "super-app-theme--header", width: 200 },
    { field: "course_code", headerName: "Course Code", headerClassName: "super-app-theme--header", width: 150 },
    { field: "course_name", headerName: "Course Name", headerClassName: "super-app-theme--header", width: 150 },
    { field: "elective_id", headerName: "Elective ID", headerClassName: "super-app-theme--header", width: 150 },
    { 
      field: "remark", 
      headerName: "Remark", 
      headerClassName: "super-app-theme--header", 
      width: 150,
      renderCell: (params) => params.row.approval_status === -1 ? params.value : '',
    },
    {
      field: "status",
      headerName: "Status",
      headerClassName: "super-app-theme--header",
      width: 100,
      renderCell: (params) => (
        params.row.approval_status === 1 ? (
          <button className="status-button approved">Approved</button>
        ) : params.row.approval_status === -1 ? (
          <button className="status-button rejected">Rejected</button>
        ) : (
          <button className="status-button pending">Pending</button>
        )
      ),
    },
    {
      field: "view",
      headerName: "View",
      headerClassName: "super-app-theme--header",
      width: 100,
      renderCell: (params) => (
        <Box
          style={{ cursor: "pointer" }}
          onClick={() => handleView(params.row)}
        >
          <RemoveRedEyeOutlinedIcon />
        </Box>
      ),
    },
  ];

  const customLocaleText = {
    noRowsLabel: "No records to display.",
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3000/allDetails?register_number=7376211CS108
`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      // Ensure each row has a unique id
      const rowsWithId = jsonData.map((row, index) => ({
        ...row,
        id: row.id || index // Use existing id or generate one if not present
      }));
      setData(rowsWithId);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [register_number]);

  const handleView = (rowData) => {
    setSelectedRowData(rowData);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedRowData(null);
    setModalOpen(false);
  };

  return (
    <>
      <div>
        <div className="titFac">
          <div className="ti">
            <h4 className='head'>Status Add-on</h4>
          </div>
        </div>
        <div>
          <div className='hometable'>
            <div className="tableMain">
              <div className="datagrid">
                <DataGrid
                  autoHeight
                  rows={data}
                  columns={columns}
                  localeText={customLocaleText}
                  sx={{
                    maxWidth: "100%",
                    overflowX: "auto",
                    "& .super-app-theme--header": {
                      color: "var(--heading-crsExp)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    },
                    "& .MuiDataGrid-columnsContainer": {
                      overflow: "visible",
                    },
                    "& .MuiDataGrid-colCell, .MuiDataGrid-cell": {
                      whiteSpace: "nowrap",
                    },
                  }}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 15,
                      },
                    },
                  }}
                  pageSizeOptions={[5]}
                  disableRowSelectionOnClick
                />
              </div>
              {selectedRowData && (
                <AddonTable
                  open={modalOpen}
                  handleClose={handleCloseModal}
                  rowData={selectedRowData}
                  fetchData={fetchData} // Pass the fetchData function as a prop
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddonHome;
