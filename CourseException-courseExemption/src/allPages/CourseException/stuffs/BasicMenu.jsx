import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import apiLoginHost from "../../login/LoginApi";
import MenuItem from '@mui/material/MenuItem';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useNavigate } from 'react-router-dom'; // For redirecting after logout

export default function BasicMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate(); // Use React Router's useNavigate for redirection

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${apiLoginHost}/logout`, {}, { withCredentials: true });
      // Redirect to login page or home page after successful logout
      navigate('/'); // or '/home' if you have a home page
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ minWidth: 'auto' }} // Ensure the button size is appropriate for the icon
      >
        <AccountCircleRoundedIcon
          className="h-nav-icons"
          sx={{ fontSize: 32 }}
        />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleLogout} className="Menu">Logout</MenuItem>
      </Menu>
    </div>
  );
}