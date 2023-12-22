import React, { useState, useEffect, useRef, ChangeEvent } from 'react';
import Chart from 'chart.js/auto';

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
  const [selectedMonth, setSelectedMonth] = useState<number>(1);
  const [selectedYear, setSelectedYear] = useState<number>(2023);
  const [total, setTotal] = useState<number>(0);

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
  }, [chartRef, selectedOption, selectedMonth, selectedYear]);

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

      if (selectedYear === 2023) {
        const data = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100));

        setTotal(250);
        return {
          labels: [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet',
            'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre',
          ],
          datasets: [
            {
              label: "Consommation en litres d'eau",
              data: [0, 0, 0, 0, 0, 0, 0,0, 0, 0, 250, 0],
            },
          ],
        };
      }
      else {
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
              data: data,
            },
          ],
        };
      }
    } else {
      // Données pour le mois sélectionné
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

      return {
        labels: labels,
        datasets: [
          {
            label: "Consommation en litres d'eau",
            data: dataByWeek.map((week) => week.sum),
          },
        ],
      };
    }
  };

  return {
    chartRef,
    selectedOption,
    selectedMonth,
    selectedYear,
    total,
    handleOptionChange,
    handleMonthChange,
    handleYearChange,
    getData,
  };
};
