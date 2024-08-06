

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

