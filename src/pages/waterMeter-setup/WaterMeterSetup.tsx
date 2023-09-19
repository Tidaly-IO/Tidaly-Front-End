import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/tidaly/LogoTidaly.png';
import { useWaterMeterSetupLogic } from './components/Query.tsx';
import './css/WaterMeterSetup.css';

export const WaterMeterSetup = () => {
  const {
    consumption,
    objective,
    isValid,
    setConsumption,
    setObjective,
    handleSubmit,
  } = useWaterMeterSetupLogic();

  // Fonction pour convertir une chaîne de caractères en nombre
  const parseNumber = (value: string): number => {
    const parsedValue = parseInt(value, 10);
    return isNaN(parsedValue) ? 0 : parsedValue;
  };

  return (
    <div className="containerWaterMeterSetup">
      <div className="left-panelWaterMeterSetup">
        <div className="circleWaterMeterSetup">
          <img src={logo} alt="Logo" className="logo" />
          <h2 className="circle-textWaterMeterSetup">TIDALY</h2>
        </div>
      </div>
      <div className="right-panel">
        <div className="testWaterMeterSetup">
          <h1 style={{ fontFamily: "Arial", fontSize: "34px", color: "rgb(75, 171, 240)" }}>Paramétrage du compteur d'eau</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-groupWaterMeterSetup">
              <label className="labelWaterMeterSetup" htmlFor="consumption">Consommation actuelle</label>
              <input
                className="inputWaterMeterSetup"
                value={consumption}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setConsumption(parseNumber(e.target.value))}
                type="number"
                placeholder="Consommation actuelle"
                id="consumption"
                name="consumption"
                min="0"
                max="9999999"
              />
            </div>
            <div className="form-groupWaterMeterSetup">
              <label className="labelWaterMeterSetup" htmlFor="objective">Objectif de consommation</label>
              <input
                className="inputWaterMeterSetup"
                value={objective}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setObjective(parseNumber(e.target.value))}
                type="number"
                placeholder="Objectif de consommation"
                id="objective"
                name="objective"
                min="0"
                max="9999999"
              />
            </div>
            {isValid ? (
              <Link to="/HomePage">
                <button className="buttonWaterMeterSetup" type="submit">Enregistrer</button>
              </Link>
            ) : (
              <button className="buttonWaterMeterSetup" type="submit">Enregistrer</button>
            )}
          </form>
          <Link to="/AccountSetup">
            <button className="link-button" >Retour</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WaterMeterSetup;
