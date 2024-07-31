// import React from 'react'
// import './Dashboard.css'
// import InputBox from '../../components/InputBox/inputbox'
// import Button from '../../components/Button/Button'
// import Card from '../../components/card/Card'

// function Dashboard() {

//     const handleSubmit = (formData) => {
//         // Handle form submission, e.g., send data to server
//         console.log(formData);
//     };
//     return (
//         <div className='content-container'>
//             Default Components Available...
//             <Button label='click' />
//             <Card
//                 title="Display the title of the card over here"
//                 image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEX9pl8af7Y7nzBN_8gY3XmGZKCzkUOqRcod9oXuBf4g&s"
//                 description="sample card description."
//             />
//             <Button label='Button' />
//             <Card
//                 title="Display the title of the card over here"
//                 image="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
//                 description="sample card description."
//             />
//             <Button label='Button' />
//             <Card
//                 title="Display the title of the card over here"
//                 image="https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_640.jpg"
//                 description="sample card description."
//             />
//             <InputBox placeholder="Enter your name..." />
//         </div>
//     )
// }

// export default Dashboard










import React, { useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';
import InputBox from '../../components/InputBox/inputbox';
import Button from '../../components/Button/Button';
import Card from '../../components/card/Card';

function Dashboard() {

    useEffect(() => {
        // Fetch user data from backend
        axios.get('http://localhost:5000/api/user-data', { withCredentials: true })
            .then(response => {
                const { user_id, resources } = response.data;

                // Store user_id and resources in local storage
                localStorage.setItem('user_id', user_id);
                localStorage.setItem('resources', JSON.stringify(resources));

                console.log('User ID and resources stored in local storage');
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
            <Button label='click' />
            <Card
                title="Display the title of the card over here"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEX9pl8af7Y7nzBN_8gY3XmGZKCzkUOqRcod9oXuBf4g&s"
                description="sample card description."
            />
            <Button label='Button' />
            <Card
                title="Display the title of the card over here"
                image="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
                description="sample card description."
            />
            <Button label='Button' />
            <Card
                title="Display the title of the card over here"
                image="https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_640.jpg"
                description="sample card description."
            />
            <InputBox placeholder="Enter your name..." />
        </div>
    )
}

export default Dashboard;
