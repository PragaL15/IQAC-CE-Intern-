import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const StepperWithContent = ({status}) => {
    const [data,setData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`http://localhost:5001/api/ce/oc/OneCreditApprovalMembers`);
            if (!response.ok) {
              throw new Error('Failed to fetch data');
            }
            const jsonData = await response.json();
            const members = jsonData.map(item => item.members);
            members.push("Approved");
            setData(members);
          } catch (error) {
            console.log("Error while fetching data", error);
          }
        };
    
        fetchData();
      }, []);
    
    return (
        <Box sx={{ width: '100%' }}>
          <Stepper activeStep={status===3?status+1:status} alternativeLabel>
            {data.map((label) => (
              <Step key={label}>
                <StepLabel >{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      );
};

export default StepperWithContent;