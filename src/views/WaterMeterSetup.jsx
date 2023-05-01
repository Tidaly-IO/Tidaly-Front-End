import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

export const WaterMeterSetup = () => {

    const [consumption, setConsumption] = useState(0);
    const [objective, setObjective] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log();
    }

    return (
        <div className="AccountParameters">
            <h2>Paramétrage du compteur d'eau</h2>
            <form className="AccountParametersForm" onSubmit={handleSubmit}>

                <label for="consumption">Consomation actuelle</label>
                <input className="inputClass" value={consumption} onChange={(e) => setConsumption(e.target.value)} type="number" id="consumption" name="consumption" min="0" max="9999999"></input>

                <label for="objective">Objectif de consomation</label>
                <input className="inputClass" value={objective} onChange={(e) => setObjective(e.target.value)} type="number" id="objective" name="objective" min="0" max="9999999"></input>
                <Link to="/SensorDetails">
                    <button className="btn-register" type="submit">Enregistrer</button>
                </Link>
            </form>
            <Link to="/AccountSetup">
                <button className="link-button" >Retour</button>
            </Link>
        </div>
    )
}
