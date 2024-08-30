import React, { useEffect, useState } from "react";
import "../styles/onlineCourseList.css";
import TextField from "@mui/material/TextField";
import { DataGrid } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import Modal from "@mui/material/Modal";
import { apiBaseUrl } from "../../../api/api";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import axios from "axios";
import Select from "react-select";
import WarningIcon from "@mui/icons-material/Warning";
import { useMediaQuery } from "@mui/material";

// defined like this for giving responive design for higher screens especially for high range desktops
=======
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import AnnouncementIcon from "@mui/icons-material/Announcement";
import EditNoteIcon from "@mui/icons-material/EditNote";
import axios from "axios";
import Select from "react-select";
import { useMediaQuery } from '@mui/material';

>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
const getResponsiveStyle = (isLargeScreen) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
<<<<<<< HEAD
  width: "70%",
  maxWidth: isLargeScreen ? "750px" : "650px",
=======
  width:"70%",
  maxWidth: isLargeScreen ? "750px": "650px",
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  p: 4,
});
<<<<<<< HEAD

const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 220,
  bgcolor: "background.paper",
  boxShadow: "rgb(250, 41, 41) 0px 3px 2px;",
  borderRadius: "10px",
  p: 4,
};

const ListOfStudentsMappings = () => {
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState(null);
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [courseCode, setCourseCode] = useState(null);
  const [student, setStudent] = useState(null);
  const [modeOfExemption, setModeOfExemption] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [responseModalOpen, setResponseModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [issuccess, setIsSuccess] = useState(null);
  const [deletingRow, setDeletingRow] = useState(null);
  const isLargeScreen = useMediaQuery("(min-width: 1600px)");
  const style = getResponsiveStyle(isLargeScreen);

  // purposely declared inside funcntion as it uses issuccss state
=======
  
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
  const style1 = {
    position: "absolute",
    top: "5%",
    left: "50%",
    bottom: "90%",
    transform: "translate(-50%, -50%)",
    width: 280,
    bgcolor: "background.paper",
<<<<<<< HEAD
    boxShadow: issuccess ? "green 0px 3px 2px" : "rgb(250, 41, 41) 0px 3px 2px",
=======
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
    borderRadius: "10px",
    p: 4,
  };
  
  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 200,
    bgcolor: "background.paper",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
    borderRadius: "10px",
    p: 4,
  };

<<<<<<< HEAD
  // handling view function
  const handleView = (row) => {
    setSelectedRow(row);
  };

  // setting needed stuffs for deleting
  const handleDelete = (row) => {
    setDeletingRow(row);
    setSelectedCourseId(row.id);
    setCourseCode(row.course_code);
    setStudent(row.student);
    setModeOfExemption(row.mode_of_exemption);
  };

  // function for seraching the course with specific keywords
  const handleName = (event) => {
    setName(event.target.value);
    fetchData(event.target.value);
  };

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

  // Main Function to Delete a completion status
  const handleDeleteSubmit = async () => {
    try {
      const response = await axios.post(
        `${apiBaseUrl}/api/ce/AddHm/DeleteAddOnHonorMinor`,
        { courseCode, student, modeOfExemption },
        { withCredentials: true }
      );
      console.log("Response :", response.data);
      if (response.status === 200) {
        console.log("Course Deleted Successfully");
        setDeletingRow(false);
        fetchData(name);
        setResponseMessage("Course Deleted Successfully");
        setResponseModalOpen(true);
        setIsSuccess(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized, logging out:", error);
        handleLogout(); // Call logout function
      } else {
        console.log("Error in Deleting the Course ", error);
        const errorMsg = error.response
          ? error.response.data.msg
          : "Error in Deleting the Course";
        setResponseMessage(errorMsg);
        setDeletingRow(false);
        fetchData(name);
        setResponseModalOpen(true);
        setIsSuccess(false);
      }
    }
  };

  // Main function to Fecth the completion status of the students
  const fetchData = async (name) => {
    try {
      const response = await axios.get(
        `${apiBaseUrl}/api/ce/AddHm/ListOfStudentMappings?name=${name}`,
        { withCredentials: true }
      );
      const jsonData = response.data;
      const dataWithIds = jsonData.map((item, index) => ({
        id: index + 1,
        ...item,
      }));
      setData(dataWithIds);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized, logging out:", error);
        handleLogout(); // Call logout function
      } else {
        console.error("Error fetching data:", error);
      }
    }
  };
  useEffect(() => {
    fetchData(name);
  }, []);

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
      field: "course_name",
      headerName: "Course Name",
      headerClassName: "super-app-theme--header",
      width: 200,
    },
    {
      field: "student",
      headerName: "Student",
      headerClassName: "super-app-theme--header",
      width: 160,
    },
    {
      field: "academic_year",
      headerName: "Academic Year",
      headerClassName: "super-app-theme--header",
      width: 160,
    },
    {
      field: "semester",
      headerName: "Semester",
      headerClassName: "super-app-theme--header",
      width: 120,
      renderCell: (params) => (
        <Box>
          {params.value === 1
            ? "Semester 1"
            : params.value === 2
            ? "Semester 2"
            : params.value === 3
            ? "Semester 3"
            : params.value === 4
            ? "Semester 4"
            : params.value === 5
            ? "Semester 5"
            : params.value === 6
            ? "Semester 6"
            : params.value === 7
            ? "Semester 7"
            : "Semester 8"}
        </Box>
      ),
    },
    {
      field: "mode_of_exemption",
      headerName: "Mode Of Exemption",
      headerClassName: "super-app-theme--header",
      width: 120,
      renderCell: (params) => (
        <Box>
          {params.value === 2
            ? "Honors"
            : params.value === 3
            ? "Minors"
            : "Add-On"}
        </Box>
      ),
    },
    {
      field: "view",
      headerName: "View",
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Box
          sx={{ padding: "5px" }}
          style={{ cursor: "pointer" }}
          onClick={() => handleView(params.row)}
        >
          <RemoveRedEyeOutlinedIcon />
        </Box>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      headerClassName: "super-app-theme--header",
      renderCell: (params) => (
        <Box
          sx={{
            backgroundColor: "rgb(250, 41, 41)",
            color: "white",
            padding: "5px",
            borderRadius: "5px",
          }}
          style={{ cursor: "pointer" }}
          onClick={() => handleDelete(params.row)}
        >
          <DeleteIcon />
        </Box>
      ),
    },
  ];

  const customLocaleText = {
    noRowsLabel: "No Courses Available",
  };

  return (
    <div className="ListMain">
      <div className="titleBtn">
        <div className="titlehm">
          <h4>Add-On/Honors And Minors Completion Status</h4>
        </div>
      </div>
      <div className="searchBarDiv">
        <TextField
          className="textSearch"
          variant="outlined"
          size="small"
          placeholder="Search"
          onChange={handleName}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon style={{ color: "var(--secondaryBlue)" }} />
              </InputAdornment>
            ),
          }}
        />
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
            {/* View Modal */}
            {selectedRow && (
              <Modal open={true} onClose={() => setSelectedRow(false)}>
                <Box sx={style}>
                  <div className="edModal">
                    <div className="editTit">
                      {selectedRow.mode_of_exemption === 2
                        ? "Honors"
                        : selectedRow.mode_of_exemption === 3
                        ? "Minors"
                        : "Add-On"}
                    </div>
                    <hr
                      style={{
                        marginBottom: "20px",
                        marginLeft: "15px",
                        marginRight: "15px",
                      }}
                    />
                    <div className="editInpDiv">
                      <div>Course Code</div>
                      <div>
                        <TextField
                          className="editInp"
                          variant="outlined"
                          size="small"
                          disabled
                          defaultValue={selectedRow.course_code}
                        />
                      </div>
                    </div>
                    <div className="editInpDiv">
                      <div>Course Name</div>
                      <div>
                        <TextField
                          className="editInp"
                          variant="outlined"
                          size="small"
                          defaultValue={selectedRow.course_name}
                          disabled
                        />
                      </div>
                    </div>
                    <div className="editInpDiv">
                      <div>Register Number</div>
                      <div>
                        <Select
                          className="editInp"
                          placeholder=""
                          defaultValue={{
                            value: selectedRow.student,
                            label: selectedRow.student,
                          }}
                          isDisabled
                        ></Select>
                      </div>
                    </div>
                    <div className="editInpDiv">
                      <div>Academic Year</div>
                      <div>
                        <Select
                          className="editInp"
                          placeholder=""
                          defaultValue={{
                            value: selectedRow.academic_year,
                            label: selectedRow.academic_year,
                          }}
                          isDisabled
                        ></Select>
                      </div>
                    </div>
                    <div className="editInpDiv">
                      <div>Semester</div>
                      <div>
                        <Select
                          className="editInp"
                          defaultValue={{
                            value: selectedRow.semester,
                            label:
                              selectedRow.semester === 1
                                ? "Semester 1"
                                : selectedRow.semester === 2
                                ? "Semester 2"
                                : selectedRow.semester === 3
                                ? "Semester 3"
                                : selectedRow.semester === 4
                                ? "Semester 4"
                                : selectedRow.semester === 5
                                ? "Semester 5"
                                : selectedRow.semester === 6
                                ? "Semester 6"
                                : selectedRow.semester === 7
                                ? "Semester 7"
                                : "Semester 8",
                          }}
                          isDisabled
                        ></Select>
                      </div>
                    </div>
                    <div className="editBtns">
                      <button
                        className="editCancelBtn"
                        onClick={() => setSelectedRow(false)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </Box>
              </Modal>
            )}
            {/* confirmation modal for deleting a row */}
            {deletingRow && (
              <Modal open={true} onClose={() => setDeletingRow(false)}>
                <Box sx={style2}>
                  <div className="edModal">
                    <div className="DelTit">
                      Confirmation{" "}
                      <WarningIcon
                        className="warningIcon"
                        style={{ color: "rgb(250, 41, 41)" }}
                      />
                    </div>
                    <hr style={{ marginBottom: "10px" }} />
                    <div>Are you Sure want to delete?</div>
                    <div
                      style={{
                        display: "flex",
                        gap: "20px",
                        marginTop: "10px",
                      }}
                    >
                      <div>
                        <button
                          className="conformBtnDelete"
                          onClick={handleDeleteSubmit}
                        >
                          Delete
                        </button>
                      </div>
                      <div>
                        <button
                          className="conformBtnCancel"
                          onClick={() => setDeletingRow(false)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </Box>
              </Modal>
            )}
            {/* Response Modal gives info about the success or failure */}
            <Modal
              open={responseModalOpen}
              onClose={() => setResponseModalOpen(false)}
              style={{ zIndex: 6000 }}
            >
              <Box sx={style1} className="success">
                <div>{responseMessage}</div>
                <div>
                  {issuccess ? (
                    <CheckCircleIcon style={{ color: "green" }} />
                  ) : (
                    <AnnouncementIcon style={{ color: "rgb(250, 41, 41)" }} />
                  )}
                </div>
              </Box>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListOfStudentsMappings;
=======
const ListOfStudentsMappings = () => {
    const [selectedRow, setSelectedRow] = useState(null);
    const [data, setData] = useState([]);
    const [name, setName] = useState("");
    const [studentData, setStudentData] = useState([]);
    const [courseCode, setCourseCode] = useState(null);
    const [courseName, setCourseName] = useState(null);
    const [student,setStudent] = useState(null)
    const [semester,setSemester] = useState(null)
    const [modeOfExemption,setModeOfExemption] = useState(null)
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [responseModalOpen, setResponseModalOpen] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const [issuccess, setIsSuccess] = useState(null);
    const [deletingRow, setDeletingRow] = useState(null);
    const isLargeScreen = useMediaQuery('(min-width: 1600px)');
    const style = getResponsiveStyle(isLargeScreen);


    const handleEdit = (row) => {
        setSelectedRow(row);
        setCourseCode(row.course_code);
        setSelectedCourseId(row.id);
        setCourseName(row.name);
        setStudent(row.student)
        setSemester(row.semester)
        setModeOfExemption(row.mode_of_exemption)
      };
    
      const handleDelete = (row) => {
        setDeletingRow(row);
        setSelectedCourseId(row.id);
        setCourseCode(row.course_code);
        setStudent(row.student)
      };

      const handleCourseCode = (event) => {
        setCourseCode(event.target.value);
      };
    
      const handleCourseName = (event) => {
        setCourseName(event.target.value);
      };
    
      const handleStudent = (selectedOption) => {
        setStudent(selectedOption.value);
      };
    
      const handleSemester = (selectedOption) => {
          setSemester(selectedOption.value);
      };
    
      const handleName = (event) => {
        setName(event.target.value);
        fetchData(event.target.value);
      };

      const handleDeleteSubmit = async () => {
        try{
            const response = await axios.post(`${apiBaseUrl}/api/ce/AddHm/DeleteAddOnHonorMinor`,{courseCode,student,modeOfExemption}, { withCredentials: true })
            console.log("Response :",response.data);
            if(response.status===200){
                console.log("Course Deleted Successfully");
                setDeletingRow(false);
                fetchData(name)
                setResponseMessage("Course Deleted Successfully");
                setResponseModalOpen(true);
                setIsSuccess(true);
            }
        }
        catch(error){
            console.log("Error in Deleting the Course ", error);
            const errorMsg = error.response ? error.response.data.msg : "Error in Deleting the Course";
            setResponseMessage(errorMsg);
            setDeletingRow(false)
            fetchData(name);
            setResponseModalOpen(true);
            setIsSuccess(false);
        }
      }

      const fetchData = async (name) => {
        try {
          const response = await fetch(
            `${apiBaseUrl}/api/ce/AddHm/ListOfStudentMappings?name=${name}`, { withCredentials: true }
          );
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const jsonData = await response.json();
          const dataWithIds = jsonData.map((item, index) => ({ id: index + 1, ...item }));
          setData(dataWithIds);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      useEffect(() => {
        fetchData(name);
      }, []);

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
          field: "course_name",
          headerName: "Course Name",
          headerClassName: "super-app-theme--header",
          width: 200,
        },
        {
          field: "student",
          headerName: "Student",
          headerClassName: "super-app-theme--header",
          width: 160,
        },
        {
          field: "academic_year",
          headerName: "Academic Year",
          headerClassName: "super-app-theme--header",
          width: 160,
        },
        {
          field: "semester",
          headerName: "Semester",
          headerClassName: "super-app-theme--header",
          width: 120,
          renderCell: (params) => <Box>{params.value === 1 ? "Semester 1" : params.value === 2 ? "Semester 2":params.value === 3
          ?"Semester 3":params.value === 4?"Semester 4":params.value === 5?"Semester 5":params.value === 6?"Semester 6":
          params.value === 7?"Semester 7":"Semester 8"}</Box>,
        },
        {
            field: "mode_of_exemption",
            headerName: "Mode Of Exemption",
            headerClassName: "super-app-theme--header",
            width: 120,
            renderCell: (params) => <Box>{params.value === 2 ? "Honors" : params.value === 3 ? "Minors" : "Add-On"}</Box>,
          },
        {
          field: "view",
          headerName: "View",
          headerClassName: "super-app-theme--header",
          renderCell: (params) => (
            <Box
            sx={{border:"1px solid",borderColor:"black",padding:"5px",borderRadius:"5px"}}
              style={{ cursor: "pointer", }}
              onClick={() => handleEdit(params.row)}
            >
              <RemoveRedEyeOutlinedIcon />
            </Box>
          ),
        },
        {
          field: "delete",
          headerName: "Delete",
          headerClassName: "super-app-theme--header",
          renderCell: (params) => (
            <Box
              sx={{backgroundColor:"rgb(250, 41, 41)",color:"white",padding:"5px",borderRadius:"5px"}}
              style={{ cursor: "pointer" }}
              onClick={() => handleDelete(params.row)}
            >
              <DeleteIcon />
            </Box>
          ),
        },
      ];
    
      const customLocaleText = {
        noRowsLabel: "No Courses Available",
      };

  return (
    <div>
    <div className="titleBtn">
      <div className="titlehm">
        <h4>Add-On/Honors And Minors Student Completion</h4>
      </div>
    </div>
    <div className="searchBarDiv">
      <TextField
        className="textSearch"
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
                maxWidth: '100%', // Set width to 80%
                overflowX: 'auto', // Enable horizontal scrolling
                '& .super-app-theme--header': {
                  color: 'var(--heading-crsExp)',
                  justifyContent: 'center',
                },
                '& .MuiDataGrid-columnsContainer': {
                  overflow: 'visible', // Allow column headers to overflow for scrolling
                },
                '& .MuiDataGrid-colCell, .MuiDataGrid-cell': {
                  whiteSpace: 'nowrap', // Prevent wrapping of cell content
                },
              }}
            />
          </div>
          {selectedRow && (
            <Modal open={true} onClose={() => setSelectedRow(false)}>
              <Box sx={style}>
                <div className="edModal">
                  <div className="editTit">{selectedRow.mode_of_exemption===2?"Honors":selectedRow.mode_of_exemption===3?"Minors":"Add-On"}</div>
                  <div className="editInpDiv">
                    <div>Course Code</div>
                    <div>
                      <TextField
                        className="editInp"
                        variant="outlined"
                        size="small"
                        disabled
                        value={courseCode}
                        defaultValue={selectedRow.course_code}
                        onChange={handleCourseCode}
                      />
                    </div>
                  </div>
                  <div className="editInpDiv">
                    <div>Course Name</div>
                    <div>
                      <TextField
                        className="editInp"
                        variant="outlined"
                        size="small"
                        value={courseName}
                        defaultValue={selectedRow.course_name}
                        onChange={handleCourseName}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="editInpDiv">
                    <div>Student RollNumber</div>
                    <div>
                      <Select
                        className="editInp"
                        placeholder=""
                        defaultValue={{
                            value:selectedRow.student,
                            label:selectedRow.student}}
                        onChange={handleStudent}
                        isDisabled
                      ></Select>
                    </div>
                  </div>
                  <div className="editInpDiv">
                        <div>Academic Year</div>
                        <div>
                          <Select
                            className="editInp"
                            placeholder=""
                            defaultValue={{
                                value:selectedRow.academic_year,
                                label:selectedRow.academic_year}}
                            isDisabled
                          ></Select>
                        </div>
                      </div>
                  <div className="editInpDiv">
                    <div>Semester</div>
                    <div>
                      <Select
                        className="editInp"
                        options={[
                            { value: 1, label: "Semester 1" },
                            { value: 2, label: "Semester 2" },
                            { value: 3, label: "Semester 3" },
                            { value: 4, label: "Semester 4" },
                            { value: 5, label: "Semester 5" },
                            { value: 6, label: "Semester 6" },
                            { value: 7, label: "Semester 7" },
                            { value: 8, label: "Semester 8" },
                          ]}
                        placeholder=""
                        defaultValue={{
                          value: selectedRow.semester,
                          label:
                          selectedRow.semester === 1 ? "Semester 1" : selectedRow.semester === 2 ? "Semester 2":selectedRow.semester === 3
                          ?"Semester 3":selectedRow.semester === 4?"Semester 4":selectedRow.semester === 5?"Semester 5":selectedRow.semester === 6?"Semester 6":
                          selectedRow.semester === 7?"Semester 7":"Semester 8",
                        }}
                        onChange={handleSemester}
                        isDisabled
                      ></Select>
                    </div>
                  </div>
                  <div className="editBtns">
                    <button
                      className="editCancelBtn"
                      onClick={() => setSelectedRow(false)}
                    >
                      close
                    </button>
                  </div>
                </div>
              </Box>
           
            </Modal>
          )}
          {deletingRow && (
            <Modal open={true} onClose={() => setDeletingRow(false)}>
              <Box sx={style2}>
                <div className="edModal">
                  <div className="DelTit">Delete Course</div>
                  <div>Are you Sure want to delete?</div>
                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      marginTop: "10px",
                    }}
                  >
                    <div>
                      <button
                        className="conformBtnApprove"
                        onClick={handleDeleteSubmit}
                      >
                        Yes
                      </button>
                    </div>
                    <div>
                      <button
                        className="conformBtnRemove"
                        onClick={() => setDeletingRow(false)}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </Box>
            </Modal>
          )}
          <Modal
            open={responseModalOpen}
            onClose={() => setResponseModalOpen(false)}
            style={{ zIndex: 6000 }}
          >
            <Box sx={style1} className="success">
              <div>{responseMessage}</div>
              <div className="tick">
                {issuccess ? <CheckCircleIcon /> : <AnnouncementIcon />}
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  </div>
  )
}

export default ListOfStudentsMappings
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
