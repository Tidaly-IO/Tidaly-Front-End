import React, { useState } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import logo from '../assets/LogoTidaly.png';

import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3333/api/v1',
    headers: { 'Access-Control-Allow-Origin': '*' }
  });

export const Login = (props) => {

    const [email, setEmail] = useState('')
    const [password,  setPass] = useState('')
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessageDisplay, setErrorMessageDisplay] = useState("");
    const [displayErrorMessage, setDisplayErrorMessage] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
          const response = await instance.post("/login", {
            email: email,
            password: password,
          });
          console.log(response);
          setDisplayErrorMessage(false)
          window.location.href = "http://localhost:3000/AccountSetup";
        } catch (error) {
            setDisplayErrorMessage(true)
            setErrorMessageDisplay("E-mail ou mot de passe incorrect")
        }
    };

    return (
        <div className="auth-form-container">

            <div className="circle-Container">
                <div className="circle">
                    <img className="logo" src={logo} alt="Cloudy Sky"></img>
                </div>
            </div>

            <h2>Page de connexion</h2>

            {displayErrorMessage && (
            <p>{errorMessageDisplay}</p>
            )}

            <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email"> E-mail </label>
                <input className ="inputClass" value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="votremail@gmail.com" id="email" name="email" />

                <label htmlFor="password"> Mot de passe </label>
                <input className ="inputClass" value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="************" id="password" name="password" />

                {/* <Link to="/AccountSetup"> */}
                    <button className="btn-submit" type="submit">Se connecter</button>
                {/* </Link> */}

            </form>

            <Link to="/Register">
                <button className="link-button" >Pas de compte? Créez en un !</button>
            </Link>
        </div>
    )
}