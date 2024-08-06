import React, { useEffect } from 'react'
import './Dashboard.css'
import axios from 'axios';
import InputBox from '../../components/InputBox/inputbox'
import Button from '../../components/Button/button'
import Card from '../../components/card/Card'
import apiLoginHost from '../login/LoginApi';


function Dashboard() {

    useEffect(() => {
        // Fetch user data from backend
        axios.get(`${apiLoginHost}/api/user-data`, { withCredentials: true })
            .then(response => {
                const { user_id, resources } = response.data;

            
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
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