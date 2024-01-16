import React, { useState } from 'react';
import "./css/Statistics.css"
import SideBar from '.././components/sidebar/SideBar.tsx';
import Chart from 'chart.js/auto';
import { Bar } from 'react-chartjs-2';
import fleche_haut from '../../assets/images/fleche-haut.png';
import fleche_bas from '../../assets/images/fleche-bas.png';

import { useStatisticsLogic}  from './components/Chart.tsx';

Chart.defaults.plugins.legend.display = false;


export const Statistics: React.FC = () => {
  const {
    chartRef,
    selectedOption,
    selectedMonth,
    selectedYear,
    total,
    consumption2,
    handleOptionChange,
    handleMonthChange,
    handleYearChange,
    isCurrentMonth,
    setIsCurrentMonth
  } = useStatisticsLogic();

  return (
    <div className='HomePage'>
      <SideBar />
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 className="titre" style={{ fontFamily: 'Arial', marginRight: "20px" }}>Statistiques</h1>
          <div className="select-container" style={{ display: "inline-flex" }}>
            <select id="options" name="options" value={selectedOption} onChange={handleOptionChange} style={{ marginRight: "10px" }}>
              <option value="Année">Année</option>
              <option value="Mois">Mois</option>
            </select>
            {selectedOption === 'Année' &&
              <select value={selectedYear} onChange={handleYearChange}>
                {Array.from({ length: 2 }, (_, i) => i + 2023).map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            }
            {selectedOption === 'Mois' &&
              <div style={{ display: "flex", alignItems: "center" }}>
                <select
                  style={{ marginRight: "10px", width: "100px" }}
                  value={selectedMonth}
                  onChange={handleMonthChange}
                >
                  {Array.from({ length: 12 }, (_, i) => i).map((monthIndex) => (
                    <option key={monthIndex} value={monthIndex}>
                      {new Date(selectedYear, monthIndex, 1).toLocaleString('default', { month: 'long' })}
                    </option>
                  ))}
                </select>
                <select
                  style={{ marginRight: "10px", width: "100px" }}
                  value={selectedYear}
                  onChange={handleYearChange}
                >
                  {Array.from({ length: 2 }, (_, i) => i + 2023).map((year) => (
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
          <h5 style={{ fontFamily: 'Arial', marginRight: "10px", color: "rgb(102, 102, 102)", marginTop: "50px" }}>Résumé de ma consommation</h5>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            <div className='blue-square'>
              <img src={fleche_bas} className="image" alt="Flèche bas" />
              <img src={fleche_bas} className="image2" alt="Flèche bas" />

              {isCurrentMonth ?
              <>
               <h3 className="moneySpent" style={{ fontFamily: 'Arial', marginRight: "67px", marginTop: "100px", color: 'white' }}>Argent dépensé : {(consumption2 / 1000 * 3.5).toFixed(2)} €</h3>
              <h3 className="literSpent" style={{ fontFamily: 'Arial', marginRight: "30px", marginTop: "50px", color: 'white' }}>Litres consommés : {consumption2} L</h3>
              </>
              :
              <>
               <h3 className="moneySpent" style={{ fontFamily: 'Arial', marginRight: "67px", marginTop: "100px", color: 'white' }}>Argent dépensé : {0} €</h3>
              <h3 className="literSpent" style={{ fontFamily: 'Arial', marginRight: "30px", marginTop: "50px", color: 'white' }}>Litres consommés : {0} L</h3>
              </>

            }
              {/* <h3 className="moneySpent" style={{ fontFamily: 'Arial', marginRight: "67px", marginTop: "100px", color: 'white' }}>Argent dépensé : {(consumption2 / 1000 * 3.5).toFixed(2)} €</h3>
              <h3 className="literSpent" style={{ fontFamily: 'Arial', marginRight: "30px", marginTop: "50px", color: 'white' }}>Litres consommés : {consumption2} L</h3> */}
            </div>
            <div className='blue-square'>
              <img src={fleche_haut} className="image" alt="Flèche haut" />
              <img src={fleche_haut} className="image2" alt="Flèche haut" />
              <h3 className="moneySave" style={{ fontFamily: 'Arial', marginRight: "100px", marginTop: "100px", color: 'white' }}>Économies : {Math.floor(Math.random() * 100)} €</h3>
              <h3 className="literSave"style={{ fontFamily: 'Arial', marginRight: "30px", marginTop: "50px", color: 'white' }}>Litres économisés : {Math.floor(Math.random() * 100)} L</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
