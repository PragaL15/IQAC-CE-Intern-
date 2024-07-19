import React, { useEffect, useState } from 'react';
import '../styles/courseApproval.css';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import AddonTable from '../stuffs/AddonTable';

const AddonApproval = () => {
    const [data, setData] = useState([]);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [approvalMessage, setApprovalMessage] = useState("");
    const [rejectionMessage, setRejectionMessage] = useState("");

    const columns = [
        {
            field: "name",
            headerName: "Name",
            headerClassName: "super-app-theme--header",
        },
        {
            field: "register_number",
            headerName: "Register Number",
            headerClassName: "super-app-theme--header",
        },
        {
            field: "department",
            headerName: "Department",
            headerClassName: "super-app-theme--header",
        },
        {
            field: "Mode_of_exce",
            headerName: "Mode of Exemption",
            headerClassName: "super-app-theme--header",
            width: 150,
        },
        {
            field: "course_code",
            headerName: "Course Code",
            headerClassName: "super-app-theme--header",
            width: 150,
        },
        {
            field: "course_name",
            headerName: "Course Name",
            headerClassName: "super-app-theme--header",
            width: 150,
        },
        {
            field: "elective_id",
            headerName: "Elective",
            headerClassName: "super-app-theme--header",
            width: 150,
        },
        {
            field: "view",
            headerName: "View",
            headerClassName: "super-app-theme--header",
            renderCell: (params) => (
                <Box
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelectedRowData(params.row)}
                >
                    <RemoveRedEyeOutlinedIcon />
                </Box>
            ),
        },
    ];

    const customLocaleText = {
        noRowsLabel: "You have not yet approved any students.",
    };

    const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/FacultyAddonApp`);
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData(); 
    }, []);

    const handleApproval = () => {
        setApprovalMessage("Exemption successfully approved.");
        // Additional logic if needed
    };

    const handleRejection = () => {
        setRejectionMessage("Remark successfully added.");
        // Additional logic if needed
    };

    return (
        <>
            <div>
                <div className="titFac">
                    <div className="ti">
                        <h4 className='head'>Approved AddonApproval</h4>
                    </div>
                </div>
                <div>
                    <div className='hometable'>
                        <div className="tableMain">
                            <div className="datagrid">
                                <DataGrid
                                    autoHeight
                                    rows={data}
                                    columns={columns}
                                    localeText={customLocaleText}
                                    sx={{
                                        maxWidth: "100%", 
                                        overflowX: "auto", 
                                        "& .super-app-theme--header": {
                                            color: "var(--heading-crsExp)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        },
                                        "& .MuiDataGrid-columnsContainer": {
                                            overflow: "visible", 
                                        },
                                        "& .MuiDataGrid-colCell, .MuiDataGrid-cell": {
                                            whiteSpace: "nowrap",
                                        },
                                    }}
                                    initialState={{
                                        pagination: {
                                            paginationModel: {
                                                pageSize: 5,
                                            },
                                        },
                                    }}
                                    pageSizeOptions={[5]}
                                    disableRowSelectionOnClick
                                />
                            </div>
                            {selectedRowData && (
                                <AddonTable
                                    faculty={true}
                                    open={true}
                                    handleClose={() => setSelectedRowData(null)}
                                    rowData={selectedRowData}
                                    onApproval={handleApproval}
                                    onRejection={handleRejection}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {approvalMessage && (
                <div className="message success">{approvalMessage}</div>
            )}
            {rejectionMessage && (
                <div className="message error">{rejectionMessage}</div>
            )}
        </>
    )
}

export default AddonApproval;
