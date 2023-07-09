import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import logo from '../assets/LogoTidaly.png';
import axios from 'axios';
import '../css/Register.css';
import apiUrl from '../config'

const instance = axios.create({
    baseURL: 'http://tidaly.fr:3333/api/v1',
    headers: { 'Access-Control-Allow-Origin': '*' }
  });

export const Register = (props) => {
    const [email, setEmail] = useState('')
    const [password,  setPass] = useState('')
    const [confirmPassword,  setConfirmPassword] = useState('')
    const [formValid, setFormValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessageDisplay, setErrorMessageDisplay] = useState("");
    const [displayErrorMessage, setDisplayErrorMessage] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (formValid == true) {
          setDisplayErrorMessage(false);
          if (password == confirmPassword) {
            try {
              const response = await instance.post("/register", {
                email: email,
                password: password,
              });
              console.log(response);
              window.location.href = `${apiUrl}/`;
            } catch (error) {
              if (
                error.response &&
                error.response.data &&
                error.response.data.errors
              ) {
                const uniqueError = error.response.data.errors.find(
                  (error) => error.rule === "unique" && error.field === "email"
                );
                if (uniqueError) {
                  setDisplayErrorMessage(true);
                  setErrorMessageDisplay("L'e-mail est déjà pris. Veuillez en choisir un autre.");
                  return; // Arrêter l'exécution de la fonction handleSubmit
                }
              }
              setErrorMessage(error.response.data.message);
            }
          }
          else {
            setDisplayErrorMessage(true);
            setErrorMessageDisplay("Veuillez saisir le même mot de passe");
          }
        }
        else {
          setDisplayErrorMessage(true);
          setErrorMessageDisplay("Tous les champs ne sont pas remplis");
        }
    };

    const checkFormValidity = () => {
        if (email && password && confirmPassword) {
          setFormValid(true);
        } else {
          setFormValid(false);
        }
      };

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
                    value={email} onChange={(e) => {setEmail(e.target.value); checkFormValidity();}} type="email" placeholder="votremail@gmail.com" id="email" name="email"
                  />
                </div>
                <div className="form-groupRegister">
                  <label className="labelRegister">Mot de passe</label>
                  <input
                    className="inputRegister"
                    value={password} onChange={(e) => {setPass(e.target.value); checkFormValidity();}} type="password" placeholder="************" id="password" name="password" minlength="8"/>
                </div>
                <div className="form-groupRegister">
                  <label className="labelRegister">Confirmer le mot de passe</label>
                  <input
                    className="inputRegister"
                    value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value); checkFormValidity();}} type="password" placeholder="************" id="passwordConfirm" name="passwordConfirm" minlength="8"/>
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
}