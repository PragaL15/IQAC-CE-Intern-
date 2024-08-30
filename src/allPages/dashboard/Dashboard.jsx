import React, { useEffect } from 'react'
import './Dashboard.css'
import axios from 'axios';
import InputBox from '../../components/InputBox/inputbox'
import Button from '../../components/Button/Button'
import Card from '../../components/card/Card'
import apiLoginHost from '../login/LoginApi';
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    
  const handleLogout = async () => {
    try {
      await axios.post(`${apiLoginHost}/logout`, { withCredentials: true });
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
=======


function Dashboard() {
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98

    useEffect(() => {
        // Fetch user data from backend
        axios.get(`${apiLoginHost}/api/user-data`, { withCredentials: true })
            .then(response => {
                const { user_id, resources } = response.data;

                // Store user_id and resources in local storage
                localStorage.setItem('user_id', user_id);
                localStorage.setItem('resources', JSON.stringify(resources));

                console.log('User ID and resources stored in local storage');
            })
            .catch(error => {
<<<<<<< HEAD
                if (error.response && error.response.status === 401) {
                    console.error("Unauthorized, logging out:", error);
                    handleLogout(); // Call logout function
                }
                else { 
                console.error('Error fetching user data:', error);
                }
=======
                console.error('Error fetching user data:', error);
>>>>>>> 5ed2607c6f21812df50b4b3c80fcfd453e631a98
                // Handle error (e.g., redirect to login page)
            });
    }, []);

    const handleSubmit = (formData) => {
        // Handle form submission, e.g., send data to server
        console.log(formData);
    };
    return (
        <div className='content-container'>
           <div className='dashTit'>IQAC</div>
        </div>
    )
}

export default Dashboard
