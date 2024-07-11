import React from 'react'
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useNavigate } from 'react-router-dom'
import IntershipTable from '../stuffs/InternshipTable'

const InternshipHome = () => {
  const navigate = useNavigate()
  return (
    <div>
        <div className="titlehm">
            <h4>Internship</h4>
        </div>
        <div className='hometable' >
            <IntershipTable/>
        </div>
        <div className='upldBTN' >
            <div>
                <h4>Upload Your Internship Here</h4>
            </div>
            <div>
                <div className='card-add-icon' onClick={()=>{navigate('/InternshipForm')}} style={{cursor:'pointer'}}>
                        <AddBoxIcon className='add-icon' sx={{ fontSize: 32 }}/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default InternshipHome
