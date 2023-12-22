import React, { useState, useEffect } from 'react';
import axios from 'axios';  // Assurez-vous d'importer Axios.
import { Console } from 'console';

// Composant CircleChart
interface CircleChartProps {
  waterConsumptionTarget: number;
  waterConsumed: number;
}

const CircleChart: React.FC<CircleChartProps> = ({ waterConsumptionTarget, waterConsumed }) => {
  const [fillPercentage, setFillPercentage] = useState<number>(0);

  useEffect(() => {
    const calculateFillPercentage = () => {
      const percentage: number = (waterConsumed / waterConsumptionTarget) * 100;
      setFillPercentage(percentage);
    };

    calculateFillPercentage();
  }, [waterConsumptionTarget, waterConsumed]);

  const radius: number = 70;
  const circumference: number = 2 * Math.PI * radius;
  const strokeDashoffset: number = circumference - (fillPercentage / 100) * circumference;

  return (
    <svg className="circle-chart" width="160" height="160">
      <circle
        className="circle-chart-background"
        stroke="#e6e6e6"
        strokeWidth="8"
        fill="transparent"
        r={radius}
        cx="80"
        cy="80"
      />
      <circle
        className="circle-chart-progress"
        stroke="rgb(75, 171, 240)"
        strokeWidth="8"
        fill="transparent"
        r={radius}
        cx="80"
        cy="80"
        style={{ strokeDasharray: circumference, strokeDashoffset }}
      />
      <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central">
        {waterConsumed} L / {waterConsumptionTarget} L
      </text>
    </svg>
  );
};

const getNumberOfDaysInMonth = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  return new Date(year, month, 0).getDate();
}

// Composant parent qui fait la requête pour récupérer les données
// Composant parent qui fait la requête pour récupérer les données
const ParentComponent = () => {
  const [data, setData] = useState({
    water_consumption_target: 0,
    water_consumed: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      const instance = axios.create({
        baseURL: 'http://20.111.43.70:3333',
        headers: { Authorization: 'Bearer ' + localStorage.getItem("token") }
      });

      try {
        // Récupérer water_consumption_target depuis http://20.111.43.70:3333/api/v1/hub
        const targetResponse = await instance.get("/api/v1/hub");
        const targetData = targetResponse.data;
        const updatedTarget = targetData.water_consumption_target;

        const consumptionResponse = await instance.get("/consumption/global");
        const userData = consumptionResponse.data;
        setData({
          water_consumption_target: updatedTarget ? Math.round(updatedTarget / getNumberOfDaysInMonth()) : 0,
          water_consumed: Math.round(userData.consumption),
        });
        console.log("Informations récupérées :", userData.consumption);
      } catch (error) {
        console.error("Erreur lors de la récupération des informations :", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <CircleChart
        waterConsumptionTarget={data.water_consumption_target}
        waterConsumed={data.water_consumed}
      />
    </div>
  );
};

export default ParentComponent;

