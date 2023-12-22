import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import Chart from 'chart.js/auto';
import CircleChart from './components/CircleChart.tsx';
import DayOfTheWeek from './components/DayOfTheWeek.tsx';
import SideBar from '.././components/sidebar/SideBar.tsx';
import { Bar } from 'react-chartjs-2';
import ReactModal from 'react-modal';
import ".././statistics/css/Statistics.css";
import "./css/HomePage.css";
import { options, dataCopy, getCurrentDate, getWeeksInMonth, getIndexDay } from './components/Chart.js';
import axios from 'axios';

type Option = "Semaine" | "Mois";

export const HomePage = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  const [selectedOption, setSelectedOption] = useState<Option>('Semaine');
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMonthSelected, setIsMonthSelected] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const modalStyle = {
    content: {
      width: '50%',
      height: '50%',
      margin: 'auto',
    },
  };

  const generateChartLabels = () => {
    if (selectedOption === 'Semaine') {
      return ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    } else if (selectedOption === 'Mois') {
      const weeksInMonth = getWeeksInMonth(selectedYear, selectedMonth);
      console.log(weeksInMonth);
      return Array.from({ length: weeksInMonth }, (_, index) => `Semaine ${index + 1}`);
    }
  };

  function getWeekOfMonth(date: Date): number {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstDayWeekDay = firstDayOfMonth.getDay();

    const startingWeek = firstDayWeekDay <= 4 ? 1 : 0;
    const adjustedDate = startingWeek === 1 ? date : new Date(date.getFullYear(), date.getMonth(), date.getDate() + (7 - firstDayWeekDay));

    const diff = adjustedDate.getDate() - firstDayOfMonth.getDate();
    return Math.ceil((diff + 1) / 7);
  }

  const getWeeklyConsumption = async () => {
    const instance = axios.create({
      baseURL: 'http://20.111.43.70:3333',
      headers: { Authorization: 'Bearer ' + localStorage.getItem("token") }
    });
    try {
      const response = await instance.get(`/consumption/global`);
      const userData = response.data;
      return(Math.round(userData.consumption));
    } catch (error) {
      console.error("Erreur lors de la récupération des informations hebdomadaires :", error);
      return [];
    }
  };

  const getTodayConsumption = async () => {
    const instance = axios.create({
      baseURL: 'http://20.111.43.70:3333',
      headers: { Authorization: 'Bearer ' + localStorage.getItem("token") }
    });
    try {
      const response = await instance.get("/consumption/global");
      const userData = response.data;
      console.log("Informations récupérées :", userData.consumption);
      return(Math.round(userData.consumption))
    } catch (error) {
      console.error("Erreur lors de la récupération des informations :", error);
    }
  };


  const updateChart = async () => {
    if (chartRef.current) {
      if (selectedOption === 'Semaine') {
        const currentIndexDay = getIndexDay();
        let todayConsumption = await getTodayConsumption();
        dataCopy.datasets[0].data = Array.from({ length: generateChartLabels().length }, (_, index) => (index === currentIndexDay ? todayConsumption : 0));
        dataCopy.datasets[1].data = Array.from({ length: generateChartLabels().length }, (_, index) => (index === currentIndexDay ? (todayConsumption / 1000 * 3.5).toFixed(2)  : 0));
      } else if (selectedOption === 'Mois') {
        const currentIndexWeek = getWeekOfMonth(new Date()) - 1;
        const weeklyConsumption = await getWeeklyConsumption();
        dataCopy.datasets[0].data =  Array.from({ length: generateChartLabels().length }, (_, index) => (index === currentIndexWeek ? weeklyConsumption : 0));
        dataCopy.datasets[1].data = Array.from({ length: generateChartLabels().length }, (_, index) => (index === currentIndexWeek ? (weeklyConsumption / 1000 * 3.5).toFixed(2) : 0));
      }
  
      if (chartRef.current.chart) {
        chartRef.current.chart.destroy();
      }
  
      chartRef.current.chart = new Chart(chartRef.current, {
        type: 'bar',
        data: {
          labels: generateChartLabels(),
          datasets: dataCopy.datasets,
        },
        options: options,
      });
    }
  };

  useEffect(() => {
    updateChart(); // Initial chart setup
  }, []); // Run only once on mount

  useEffect(() => {
    updateChart(); // Update chart when options change
  }, [selectedOption, selectedYear, selectedMonth]);

  const [objectifConsommation, setObjectifConsommation] = useState<number | null>(null);

  const updateObjectifConsommation = async () => {
    if (objectifConsommation !== null) {
      const instance = axios.create({
        baseURL: 'http://20.111.43.70:3333',
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });

      try {
        const response = await instance.put('/api/v1/hub', {
          waterConsumptionTarget: objectifConsommation,
          uuid: localStorage.getItem("hubId")
        });

        console.log('Objectif de consommation mis à jour.');
        closeModal();
      } catch (error) {
        console.error('Erreur lors de la mise à jour :', error);
      }
    }
  };

  return (
    <div className={`HomePage ${isMonthSelected ? 'month-selected' : ''}`}>
      <SideBar />
      <div>
        <div className={`select-container-homePage ${isMonthSelected ? 'month-selected' : ''}`}>
          {!isModalOpen && (
            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '20px' }}>
              <select
                id="options"
                name="options"
                value={selectedOption}
                onChange={(event: ChangeEvent<HTMLSelectElement>) => setSelectedOption(event.target.value as Option)}
                style={{ width: '92px', marginRight: '10px' }}
              >
                <option value="Semaine">Semaine</option>
                <option value="Mois">Mois</option>
              </select>
              {isMonthSelected && (
                <>
                  <select
                    id="month"
                    name="month"
                    value={selectedMonth}
                    onChange={(event: ChangeEvent<HTMLSelectElement>) => setSelectedMonth(Number(event.target.value))}
                    style={{ width: '90px', marginRight: '10px' }}
                  >
                    {Array.from({ length: 12 }, (_, index) => index + 1).map((month) => (
                      <option key={month} value={month}>
                        {new Date(2022, month - 1, 1).toLocaleString('default', { month: 'long' })}
                      </option>
                    ))}
                  </select>
                </>
              )}
            </div>
          )}
        </div>
        <h1 className="titre" style={{ fontFamily: 'Arial', marginRight: "20px" }}>Accueil</h1>
        <div className='rectangle2-homePage'>
          <h3 style={{ fontFamily: 'Arial', color: "rgb(102, 102, 102)", marginLeft: "20px", paddingTop: "15px", textAlign: "left" }}>Consommation du jour</h3>
          <h4 style={{ fontFamily: 'Arial', color: "rgb(102, 102, 102)", marginLeft: "20px", textAlign: "left" }}><DayOfTheWeek /> - {getCurrentDate()}</h4>
          <div onClick={openModal}>
            <CircleChart data={dataCopy.datasets[0].data[getIndexDay()]}></CircleChart>
          </div>
        </div>
        <div className='rectangle1-homePage'>
          <canvas ref={chartRef}></canvas>
        </div>
      </div>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Modal"
        style={modalStyle}
      >
        <div className="modal-content">
          <h2 className="modal-title">Modifier votre objectif de consommation</h2>
          <div className="form-group">
            <label htmlFor="objectifConsommation">Objectif de consommation</label>
            <input
              type="number"
              id="objectifConsommation"
              className="wide-input"
              placeholder="Entrez votre objectif de consommation"
              value={objectifConsommation || ''}
              onChange={(e) => setObjectifConsommation(parseInt(e.target.value) || null)}
            />
          </div>
          <div className="button-group">
            <button className="btn-submit" onClick={updateObjectifConsommation}>
              Modifier
            </button>
            <button className="btn-submit btn-cancel" onClick={closeModal}>
              Annuler
            </button>
          </div>
        </div>
      </ReactModal>
    </div>
  );
};
