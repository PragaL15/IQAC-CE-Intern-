// // import React, { useState } from 'react'; // Import useState
// // import './verticalNavbar.css';
// // import { Link } from 'react-router-dom';
// // import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
// // import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// // import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
// // import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';

// // function VerticalNavbar({ onClose }) {
// //     const [activeLink, setActiveLink] = useState(null);
// //     const [divOpen,setDivOpen] = useState(false);
// //     const [creditOpen,setCreditOpen] = useState(false)
// //     const [addOnOpen,setAddOnOpen] = useState(false)
// //     const [internOpen,setInternOpen] = useState(false)
// //     const handleLinkClick = (pathname) => {
// //         onClose();
// //         setActiveLink(pathname);
// //     };
// //     const handleOpen = () => {
// //         setDivOpen(!divOpen);
// //     }
// //     const handleOneCreditOpen = () => {
// //         setCreditOpen(!creditOpen)
// //     }
// //     const handleAddOnOpenOpen = () => {
// //         setAddOnOpen(!addOnOpen)
// //     }
// //     const handleInternOpen = () => {
// //         setInternOpen(!internOpen)
// //     }

// //     return (
// //         <div className='total-v-navbar'>
// //             <div className={`menu-item ${activeLink === '/dashboard' ? 'active' : ''}`} onClick={() => handleLinkClick('/dashboard')}>
// //                 <Link to="/dashboard" className="link-style"><DashboardRoundedIcon className='nav-icons' />Dashboard</Link>
// //             </div>
// //             <div className='groups'>-- Course Exemption --</div>
// //             <div className={`menu-item ${activeLink === '/courseExcp' ? 'active' : ''}`} onClick={() => handleLinkClick('/courseExcp')}>
// //                 <Link to="/courseExcp" className="link-style"><DashboardRoundedIcon className='nav-icons' />Course Exemption</Link>
// //             </div>
// //             <div className={`menu-item ${activeLink === '' ? 'active' : ''}`} onClick={() => handleOpen( )}>
// //                 <Link className="link-style"><DashboardRoundedIcon className='nav-icons' />OnlineCourse{divOpen?<KeyboardArrowUpIcon />:<KeyboardArrowDownIcon/>} </Link>
// //             </div>
// //             {divOpen && 
// //             <div className='options'>
// //             <div className={`menu-items ${activeLink === '/courseApproval' ? 'active' : ''}`} onClick={() => handleLinkClick('/courseApproval')}>
// //                 <Link to="/courseApproval" className="link-style"><DashboardRoundedIcon className='nav-icons' />Pending Courses</Link>
// //             </div>
// //             <div className={`menu-items ${activeLink === '/OnlineReports' ? 'active' : ''}`} onClick={() => handleLinkClick('/OnlineReports')}>
// //                 <Link to="/OnlineReports" className="link-style"><DashboardRoundedIcon className='nav-icons' />ApprovedCourses</Link>
// //             </div>
// //             <div className={`menu-items ${activeLink === '/OnlineRejected' ? 'active' : ''}`} onClick={() => handleLinkClick('/OnlineRejected')}>
// //                 <Link to="/OnlineRejected" className="link-style"><DashboardRoundedIcon className='nav-icons' />Rejected Courses</Link>
// //             </div>
// //             <div className={`menu-items ${activeLink === '/OnlineUpload' ? 'active' : ''}`} onClick={() => handleLinkClick('/OnlineUpload')}>
// //                 <Link to="/OnlineUpload" className="link-style"><DashboardRoundedIcon className='nav-icons' />Online Upload</Link>
// //             </div>
// //             <div className={`menu-items ${activeLink === '/OnlineCourseList' ? 'active' : ''}`} onClick={() => handleLinkClick('/OnlineCourseList')}>
// //                 <Link to="/OnlineCourseList" className="link-style"><DashboardRoundedIcon className='nav-icons' />List Of Courses</Link>
// //             </div>
// //             </div> }
// //             <div className={`menu-item ${activeLink === '' ? 'active' : ''}`} onClick={() => handleOneCreditOpen( )}>
// //                 <Link className="link-style"><DashboardRoundedIcon className='nav-icons' />OneCredit{creditOpen?<KeyboardArrowUpIcon />:<KeyboardArrowDownIcon/>} </Link>
// //             </div>
// //             {creditOpen&&
// //             <div className='options'>
// //                 <div className={`menu-items ${activeLink === '/OneCreditUpload' ? 'active' : ''}`} onClick={() => handleLinkClick('/OneCreditUpload')}>
// //                 <Link to="/OneCreditUpload" className="link-style"><DashboardRoundedIcon className='nav-icons' />One Credit Upload</Link>
// //                 </div>
// //                 <div className={`menu-items ${activeLink === '/OneCreditMappings' ? 'active' : ''}`} onClick={() => handleLinkClick('/OneCreditMappings')}>
// //                 <Link to="/OneCreditMappings" className="link-style"><DashboardRoundedIcon className='nav-icons' />One Credit Courses/students</Link>
// //                 </div>
// //             </div>
// //             }
// //             <div className={`menu-item ${activeLink === '' ? 'active' : ''}`} onClick={() => handleAddOnOpenOpen( )}>
// //                 <Link className="link-style"><DashboardRoundedIcon className='nav-icons' />Add-On/Honor Minor{addOnOpen?<KeyboardArrowUpIcon />:<KeyboardArrowDownIcon/>} </Link>
// //             </div>
// //             {addOnOpen && 
// //             <div className='options' >
// //                 <div className={`menu-items ${activeLink === '/AddOnUpload' ? 'active' : ''}`} onClick={() => handleLinkClick('/AddOnUpload')}>
// //                 <Link to="/AddOnUpload" className="link-style"><DashboardRoundedIcon className='nav-icons' />Add-On Upload</Link>
// //                 </div>
// //                 <div className={`menu-items ${activeLink === '/HonorMinorUpload' ? 'active' : ''}`} onClick={() => handleLinkClick('/HonorMinorUpload')}>
// //                 <Link to="/HonorMinorUpload" className="link-style"><DashboardRoundedIcon className='nav-icons' />Honor Minor Upload</Link>
// //                 </div>
// //                 <div className={`menu-items ${activeLink === '/ListOfStudentsMappings' ? 'active' : ''}`} onClick={() => handleLinkClick('/ListOfStudentsMappings')}>
// //                 <Link to="/ListOfStudentsMappings" className="link-style"><DashboardRoundedIcon className='nav-icons' />List Of Student Mappings</Link>
// //                 </div>
// //             </div>
// //             }
// //             <div className={`menu-item ${activeLink === '' ? 'active' : ''}`} onClick={() => handleInternOpen( )}>
// //                 <Link className="link-style"><DashboardRoundedIcon className='nav-icons' />InternShips{internOpen?<KeyboardArrowUpIcon />:<KeyboardArrowDownIcon/>} </Link>
// //             </div>
// //             {internOpen &&
// //             <div className='options'>
// //                 <div className={`menu-items ${activeLink === '/InternUpload' ? 'active' : ''}`} onClick={() => handleLinkClick('/InternUpload')}>
// //                 <Link to="/InternUpload" className="link-style"><DashboardRoundedIcon className='nav-icons' />InternShip Upload</Link>
// //                 </div>
// //             </div>
// //             }
// //             <div className={`menu-item ${activeLink === '/OveralReports' ? 'active' : ''}`} onClick={() => handleLinkClick('/OveralReports')}>
// //                 <Link to="/OveralReports" className="link-style"><DashboardRoundedIcon className='nav-icons' />Overal Reports</Link>
// //             </div>
// //         </div>
// //     );
// // }

// // export default VerticalNavbar;



// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import './verticalNavbar.css';

// const VerticalNavbar = () => {
//   const [resources, setResources] = useState([]);

//   useEffect(() => {
//     const fetchResources = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/roles-resources', {
//           withCredentials: true, // Important to send cookies
//         });
//         setResources(response.data || []); // Ensure resources is always an array
//       } catch (error) {
//         console.error('Error fetching resources:', error);
//       }
//     };

//     fetchResources();
//   }, []);

//   return (
//     <nav className="vertical-navbar">
//       <ul>
//         {resources.length > 0 ? (
//           resources.map((resource) => (
//             <li key={resource.path}>
//               <Link to={resource.path}>{resource.resource_name}</Link>
//             </li>
//           ))
//         ) : (
//           <li>No resources available</li>
//         )}
//       </ul>
//     </nav>
//   );
// };

// export default VerticalNavbar;





import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './verticalNavbar.css';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const VerticalNavbar = ({ onClose }) => {
  const [resources, setResources] = useState([]);
  const [activeLink, setActiveLink] = useState(null);
  const [divOpen, setDivOpen] = useState(false);
  const [creditOpen, setCreditOpen] = useState(false);
  const [addOnOpen, setAddOnOpen] = useState(false);
  const [internOpen, setInternOpen] = useState(false);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/roles-resources', {
          withCredentials: true, // Important to send cookies
        });
        setResources(response.data || []); // Ensure resources is always an array
        console.log('Resources fetched:', response.data); // Debugging line to see the fetched resources
      } catch (error) {
        console.error('Error fetching resources:', error);
      }
    };

    fetchResources();
  }, []);

  const handleLinkClick = (pathname) => {
    onClose();
    setActiveLink(pathname);
  };

  const handleOpen = () => setDivOpen(!divOpen);
  const handleCreditOpen = () => setCreditOpen(!creditOpen);
  const handleAddOnOpen = () => setAddOnOpen(!addOnOpen);
  const handleInternOpen = () => setInternOpen(!internOpen);

  // Define paths for each category
  const onlineCoursePaths = [
    '/courseApproval', '/OnlineReports', '/OnlineRejected', '/OnlineUpload', '/OnlineCourseList'
  ];
  const oneCreditPaths = [
    '/OneCreditPending', '/OneCreditApproved', '/OneCreditRejected', '/OneCreditUpload', '/OneCreditMappings'
  ];
  const addOnPaths = [
    '/AddonPending', '/AddonApproved', '/AddonRejected', '/AddOnUpload', '/HonorMinorUpload', '/ListOfStudentsMappings'
  ];
  const internshipPaths = [
    '/InternPending', '/InternApproved', '/InternRejected', '/InternUpload', '/InternCompanyList'
  ];

  // Helper function to check if any resource path is accessible
  const hasAccess = (paths) => resources.some(resource => paths.includes(resource.path));

  return (
    <nav className="vertical-navbar">
      <ul>
        <li className={`menu-items ${activeLink === '/dashboard' ? 'active' : ''}`} onClick={() => handleLinkClick('/dashboard')}>
          <Link to="/dashboard" className="link-style">
            <DashboardRoundedIcon className='nav-icons' />
            Dashboard
          </Link>
        </li>
        {hasAccess(['/courseExcp']) && (
          <li className={`menu-items ${activeLink === '/courseExcp' ? 'active' : ''}`} onClick={() => handleLinkClick('/courseExcp')}>
            <Link to="/courseExcp" className="link-style">
              <DashboardRoundedIcon className='nav-icons' />
              Course Exemption
            </Link>
          </li>
        )}
       
        {hasAccess(onlineCoursePaths) && (
          <>
            <li className={`menu-item ${divOpen ? 'active' : ''}`} onClick={handleOpen}>
              <Link className="link-style">
                <DashboardRoundedIcon className='nav-icons' />
                Online Course {divOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </Link>
            </li>
            {divOpen && (
              <div className='options'>
                {onlineCoursePaths.map(path => {
                  const resource = resources.find(resource => resource.path === path);
                  return resource && (
                    <div key={resource.path} className={`menu-items ${activeLink === resource.path ? 'active' : ''}`} onClick={() => handleLinkClick(resource.path)}>
                      <Link to={resource.path} className="link-style">
                        <DashboardRoundedIcon className='nav-icons' />
                        {resource.resource_name}
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
        {hasAccess(oneCreditPaths) && (
          <>
            <li className={`menu-item ${creditOpen ? 'active' : ''}`} onClick={handleCreditOpen}>
              <Link className="link-style">
                <DashboardRoundedIcon className='nav-icons' />
                One Credit {creditOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </Link>
            </li>
            {creditOpen && (
              <div className='options'>
                {oneCreditPaths.map(path => {
                  const resource = resources.find(resource => resource.path === path);
                  return resource && (
                    <div key={resource.path} className={`menu-items ${activeLink === resource.path ? 'active' : ''}`} onClick={() => handleLinkClick(resource.path)}>
                      <Link to={resource.path} className="link-style">
                        <DashboardRoundedIcon className='nav-icons' />
                        {resource.resource_name}
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
        {hasAccess(addOnPaths) && (
          <>
            <li className={`menu-item ${addOnOpen ? 'active' : ''}`} onClick={handleAddOnOpen}>
              <Link className="link-style">
                <DashboardRoundedIcon className='nav-icons' />
                Add-On/Honor Minor {addOnOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </Link>
            </li>
            {addOnOpen && (
              <div className='options'>
                {addOnPaths.map(path => {
                  const resource = resources.find(resource => resource.path === path);
                  return resource && (
                    <div key={resource.path} className={`menu-items ${activeLink === resource.path ? 'active' : ''}`} onClick={() => handleLinkClick(resource.path)}>
                      <Link to={resource.path} className="link-style">
                        <DashboardRoundedIcon className='nav-icons' />
                        {resource.resource_name}
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
        {hasAccess(internshipPaths) && (
          <>
            <li className={`menu-item ${internOpen ? 'active' : ''}`} onClick={handleInternOpen}>
              <Link className="link-style">
                <DashboardRoundedIcon className='nav-icons' />
                Internships {internOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </Link>
            </li>
            {internOpen && (
              <div className='options'>
                {internshipPaths.map(path => {
                  const resource = resources.find(resource => resource.path === path);
                  return resource && (
                    <div key={resource.path} className={`menu-items ${activeLink === resource.path ? 'active' : ''}`} onClick={() => handleLinkClick(resource.path)}>
                      <Link to={resource.path} className="link-style">
                        <DashboardRoundedIcon className='nav-icons' />
                        {resource.resource_name}
                      </Link>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
         {hasAccess(['/OveralReports']) && (
          <li className={`menu-items ${activeLink === '/OveralReports' ? 'active' : ''}`} onClick={() => handleLinkClick('/OveralReports')}>
            <Link to="/OveralReports" className="link-style">
              <DashboardRoundedIcon className='nav-icons' />
              Overall Reports
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default VerticalNavbar;

