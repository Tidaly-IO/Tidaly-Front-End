
import Chart from 'chart.js/auto';

import "../css/Statistics.css";
import SideBar from '../components/SideBar';
import { Bar } from 'react-chartjs-2';
import React, { useEffect, useRef } from 'react';

Chart.defaults.plugins.legend.display = false;
Chart.defaults.scale.category = Chart.defaults.scale.linear;

const data = {
    labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', "Septembre", "Octobre", "Novembre", "Décembre"],
    datasets: [
        {
            label: "Consommation en litres d'eau",
            data: [65, 59, 80, 81, 56, 55, 40, 20, 10, 5, 2, 1],
        }
    ]
};

const options = {
    maintainAspectRatio: false,
    scales: {
        y: {
            beginAtZero: true
        }
    },
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: "Historique de la consommation d'eau"
        }
    }
};

export const HomePage = () => {
    const chartRef = useRef(null);
    useEffect(() => {
      if (chartRef.current) {
        const newChartInstance = new Chart(chartRef.current, {
          type: 'bar',
          data: data,
          options: options
        });

        return () => {
          newChartInstance.destroy();
        }
      }
    }, [chartRef]);

    return (
      <div className='HomePage'>
        <SideBar />
        <div>
          <h1>Statistiques</h1>
          <div className='rectangle2'>
          </div>
          <div className='rectangle1'>
          <Bar data={data} options={options} />
          </div>
        </div>
      </div>
    );
};

export default HomePage;
