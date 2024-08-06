import React, {useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import { DataGrid} from '@mui/x-data-grid';
import "../styles/creditHome.css"
import { apiBaseUrl } from "../../../api/api";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import Modal from '@mui/material/Modal';
import { Button } from 'primereact/button';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import Select from 'react-select'
import StepperWithContent from '../stuffs/StepperWithContent';
import { useMediaQuery } from '@mui/material';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75%', // Adjusted width for larger screens
  maxWidth: '400px', // Maximum width for smaller screens
  bgcolor: 'background.paper',
  borderRadius:'10px',
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
  p: 4,
};

const style1 = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '65%', // Adjusted width for larger screens
  maxWidth: '400px', // Maximum width for smaller screens
  bgcolor: 'background.paper',
  borderRadius:'10px',
  boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
  p: 4,
};
const style2 = {
  position: 'absolute',
    top: '5%',
    left: '50%',
    bottom:'90%',
    transform: 'translate(-50%, -50%)',
    width: 280,
    bgcolor: 'background.paper',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px;',
    borderRadius:'10px',
    p: 4,
};

const CreditHome = () => {
  const navigate = useNavigate()
  const [student,setStudent] = useState("7376222AD156");
  const [email,setEmail] = useState("gauthamsrinivasan21@gmail.com");
  const [showModal, setShowModal] = useState(false);
  const [resModal,setResModal] = useState(false);
  const [applied,setApplied] = useState(false);
  const [clearStatus,setClearStatus] = useState(false);
  const [rejection,setRejection] = useState(false);
  const [remark,setRemark] = useState("");
  const [expModal,setExpModal] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [status,setStatus] = useState("");
  const [c1,setC1] = useState("");
  const [c2,setC2] = useState("");
  const [c3,setC3] = useState("");
  const [cls,setCls] = useState(0);
  const [expData,setExpData] = useState([]);
  const [data, setData] = useState([]);
  const [error, setError] = useState(0);
  const [reasonModal,setReasonModal] = useState(false)
  const [members,setMembers] = useState([])
  const [rejectionStatus,setRejectionStatus] = useState(null)
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [approvalStatus,setApprovalStatus] = useState(null)
  const [membersData,setMembersData] = useState([])
  const [electiveId, setElectiveId] = useState(null);
  const [electiveData, setElectiveData] = useState([]);
  const [electiveName,setElectiveName] = useState(null);
  const [nptelActive, setNptelActive] = useState(null);
  const [onecreditActive, setOneCreditActive] = useState(null);
  const [totalActive, setTotalActive] = useState(null);
  const [revokeNotify,setRevokeNotify] = useState(null);
  const [approvedNptel, setApprovedNptel] = useState(null);
  const isLargeScreen = useMediaQuery('(min-width: 1500px)');



    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`${apiBaseUrl}/api/ce/oc/OneCreditApprovalMembers`);
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            const jsonData = await response.json();
            const members = jsonData.map(item => item.members);
            members.push("Approved");
            setMembersData(members);
          } catch (error) {
            console.log("Error while fetching data", error);
          }
        };
        const fetchElective = async () => {
          try{
            const type2 = await axios.get(
              `${apiBaseUrl}/api/ce/AvailableElectives`
            );
            setElectiveData(type2.data)
          }
          catch(error){
            console.log("Error while fetching Electives", error);
          }
        }
        const fetchActiveApplications = async () => {
          try{
            const active = await axios.get(
              `${apiBaseUrl}/api/ce/oc/AllActiveApplications?student=${student}`
            );
             const jsonData = active.data;     
             setNptelActive(jsonData.nptel);
             setOneCreditActive(jsonData.oneCredit);
             setTotalActive(jsonData.total);
          }
          catch(error){
            console.log("Error while fetching active applications", error);
          }
        }
        fetchData();
        fetchElective();
        fetchActiveApplications();
      }, []);

      const columns = [
        { field: 'id', headerName:"Id",headerClassName: 'super-app-theme--header',width:100},
        { field: 'name', headerName: 'Course Name' ,headerClassName: 'super-app-theme--header',width:350},
        { field: 'course_code', headerName: 'Course Code' , headerClassName: 'super-app-theme--header',width:200 },
        { field: 'academic_year', headerName: 'Academic Year' , headerClassName: 'super-app-theme--header',width:200 },
        { field: 'semester', headerName: 'Semester', headerClassName: 'super-app-theme--header',width:200},
      ]
      const customLocaleText = {
        noRowsLabel: 'You have not yet completed any One credit', // Change this to your desired text
      };
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`${apiBaseUrl}/api/ce/oc/completedCourses?student_id=${student}`);
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            const jsonData = await response.json();

            const orderedData = jsonData.map((item, index) => ({
              ...item,
              id:(index + 1) ,
            }));

            setData(orderedData);
            // if(jsonData.length>=3){
            //   // sendReminderEmail();
            // }
          } catch (error) {
            console.log("Error while fetching data");
          }
        };
        fetchData();

      }, []); 

      useEffect(()=> {
        const fetchExp = async () => {
          try{
            const resp = await fetch(`${apiBaseUrl}/api/ce/oc/oneCreditExp?student_id=${student}`);
            const resp1 = await fetch(`${apiBaseUrl}/api/ce/oc/OneCreditApprovalMembers`);
            if(!resp.ok){
              throw new Error('Falied to fetch data');
            }
            if(!resp1.ok){
              throw new Error('error Fetchning the Approval Members of Onecredit')
            }
            const Data = await resp.json();
            const Data1 = await resp1.json();
            setExpData(Data);
            setMembers(Data1)
            if(Data.length!=0){
              setApplied(true);
            }
            setC1(Data[0].course_id_1_name);
            setC2(Data[0].course_id_2_name);
            setC3(Data[0].course_id_3_name);
            setElectiveName(Data[0].elective)
            setApprovalStatus(Data[0].approval_status)
            setRejectionStatus(Data[0].rejected_by)
            if(Data[0].approval_status===-1){
              setRejection(true)
              setRemark(Data[0].remarks)
            }
          } catch (error){
            console.log("Error");
          }
        }
        fetchExp();
      },[]);


      // const sendReminderEmail = async () => {
      //   try {
      //     const response = await fetch(`${apiBaseUrl}/api/ce/oc/sendReminderEmail`, {
      //       method: 'POST',
      //       headers: {
      //         'Content-Type': 'application/json'
      //       },
      //       body: JSON.stringify({ studentEmail: email, studentId: student }) // Send student ID and email
      //     });
      //     if (!response.ok) {
      //       throw new Error('Failed to send reminder email');
      //     }
      //     else{
      //     const responseData = await response.json();
      //     console.log(responseData.message); // Log the response message
      //     }
      //   } catch (error) {
      //     console.error('Error sending reminder email:', error);
      //   }
      // };

    const handleApply = async () => {
      try {
      const response = await fetch(`${apiBaseUrl}/api/ce/oc/StoringExcemption`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ studentId: student, selectedCourses: selectedCourses, electiveId: electiveId }),
      });
      if (!response.ok) {
        setShowModal(false)
        setResModal(true);
        setError(1)
        setResponseMessage("Failed to apply course exception")
        throw new Error('Failed to apply course exception');
      }
      else{
      setShowModal(false)
      setResModal(true);
      setResponseMessage("Course exception applied successfully")
      console.log('Course exception applied successfully');
      }
    } catch (error) {
      console.error('Error applying course exception:', error);
      setError(1)
      setResponseMessage("Failed to apply course exception")
    }
  };

  const oneCreditClearance = async () => {
    try {
      const response = await fetch(`${apiBaseUrl}/api/ce/oc/clearance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ studentId: student }) // Send student ID and email
      });
      if (!response.ok) {
        setExpModal(false)
        setResModal(true);
        setResponseMessage("Failed to Clear the courses")
        throw new Error('Failed to send reminder email');
      }
      else{
      const responseData = await response.json();
      setExpModal(false)
      setResModal(true);
      setResponseMessage("successfully Cleared the courses")
      }
    } catch (error) {
      console.error('Error sending reminder email:', error);
      setExpModal(false)
    }
  };

  const ElectiveList = electiveData.map((types) => ({
    value: types.id,
    label: types.elective,
  }));

      const namelist = data.map(name => ({
        value:name.course_code,
        label:name.name
      }))

      const handleSelectChange = (selectedOptions) => {
        const selectedLabels = selectedOptions.map(option => option.value);
        setSelectedCourses(selectedLabels);
      };

      const isOptionDisabled = (option) => {
        return selectedCourses.length >= 3 && !selectedCourses.find(course => course.value === option.value);
      };

      const handleResModalClose = () => {
        setResModal(false);
        navigate("/courseExcp")
      }

      const validateButton = () => {
        if((selectedCourses.length==3)&&(electiveId)){
          return true;
        }
        else{
          return false;
        }
      }

      const handleNotification = () => {
        setReasonModal(true)
      }

      const handleElective = (selectedOption) => {
        setElectiveId(selectedOption.value);
      };

  return (
    <div className='creditHomeMain' >
        <div className='titleBtn' >
        <div className="titlehm">
            <h4>Completed Courses</h4>
        </div>
        <div className='createDiv' >
            {applied?<button className='CourseBtnActive' onClick={() => setExpModal(true)}>View Applied Excemption</button>:
            <div className='expBtnsReasons'><div><button className={((data.length>=3)&&(totalActive<4))?"CourseBtnActive":"CourseBtn"} onClick={() => setShowModal(true)} disabled={((data.length>=3)&&(totalActive<4))?false:true} >Course Exception</button></div>
            {((data.length<3)||(totalActive>=4))? <div className='btnReason' onClick={handleNotification} ><CircleNotificationsIcon/></div>:""}</div>}
        </div>
        </div>
        <div className='hometable' >
        <div className="tableMain">
          <div className="datagrid">
            <DataGrid
              autoHeight
              rows={data}
              columns={columns}
              localeText={customLocaleText}
              sx={{
                width: "80%", // Set width to 80%
                overflowX: "auto",
                display:"flex",
                justifyContent:"space-between",
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
        </div>
        </div>
      <Modal open={showModal} onClose={() => setShowModal(false)}>
        <Box sx={style1}>
          <div>
            <div className="onecreditSelection">
              <div className="quesField">
              <div className="inp">Select Courses</div>
                <Select
                  className="oncreditField"
                  isMulti
                  options={namelist}
                  isSearchable
                  placeholder=""
                  onChange={handleSelectChange}
                  isOptionDisabled={isOptionDisabled} // Disable options when max selections reached
                />
              </div>
              <div className="quesField">
              <div className="inp">Elective</div>
              <Select
                className="oncreditField"
                onChange={handleElective}
                options={ElectiveList}
                placeholder=""
              />
            </div>
            </div>
            {/* <div className="onecreditSelection">
              <div className="inp">Prefered Elective</div>
              <div>
                <Select
                  className="oncreditField"
                  options={namelist}
                  isSearchable
                  placeholder=""
                  onChange={handleSelectChange}
                  isOptionDisabled={isOptionDisabled} // Disable options when max selections reached
                />
              </div>
            </div> */}
            <div className='modalbtns'>
              <div><button className='btncancel' onClick={()=> setShowModal(false)} >Cancel</button></div>
              {validateButton()?
              <div><button className='btnapply' onClick={handleApply} >Apply</button></div> : <div><button  className='CourseBtn' disabled={true}>Apply</button></div>}
            </div>
          </div>
        </Box>
      </Modal>
      <Modal open={expModal} onClose={() => setExpModal(false)}>
        <Box sx={style}>
              <div className='modal'>
              <div className="CourseTit" style={{display:"flex"}}>
                Courses Applied {rejection &&<div className='btnReason' onClick={()=>setRevokeNotify(true)} ><CircleNotificationsIcon/></div>}
              </div>
              <div className='oneCreditModal'>
                <div className='field'><div className='fldClm'>Course 1 </div> <div className='fldData'>{c1}</div></div>
                <div className='field'><div className='fldClm'>Course 2 </div> <div className='fldData'>{c2}</div></div>
                <div className='field'><div className='fldClm'>Course 3 </div> <div className='fldData'>{c3}</div></div>
                <div className='field'><div className='fldClm'>Elective</div> <div className='fldData'>{electiveName}</div></div>
                {rejection && <div className='field'><div className='fldClm'>Remarks </div><div className='fldData' style={{color:"red"}} >{remark}</div></div>}
              </div>
                <div style={{marginTop:"10px",display:"flex"}} > <StepperWithContent status={approvalStatus} data={membersData} rejection={rejectionStatus} /> </div>
                {/* <button className={cls===0?"Approval1Btn":cls===1?"Approval2Btn":cls===2?"Approval3Btn":cls===3?"btnApprove":"btnRemove"}>{cls===0||cls===1||cls===2?<div>Waiting For {status}</div>:<div>{status}</div>}</button> */}
              <div>
                {/* {rejection?<button className="btnApprove" onClick={oneCreditClearance} >Clear and Apply Again</button>:null} */}
              </div>
            
              </div>
        </Box>
      </Modal>
      <Modal open={resModal} onClose={handleResModalClose}>
      <Box sx={style2} className='success'>
          <div>
            {responseMessage}
          </div>
          <div className='tick'>
            {error?<AnnouncementIcon/>:<CheckCircleIcon/>}
          </div>
        </Box>
      </Modal>
      <Modal open={reasonModal} onClose={()=> setReasonModal(false)} >
      <Box sx={style} >
          <div>{ data.length < 3 && 
            <div style={{display:"flex",gap:"10px"}}><div><AnnouncementIcon/></div>Minimum 3 courses should be completed for applying course Exemption</div>} 
            {((totalActive==4)&&(onecreditActive<1))&&
            <div style={{display:"flex",gap:"10px"}}><div><AnnouncementIcon/></div>You have Sufficient Apllication Active so wait for the approval status</div>}
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
    </div>
  )
}

export default CreditHome