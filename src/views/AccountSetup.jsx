import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

export const AccountSetup = () => {
    const [name, setName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [ville, setVille] = useState("");
    const [codePostale, setCodePostale] = useState("");
    const [adresse, setAdresse] = useState("");
    const [pays, setPays] = useState("");
    const [isValid, setIsValid] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !firstName  || !adresse || !pays || !ville || !codePostale) {
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

    const handleVilleChange = (e) => {
        setVille(e.target.value);
        localStorage.setItem('ville', e.target.value);
    }

    const handleCodePostaleChange = (e) => {
        setCodePostale(e.target.value);
        localStorage.setItem('codePostale', e.target.value);
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

                <label htmlFor="adresse">Adresse</label>
                <input className="inputClass" value={adresse} onChange={handleAdresseChange} type="text" placeholder="Votre adresse" id="adresse" name="adresse"/>


                <label htmlFor="adresse">Ville</label>
                <input className="inputClass" value={ville} onChange={handleVilleChange} type="text" placeholder="Votre ville" id="ville" name="ville"/>


                <label htmlFor="codePostale">Code Postale</label>
                <input className="inputClass" value={codePostale} onChange={handleCodePostaleChange} type="text" placeholder="Votre code Postale" id="codePostale" name="codePostale"/>

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