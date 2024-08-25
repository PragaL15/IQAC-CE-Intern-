import React, { useEffect, useState } from "react";
import "../styles/overalReport.css";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { apiBaseUrl } from "../../../api/api";
import OnlineReportTable from "./OnlineReportTable";
import OneCreditReportTable from "./OneCreditReportTable";
import { useNavigate } from "react-router-dom";
import InternshipReportTable from "./InternshipReportTable";
import AddonReportTable from "./AddonReportTable";
import HonorReportTable from "./HonorReportTable";
import MinorReportTable from "./MinorReportTable";

const OveralReports = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [nptelSelect, setNptelSelect] = useState(true);
  const [oneCreditSelect, setOneCreditSelect] = useState(false);
  const [internSelect, setInternSelect] = useState(false);
  const [addonSelect, setAddonSelect] = useState(false);
  const [honorSelect, setHonorSelect] = useState(false);
  const [minorSelect, setMinorSelect] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(`${apiBaseUrl}/logout`, { withCredentials: true });
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

  const fetchData = async (name) => {
    try {
      const response = await fetch(
        `${apiBaseUrl}/api/ce/oc/SearchCourseList?name=${name}`, { withCredentials: true }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Unauthorized, logging out:", error);
        handleLogout(); // Call logout function
      }
      else { 
      console.error("Error fetching data:", error);
      }
    }
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleNptelSelection = () => {
    setNptelSelect(!nptelSelect);
  };
  const handleOneCreditSelection = () => {
    setOneCreditSelect(!oneCreditSelect);
  };
  const handleInternshipSelection = () => {
    setInternSelect(!internSelect);
  };
  const handleAddonSelection = () => {
    setAddonSelect(!addonSelect);
  };

  const handleHonorSelection = () => {
    setHonorSelect(!honorSelect);
  };

  const handleMinorSelection = () => {
    setMinorSelect(!minorSelect);
  };

  return (
    <div className="overall">
      <div className="titleBtn">
        <div className="titlehm">
          <h4>Reports</h4>
        </div>
      </div>
      <div className="searchBarDivReport">
        <div className="selectBtnGroup">
          <div>
            <button
              className={nptelSelect ? "Active" : "NonActive"}
              onClick={handleNptelSelection}
            >
              OnlineCourse
            </button>
          </div>
          <div>
            <button
              className={oneCreditSelect ? "Active" : "NonActive"}
              onClick={handleOneCreditSelection}
            >
              OneCredit
            </button>
          </div>
          <div>
            <button
              className={internSelect ? "Active" : "NonActive"}
              onClick={handleInternshipSelection}
            >
              Internship
            </button>
          </div>
          <div>
            <button
              className={addonSelect ? "Active" : "NonActive"}
              onClick={handleAddonSelection}
            >
              AddonCourse
            </button>
          </div>
          <div>
            <button
              className={honorSelect ? "Active" : "NonActive"}
              onClick={handleHonorSelection}
            >
              HonorCourse
            </button>
          </div>
          <div>
            <button
              className={minorSelect ? "Active" : "NonActive"}
              onClick={handleMinorSelection}
            >
              MinorCourse
            </button>
          </div>
        </div>
          {/* <div style={{ display: "flex" }}>
            <div className="searchAndFilter">
              <TextField
                className="ReportsSerach"
                variant="outlined"
                size="small"
                placeholder="Search"
                onChange={handleName}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
          </div> */}
      </div>
      <div>
        <div>{(!nptelSelect) && (!oneCreditSelect) && (!internSelect) && (!addonSelect) && (!honorSelect) && (!minorSelect) 
          && <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>Select Any Table Please...</div> }</div>
        <div>{nptelSelect && <OnlineReportTable/>}</div>
        <div>{oneCreditSelect && <OneCreditReportTable/>}</div>
        <div>{internSelect && <InternshipReportTable/> }</div>
        <div>{addonSelect && <AddonReportTable/> }</div>
        <div>{honorSelect && <HonorReportTable/> }</div>
        <div>{minorSelect && <MinorReportTable/> }</div>
      </div>
    </div>
  );
};

export default OveralReports;
