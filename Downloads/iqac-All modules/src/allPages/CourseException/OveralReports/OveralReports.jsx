import React, { useEffect, useState } from "react";
import "../styles/overalReport.css";
import TextField from "@mui/material/TextField";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AccountCircle from "@mui/icons-material/AccountCircle";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import EditNoteIcon from "@mui/icons-material/EditNote";
import axios from "axios";
import Select from "react-select";

        

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%", // Adjusted width for larger screens
  maxWidth: "650px", // Maximum width for smaller screens
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
  p: 4,
};

const OveralReports = () => {
  const [name, setName] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [modeOfExemption,setModeOfExemption] = useState(["NPTEL"])

  const fetchData = async (name) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/ce/oc/SearchCourseList?name=${name}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    // fetchData(name);
  }, []);

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleFilterClick = () => {
    setModalOpen(true);
  };

  const handleModeOfexemption = (selectedOption) =>{
    const selectedLabels = selectedOption.map(option => option.value);
    setModeOfExemption(selectedLabels);
  }

  const columns = [
    {
      field: "id",
      headerName: "S.No",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "course_code",
      headerName: "Course Code",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "platform",
      headerName: "Platform",
      headerClassName: "super-app-theme--header",
    },
    {
      field: "name",
      headerName: "Course Name",
      headerClassName: "super-app-theme--header",
      width: 300,
    },
    {
      field: "student",
      headerName: "Student",
      headerClassName: "super-app-theme--header",
      width: 100,
    },
    {
      field: "elective",
      headerName: "Elective",
      headerClassName: "super-app-theme--header",
      width: 100,
    },
  ];

  const customLocaleText = {
    noRowsLabel: "No Courses Available",
  };

  return (
    <div>
      <div className="titleBtn">
        <div className="titlehm">
          <h4>Reports</h4>
        </div>
      </div>
      <div className="searchBarDivReport">
        <Select
          onChange={handleModeOfexemption}
          className="modeOption"
          options={[
            { value: "NPTEL", label: "NPTEL" },
            { value: "OneCredit", label:"OneCredit"},
            {value:"Internship" , label:"Internship"},
            {value:"Add-on",label:"Add-on"}
          ]}
          isSearchable={false}
          isMulti
        />
        
        <div className="searchAndFilter">
        <TextField
          className="ReportsSerach"
          variant="outlined"
          size="small"
          placeholder="Search"
          onChange={handleName}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        </div>
        <div className="filterDiv">
          <h4>Filter</h4>
          <div className="iconRep" onClick={handleFilterClick}>
            <FilterAltIcon className="iconfilterRep" />
          </div>
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
                initialState={{
                  pagination: {
                    paginationModel: {
                      pageSize: 5,
                    },
                  },
                }}
                pageSizeOptions={[5]}
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
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OveralReports;
