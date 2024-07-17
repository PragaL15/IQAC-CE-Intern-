// import React, { useEffect, useState } from 'react';
// import { DataGrid } from '@mui/x-data-grid';
// import axios from 'axios';
// import '../styles/table.css';
// import BasicModal from './BasicModal';'../stuffs/BasicModal'

// const InternshipTable = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/allInternshipApplications');
//         setData(response.data.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         setError(error.message || 'Failed to fetch data');
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const day = String(date.getDate()).padStart(2, '0');
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const year = date.getFullYear();
//     return `${day}/${month}/${year}`;
//   };

//   const columns = [
//     {
//       field: 'name',
//       headerName: 'Name',
//       headerClassName: 'super-app-theme--header',
//       headerAlign: 'center',
//       flex: 1
//     },
//     {
//       field: 'Industry',
//       headerName: 'Industry',
//       headerClassName: 'super-app-theme--header',
//       headerAlign: 'center',
//       flex: 1
//     },
//     {
//       field: 'mode',
//       headerName: 'Mode',
//       headerClassName: 'super-app-theme--header',
//       headerAlign: 'center',
//       flex: 1
//     },
//     {
//       field: 'StartDate',
//       headerName: 'Start Date',
//       headerClassName: 'super-app-theme--header',
//       headerAlign: 'center',
//       flex: 1,
//       valueGetter: (params) => formatDate(params.row.StartDate)
//     },
//     {
//       field: 'EndDate',
//       headerName: 'End Date',
//       headerClassName: 'super-app-theme--header',
//       headerAlign: 'center',
//       flex: 1,
//       valueGetter: (params) => formatDate(params.row.EndDate)
//     },
//     {
//       field: 'duration',
//       headerName: 'Duration',
//       headerClassName: 'super-app-theme--header',
//       headerAlign: 'center',
//       flex: 1
//     },
//     {
//       field: 'stipend',
//       headerName: 'Stipend',
//       headerClassName: 'super-app-theme--header',
//       headerAlign: 'center',
//       flex: 1
//     },
//     {
//       field: 'certificateFilePath',
//       headerName: 'Certificate',
//       headerClassName: 'super-app-theme--header',
//       headerAlign: 'center',
//       flex: 1,
//       renderCell: (params) => (
//         <a href={`http://localhost:3000/images/${params.value}`} target="_blank" rel="noopener noreferrer">
//           View Certificate
//         </a>
//       )
//     },
//     {
//       field: 'reportFilePath',
//       headerName: 'Report',
//       headerClassName: 'super-app-theme--header',
//       headerAlign: 'center',
//       flex: 1,
//       renderCell: (params) => (
//         <a href={`http://localhost:3000/images/${params.value}`} target="_blank" rel="noopener noreferrer">
//           View Report
//         </a>
//       )
//     },
//     {
//       field: 'approval_status',
//       headerName: 'Status',
//       headerClassName: 'super-app-theme--header',
//       headerAlign: 'center',
//       flex: 1
//     }
//   ];

//   const customLocaleText = {
//     noRowsLabel: 'You have not yet applied any internship reports yet',
//   };

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div className='tableMain'>
//       <div className="datagrid">
//         <DataGrid
//           autoHeight
//           rows={data}
//           columns={columns}
//           localeText={customLocaleText}
//           getRowId={(row) => row.id}
//           sx={{
//             "--DataGrid-overlayHeight": "100px",
//             "& .super-app-theme--header": {
//               color: "var(--heading-crsExp)", // Change header text color
//             },
//             "& .MuiDataGrid-root": {
//               width: "100%", // Ensure the DataGrid fills the container width
//               height: "100%", // Ensure the DataGrid fills the container height
//             },
//             "& .MuiDataGrid-columnsContainer": {
//               gap: "70px",
//               margin: "10px", // Add gap between columns
//             },
//             "& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell": {
//               padding: "5px", // Add padding to column headers and cells
//             },
//           }}
//         />
//       </div>
//     </div>
//   );
// }

// export default InternshipTable;

import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import '../styles/table.css';

const InternshipTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/allInternshipApplications');
        setData(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message || 'Failed to fetch data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      flex: 1
    },
    {
      field: 'Industry',
      headerName: 'Industry',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      flex: 1
    },
    {
      field: 'mode',
      headerName: 'Mode',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      flex: 1
    },
    {
      field: 'StartDate',
      headerName: 'Start Date',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      flex: 1,
      valueGetter: (params) => formatDate(params.row.StartDate)
    },
    {
      field: 'EndDate',
      headerName: 'End Date',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      flex: 1,
      valueGetter: (params) => formatDate(params.row.EndDate)
    },
    {
      field: 'duration',
      headerName: 'Duration',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      flex: 1
    },
    {
      field: 'stipend',
      headerName: 'Stipend',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      flex: 1
    },
    {
      field: 'certificateFilePath',
      headerName: 'Certificate',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      flex: 1,
      renderCell: (params) => (
        <a href={`http://localhost:3000/images/${params.value}`} target="_blank" rel="noopener noreferrer">
          View Certificate
        </a>
      )
    },
    {
      field: 'reportFilePath',
      headerName: 'Report',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      flex: 1,
      renderCell: (params) => (
        <a href={`http://localhost:3000/images/${params.value}`} target="_blank" rel="noopener noreferrer">
          View Report
        </a>
      )
    },
    {
      field: 'approval_status',
      headerName: 'Status',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      flex: 1
    }
  ];

  const customLocaleText = {
    noRowsLabel: 'You have not yet applied any internship reports yet',
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='tableMain'>
      <div className="datagrid">
        <DataGrid
          autoHeight
          rows={data}
          columns={columns}
          localeText={customLocaleText}
          getRowId={(row) => row.id}
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

export default InternshipTable;
