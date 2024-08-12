import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import { apiBaseUrl } from "../../../api/api";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
// import AddonTable from '../stuffs/AddonTable'; // Adjust the import path as needed
import "../styles/addonHome.css";
import Select from "react-select";
import axios from "axios";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import DescriptionIcon from "@mui/icons-material/Description";
import LoadingButton from "@mui/lab/LoadingButton";
import { Navigate, useNavigate } from "react-router-dom";
import StepperWithContent from "../stuffs/StepperWithContent";
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';



const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%", // Adjusted width for larger screens
  maxWidth: "400px", // Maximum width for smaller screens
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
  bgcolor: "background.paper",
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
  borderRadius: "10px",
  p: 4,
};

const AddOnHonorMinor = () => {
  const [data, setData] = useState([]);
  const [student, setStudent] = useState("7376222AD156");
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
      // Ensure each row has a unique id
      const rowsWithId = jsonData.map((row, index) => ({
        ...row,
        id: index + 1, // Use existing id or generate one if not present
      }));
      setData(rowsWithId);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(category);
    const fetchElective = async () => {
      try {
        const type2 = await axios.get(
          `${apiBaseUrl}/api/ce/AvailableElectives`, {
            withCredentials: true
          }
        );
        const response = await axios.get(
          `${apiBaseUrl}/api/ce/oc/OneCreditApprovalMembers`, {
            withCredentials: true
          }
        );
        const jsonData = response.data;
        const members = jsonData.map((item) => item.members);
        members.push("Approved");
        setMembersData(members);
        setElectiveData(type2.data);
      } catch (error) {
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
    fetchElective();
    fetchActiveApplications();
    fetchApprovedStatus();
  }, []);

  const ElectiveList = electiveData.map((types) => ({
    value: types.id,
    label: types.elective,
  }));

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
    SetSelectedAcademicYear(rowData.academic_year)
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

  const customComponents = {
    IndicatorSeparator: () => null, // Optionally remove the separator
  };

  const customStyles = {
    control: (base, state) => ({
      ...base,
      fontFamily: "sans-serif",
      backgroundColor: "#2B3674",
      marginRight: "20px",
      color: "white",
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

  const handleSubmit = async () => {
    const activeApplicationsResponse = await axios.get(
      `${apiBaseUrl}/api/ce/oc/AllActiveApplications?student=${student}`, {
        withCredentials: true
      }
    );

    const { total,addon,honor,minor } = activeApplicationsResponse.data;

    // Check if total applications are less than 4
    if (total >= 4) {
      alert("You have reached the maximum number of applications allowed.");
      return;
    }

    const checkMappingResponse = await axios.get(
      `${apiBaseUrl}/api/ce/AddHm/AddHmActiveCoursesForValidation?student=${student}&course_code=${courseCode}`, {
        withCredentials: true
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
            selectedAcademicYear
          }, {
            withCredentials: true
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
      console.log("Error in applying the Course ", error);
      const errorMsg = error.response
        ? error.response.data.msg
        : "Error in applying the Course";
      setResponseMessage(errorMsg);
      setResponseModalOpen(true);
      setIsSuccess(false);
    }
  };

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
      <div>
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
            </div>
          </div>
        </div>
      </div>
      <Modal open={applyModal} onClose={() => setApplyModal(false)}>
        <Box sx={style}>
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
            <div className="quesField">
              <div className="inp">Elective</div>
              <Select
                className="text"
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
      <Modal
        open={responseModalOpen}
        onClose={handleRespModalClose}
        style={{ zIndex: 6000 }}
      >
        <Box sx={style1} className="success">
          <div>{responseMessage}</div>
          <div className="tick">
            {issuccess ? <CheckCircleIcon /> : <AnnouncementIcon />}
          </div>
        </Box>
      </Modal>
      <Modal open={modalOpen} onClose={handleCloseModal}>
        <Box sx={style3}>
          <div className="modal">
            <div className="CourseTit" style={{display:"flex",alignItems:"center"}}>
              {category === 1 ? (
                <h4>Add-On</h4>
              ) : selectedRowData.mode_of_exemption === 2 ? (
                <h4>Honors</h4>
              ) : (
                <h4>Minors</h4>
              )} {((selectedRowData.approval_status===-1)&&(selectedRowData.status==="1")) &&<div className='btnReason' onClick={()=>setRevokeNotify(true)} ><CircleNotificationsIcon/></div>}
            </div>
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
                {selectedRowData.approval_status===-1 && <>
                  <div className="field">
                  <div className="fldClm">Remarks</div>
                  <div className="fldData" style={{color:"red"}}>{selectedRowData.remarks}</div>
                </div>
                </>}
                <div style={{marginTop:"10px"}} > <StepperWithContent status={selectedRowData.approval_status} data={membersData} rejection={selectedRowData.rejected_by} /></div>
              </>
            )}
          </div>
        </Box>
      </Modal>
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
        </Box>
      </Modal>
    </>
  );
};

export default AddOnHonorMinor;
