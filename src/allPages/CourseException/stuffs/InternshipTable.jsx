import React, { useEffect, useState } from 'react';
import { DataGrid} from '@mui/x-data-grid';//for cerating table of contents
import { Box } from '@mui/material';//for cerating table of contents
import '../styles/table.css'

const IntershipTable = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const rows  = [
        { id: 1, col1: 'Hello', col2: 'World' },
        { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
        { id: 3, col1: 'MUI', col2: 'is Amazing' },
      ];
      
      const columns = [
        { field: 'NameOfIndustry', headerName: 'Industry',headerClassName: 'super-app-theme--header',
        headerAlign: 'center'  },
        { field: 'ModeofInternship', headerName: 'Mode',headerClassName: 'super-app-theme--header',
        headerAlign: 'center'  },
        { field: 'Start Date', headerName: 'Start date',headerClassName: 'super-app-theme--header',
        headerAlign: 'center'  },
        { field: 'End Date', headerName: 'End Date',headerClassName: 'super-app-theme--header',
        headerAlign: 'center'  },
        { field: 'Duration', headerName: 'Duration',headerClassName: 'super-app-theme--header',
        headerAlign: 'center'  },
        { field: 'Stipend', headerName: 'Stipend',headerClassName: 'super-app-theme--header',
         headerAlign: 'center'  },
        { field: 'Certificate', headerName: 'Certificate',headerClassName: 'super-app-theme--header',
         headerAlign: 'center'  },
      ];

      const customLocaleText = {
        noRowsLabel: 'You have Not yet Applied any Internship Reports yet', // Change this to your desired text
    };
    

return (
  <div className='tableMain' >
  <div className="datagrid">
  <DataGrid
  autoHeight
  rows={data}
  columns={columns}
  localeText={customLocaleText} 

  sx={{
    "--DataGrid-overlayHeight": "100px", 
    "& .super-app-theme--header": {
      color: "var(--heading-crsExp)", // Change header text color
    },
    "& .MuiDataGrid-root": {
      width: "100%", // Ensure the DataGrid fills the container width
      height: "100%", // Ensure the DataGrid fills the container height
    },
    "& .MuiDataGrid-columnsContainer": {
      gap: "70px",
      margin: "10px", // Add gap between columns
    },
    "& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell": {
      padding: "5px", // Add padding to column headers and cells
    },
  }}
/>


  </div>
  </div>
);
}

export default IntershipTable