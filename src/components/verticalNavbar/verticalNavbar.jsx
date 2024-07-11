import React, { useState } from 'react'; // Import useState
import './verticalNavbar.css';
import { Link } from 'react-router-dom';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';

function VerticalNavbar({ onClose }) {
    const [activeLink, setActiveLink] = useState(null);
    const [internshipOpen, setInternshipOpen] = useState(false);
    const [AddonOpen, setAddonOpen] = useState(false);
    const [oneCreditOpen, setOneCreditOpen] = useState(false);

    const handleLinkClick = (pathname) => {
        onClose();
        setActiveLink(pathname);
    };

    const handleInternshipOpen = () => {
        setInternshipOpen(!internshipOpen);
    };
    const handleAddonOpen = () => {
        setAddonOpen(!AddonOpen);
    };

    const handleOneCreditOpen = () => {
        setOneCreditOpen(!oneCreditOpen);
    };

    return (
        <div className='total-v-navbar'>
            <div className={`menu-item ${activeLink === '/' ? 'active' : ''}`} onClick={() => handleLinkClick('/')}>
                <Link to="/" className="link-style"><DashboardRoundedIcon className='nav-icons' />Dashboard</Link>
            </div>
            <div className='groups'>-- Course Exemption --</div>
            <div className={`menu-item ${activeLink === '/courseExcp' ? 'active' : ''}`} onClick={() => handleLinkClick('/courseExcp')}>
                <Link to="/courseExcp" className="link-style"><DashboardRoundedIcon className='nav-icons' />Course Exception</Link>
            </div>
            <div className={`menu-item ${internshipOpen ? 'active' : ''}`} onClick={handleInternshipOpen}>
                <Link className="link-style"><DashboardRoundedIcon className='nav-icons' />Internship{internshipOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} </Link>
            </div>
            <div className={`menu-item ${AddonOpen ? 'active' : ''}`} onClick={handleAddonOpen}>
                <Link className="link-style"><DashboardRoundedIcon className='nav-icons' />Add-on{AddonOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} </Link>
            </div>
            {internshipOpen && 
                <div className='options'>
                    <div className={`menu-items ${activeLink === '/courseApproval' ? 'active' : ''}`} onClick={() => handleLinkClick('/courseApproval')}>
                        <Link to="/courseApproval" className="link-style"><DashboardRoundedIcon className='nav-icons' />Pending Intern</Link>
                    </div>
                    <div className={`menu-items ${activeLink === '/OnlineReports' ? 'active' : ''}`} onClick={() => handleLinkClick('/OnlineReports')}>
                        <Link to="/OnlineReports" className="link-style"><DashboardRoundedIcon className='nav-icons' />Approved Intern</Link>
                    </div>
                    <div className={`menu-items ${activeLink === '/OnlineRejected' ? 'active' : ''}`} onClick={() => handleLinkClick('/OnlineRejected')}>
                        <Link to="/OnlineRejected" className="link-style"><DashboardRoundedIcon className='nav-icons' />Rejected Intern</Link>
                    </div>
                </div>
            }
            {AddonOpen && 
                <div className='options'>
                    <div className={`menu-items ${activeLink === '/AddonPending' ? 'active' : ''}`} onClick={() => handleLinkClick('/AddonPending')}>
                        <Link to="/AddonPending" className="link-style"><DashboardRoundedIcon className='nav-icons' />Pending Addon</Link>
                    </div>
                    <div className={`menu-items ${activeLink === '/AddonApproval' ? 'active' : ''}`} onClick={() => handleLinkClick('/AddonApproval')}>
                        <Link to="/AddonApproval" className="link-style"><DashboardRoundedIcon className='nav-icons' />Approved Addon</Link>
                    </div>
                    <div className={`menu-items ${activeLink === '/AddonRejected' ? 'active' : ''}`} onClick={() => handleLinkClick('/AddonRejected')}>
                        <Link to="/AddonRejected" className="link-style"><DashboardRoundedIcon className='nav-icons' />Rejected Addon</Link>
                    </div>
                </div>
            }
            <div className={`menu-item ${oneCreditOpen ? 'active' : ''}`} onClick={handleOneCreditOpen}>
                <Link className="link-style"><DashboardRoundedIcon className='nav-icons' />One Credit{oneCreditOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />} </Link>
            </div>
            {oneCreditOpen && 
                <div className='options'>
                    {/* Add menu items for One Credit here */}
                </div>
            }
        </div>
    );
}

export default VerticalNavbar;
