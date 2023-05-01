import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import logo from '../assets/LogoTidaly.png';
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3333/api/v1',
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
            setDisplayErrorMessage(false)
            if (password == confirmPassword) {
                alert("request")
                try {
                const response = await instance.post("/register", {
                    email: email,
                    password: password,
                });
                console.log(response);
                window.location.href = "http://localhost:3000/";
                } catch (error) {
                setErrorMessage(error.response.data.message);
                }
            } else {
                alert("not same password")
                setDisplayErrorMessage(true)
                setErrorMessageDisplay("Veuillez saisir le même mot de passe")
            }
        }
        else {
            alert("something is empty")
            setDisplayErrorMessage(true)
            setErrorMessageDisplay("Tous les champs ne sont pas remplies")
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
        <div className="auth-form-container">

            <div className="circle-Container">
                <div className="circleRegister">
                    <img className="logo" src={logo} alt="Logo"></img>
                </div>
            </div>

            <h2>Page d'inscription</h2>

            {displayErrorMessage && (
            <p>{errorMessageDisplay}</p>
            )}

            <form className="register-form" onSubmit={handleSubmit}>

                <label htmlFor="email"> E-mail </label>
                <input className ="BtnRegisterConnexion" value={email} onChange={(e) => {setEmail(e.target.value); checkFormValidity();}} type="email" placeholder="votremail@gmail.com" id="email" name="email" />

                <label htmlFor="password"> Mot de passe </label>
                <input className ="BtnRegisterConnexion" value={password} onChange={(e) => {setPass(e.target.value); checkFormValidity();}} type="password" placeholder="************" id="password" name="password" minlength="8"/>

                <label htmlFor="passwordConfirm"> Confirmer le mot de passe </label>
                <input className ="inputClass" value={confirmPassword} onChange={(e) => {setConfirmPassword(e.target.value); checkFormValidity();}} type="password" placeholder="************" id="passwordConfirm" name="passwordConfirm" minlength="8"/>

                <button className="btn-submit" type="submit">S'inscrire</button>
            </form>

            <Link to="/">
                <button className="link-button" >J'ai déjà un compte !</button>
            </Link>
        </div>
    )
}