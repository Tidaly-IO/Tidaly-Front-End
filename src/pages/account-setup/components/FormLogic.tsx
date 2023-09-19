import React, { useState } from "react";
import { Link } from 'react-router-dom';

const FormLogic: React.FC = () => {
  const [name, setName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [ville, setVille] = useState("");
  const [codePostale, setCodePostale] = useState("");
  const [adresse, setAdresse] = useState("");
  const [pays, setPays] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !firstName || !adresse || !pays || !ville || !codePostale) {
      alert("S'il vous plaît, remplissez tous les champs obligatoires.");
      return;
    } else {
      setIsValid(true);
    }
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
    localStorage.setItem('firstName', e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    localStorage.setItem('name', e.target.value);
  };

  const handleVilleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVille(e.target.value);
    localStorage.setItem('ville', e.target.value);
  };

  const handleCodePostaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodePostale(e.target.value);
    localStorage.setItem('codePostale', e.target.value);
  };

  const handleAdresseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAdresse(e.target.value);
    localStorage.setItem('adresse', e.target.value);
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPays(e.target.value);
    localStorage.setItem('pays', e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-groupAccountSetup">
          <label className="labelAccountSetup" htmlFor="name">Nom</label>
          <input
            className="inputAccountSetup"
            value={name}
            onChange={handleNameChange}
            type="text"
            placeholder="Votre nom"
            id="name"
            name="name"
          />
        </div>
        <div className="form-groupAccountSetup">
          <label className="labelAccountSetup" htmlFor="firstName">Prénom</label>
          <input
            className="inputAccountSetup"
            value={firstName}
            onChange={handleFirstNameChange}
            type="text"
            placeholder="Votre prénom"
            id="firstName"
            name="firstName"
          />
        </div>
        <div className="form-groupAccountSetup">
          <label className="labelAccountSetup" htmlFor="adresse">Adresse</label>
          <input
            className="inputAccountSetup"
            value={adresse}
            onChange={handleAdresseChange}
            type="text"
            placeholder="Votre adresse"
            id="adresse"
            name="adresse"
          />
        </div>
        <div className="form-groupAccountSetup">
          <label className="labelAccountSetup" htmlFor="ville">Ville</label>
          <input
            className="inputAccountSetup"
            value={ville}
            onChange={handleVilleChange}
            type="text"
            placeholder="Votre ville"
            id="ville"
            name="ville"
          />
        </div>
        <div className="form-groupAccountSetup">
          <label className="labelAccountSetup" htmlFor="codePostale">Code Postale</label>
          <input
            className="inputAccountSetup"
            value={codePostale}
            onChange={handleCodePostaleChange}
            type="text"
            placeholder="Votre code Postale"
            id="codePostale"
            name="codePostale"
          />
        </div>
        <div className="form-groupAccountSetup">
          <label className="labelAccountSetup" htmlFor="pays">Pays</label>
          <input
            className="inputAccountSetup"
            value={pays}
            onChange={handleCountryChange}
            type="text"
            placeholder="Votre pays"
            id="pays"
            name="pays"
          />
        </div>
        {isValid ? (
          <Link to="/WaterMeterSetup">
            <button className="buttonAccountSetup" type="submit">Continuer</button>
          </Link>
        ) : (
          <button className="buttonAccountSetup" type="submit">Continuer</button>
        )}
      </form>
    </div>
  );
};

export default FormLogic;
