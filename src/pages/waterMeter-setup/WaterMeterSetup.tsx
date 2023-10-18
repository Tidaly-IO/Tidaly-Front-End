import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios";
import logo from '../../assets/tidaly/LogoTidaly.png';
import './css/WaterMeterSetup.css';

const instance = axios.create({
  baseURL: 'http://20.111.43.70:3333/api/v1',
  headers: { Authorization: 'Bearer ' + `${localStorage.getItem("token")}` }
});

export const WaterMeterSetup = () => {
  const [consumption, setConsumption] = useState<number>(0);
  const [objective, setObjective] = useState<number>(0);
  const [isValid, setIsValid] = useState<boolean>(false);

  const parseNumber = (value: string): number => {
    const parsedValue = parseInt(value, 10);
    return isNaN(parsedValue) ? 0 : parsedValue;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const parsedConsumption = parseNumber(consumption.toString());
    const parsedObjective = parseNumber(objective.toString());

    if (parsedConsumption > 9999999 || parsedObjective > 9999999) {
      alert("Les valeurs de consommation et/ou d'objectif ne peuvent pas dépasser 9999999.");
      setIsValid(false);
    } else if (!/^\d+$/.test(consumption.toString()) || !/^\d+$/.test(objective.toString())) {
      alert("Les valeurs de consommation et/ou d'objectif ne peuvent contenir que des chiffres.");
      setIsValid(false);
    } else {
      try {
        const response = await instance.post("/user/profile", {
          firstname: `${localStorage.getItem("firstName")}`,
          lastname: `${localStorage.getItem("name")}`,
          address: `${localStorage.getItem("adresse")}`,
          countryCode: `${localStorage.getItem("pays")}`,
          city: `${localStorage.getItem("ville")}`,
          postalCode: `${localStorage.getItem("codePostale")}`,
          waterConsumed: parsedConsumption,
          waterConsumptionTarget: parsedObjective,
        });
        setIsValid(true);
      } catch (error) {
        console.log(error);
      }
    }
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
                onChange={(e: ChangeEvent<HTMLInputElement>) => setConsumption(e.target.value)}
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
                onChange={(e: ChangeEvent<HTMLInputElement>) => setObjective(e.target.value)}
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
