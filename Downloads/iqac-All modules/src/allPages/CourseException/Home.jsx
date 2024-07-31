import React, { useEffect, useState } from "react";
import "./styles/home.css";
import { useNavigate } from "react-router-dom";
import { apiBaseUrl } from "../../api/api";
import HomeCard from "../../components/homecard/HomeCard";
import axios from "axios";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import TreeStructure from "./stuffs/TreeStructure";

Chart.register(ArcElement, Tooltip, Legend);

const data = {
  lebels: ["completed", "Not Completed"],
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
  useEffect(() => {
    axios
      .get(`${apiBaseUrl}/api/ce`)
      .then((response) => {
        setCourseData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching course data:", error);
      });
  }, []);

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
              <div className="gauge" >
                <Gauge
                  value={3}
                  valueMax={4}
                  startAngle={0}
                  endAngle={360}
                  height={245}
                  text={({ value, valueMax }) => `${value} / ${valueMax}`}
                />
              </div>
              <div className="expStatus">
                <div className="titExempted">Exempted in The Following..</div>
                <div className="NptelExp">NPTEL - 1</div>
                <div className="OneCreditExp">One Credit - 1</div>
                <div className="addOnExp">AddOn - 1</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className="titGraph">Rules And Regulations</div>
            <div className="rulesMainDiv">
              <TreeStructure />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
