// InternshipRej.jsx
import React, { useEffect, useState } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import BasicModal from '../stuffs/BasicModal'; // Adjust the import path as needed
import '../styles/courseApproval.css';

const InternshipApp = () => {
  const [selectedOption, setSelectedOption] = useState("1");
  const [showDropdown, setShowDropdown] = useState(false);
  const [data, setData] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // State to manage modal open/close

  const handleFilterClick = () => {
    setShowDropdown(!showDropdown);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    fetchData(option);
    setShowDropdown(false);
  };

  const columns = [
    { field: "name", headerName: "Student Name", headerClassName: "super-app-theme--header", width: 150 },
    { field: "mode", headerName: "Mode", headerClassName: "super-app-theme--header", width: 100 },
    { field: "duration", headerName: "Duration", headerClassName: "super-app-theme--header", width: 100 },
    { field: "Industry", headerName: "Industry", headerClassName: "super-app-theme--header", width: 150 },
    { 
      field: "StartDate", 
      headerName: "Start Date", 
      headerClassName: "super-app-theme--header", 
      width: 150,
      valueGetter: (params) => formatDate(params.row.StartDate),
    },
    { 
      field: "EndDate", 
      headerName: "End Date", 
      headerClassName: "super-app-theme--header", 
      width: 150,
      valueGetter: (params) => formatDate(params.row.EndDate),
    },
    { 
      field: "certificateFilePath", 
      headerName: "Certificate", 
      headerClassName: "super-app-theme--header", 
      width: 150,
      renderCell: (params) => (
        params.value ? 
        <a href={`http://localhost:3000/images/${params.value}`} target="_blank" rel="noopener noreferrer">View Certificate</a> 
        : 'No Certificate'
      ),
    },
    { 
      field: "reportFilePath", 
      headerName: "Report", 
      headerClassName: "super-app-theme--header", 
      width: 150,
      renderCell: (params) => (
        params.value ? 
        <a href={`http://localhost:3000/images/${params.value}`} target="_blank" rel="noopener noreferrer">View Certificate</a> 
        : 'No Report'
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

  const fetchData = async (option) => {
    try {
      const response = await fetch(`http://localhost:3000/approvedApplications`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();
      // Ensure each row has a unique id
      const rowsWithId = jsonData.data.map((row, index) => ({
        ...row,
        id: row.id || index // Use existing id or generate one if not present
      }));
      setData(rowsWithId);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData(selectedOption);
  }, [selectedOption]);

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero indexed
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

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
            <h4>Approved Internship</h4>
          </div>
          <div style={{ margin: "20px", marginRight: "30px", marginBottom: "5px" }}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <h4 style={{ marginTop: "5px" }}>Filter</h4>
              <div className="icon" onClick={handleFilterClick}>
                <FilterAltIcon className="iconfilter" />
              </div>
            </div>
          </div>
        </div>
        <div className="drop">
          {showDropdown && (
            <div className="dropdown">
              <div className="op1" onClick={() => handleOptionSelect("0")}>
                <h5>Option 1</h5>
              </div>
              <div className="op2" onClick={() => handleOptionSelect("1")}>
                <h5>Option 2</h5>
              </div>
            </div>
          )}
        </div>
        <div>
          <div className="titl">
            <div>{selectedOption === "1" ? "Option 1" : "Option 2"}</div>
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
                  open={modalOpen}
                  handleClose={handleCloseModal}
                  rowData={selectedRowData}
                  fetchData={() => fetchData(selectedOption)} // Pass the fetchData function as a prop
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InternshipApp;
