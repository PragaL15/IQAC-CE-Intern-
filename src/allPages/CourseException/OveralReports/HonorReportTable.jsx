import React, { useEffect, useState } from 'react'
import TextField from "@mui/material/TextField";
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Badge from '@mui/material/Badge';
import { apiBaseUrl } from "../../../api/api";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import axios from "axios";
import Select from "react-select";  

const style = {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'fixed',
    left: '50%',
    top: '50%',
    transform: "translate(-50%, -50%)",
    width: "70%", // Adjusted width for larger screens
    maxWidth: "420px", // Maximum width for smaller screens
    bgcolor: "background.paper",
    borderRadius: "10px",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
    p: 4,
  };

const HonorReportTable = () => {
  const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [data, setData] = useState([]);
    const [academicYearData, setAcademicYearData] = useState([]);
    const [selectedYears, setSelectedYears] = useState([]);
    const [branchData,setBranchData] = useState([])
    const [selectedDepartments,setSelectedDepartments] =  useState([])
    const [selectedSemester,setSelectedSemester] = useState([])
    const [electiveData,setElectiveData] = useState([])
    const [selectedElectives,setSelectedElectives] = useState([])
    const [filterApplied,setFilterApplied] = useState(false)

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
  
    const fetchAllDataOnline = async () => {
      try {
        const response = await axios.post(`${apiBaseUrl}/api/ce/FilterHonorReport`, {
          headers: {
            'Content-Type': 'application/json',
          },
        }, { withCredentials: true });
    
        const data = response.data;
        console.log('All Data:', data);
        setData(data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized, logging out:", error);
          handleLogout(); // Call logout function
        }
        else { 
        console.error('Error fetching all data:', error);
        }
      }
    }
    
    const fetchAcademicYear = async () => {
      const yearPromise = await axios.get(
        `${apiBaseUrl}/api/ce/AvailableAcademicYears`, { withCredentials: true }
      );
      setAcademicYearData(yearPromise.data);
    };
  
    const fetchBranches = async () => {
      const branchs = await axios.get(`${apiBaseUrl}/api/ce/AvailableBranches`, { withCredentials: true })
      setBranchData(branchs.data)
    }
  
    const fetchElectives = async () => {
      const electives = await axios.get(`${apiBaseUrl}/api/ce/TotalElectives`, { withCredentials: true })
      setElectiveData(electives.data)
    }
  
    useEffect(() => {
      // fetchData(name);
      fetchAcademicYear();
      fetchBranches()
      fetchElectives()
      fetchAllDataOnline()
    }, []);
  
    const branchList = branchData.map((branch) => ({
      value: branch.id,
      label: branch.branch,
    }));
  
    const handleFilterClick = () => {
      setModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setModalOpen(false)
      console.log(selectedYears);
      console.log(selectedDepartments);
      console.log(selectedSemester);
      console.log(selectedElectives);
    }
  
    const handleYearClick = (year) => {
      if (selectedYears.includes(year)) {
        setSelectedYears(selectedYears.filter((y) => y !== year));
      } else {
        setSelectedYears([...selectedYears, year]);
      }
    };
  
    const handleDepartmentChange = (selectedOptions) => {
      const selectedLabels = selectedOptions.map(option => option.value);
      setSelectedDepartments(selectedLabels);
    }
  
    const handleSemesterChange = (selectedOptions) => {
      const selectedLabels = selectedOptions.map(option => option.value);
      setSelectedSemester(selectedLabels)
    }
  
    const handleElectiveChange = (elective) => {
      if (selectedElectives.includes(elective)) {
        setSelectedElectives(selectedElectives.filter((y) => y !== elective));
      } else {
        setSelectedElectives([...selectedElectives, elective]);
      }
    }
  
    const SemesterList = [
      { value: 1, label: 'Sem 1' },
      { value: 2, label: 'Sem 2' },
      { value: 3, label: 'Sem 3' },
      { value: 4, label: 'Sem 4' },
      { value: 5, label: 'Sem 5' },
      { value: 6, label: 'Sem 6' },
    ];
  
    const handleClearAll = () => {
      setSelectedYears([]);
      setSelectedDepartments([]);
      setSelectedSemester([]);
      setSelectedElectives([]);
      setModalOpen(false)
      setFilterApplied(false)
  
      fetchAllDataOnline()
    };
  
    const handleApplyFilters = async () => {
    const filters = {
      years: selectedYears,
      departments: selectedDepartments,
      semesters: selectedSemester,
      electives: selectedElectives,
    };
  
    console.log('Applying Filters:', filters);
  
    try {
      const response = await axios.post(`${apiBaseUrl}/api/ce/FilterHonorReport`, filters, {
        headers: {
          'Content-Type': 'application/json',
        },
      }, { withCredentials: true });
      const data = response.data;
      console.log('Filtered Data:', data);
      setData(data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized, logging out:", error);
        handleLogout(); // Call logout function
      }
      else { 
      console.error('Error applying filters:', error);
      }
    }
    if((selectedDepartments.length!=0 )||(selectedElectives.length!=0)||(selectedSemester!=0)||(selectedYears!=0)){
      setFilterApplied(true)
    }
    handleCloseModal(); // Close the modal after applying filters
  };
  
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'data.xlsx');
  };
  
  const columns = [
      {
        field: "student_name",
        headerName: "Student",
        headerClassName: "super-app-theme--header",
      },
      {
        field: "register_number",
        headerName: "Register Number",
        headerClassName: "super-app-theme--header",
      },
      {
        field: "branch",
        headerName: "Department",
        headerClassName: "super-app-theme--header",
      },
      {
        field: "course_code",
        headerName: "Course Code",
        headerClassName: "super-app-theme--header",
        width: 150,
      },
      {
        field: "course_name",
        headerName: "Course Name",
        headerClassName: "super-app-theme--header",
        width:120
      },
      {
        field: "academic_year",
        headerName: "Academic Year",
        headerClassName: "super-app-theme--header",
        width:150
      },
      {
        field: "semester",
        headerName: "Semester",
        headerClassName: "super-app-theme--header",
        width: 100,
      },
      {
        field:"elective",
        headerName:"Elective",
        headerClassName: "super-app-theme--header",
        width: 120
      },
    ];
  
    const customLocaleText = {
      noRowsLabel: "No Courses Available",
    };
  
    return (
        <>
        <div className="TableTitleDiv">
            <div style={{display:"flex"}} >
            <div className="tableTitle">Honor Courses</div>
            <div className="filterDiv">
                <div className="iconRep" onClick={handleFilterClick}>
                {filterApplied ?
                <Badge  variant="dot" color="primary">
                  <FilterAltIcon className="iconfilterRep" />
                </Badge>
                : <FilterAltIcon className="iconfilterRep" />}  
                </div>
              </div>
            </div>
            <div className="multipleDiv">
              <button className="reportBtn" onClick={handleExport} >Export As Excel</button>
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
            <Modal open={modalOpen} onClose={handleCloseModal}>
            <Box sx={style}>
              <div className="modal">
                <div style={{ fontWeight: "bold" }}>Filters</div> 
              </div>
              <div className="FilterSection">
                <div className="inpFilter">Academic Year</div>
                <div className="selectBtnGroup">
                  {academicYearData.map(({ academic_year, id }) => (
                    <div key={id}>
                      <button
                        className={
                          selectedYears.includes(id)
                            ? "ActiveAcademic"
                            : "NonActiveAcademic"
                        }
                        onClick={() => handleYearClick(id)}
                      >
                        {academic_year}
                      </button>
                    </div>
                  ))}
                </div>
                <div className="inpFilter">Department</div>
                <Select
                      className="filterInp"
                      isMulti
                      options={branchList}
                      isSearchable
                      placeholder=""
                      onChange={handleDepartmentChange}
                      value={branchList.filter(branch => selectedDepartments.includes(branch.value))}
                    />
                <div className="inpFilter">Semester</div>
                <Select
                      className="filterInp"
                      isMulti
                      options={SemesterList}
                      isSearchable
                      placeholder=""
                      onChange={handleSemesterChange}
                      value={SemesterList.filter(branch => selectedSemester.includes(branch.value))}
                    />
              <div className="inpFilter">Electives</div>
              <div className="selectBtnGroup">
                  {electiveData.map(({ elective, id }) => (
                    <div key={id}>
                      <button
                        className={
                          selectedElectives.includes(id)
                            ? "ActiveAcademic"
                            : "NonActiveAcademic"
                        }
                        onClick={() => handleElectiveChange(id)}
                      >
                        {elective}
                      </button>
                    </div>
                  ))}
                </div>
                <div className="filterBtnsDiv">
                  <div><button className="btnRemove" onClick={handleClearAll}>Clear All</button></div>
                  <div><button className="btnApprove" onClick={handleApplyFilters}>Apply Filters</button></div>
                </div>
              </div>
            </Box>
          </Modal>
          </div>
          </>
      )
}

export default HonorReportTable
