import React, { useState } from "react";
import { BrowserRouter as Link } from 'react-router-dom';

export const WaterMeterSetup = () => {
    const [consumption, setConsumption] = useState(0);
    const [objective, setObjective] = useState(0);
    const [isValid, setIsValid] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (consumption > 9999999 || objective > 9999999) {
            alert("Les valeurs de consommation et/ou d'objectif ne peuvent pas dépasser 9999999.");
            setIsValid(false);
        } else if (!/^\d+$/.test(consumption) || !/^\d+$/.test(objective)) {
            alert("Les valeurs de consommation et/ou d'objectif ne peuvent contenir que des chiffres.");
            setIsValid(false);
        } else {
            setIsValid(true);
        }
    }

    return (
        <div className="AccountParameters">
            <h2>Paramétrage du compteur d'eau</h2>
            <form className="AccountParametersForm" onSubmit={handleSubmit}>

                <label htmlFor="consumption">Consommation actuelle</label>
                <input className="inputClass" value={consumption} onChange={(e) => setConsumption(e.target.value)} type="number" id="consumption" name="consumption" min="0" max="9999999"></input>

                <label htmlFor="objective">Objectif de consommation</label>
                <input className="inputClass" value={objective} onChange={(e) => setObjective(e.target.value)} type="number" id="objective" name="objective" min="0" max="9999999"></input>

                {isValid ? (
                    <Link to="/SensorDetails">
                        <button className="btn-register" type="submit">Enregistrer</button>
                    </Link>
                ) : (
                    <button className="btn-register" type="submit">Enregistrer</button>
                )}

            </form>
            <Link to="/AccountSetup">
                <button className="link-button" >Retour</button>
            </Link>
        </div>
    )
}

export default WaterMeterSetup;
