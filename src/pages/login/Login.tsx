import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from '../../assets/tidaly/LogoTidaly.png';
import './css/Login.css';
import { useLogin } from './components/Query';

interface LoginProps {
  // Si vous avez des propriétés à ajouter, déclarez-les ici.
}

const Login: React.FC<LoginProps> = (props) => {
  const {
    email,
    password,
    errorMessage,
    errorMessageDisplay,
    displayErrorMessage,
    setEmail,
    setPass,
    handleSubmit,
  } = useLogin();

  return (
    <div className="containerRegister">
      <div className="left-panelRegister">
        <div className="circleRegister">
          <img src={logo} alt="Logo" className="logo" />
          <h2 className="circle-textRegister">TIDALY</h2>
        </div>
      </div>
      <div className="right-panelRegister">
        {displayErrorMessage && (
          <p>{errorMessageDisplay}</p>
        )}
        <div className="testRegister">
          <h1 style={{ fontFamily: "Arial", fontSize: "54px", color: "rgb(75, 171, 240)" }}>S'identifier</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-groupRegister">
              <label className="label">Adresse email</label>
              <input
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="votremail@gmail.com"
              />
            </div>
            <div className="form-groupRegister">
              <label className="label">Mot de passe</label>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPass(e.target.value)}
                required
                placeholder="************"
              />
            </div>
            <div className="form-groupRegister">
              <button type="submit" className="button">Se connecter</button>
            </div>
          </form>
        </div>
        <Link to="/Register">
          <button className="link-button" >Pas de compte ? Créez en un !</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;