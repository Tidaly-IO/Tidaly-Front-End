import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

export const AccountSetup = () => {
    const [name, setName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [sexe, setSexe] = useState("");
    const [adresse, setAdresse] = useState("");
    const [pays, setPays] = useState("");
    const [isValid, setIsValid] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !firstName  || !adresse || !pays) {
            alert("S'il vous plaît, remplissez tous les champs obligatoires.");
            return;
        } else {
            setIsValid(true);
        }
    }

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
        localStorage.setItem('firstName', e.target.value);
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
        localStorage.setItem('name', e.target.value);
    }

    const handleSexeChange = (e) => {
        setSexe(e.target.value);
        localStorage.setItem('sexe', e.target.value);
    }

    const handleAdresseChange = (e) => {
        setAdresse(e.target.value);
        localStorage.setItem('adresse', e.target.value);
    }

    const handleCountryChange = (e) => {
        setPays(e.target.value);
        localStorage.setItem('pays', e.target.value);
    }

    return (
        <div className="AccountParameters">
            <h2>Paramétrage du compte</h2>
            <form className="AccountParametersForm" onSubmit={handleSubmit}>
                <label htmlFor="name">Nom</label>
                <input className="inputClass" value={name} onChange={handleNameChange} type="text" placeholder="Votre nom" id="name" name="name"/>

                <label htmlFor="firstName">Prénom</label>
                <input className="inputClass" value={firstName} onChange={handleFirstNameChange} type="text" placeholder="Votre prénom" id="firstName" name="firstName"/>

                {/* <label htmlFor="sexe">Sexe</label>
                <select className="inputClass" value={sexe} onChange={handleSexeChange}  id="sexe" name="sexe">
                    <option value="Homme">Homme</option>
                    <option value="Femme">Femme</option>
                </select> */}

                <label htmlFor="adresse">Adresse</label>
                <input className="inputClass" value={adresse} onChange={handleAdresseChange} type="text" placeholder="Votre adresse" id="adresse" name="adresse"/>

                <label htmlFor="pays">Pays</label>
                <input className="inputClass" value={pays} onChange={handleCountryChange} type="text" placeholder="Votre pays" id="pays" name="pays"/>
                {isValid ? (
                    <Link to="/WaterMeterSetup">
                        <button className="btn-register" type="submit">Continuer</button>
                    </Link>
                ) : (
                    <button className="btn-register" type="submit">Continuer</button>
                )}
            </form>
        </div>
    )
}