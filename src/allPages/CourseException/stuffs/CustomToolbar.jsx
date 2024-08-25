import React from 'react';
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import { Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';


function CustomToolbar({ data }) {
  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Data');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(blob, 'data.xlsx');
  };

  return (
    <GridToolbarContainer>
      <GridToolbarFilterButton
      startIcon={<FilterListIcon />}
      variant="contained"
      color="primary"
      size="small"
      sx={{ 
        textTransform: 'none', 
        backgroundColor: '#4caf50', 
        '&:hover': { 
          backgroundColor: '#45a049' 
        } 
      }}
    >
      Custom Filter 
    </GridToolbarFilterButton>
      <button onClick={handleExport}>Export as Excel</button>
    </GridToolbarContainer>
  );
}

export default CustomToolbar;
