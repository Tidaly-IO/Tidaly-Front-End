import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import logo from '../../assets/tidaly/LogoTidaly.png';
import './css/Register.css';
import { useRegister } from './components/Query.tsx';

interface RegisterProps {
}

export const Register: React.FC<RegisterProps> = (props) => {
  const {
    email,
    password,
    confirmPassword,
    errorMessage,
    errorMessageDisplay,
    displayErrorMessage,
    setEmail,
    setPass,
    setConfirmPassword,
    handleSubmit,
    checkFormValidity,
  } = useRegister();

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
          <h1 style={{ fontFamily: "Arial", fontSize: "54px", color: "rgb(75, 171, 240)" }}>S'inscrire</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-groupRegister">
              <label className="labelRegister">Adresse email</label>
              <input
                className="inputRegister"
                value={email}
                onChange={(e) => { setEmail(e.target.value); checkFormValidity(); }}
                type="email"
                placeholder="votremail@gmail.com"
                id="email"
                name="email"
              />
            </div>
            <div className="form-groupRegister">
              <label className="labelRegister">Mot de passe</label>
              <input
                className="inputRegister"
                value={password}
                onChange={(e) => { setPass(e.target.value); checkFormValidity(); }}
                type="password"
                placeholder="************"
                id="password"
                name="password"
                minLength={8}
              />
            </div>
            <div className="form-groupRegister">
              <label className="labelRegister">Confirmer le mot de passe</label>
              <input
                className="inputRegister"
                value={confirmPassword}
                onChange={(e) => { setConfirmPassword(e.target.value); checkFormValidity(); }}
                type="password"
                placeholder="************"
                id="passwordConfirm"
                name="passwordConfirm"
                minLength={8}
              />
            </div>
            <div className="form-group">
              <button type="submit" className="buttonRegister">S'inscrire</button>
            </div>
          </form>
        </div>
        <Link to="/">
          <button className="link-button" >J'ai déjà un compte !</button>
        </Link>
      </div>
    </div>
  );
};
