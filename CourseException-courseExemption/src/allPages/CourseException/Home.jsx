import React, { useEffect, useState } from "react";
import "./styles/home.css";
import { useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../../api/api";
import HomeCard from "../../components/homecard/HomeCard";
import axios from "axios";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Gauge } from "@mui/x-charts/Gauge";
import TreeStructure from "./stuffs/TreeStructure";

Chart.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["completed", "Not Completed"],
  datasets: [
    {
      label: "Nptel",
      data: [2, 1],
      backgroundColor: ["#003459", "#b5e2fa"],
      borderColor: ["#003459", "#b5e2fa"],
      weight: 0,
      borderWidth: 20,
    },
  ],
};

const options = {
  weight: 0,
};

const Home = () => {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState([]);
  const [student, setStudent] = useState("7376222AD156");
  const [approvedAddon, setApprovedAddon] = useState(null);
  const [approvedNptel, setApprovedNptel] = useState(null);
  const [approvedOneCredit, setApprovedOneCredit] = useState(null);
  const [approvedIntern, setApprovedIntern] = useState(null);
  const [totalApproved, setTotalApproved] = useState(null);
  const [approvedHonor, setApprovedHonor] = useState(null);
  const [approvedMinor, setApprovedMinor] = useState(null);

  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/api/ce`, { withCredentials: true })
      .then((response) => {
        setCourseData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching course data:", error);
      });
  }, []);

  useEffect(() => {
    fetchApprovedStatus();
  }, []);

  const fetchApprovedStatus = async () => {
    try {
      const response = await axios.get(
        `${apiBaseUrl}/api/ce/oc/ApprovedStatusAll?student=${student}`,
        { withCredentials: true }
      );
      const jsonData = response.data;
      setApprovedAddon(jsonData.approved_addon);
      setApprovedIntern(jsonData.approved_internship);
      setApprovedOneCredit(jsonData.approved_oneCredit);
      setApprovedNptel(jsonData.approved_nptel);
      setTotalApproved(jsonData.approved_total);
      setApprovedHonor(jsonData.approved_honor);
      setApprovedMinor(jsonData.approved_minor);
      console.log(jsonData);
    } catch (error) {
      console.log("Error while fetching approved Students", error);
    }
  };

  return (
    <div className="homeMainDiv">
      <div className="MainTit">Course Exemption</div>
      <div>
        <div className="content-cards">
          {courseData.map((course) => (
            <div
              key={course.id}
              onClick={() => navigate(`/${course.name}`)}
              style={{ cursor: "pointer" }}
            >
              <HomeCard
                title={course.name}
                image={`${apiBaseUrl}/${course.image_path}`}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="divPart2">
        <div className="douhnutMainDiv">
          <div>
            <div className="titGraph">Exeption Details</div>
            <div className="doughnut">
              <div className="gauge">
                <Gauge
                  value={totalApproved}
                  valueMax={4}
                  startAngle={0}
                  endAngle={360}
                  height={245}
                  text={({ value, valueMax }) => `${value} / ${valueMax}`}
                />
              </div>
              <div className="expStatus">
                <div className="titExempted">Exempted in The Following..</div>
                <div className="expOptions">
                  <div>
                    <div className="NptelExp">NPTEL - {approvedNptel}</div>
                    <div className="OneCreditExp">One Credit - {approvedOneCredit}</div>
                  </div>
                  <div>
                    <div className="addOnExp">AddOn - {approvedAddon + approvedHonor + approvedMinor}</div>
                    <div className="addOnExp">Internship - {approvedIntern}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className="titGraph">Rules And Regulations</div>
            <div className="rulesMainDiv">
              <div className="RuleShort">Exemption</div>
              <div className="treeHome"><TreeStructure /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
