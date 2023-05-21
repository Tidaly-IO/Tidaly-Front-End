import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import SideBar from '../components/SideBar';
import "../css/SensorDetails.css"

function SensorDetails() {
  const [squares, setSquares] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSquares = squares.filter(square =>
    square.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSquareColor = (type) => {
    if (type === "Toilette") {
      return "rgba(255, 0, 0, 0.5)";
    } else if (type === "Douche") {
      return "rgba(255, 255, 0, 0.5)";
    } else if (type === "Robinet") {
      return "rgba(0, 0, 255, 0.5)";
    } else {
      return "#ccc";
    }
  };

  const getRandomValue = () => {
    const value = Math.floor(Math.random() * 1000) / 10;
    return `${value} L`;
  };

  function renderCircle(value) {
    const percentage = Math.floor((value / 100) * 100);
    const radius = 35;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <svg width={radius * 2} height={radius * 2}>
        <circle cx={radius} cy={radius} r={radius - 5} fill="none" stroke="#ccc" strokeWidth="5" />
        <circle
          cx={radius}
          cy={radius}
          r={radius - 5}
          fill="none"
          stroke="green"
          strokeWidth="5"
          strokeDasharray={`${percentage / 100 * circumference} ${circumference}`}
          strokeDashoffset={`${offset}`}
          strokeLinecap="round"
        />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="18px">
          {percentage}%
        </text>
      </svg>
    );
  }


  const addSquare = () => {
    const type = prompt("Choisissez un type: Toilette, Douche ou Robinet");
    const percentage = Math.floor(Math.random() * 100);
    const random = Math.floor(Math.random() * 100) + " L";
    setSquares([...squares, { type: type, percentage: percentage, color: getSquareColor(type), value: getRandomValue(), random: random }]);
  };


  return (
    <div className="HomePage">
      <SideBar />

      <div>
        <div className="titre-container">
          <h1 className="titre" style={{ fontFamily: 'Arial' }}>Mes capteurs</h1>
        </div>

        <div className="rectangle">
          {/* Barre de recherche */}
          <input type="text" placeholder="Rechercher un capteur..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} style={{ marginBottom: '20px' }}/>
          <div className="rectangle-content">

            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start", marginTop: "50px" }}>
              {filteredSquares.map((square, index) => (
                <div key={index} style={{ width: "150px", height: "200px", backgroundColor: square.color, margin: "10px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", borderRadius: "10px" }}>
                  {renderCircle(square.percentage)}
                  <span>{square.type}</span>
                  <span style={{ fontSize: "12px", marginTop: "5px" }}>Consommation actuelle</span>
                  <span style={{ fontSize: "20px", fontWeight: "bold" }}>{square.value}</span>
                  <hr style={{ width: "80%", margin: "10px 0" }} />
                  <span style={{ fontSize: "12px", marginTop: "5px" }}>Consommation moyenne</span>
                  <span style={{ fontSize: "16px", fontWeight: "bold" }}>{square.average}</span>
                  <span style={{ fontSize: "16px", fontWeight: "bold" }}>{square.random}</span>
                </div>
              ))}
            </div>

          </div>

          <div style={{ position: "absolute", left: "55%", bottom: "25px", transform: "translate(-50%)" }}>
            <button className="btn-submit" onClick={addSquare}>Ajouter un capteur</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default SensorDetails;