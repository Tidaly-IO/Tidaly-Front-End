import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';

const options = {
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
    },
  },
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Historique de la consommation d'eau",
    },
  },
};

interface WeekData {
  data: number[];
  sum: number;
}

export const useStatisticsLogic = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const [selectedOption, setSelectedOption] = useState<string>('Année');
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [total, setTotal] = useState<number>(0);
  const [consumption2, setData] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      const instance = axios.create({
        baseURL: 'https://tidaly-api-backend.onrender.com',
        headers: { Authorization: 'Bearer ' + localStorage.getItem("token") }
      });

      try {
        const consumptionResponse = await instance.get("/consumption/global");
        const userData = consumptionResponse.data;
        setData(userData.consumption);
        console.log(consumption2);
        console.log("Informations récupérées :", userData.consumption);
      } catch (error) {
        console.error("Erreur lors de la récupération des informations :", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      const newChartInstance = new Chart(chartRef.current, {
        type: 'bar',
        data: getData(),
        options: options,
      });

      return () => {
        newChartInstance.destroy();
      };
    }
  }, [chartRef, selectedOption, selectedMonth, selectedYear, consumption2]);

  // function to handle option change
  const handleOptionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  // function to handle month change
  const handleMonthChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(parseInt(event.target.value));
  };

  // function to handle year change
  const handleYearChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(parseInt(event.target.value));
  };

  // function to get data based on selected options
  const getData = () => {
    if (selectedOption === 'Année') {
      setData(250)
      if (selectedYear === 2024) { // a la place de 2024, mettre l'année actuelle

        const data = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100));
        return {
          labels: [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet',
            'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
          ],
          datasets: [
            {
              label: "Consommation en litres d'eau",
              data: [consumption2, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0],
            },
          ],
        };
      }
      else {
        setData(0)
        const data = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100));

        setTotal(data.reduce((acc, curr) => acc + curr, 0));
        return {
          labels: [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet',
            'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
          ],
          datasets: [
            {
              label: "Consommation en litres d'eau",
              data: [0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0],
            },
          ],
        };
      }
    } else {
      console.log(selectedMonth);
      const startDate = new Date(selectedYear, selectedMonth - 1, 1);
      const endDate = new Date(selectedYear, selectedMonth, 0);
      const numDays = endDate.getDate();
      const data = Array.from({ length: numDays }, () => Math.floor(Math.random() * 100));

      setTotal(data.reduce((acc, curr) => acc + curr, 0));

      // Créer un tableau des données regroupées par semaine
      const dataByWeek: WeekData[] = data.reduce<WeekData[]>((acc, curr, index) => {
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

      if (selectedMonth === 0) { // a la place de 0, mettre le mois actuel
        console.log(selectedMonth);
        setData(250)
        return {
          labels: labels,
          datasets: [
            {
              label: "Consommation en litres d'eau",
              data: [0, 0, consumption2, 0, 0,],
            },
          ],
        };
      }
      else {
        setData(0)
        console.log(selectedMonth);
        return {
          labels: labels,
          datasets: [
            {
              label: "Consommation en litres d'eau",
              data: [0, 0, 0, 0, 0,],
            },
          ],
        };
      }
    }
  };

  return {
    chartRef,
    selectedOption,
    selectedMonth,
    selectedYear,
    total,
    consumption2,
    handleOptionChange,
    handleMonthChange,
    handleYearChange,
    getData,
  };
};
