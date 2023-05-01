import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

export const AccountSetup = () => {
    const [name, setName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [sexe, setSexe] = useState("");
    const [adresse, setAdresse] = useState("");
    const [pays, setPays] = useState("");

    useEffect(() => {
        const firstNameStorage = localStorage.getItem('firstName');
        const nameStorage = localStorage.getItem('name');
        const sexeStorage = localStorage.getItem('sexe');
        const adresseStorage = localStorage.getItem('adresse');
        const paysStorage = localStorage.getItem('pays');

        if (firstNameStorage != null ) {
            setFirstName(JSON.parse(firstNameStorage));
        }
        if (nameStorage != null ) {
            setName(JSON.parse(nameStorage));
        }
        if (sexeStorage != null ) {
            setSexe(JSON.parse(sexeStorage));
        }
        if (adresseStorage != null ) {
            setAdresse(JSON.parse(adresseStorage));
        }
        if (paysStorage != null ) {
            setPays(JSON.parse(paysStorage));
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name, firstName);
    }

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
        localStorage.setItem('firstName', JSON.stringify(e.target.value));
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
        localStorage.setItem('name', JSON.stringify(e.target.value));
    }

    const handleSexeChange = (e) => {
        setSexe(e.target.value);
        localStorage.setItem('sexe', JSON.stringify(e.target.value));
    }

    const handleAdresseChange = (e) => {
        setAdresse(e.target.value);
        localStorage.setItem('adresse', JSON.stringify(e.target.value));
    }

    const handleCountryChange = (e) => {
        setPays(e.target.value);
        localStorage.setItem('pays', JSON.stringify(e.target.value));
    }

    return (
        <div className="AccountParameters">
            <h2>Paramétrage du compte</h2>
            <form className="AccountParametersForm" onSubmit={handleSubmit}>
                <label htmlFor="name">Nom</label>
                <input className="inputClass" value={name} onChange={handleNameChange} type="text" placeholder="Votre nom" id="name" name="name"/>

                <label htmlFor="firstName">Prénom</label>
                <input className="inputClass" value={firstName} onChange={handleFirstNameChange} type="text" placeholder="Votre prénom" id="firstName" name="firstName"/>

                <label htmlFor="sexe">Sexe</label>
                <select className="inputClass" value={sexe} onChange={handleSexeChange}  id="sexe" name="sexe">
                    <option value="Homme">Homme</option>
                    <option value="Femme">Femme</option>
                </select>

                <label htmlFor="adresse">Adresse</label>
                <input className="inputClass" value={adresse} onChange={handleAdresseChange} type="text" placeholder="Votre adresse" id="adresse" name="adresse"/>

                <label htmlFor="pays">Pays</label>
                <input className="inputClass" value={pays} onChange={handleCountryChange} type="text" placeholder="Votre pays" id="pays" name="pays"/>

                <Link to="/WaterMeterSetup">
                    <button className="btn-register" type="submit">Continuer</button>
                </Link>
            </form>
        </div>
    )
}