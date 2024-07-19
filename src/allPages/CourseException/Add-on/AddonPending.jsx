import React, { useEffect, useState, forwardRef } from 'react';
import '../styles/courseApproval.css';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import AddonTable from '../stuffs/AddonTable';
import axios from 'axios';

// Define Alert component with React.forwardRef
const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AddonPending = () => {
    const [data, setData] = useState([]);
    const [selectedRowData, setSelectedRowData] = useState(null);
    const [approvalMessage, setApprovalMessage] = useState("");
    const [rejectionMessage, setRejectionMessage] = useState("");
    const [isApproved, setIsApproved] = useState(false);
    const [isRejected, setIsRejected] = useState(false);

    const columns = [
        { field: 'name', headerName: 'Name', headerClassName: 'super-app-theme--header' },
        { field: 'register_number', headerName: 'Register Number', headerClassName: 'super-app-theme--header' },
        { field: 'department', headerName: 'Department', headerClassName: 'super-app-theme--header' },
        { field: 'Mode_of_exemption', headerName: 'Mode of Exemption', headerClassName: 'super-app-theme--header', width: 150 },
        { field: 'course_code', headerName: 'Course Code', headerClassName: 'super-app-theme--header', width: 150 },
        { field: 'course_name', headerName: 'Course Name', headerClassName: 'super-app-theme--header', width: 150 },
        {
            field: 'view',
            headerName: 'View',
            headerClassName: 'super-app-theme--header',
            renderCell: (params) => (
                <Box style={{ cursor: 'pointer' }} onClick={() => setSelectedRowData(params.row)}>
                    <RemoveRedEyeOutlinedIcon />
                </Box>
            ),
        },
    ];

    const customLocaleText = { noRowsLabel: 'You have not yet approved any students.' };

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:3000/facultyApprovals?approval_status=0');
            if (!response.ok) throw new Error('Failed to fetch data');
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleApproval = async (id) => {
        try {
            const response = await fetch('http://localhost:3000/approveAddon', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id }),
            });
            if (!response.ok) throw new Error('Failed to approve');
            setApprovalMessage('Course approved successfully.');
            setIsApproved(true);
            fetchData(); // Refresh data
        } catch (error) {
            console.error('Error approving course:', error);
        }
    };

    const handleRejection = async (id, remark) => {
        try {
            const response = await axios.post('http://localhost:3000/rejectAddon', {
                id,
                remark,
            });
            console.log('Course rejected successfully:', response.data);
            setRejectionMessage('Course rejected successfully.');
            setIsRejected(true);
            fetchData(); // Refresh data
        } catch (error) {
            console.error('Error rejecting course:', error);
        }
    };

    return (
        <>
            <div>
                <div className="titFac">
                    <div className="ti">
                        <h4 className='head'>Pending Courses</h4>
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
                                    onApproval={() => handleApproval(selectedRowData.id)}
                                    onRejection={(remark) => handleRejection(selectedRowData.id, remark)}
                                    disableApproval={isApproved}
                                    disableRejection={isRejected}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddonPending;
