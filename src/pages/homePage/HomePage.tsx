import Chart from 'chart.js/auto';
import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import CircleChart from './components/CircleChart.tsx';
import DayOfTheWeek from './components/DayOfTheWeek.tsx';
import SideBar from '.././components/sidebar/SideBar.tsx';
import { Bar } from 'react-chartjs-2';
import ".././statistics/css/Statistics.css";
import { options, dataCopy, getCurrentDate, getIndexDay } from './components/Chart.js';

type Option = "Semaine" | "Mois";

export const HomePage = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  const [selectedOption, setSelectedOption] = useState<Option>('Semaine');

  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value as Option);

    if (event.target.value === "Semaine") {
      const newDataCopy = {
        ...dataCopy,
        labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
        datasets: [
          {
            label: "Consommation en litres d'eau",
            data: [65, 59, 80, 21, 100, 165, 144],
          }
        ]
      };
      dataCopy.labels = [...newDataCopy.labels];
      dataCopy.datasets[0].data = [...newDataCopy.datasets[0].data];
    } else {
      const newDataCopy = {
        ...dataCopy,
        labels: ['Semaine 1', 'Semaine 2', 'Semaine 3', 'Semaine 4'],
        datasets: [
          {
            label: "Consommation en litres d'eau",
            data: [225, 0, 0, 0],
          }
        ]
      };
      dataCopy.labels = [...newDataCopy.labels];
      dataCopy.datasets[0].data = [...newDataCopy.datasets[0].data];
    }
  };

  useEffect(() => {
    if (chartRef.current) {
      const newChartInstance = new Chart(chartRef.current, {
        type: 'bar',
        data: dataCopy,
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
        <h1 className="titre" style={{ fontFamily: 'Arial', marginRight: "20px" }}>Accueil</h1>
        <div className='rectangle2'>
          <h3 style={{ fontFamily: 'Arial', color: "rgb(102, 102, 102)", marginLeft: "20px", paddingTop: "15px", textAlign: "left" }}>Consommation du jour</h3>
          <h4 style={{ fontFamily: 'Arial', color: "rgb(102, 102, 102)", marginLeft: "20px", textAlign: "left" }}><DayOfTheWeek /> - {getCurrentDate()}</h4>
          <CircleChart data={dataCopy.datasets[0].data[getIndexDay()]}></CircleChart>
        </div>
        <div className='rectangle1'>
          <div className="select-container" style={{ display: "inline-flex", textAlign: "right", position: "absolute", marginLeft: "20%", marginTop: "20px" }}>
            <select id="options" name="options" value={selectedOption} onChange={handleOptionChange} style={{ marginBottom: "0px" }}>
              <option value="Semaine">Semaine</option>
              <option value="Mois">Mois</option>
            </select>
          </div>
          <Bar data={dataCopy} options={options} />
        </div>
      </div>
    </div>
  );
};
