import React, { useState, useEffect } from 'react';

const CircleChart = ({ data }) => {
  const [fillPercentage, setFillPercentage] = useState(0);

  useEffect(() => {
    const calculateFillPercentage = () => {
      const percentage = (data / 100) * 100;
      setFillPercentage(percentage);
    };

    calculateFillPercentage();
  }, [data]);

  const radius = 70; // updated radius of the circle
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (fillPercentage / 100) * circumference;

  return (
    <svg className="circle-chart" width="160" height="160"> {/* Adjusted width and height to accommodate larger circle */}
      <circle
        className="circle-chart-background"
        stroke="#e6e6e6"
        strokeWidth="8"
        fill="transparent"
        r={radius}
        cx="80" // Adjusted cx and cy coordinates to center the larger circle
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
        {fillPercentage}L / 100L
      </text>
    </svg>
  );
};

export default CircleChart;