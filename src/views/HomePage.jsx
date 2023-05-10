

import Chart from 'chart.js/auto';
import "../css/Statistics.css";
import SideBar from '../components/SideBar';
import { Bar } from 'react-chartjs-2';
import React, { useState, useEffect, useRef } from 'react';
import "../components/CircleChart.js"
import CircleChart from '../components/CircleChart.js';
import "../components/DayOfTheWeek.js"
import DayOfTheWeek from '../components/DayOfTheWeek.js';
// import CircleChart from '../components/CircleChart.js';

Chart.defaults.plugins.legend.display = false;
Chart.defaults.scale.category = Chart.defaults.scale.linear;

let data = {
    labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
    datasets: [
        {
            label: "Consommation en litres d'eau",
            data: [65, 59, 80, 21, 0, 0, 0],
        }
    ]
};

let dataCopy = {
  labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
  datasets: [
      {
          label: "Consommation en litres d'eau",
          data: [65, 59, 80, 21, 0, 0, 0],
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




export function getCurrentDate(separator=''){

  let newDate = new Date()
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  let dateFormatZeroBegin = "";
  let monthFormatZeroBegin = "";

  if (month.toString().length == 1) {
    monthFormatZeroBegin = 0 + month.toString();
  }
  if (date.toString().length == 1) {
    dateFormatZeroBegin = 0 + date.toString();
  }

  return `${dateFormatZeroBegin} / ${monthFormatZeroBegin} /  ${year} `
}

export function getIndexDay(){

  let index = 0
  const currentDate = new Date();
  const options = { weekday: 'long' };
  const dayOfWeek = currentDate.toLocaleDateString('fr-FR', options);
  const dayOfWeekMajFirstChar = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);

  switch (dayOfWeekMajFirstChar) {
    case 'Lundi':
      index = 0;
      break;
    case 'Mardi':
      index = 1;
      break;
    case 'Mercredi':
      index = 2;
      break;
    case 'Jeudi':
      index = 3;
      break;
    case 'Vendredi':
      index = 4;
      break;
    case 'Samedi':
      index = 5;
      break;
    case 'Dimanche':
      index = 6;
      break;
    default:
      index = 0;
  }

  return index
}


export const HomePage = () => {
    const chartRef = useRef(null);

    const [selectedOption, setSelectedOption] = useState('Semaine');

    const handleOptionChange = (event) => {
      setSelectedOption(event.target.value);

      if (event.target.value == "Semaine") {
          data = {
            labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
            datasets: [
                {
                    label: "Consommation en litres d'eau",
                    data: [65, 59, 80, 21, 0, 0, 0],
                }
            ]
        };
      }
      else {
        data = {
          labels: ['Semaine 1', 'Semaine 2', 'Semaine 3' , 'Semaine 4'],
          datasets: [
              {
                  label: "Consommation en litres d'eau",
                  data: [225, 0, 0, 0],
              }
          ]
      };
      }
    }

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

          <h1 className="titre" style={{fontFamily: 'Arial', marginRight: "20px" }}>Accueil</h1>
          <div className='rectangle2'>
          <h3 style={{ fontFamily: 'Arial', color: "rgb(102, 102, 102)" , marginLeft:"20px", paddingTop:"15px", textAlign:"left"}}>Consommation du jour</h3>
          <h4 style={{ fontFamily: 'Arial', color: "rgb(102, 102, 102)", marginLeft:"20px", textAlign:"left"}}><DayOfTheWeek/> - {getCurrentDate()}</h4>
          <CircleChart data={dataCopy.datasets.at(0).data.at(getIndexDay())}></CircleChart>
          </div>
          <div className='rectangle1'>
            <div className="select-container" style={{ display: "inline-flex", textAlign:"right", position:"absolute", marginLeft:"20%", marginTop:"20px"}}>
              <select id="options" name="options" value={selectedOption} onChange={handleOptionChange} style={{ marginBottom: "0px" }}>
                <option value="Semaine">Semaine</option>
                <option value="Mois">Mois</option>
              </select>
            </div>
          <Bar data={data} options={options} />
          </div>
        </div>
      </div>
    );
};

export default HomePage;
