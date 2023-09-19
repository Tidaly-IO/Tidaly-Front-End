import React, { useState, useEffect } from 'react';

interface CircleChartProps {
  data: number;
}

const CircleChart: React.FC<CircleChartProps> = ({ data }) => {
  const [fillPercentage, setFillPercentage] = useState<number>(0);

  useEffect(() => {
    const calculateFillPercentage = () => {
      const percentage: number = (data / 100) * 100;
      setFillPercentage(percentage);
    };

    calculateFillPercentage();
  }, [data]);

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
        {fillPercentage}L / 100L
      </text>
    </svg>
  );
};

export default CircleChart;
