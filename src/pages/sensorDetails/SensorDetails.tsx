import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SideBar from '.././components/sidebar/SideBar.tsx';
import "./css/SensorDetails.css"
import loupe from '../../assets/images/loupe.png';
import ReactModal from 'react-modal';
import { useSensorDetailsLogic } from './components/Widget.tsx';

function SensorDetails() {
  const {
    squares,
    searchTerm,
    setSquares,
    setSearchTerm,
    modalIsOpen,
    selectedColor,
    widgetName,
    openModal,
    closeModal,
    setSelectedColor,
    setWidgetName,
    getRandomValue,
    getSquareColor,
    renderCircle,
    addSquare,
    removeSquare,
  } = useSensorDetailsLogic();

  const filteredSquares = squares.filter((square) =>
    square.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="HomePage">
      <SideBar />

      <div>
        <div className="titre-container">
          <h1 className="titre" style={{ fontFamily: 'Arial' }}>Mes capteurs</h1>
        </div>

        <div className="rectangle">
          {/* Barre de recherche */}
          <div className="search-bar-container">
            <img src={loupe} alt="loupe" className="search-icon" />
            <div className="search-bar" contentEditable={true} onInput={(e: React.FormEvent<HTMLDivElement>) => setSearchTerm(e.currentTarget.textContent || '')}>
              <span className={`placeholder-text ${searchTerm ? 'hidden' : ''}`}>Rechercher un capteur...</span>
            </div>
          </div>

          <div className="rectangle-content">
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "flex-start", marginTop: "50px" }}>
              {filteredSquares.map((square, index) => (
                <div key={index} style={{ width: "150px", height: "200px", backgroundColor: square.color, margin: "10px", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", borderRadius: "10px", position: "relative" }}>
                  {/* Bouton de suppression */}
                  <button className="delete-button" onClick={() => removeSquare(index)}>
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </button>
                  {square && (
                    <>
                      {renderCircle(square.percentage)}
                      <span>{square.name}</span>
                      <span style={{ fontSize: "12px", marginTop: "5px" }}>Consommation actuelle</span>
                      <span style={{ fontSize: "20px", fontWeight: "bold" }}>{square.value}</span>
                      <hr style={{ width: "80%", margin: "10px 0" }} />
                      <span style={{ fontSize: "12px", marginTop: "5px" }}>Consommation moyenne</span>
                      <span style={{ fontSize: "16px", fontWeight: "bold" }}>{square.average}</span>
                      <span style={{ fontSize: "16px", fontWeight: "bold" }}>{square.random}</span>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: "absolute", left: "55%", bottom: "25px", transform: "translate(-50%)" }}>
            <button className="btn-submit" onClick={openModal}>Ajouter un capteur</button>
          </div>
        </div>
      </div>
      <ReactModal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <div className="form-group">
          <label htmlFor="test">Marque du capteur :</label>
          <div>
            <input type="text" id="test" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="widgetName">Nom du capteur :</label>
          <div>
            <input type="text" id="widgetName" value={widgetName} onChange={(e) => setWidgetName(e.target.value)} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="widgetColor">Point d'eau :</label>
          <div>
            <select id="widgetColor" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)} className="select-custom">
              <option value="">Sélectionnez un point d'eau</option>
              <option value="red">Toilette</option>
              <option value="yellow">Douche</option>
              <option value="blue">Robinet</option>
            </select>
          </div>
        </div>
        <div className="button-group">
          <button className="btn-submit" onClick={addSquare}>Ajouter</button>
          <button className="btn-submit btn-cancel" onClick={closeModal}>Annuler</button>
        </div>
      </ReactModal>
    </div>
  );
}

export default SensorDetails;
