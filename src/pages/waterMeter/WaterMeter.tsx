import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/tidaly/LogoTidaly.png';
import '../waterMeter-setup/css/WaterMeterSetup.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';



const instance = axios.create({
  baseURL: 'http://20.111.43.70:3333/api/v1',
  headers: { Authorization: 'Bearer ' + `${localStorage.getItem("token")}` }
});

export const WaterMeter = () => {
  const [hubId, setHubId] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [path, setPath] = useState<string>("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (hubId === "") {
      alert("Veuillez remplir le champ.");
      setIsValid(false);
    } else {
      try {
        const response = await instance.get("/hub/" + hubId);
        const data = response.data;

        if (data === false) {
          localStorage.setItem("hubId", hubId);
          setPath("/WaterMeterSetup");
          setIsValid(true);
        }
        if (data === true) {
          localStorage.setItem("hubId", hubId);
          setPath("/HomePage");
          setIsValid(true);
        }
      } catch (error) {
        alert("Veuillez saisir un ID existant");
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
          <h1 style={{ fontFamily: "Arial", fontSize: "34px", color: "rgb(75, 171, 240)" }}>Ajout du compteur d'eau</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-groupWaterMeterSetup">
              <label className="labelWaterMeterSetup" htmlFor="hubId">
                Id du HUB
                <FontAwesomeIcon
                  icon={faQuestionCircle}
                  className="info-icon"
                  onClick={() => alert("Veuillez trouver l'id du HUB derrière votre HUB et le saisir dans le champ ci-dessous.")}
                />
              </label>
              <input
                className="inputWaterMeterSetup"
                value={hubId}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setHubId(e.target.value)}
                type="text"
                placeholder="Id du HUB"
                id="hubId"
                name="hubId"
              />
            </div>
            {isValid ? (
              <Link to={path}>
                <button className="buttonWaterMeterSetup" type="submit">Enregistrer</button>
              </Link>
            ) : (
              <button className="buttonWaterMeterSetup" type="submit">Enregistrer</button>
            )}
          </form>
          <Link to="/HomePage">
            <button className="link-button" >Passer</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WaterMeter;
