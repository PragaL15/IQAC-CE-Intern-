import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import { apiBaseUrl } from "../../../api/api";
<<<<<<< HEAD
import apiLoginHost from "../../login/LoginApi";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
=======
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
// import AddonTable from '../stuffs/AddonTable'; // Adjust the import path as needed
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
import "../styles/addonHome.css";
import Select from "react-select";
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AnnouncementIcon from "@mui/icons-material/Announcement";
<<<<<<< HEAD
import WarningIcon from "@mui/icons-material/Warning";
import { useNavigate } from "react-router-dom";
import StepperWithContent from "../stuffs/StepperWithContent";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
=======
import DescriptionIcon from "@mui/icons-material/Description";
import LoadingButton from "@mui/lab/LoadingButton";
import { Navigate, useNavigate } from "react-router-dom";
import StepperWithContent from "../stuffs/StepperWithContent";
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';


>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
<<<<<<< HEAD
  width: "75%",
  maxWidth: "300px",
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
  p: 4,
};

const style2 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  maxWidth: "390px",
=======
  width: "75%", // Adjusted width for larger screens
  maxWidth: "400px", // Maximum width for smaller screens
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
  p: 4,
};

const style3 = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
<<<<<<< HEAD
  width: "75%",
  maxWidth: "430px",
=======
  width: "75%", // Adjusted width for larger screens
  maxWidth: "430px", // Maximum width for smaller screens
  bgcolor: "background.paper",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
  borderRadius: "10px",
  p: 4,
};

const style1 = {
  position: "absolute",
  top: "5%",
  left: "50%",
  bottom: "90%",
  transform: "translate(-50%, -50%)",
  width: 280,
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
  bgcolor: "background.paper",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
  borderRadius: "10px",
  p: 4,
};

const AddOnHonorMinor = () => {
  const [data, setData] = useState([]);
  const [student, setStudent] = useState("7376222AD156");
<<<<<<< HEAD
  const [studentName, setStudentName] = useState("");
  const [registerNumber, setRegisterNumber] = useState("");
  const [department, setDepartment] = useState("");
=======
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
  const [selectedRowData, setSelectedRowData] = useState({});
  const [selectedApplyRow, setSelectedApplyRow] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [applyModal, setApplyModal] = useState(false);
  const [category, setCategory] = useState(1);
  const [electiveId, setElectiveId] = useState(null);
  const [electiveData, setElectiveData] = useState([]);
  const [courseCode, setCourseCode] = useState(null);
  const [courseName, setCourseName] = useState(null);
  const [modeOfExemption, setModeOfExemption] = useState(null);
  const [selectedSem, setSelectedSem] = useState(null);
  const [responseModalOpen, setResponseModalOpen] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [issuccess, setIsSuccess] = useState(null);
  const [membersData, setMembersData] = useState([]);
<<<<<<< HEAD
  const [revokeNotify, setRevokeNotify] = useState(null);
  const [selectedAcademicYear, SetSelectedAcademicYear] = useState(null);
  const [totalActive, setTotalActive] = useState(null);
  const [addonActive, setAddonActive] = useState(null);
  const [honorActive, setHonorActive] = useState(null);
  const [minorActive, setMinorActive] = useState(null);
  const [reasonModal, setReasonModal] = useState(false);
  const [selectedRowValidation, setSelectedRowValidation] = useState({});
  const [approvedAddon, setApprovedAddon] = useState(null);
  const [approvedHonor, setApprovedHonor] = useState(null);
  const [approvedMinor, setApprovedMinor] = useState(null);
  const navigate = useNavigate();

  // purposely declared inside funcntion as it uses issuccss state
  const style1 = {
    position: "absolute",
    top: "5%",
    left: "50%",
    bottom: "90%",
    transform: "translate(-50%, -50%)",
    width: 280,
    bgcolor: "background.paper",
    boxShadow: issuccess ? "green 0px 3px 2px" : "rgb(250, 41, 41) 0px 3px 2px",
    borderRadius: "10px",
    p: 4,
  };

  // Function to fetch the current user name , register number etc form logged in details
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${apiLoginHost}/api/user-data`, {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setStudentName(data.name);
          setRegisterNumber(data.register_number);
          setDepartment(data.department);
          // need to set the setStudent state ------ final setting process
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  // Validation function to enable the apply button based on active Applications
  const handleButtonValidation = (row) => {
    if (row.mode_of_exemption === 1) {
      //addons
      if (totalActive < 4 && addonActive < 4) {
        return false;
      } else {
        return true;
      }
    } else if (row.mode_of_exemption === 2) {
      //Honors
      if (totalActive < 4 && honorActive < 4) {
        return false;
      } else {
        return true;
      }
    } else if (row.mode_of_exemption === 3) {
      //Minors
      if (totalActive < 4 && minorActive < 2) {
        return false;
      } else {
        return true;
      }
    }
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

  // handling the reason for restrictions to apply...check on reason modal for details
  const handleReason = (row) => {
    setSelectedRowValidation(row);
    setReasonModal(true);
  };
=======
  const [revokeNotify,setRevokeNotify] = useState(null);
  const [selectedAcademicYear,SetSelectedAcademicYear] = useState(null)
  const [totalActive,setTotalActive] = useState(null)
  const [addonActive,setAddonActive] = useState(null)
  const [honorActive,setHonorActive] = useState(null);
  const [minorActive,setMinorActive] = useState(null)
  const [reasonModal,setReasonModal] = useState(false)
  const [selectedRowValidation,setSelectedRowValidation] = useState({})
  const [approvedAddon,setApprovedAddon] = useState(null)
  const [approvedHonor,setApprovedHonor] = useState(null)
  const [approvedMinor,setApprovedMinor] = useState(null)
  
  const navigate = useNavigate();

  const handleButtonValidation = (row) => {
    if(row.mode_of_exemption===1){ //addons
      if((totalActive<4)&&(addonActive<4)){
        return false
      }
      else{
        return true
      }
    }
    else if(row.mode_of_exemption===2){ //Honors
      if((totalActive<4)&&(honorActive<4)){
        return false
      }
      else{
        return true
      }
    }
    else if(row.mode_of_exemption===3){ //Minors
      if((totalActive<4)&&(minorActive<2)){
        return false
      }
      else{
        return true
      }
    }
  }

  const handleReason = (row) => {
    setSelectedRowValidation(row)
    setReasonModal(true)
  }
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98

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
      width: 140,
    },
    {
      field: "course_name",
      headerName: "Course Name",
      headerClassName: "super-app-theme--header",
      width: 250,
    },
    {
      field: "academic_year",
      headerName: "Academic Year",
      headerClassName: "super-app-theme--header",
      width: 250,
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
      field: "view",
      headerName: "View",
      headerClassName: "super-app-theme--header",
      width: 110,
      renderCell: (params) => (
        <Box
          style={{ cursor: "pointer" }}
          onClick={() => handleView(params.row)}
        >
          <RemoveRedEyeOutlinedIcon />
        </Box>
      ),
    },
    {
      field: "apply",
      headerName: "Application",
      headerClassName: "super-app-theme--header",
      width: 150,
      renderCell: (params) => (
        <Box style={{ cursor: "pointer" }}>
          {params.row.approval_status === undefined ? (
<<<<<<< HEAD
            <div style={{ display: "flex" }}>
              <button
                className={
                  handleButtonValidation(params.row)
                    ? "ApplyBtnDisabled"
                    : "ApplyBtn"
                }
                onClick={() => handleApply(params.row)}
                style={{ paddingLeft: "24px", paddingRight: "24px" }}
                disabled={handleButtonValidation(params.row)}
              >
                Apply
              </button>
              <div>
                {handleButtonValidation(params.row) === true ? (
                  <div
                    className="btnReason"
                    onClick={() => handleReason(params.row)}
                  >
                    <CircleNotificationsIcon />
                  </div>
                ) : null}
              </div>
            </div>
          ) : params.row.approval_status >= 0 &&
            params.row.approval_status < 3 ? (
=======
            <div style={{display:"flex"}}>
            <button
              className={(handleButtonValidation(params.row))?"ApplyBtnDisabled":"ApplyBtn"}
              onClick={() => handleApply(params.row)}
              style={{paddingLeft:"24px",paddingRight:"24px"}}
              disabled={handleButtonValidation(params.row)}
            >
              Apply
            </button>
            <div>
            { handleButtonValidation(params.row)=== true ? <div className='btnReason' onClick={() => handleReason(params.row)} ><CircleNotificationsIcon/></div> : null}
            </div>
            </div>
          ) : ((params.row.approval_status>=0) && (params.row.approval_status<3)) ? (
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
            <button className="ApplyBtn" style={{ backgroundColor: "gray" }}>
              Initiated
            </button>
          ) : params.row.approval_status === -1 ? (
            <button className="ApplyBtn" style={{ backgroundColor: "red" }}>
              Rejected
            </button>
          ) : params.row.approval_status === 3 ? (
            <button className="ApplyBtn" style={{ backgroundColor: "green" }}>
              Approved
            </button>
          ) : null}
        </Box>
      ),
    },
  ];

  const customLocaleText = {
    noRowsLabel: "No records to display.",
  };

<<<<<<< HEAD
  // fetching the completed and applied addons and assigning unique ids
  const fetchData = async (category) => {
    try {
      const response = await axios.get(
        `${apiBaseUrl}/api/ce/AddHm/CompletedAddonHonorMinor?category=${category}&student=${student}`,
        {
          withCredentials: true,
        }
      );
      const jsonData = response.data;
=======
  const fetchData = async (category) => {
    try {
      const response = await fetch(
        `${apiBaseUrl}/api/ce/AddHm/CompletedAddonHonorMinor?category=${category}&student=${student}`, {
          withCredentials: true
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
      // Ensure each row has a unique id
      const rowsWithId = jsonData.map((row, index) => ({
        ...row,
        id: index + 1, // Use existing id or generate one if not present
      }));
      setData(rowsWithId);
    } catch (error) {
<<<<<<< HEAD
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized, logging out:", error);
        handleLogout(); // Call logout function
      } else {
        console.error(
          "Error fetching Addon Honor Minor Completed And Apllied:",
          error
        );
      }
    }
  };

  // fetching all the necessary stuffs
=======
      console.error("Error fetching data:", error);
    }
  };

>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
  useEffect(() => {
    fetchData(category);
    const fetchElective = async () => {
      try {
        const type2 = await axios.get(
<<<<<<< HEAD
          `${apiBaseUrl}/api/ce/AvailableElectives`,
          {
            withCredentials: true,
          }
        );
        const response = await axios.get(
          `${apiBaseUrl}/api/ce/AddHm/AddonHmApprovalMembers`,
          {
            withCredentials: true,
=======
          `${apiBaseUrl}/api/ce/AvailableElectives`, {
            withCredentials: true
          }
        );
        const response = await axios.get(
          `${apiBaseUrl}/api/ce/oc/OneCreditApprovalMembers`, {
            withCredentials: true
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
          }
        );
        const jsonData = response.data;
        const members = jsonData.map((item) => item.members);
        members.push("Approved");
        setMembersData(members);
        setElectiveData(type2.data);
      } catch (error) {
<<<<<<< HEAD
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized, logging out:", error);
          handleLogout(); // Call logout function
        } else {
          onsole.error(
            "Error fetching in electives or ApprovalMembers:",
            error
          );
        }
      }
    };
    const fetchActiveApplications = async () => {
      try {
        const active = await axios.get(
          `${apiBaseUrl}/api/ce/oc/AllActiveApplications?student=${student}`,
          {
            withCredentials: true,
          }
        );
        const jsonData = active.data;
        setTotalActive(jsonData.total);
        setAddonActive(jsonData.addon);
        setHonorActive(jsonData.honor);
        setMinorActive(jsonData.minor);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized, logging out:", error);
          handleLogout(); // Call logout function
        } else {
          console.log("Error while fetching active applications", error);
        }
      }
    };
    const fetchApprovedStatus = async () => {
      try {
        const response = await axios.get(
          `${apiBaseUrl}/api/ce/oc/ApprovedStatusAll?student=${student}`,
          {
            withCredentials: true,
          }
        );
        const jsonData = response.data;
        setApprovedAddon(jsonData.approved_addon);
        setApprovedHonor(jsonData.approved_honor);
        setApprovedMinor(jsonData.approved_minor);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error("Unauthorized, logging out:", error);
          handleLogout(); // Call logout function
        } else {
          console.log("Error while fetching approved Students", error);
        }
      }
    };
=======
        onsole.error("Error fetching in electives:", error);
      }
    };
    const fetchActiveApplications = async () => {
      try{
        const active = await axios.get(
          `${apiBaseUrl}/api/ce/oc/AllActiveApplications?student=${student}`, {
            withCredentials: true
          }
        );
         const jsonData = active.data;     
         setTotalActive(jsonData.total);
         setAddonActive(jsonData.addon)
         setHonorActive(jsonData.honor)
         setMinorActive(jsonData.minor)
      }
      catch(error){
        console.log("Error while fetching active applications", error);
      }
    }
    const fetchApprovedStatus = async () => {
      try{ 
      const response = axios.get(
        `${apiBaseUrl}/api/ce/oc/ApprovedStatusAll?student=${student}`, {
          withCredentials: true
        }
      );
      const jsonData = response.data;
      setApprovedAddon(jsonData.approved_addon)
      setApprovedHonor(jsonData.approved_honor)
      setApprovedMinor(jsonData.approved_minor)
    }
    catch(error){
      console.log("Error while fetching approved Students", error);
    }
    }
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
    fetchElective();
    fetchActiveApplications();
    fetchApprovedStatus();
  }, []);

<<<<<<< HEAD
  // setting options for elective dropdown
=======
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
  const ElectiveList = electiveData.map((types) => ({
    value: types.id,
    label: types.elective,
  }));

<<<<<<< HEAD
  /// functions for viewing/closing modal, applyig, handling category and other stuffs

=======
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
  const handleView = (rowData) => {
    setSelectedRowData(rowData);
    setModalOpen(true);
  };

  const handleApply = (rowData) => {
    setSelectedApplyRow(rowData);
    setCourseCode(rowData.course_code);
    setCourseName(rowData.course_name);
    setSelectedSem(rowData.semester);
    setModeOfExemption(rowData.mode_of_exemption);
<<<<<<< HEAD
    SetSelectedAcademicYear(rowData.academic_year);
=======
    SetSelectedAcademicYear(rowData.academic_year)
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
    setApplyModal(true);
  };

  const handleCloseModal = () => {
    setSelectedRowData({});
    setModalOpen(false);
  };

  const handleCategory = (selectedOption) => {
    setCategory(selectedOption.value);
    fetchData(selectedOption.value);
  };

  const handleElective = (selectedOption) => {
    setElectiveId(selectedOption.value);
  };

<<<<<<< HEAD
  // for removing the default seperator in select component
  const customComponents = {
    IndicatorSeparator: () => null,
  };

  // custom styling for select
=======
  const customComponents = {
    IndicatorSeparator: () => null, // Optionally remove the separator
  };

>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
  const customStyles = {
    control: (base, state) => ({
      ...base,
      fontFamily: "sans-serif",
<<<<<<< HEAD
      backgroundColor: "var(--secondaryBlue)",
      marginRight: "20px",
      color: "white",
      borderRadius: "8px",
      border: "none",
=======
      backgroundColor: "#2B3674",
      marginRight: "20px",
      color: "white",
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
      boxShadow: state.isFocused ? "none" : base.boxShadow, // Remove the box shadow
      borderColor: state.isFocused ? "transparent" : base.borderColor, // Remove the blue border
      "&:hover": {
        borderColor: state.isFocused ? "transparent" : base.borderColor,
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: "white", // Change the text color here
    }),
  };

<<<<<<< HEAD
  // Main Function for applying
  const handleSubmit = async () => {
    const activeApplicationsResponse = await axios.get(
      `${apiBaseUrl}/api/ce/oc/AllActiveApplications?student=${student}`,
      {
        withCredentials: true,
      }
    );

    const { total, addon, honor, minor } = activeApplicationsResponse.data;
=======
  const handleSubmit = async () => {
    const activeApplicationsResponse = await axios.get(
      `${apiBaseUrl}/api/ce/oc/AllActiveApplications?student=${student}`, {
        withCredentials: true
      }
    );

    const { total,addon,honor,minor } = activeApplicationsResponse.data;
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98

    // Check if total applications are less than 4
    if (total >= 4) {
      alert("You have reached the maximum number of applications allowed.");
      return;
    }

    const checkMappingResponse = await axios.get(
<<<<<<< HEAD
      `${apiBaseUrl}/api/ce/AddHm/AddHmActiveCoursesForValidation?student=${student}&course_code=${courseCode}`,
      {
        withCredentials: true,
=======
      `${apiBaseUrl}/api/ce/AddHm/AddHmActiveCoursesForValidation?student=${student}&course_code=${courseCode}`, {
        withCredentials: true
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
      }
    );
    const { exists } = checkMappingResponse.data;

    if (exists) {
      alert(
        "The student is already registered for this course with an active status."
      );
      return;
    }

    try {
      if (!electiveId) {
        alert("Fill Out All The Fields..");
      } else {
        const response = await axios.post(
          `${apiBaseUrl}/api/ce/AddHm/ApplyAddonHonorMinor`,
          {
            courseCode,
            courseName,
            student,
            selectedSem,
            electiveId,
            modeOfExemption,
<<<<<<< HEAD
            selectedAcademicYear,
          },
          {
            withCredentials: true,
=======
            selectedAcademicYear
          }, {
            withCredentials: true
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
          }
        );
        console.log("Response:", response.data);
        if (response.status === 200) {
          console.log("Course applied Successfully");
          setResponseMessage("Course applied Successfully");
          setResponseModalOpen(true);
          setIsSuccess(true);
        }
      }
    } catch (error) {
<<<<<<< HEAD
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized, logging out:", error);
        handleLogout(); // Call logout function
      } else {
        console.log("Error in applying the Course ", error);
        const errorMsg = error.response
          ? error.response.data.msg
          : "Error in applying the Course";
        setResponseMessage(errorMsg);
        setResponseModalOpen(true);
        setIsSuccess(false);
      }
    }
  };

  //Navigation after Applying
=======
      console.log("Error in applying the Course ", error);
      const errorMsg = error.response
        ? error.response.data.msg
        : "Error in applying the Course";
      setResponseMessage(errorMsg);
      setResponseModalOpen(true);
      setIsSuccess(false);
    }
  };

>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
  const handleRespModalClose = () => {
    setResponseModalOpen(false);
    {
      issuccess
        ? navigate("/courseExcp")
        : navigate("/Add-On/Honors And Minors");
    }
  };

  return (
    <>
<<<<<<< HEAD
      <div className="tableDefault">
=======
      <div>
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
        <div className="titleBtn">
          <div className="titlehm">
            {category === 1 ? <h4>Add-On</h4> : <h4>Honors/Minors</h4>}
          </div>
          <div className="createDiv">
            <Select
              defaultValue={{
                value: category,
                label: "Add-On",
              }}
              styles={customStyles}
              onChange={handleCategory}
              options={[
                { value: 1, label: "Add-on" },
                { value: 2, label: "Honors/Minors" },
              ]}
              isSearchable={false}
              components={customComponents}
            />
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
<<<<<<< HEAD
=======
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 15,
                      },
                    },
                  }}
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
                  pageSizeOptions={[5]}
                  disableRowSelectionOnClick
                />
              </div>
            </div>
          </div>
        </div>
      </div>
<<<<<<< HEAD

      {/* Modal for Applying Addon Honor Minor */}
      <Modal open={applyModal} onClose={() => setApplyModal(false)}>
        <Box sx={style2}>
=======
      <Modal open={applyModal} onClose={() => setApplyModal(false)}>
        <Box sx={style}>
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
          <div className="modal">
            <div className="CourseTit">
              {category === 1 ? (
                <h4>Add-On</h4>
              ) : modeOfExemption === 2 ? (
                <h4>Honors</h4>
              ) : (
                <h4>Minors</h4>
              )}
            </div>
<<<<<<< HEAD
            <hr style={{ marginBottom: "10px" }} />
            <div className="quesField">
              <div className="inp">Elective</div>
              <Select
                className="textAddHmApply"
=======
            <div className="quesField">
              <div className="inp">Elective</div>
              <Select
                className="text"
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
                onChange={handleElective}
                options={ElectiveList}
                placeholder="Prefered Elective.."
              />
            </div>
            <button className="expCreateBtn" onClick={handleSubmit}>
              Apply
            </button>
          </div>
        </Box>
      </Modal>
<<<<<<< HEAD

      {/* Modal for Response*/}
=======
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
      <Modal
        open={responseModalOpen}
        onClose={handleRespModalClose}
        style={{ zIndex: 6000 }}
      >
        <Box sx={style1} className="success">
          <div>{responseMessage}</div>
          <div className="tick">
<<<<<<< HEAD
            {issuccess ? (
              <CheckCircleIcon style={{ color: "green" }} />
            ) : (
              <AnnouncementIcon style={{ color: "rgb(250, 41, 41)" }} />
            )}
          </div>
        </Box>
      </Modal>

      {/* Modal for displaying Addon Honor Minor */}
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box sx={style3}>
          <div className="modal">
            <div
              className="CourseTit"
              style={{ display: "flex", alignItems: "center" }}
            >
=======
            {issuccess ? <CheckCircleIcon /> : <AnnouncementIcon />}
          </div>
        </Box>
      </Modal>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box sx={style3}>
          <div className="modal">
            <div className="CourseTit" style={{display:"flex",alignItems:"center"}}>
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
              {category === 1 ? (
                <h4>Add-On</h4>
              ) : selectedRowData.mode_of_exemption === 2 ? (
                <h4>Honors</h4>
              ) : (
                <h4>Minors</h4>
<<<<<<< HEAD
              )}{" "}
              {selectedRowData.approval_status === -1 &&
                selectedRowData.status === "1" && (
                  <div
                    className="btnReason"
                    onClick={() => setRevokeNotify(true)}
                  >
                    <CircleNotificationsIcon />
                  </div>
                )}
            </div>
            <hr />
=======
              )} {((selectedRowData.approval_status===-1)&&(selectedRowData.status==="1")) &&<div className='btnReason' onClick={()=>setRevokeNotify(true)} ><CircleNotificationsIcon/></div>}
            </div>
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
            <div className="field">
              <div className="fldClm">Course Code</div>
              <div className="fldData"> {selectedRowData.course_code}</div>
            </div>
            <div className="field">
              <div className="fldClm">Course Name</div>
              <div className="fldData"> {selectedRowData.course_name}</div>
            </div>
            <div className="field">
              <div className="fldClm">Semester</div>
              <div className="fldData">
                {selectedRowData.semester}
                <sup>th</sup>
              </div>
            </div>
            <div className="field">
              <div className="fldClm">Academic Year</div>
              <div className="fldData"> {selectedRowData.academic_year}</div>
            </div>
            {selectedRowData.approval_status >= -1 && (
              <>
                <div className="field">
                  <div className="fldClm">Elective</div>
                  <div className="fldData">{selectedRowData.elective}</div>
                </div>
<<<<<<< HEAD
                {selectedRowData.approval_status === -1 && (
                  <>
                    <div className="field">
                      <div className="fldClm">Remarks</div>
                      <div className="fldData" style={{ color: "red" }}>
                        {selectedRowData.remarks}
                      </div>
                    </div>
                  </>
                )}
                <div style={{ marginTop: "10px" }}>
                  {" "}
                  <StepperWithContent
                    status={selectedRowData.approval_status}
                    data={membersData}
                    rejection={selectedRowData.rejected_by}
                  />
                </div>
=======
                {selectedRowData.approval_status===-1 && <>
                  <div className="field">
                  <div className="fldClm">Remarks</div>
                  <div className="fldData" style={{color:"red"}}>{selectedRowData.remarks}</div>
                </div>
                </>}
                <div style={{marginTop:"10px"}} > <StepperWithContent status={selectedRowData.approval_status} data={membersData} rejection={selectedRowData.rejected_by} /></div>
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
              </>
            )}
          </div>
        </Box>
      </Modal>
<<<<<<< HEAD

      {/* Modal for restriction reason Addon Honor Minor */}
      <Modal open={reasonModal} onClose={() => setReasonModal(false)}>
        <Box sx={style}>
          <div className="modal">
            {selectedRowValidation.mode_of_exemption === 1 &&
            totalActive === 4 &&
            approvedAddon === 4 ? (
              <div>
                You Have Completed Ur Exemption In Addon Courses{" "}
                <CheckCircleIcon style={{ color: "green" }} />
              </div>
            ) : selectedRowValidation.mode_of_exemption === 1 &&
              totalActive === 4 &&
              approvedAddon < 4 ? (
              <div className="restrictDiv">
                <div className="DelTit">
                  Warning{" "}
                  <WarningIcon
                    className="warningIcon"
                    style={{ color: "rgb(250, 41, 41)" }}
                  />
                </div>
                <hr style={{ marginBottom: "10px" }} />
                <div>
                  You have Sufficient Application Applied Wait For the Approval
                  Status of All other courses untill you can not Apply
                </div>
              </div>
            ) : null}
            {selectedRowValidation.mode_of_exemption === 2 &&
            totalActive === 4 &&
            approvedHonor === 4 ? (
              <div>
                You Have Completed Ur Exemption In Honor Courses{" "}
                <CheckCircleIcon style={{ color: "green" }} />
              </div>
            ) : selectedRowValidation.mode_of_exemption === 2 &&
              totalActive === 4 &&
              approvedHonor < 4 ? (
              <div className="restrictDiv">
                <div className="DelTit">
                  Warning{" "}
                  <WarningIcon
                    className="warningIcon"
                    style={{ color: "rgb(250, 41, 41)" }}
                  />
                </div>
                <hr style={{ marginBottom: "10px" }} />
                <div>
                  You have Sufficient Application Applied Wait For the Approval
                  Status of All other courses untill you can not Apply
                </div>
              </div>
            ) : null}
            {selectedRowValidation.mode_of_exemption === 3 &&
            totalActive === 4 &&
            approvedMinor === 2 ? (
              <div>
                You Have Completed Ur Exemption In Minor Courses{" "}
                <CheckCircleIcon style={{ color: "green" }} />
              </div>
            ) : selectedRowValidation.mode_of_exemption === 3 &&
              totalActive === 4 &&
              approvedMinor < 2 ? (
              <div className="restrictDiv">
                <div className="DelTit">
                  Warning{" "}
                  <WarningIcon
                    className="warningIcon"
                    style={{ color: "rgb(250, 41, 41)" }}
                  />
                </div>
                <hr style={{ marginBottom: "10px" }} />
                <div>
                  You have Sufficient Application Applied Wait For the Approval
                  Status of All other courses untill you can not Apply
                </div>
              </div>
            ) : null}
          </div>
        </Box>
      </Modal>

      {/* Modal for revoke Notification Addon Honor Minor */}
      <Modal open={revokeNotify} onClose={() => setRevokeNotify(false)}>
        <Box sx={style}>
          <div className="restrictDiv">
            <div className="DelTit">
              Alert{" "}
              <WarningIcon
                className="warningIcon"
                style={{ color: "rgb(250, 41, 41)" }}
              />
            </div>
            <hr style={{ marginBottom: "10px" }} />
            <div>
              Consult the Respective Faculty For Exact Reason And revoking
              Process
            </div>
          </div>
=======
      <Modal open={reasonModal} onClose={()=> setReasonModal(false)} >
      <Box sx={style} >
          <div className="modal">
            {((selectedRowValidation.mode_of_exemption===1)&&(totalActive===4)&&(approvedAddon===4))?<div>
              You Have Completed Ur Exemption In Addon Courses
            </div>:((selectedRowValidation.mode_of_exemption===1)&&(totalActive===4)&&(approvedAddon<4))?<div>
              You have Sufficient Application Applied Wait For the Approval Status of All other courses untill you couldn't Apply
            </div>:null}
            {((selectedRowValidation.mode_of_exemption===2)&&(totalActive===4)&&(approvedHonor===4))?<div>
              You Have Completed Ur Exemption In Honor Courses
            </div>:((selectedRowValidation.mode_of_exemption===2)&&(totalActive===4)&&(approvedHonor<4))?<div>
              You have Sufficient Application Applied Wait For the Approval Status of All other courses untill you couldn't Apply
            </div>:null}
            {((selectedRowValidation.mode_of_exemption===3)&&(totalActive===4)&&(approvedMinor===2))?<div>
              You Have Completed Ur Exemption In Minor Courses
            </div>:((selectedRowValidation.mode_of_exemption===3)&&(totalActive===4)&&(approvedMinor<2))?<div>
              You have Sufficient Application Applied Wait For the Approval Status of All other courses untill you couldn't Apply
            </div>:null}
          </div>
      </Box>
      </Modal>
      <Modal
      open={revokeNotify}
      onClose={()=>setRevokeNotify(false)}
      >
        <Box sx={style}>
              <div>Consult the Respective Faculty For Exact Reason And revoking Process</div>
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
        </Box>
      </Modal>
    </>
  );
};

export default AddOnHonorMinor;
