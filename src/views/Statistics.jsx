import React, { useState, useEffect, useRef } from 'react';
import "../css/Statistics.css"
import SideBar from '../components/SideBar';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import fleche_haut from '../assets/fleche-haut.png';
import fleche_bas from '../assets/fleche-bas.png';


Chart.defaults.plugins.legend.display = false;
Chart.defaults.scale.category = Chart.defaults.scale.linear;

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

export const Statistics = () => {
  const chartRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState('Année'); // initial value is 'Année'
  const [selectedMonth, setSelectedMonth] = useState(1);
  const [selectedYear, setSelectedYear] = useState(2000);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (chartRef.current) {
      const newChartInstance = new Chart(chartRef.current, {
        type: 'bar',
        data: getData(),
        options: options
      });

      return () => {
        newChartInstance.destroy();
      }
    }
  }, [chartRef, selectedOption, selectedMonth, selectedYear]);

  // function to handle option change
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  }

  // function to handle month change
  const handleMonthChange = (event) => {
    setSelectedMonth(parseInt(event.target.value));
  }

  // function to handle year change
  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  }

  // function to get data based on selected options
 const getData = () => {
    if (selectedOption === 'Année') {
      const data = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100));

      setTotal(data.reduce((acc, curr) => acc + curr, 0));
      return {
        labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', "Septembre", "Octobre", "Novembre", "Décembre"],
        datasets: [
          {
            label: "Consommation en litres d'eau",
            data: data,
          }
        ]
      };
    } else {
      // Données pour le mois sélectionné
      const startDate = new Date(selectedYear, selectedMonth - 1, 1);
      const endDate = new Date(selectedYear, selectedMonth, 0);
      const numDays = endDate.getDate();
      const data = Array.from({ length: numDays }, () => Math.floor(Math.random() * 100));

      setTotal(data.reduce((acc, curr) => acc + curr, 0));

      // Créer un tableau des données regroupées par semaine
      const dataByWeek = data.reduce((acc, curr, index) => {
        const week = Math.floor(index / 7);
        if (!acc[week]) {
          acc[week] = { data: [], sum: 0 };
        }
        acc[week].data.push(curr);
        acc[week].sum += curr;
        return acc;
      }, []);

      // Créer un tableau des étiquettes des semaines
      const labels = dataByWeek.map((week, index) => `Semaine ${index + 1}`);

      return {
        labels: labels,
        datasets: [
          {
            label: "Consommation en litres d'eau",
            data: dataByWeek.map(week => week.sum),
          }
        ]
      };
    }
  }

  return (
    <div className='HomePage'>
      <SideBar />
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 className="titre" style={{fontFamily: 'Arial', marginRight: "20px" }}>Statistiques</h1>
          <div className="select-container" style={{ display: "inline-flex"}}>
            <select id="options" name="options" value={selectedOption} onChange={handleOptionChange} style={{ marginRight: "10px" }}>
              <option value="Année">Année</option>
              <option value="Mois">Mois</option>
            </select>
            {selectedOption === 'Année' &&
              <select>
                {Array.from({ length: 24 }, (_, i) => i + 2000).map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            }
            {selectedOption === 'Mois' &&
              <div style={{ display: "flex", alignItems: "center" }}>
                <select
                  style={{ marginRight: "10px", width: "100px" }}
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                >
                  {Array.from({ length: 12 }, (_, i) => i).map((monthIndex) => (
                    <option key={monthIndex} value={monthIndex + 7}>
                      {new Date(selectedYear, monthIndex, 1).toLocaleString('default', { month: 'long' })}
                    </option>
                  ))}
                </select>
                <select
                  style={{ marginRight: "10px", width: "100px" }}
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                >
                  {Array.from({ length: 24 }, (_, i) => i + 2000).map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            }
          </div>
        </div>
        <div className='rectangle1'>
          <canvas ref={chartRef} id='myChart' />
        </div>
        <div className='rectangle2'>
        <h5 style={{ fontFamily: 'Arial', marginRight: "10px", color: "rgb(102, 102, 102)", marginTop:"50px" }}>Résumé de ma consommation</h5>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
          <div className='blue-square'>
            <img src={fleche_bas}  className ="image"/>
            <img src={fleche_bas}  className ="image2"/>
            <h3 style={{ fontFamily: 'Arial', marginRight: "100px", marginTop: "100px", color: 'white' }}>Économies : {Math.floor(Math.random() * 100)} €</h3>
            <h3 style={{ fontFamily: 'Arial', marginRight: "30px", marginTop: "50px", color: 'white' }}>Litres économisés : {total} L</h3>
          </div>
          <div className='blue-square'>
            <img src={fleche_haut}  className ="image"/>
            <img src={fleche_haut}  className ="image2"/>
            <h3 style={{ fontFamily: 'Arial', marginRight: "100px", marginTop: "100px", color: 'white' }}>Économies : {Math.floor(Math.random() * 100)} €</h3>
            <h3 style={{ fontFamily: 'Arial', marginRight: "30px", marginTop: "50px", color: 'white' }}>Litres économisés : {total} L</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};