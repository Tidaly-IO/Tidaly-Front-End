import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import logo from '../assets/LogoTidaly.png';
import '../css/Login.css';
import apiUrl from '../config';
import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://tidaly.fr:3333/api/v1',
  headers: { 'Access-Control-Allow-Origin': '*' }
});

export const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessageDisplay, setErrorMessageDisplay] = useState('');
  const [displayErrorMessage, setDisplayErrorMessage] = useState('');
  var test = false;

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("firstName");
    localStorage.removeItem("name");
    localStorage.removeItem("adresse");
    localStorage.removeItem("pays");
    localStorage.removeItem("ville");
    localStorage.removeItem("codePostale");
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await instance.post("/login", {
        email: email,
        password: password,
      });
      localStorage.setItem("token", response.data.token.token)
      console.log(response.data.token.token);
      console.log(response);
      setDisplayErrorMessage(false)
    } catch (error) {
      setDisplayErrorMessage(true)
      setErrorMessageDisplay("E-mail ou mot de passe incorrect")
      test = true;
    }
    if (test === false) {
      try {
        const instance2 = axios.create({
          baseURL: 'http://tidaly.fr:3333/api/v1',
          headers: { Authorization: 'Bearer ' + localStorage.getItem("token") }
        });
        const response = await instance2.get("/user/profile");
        const data = response.data;
        console.log(data);
        if (data.firstname != null) {
          window.location.href = `${apiUrl}/HomePage`;
        }
      } catch (error) {
        window.location.href = `${apiUrl}/AccountSetup`;
        console.error("Erreur lors de la récupération des informations :", error);
      }
    }
  };

  return (
    <div className="container">
      <div className="left-panel">
        <div className="circle">
          <img src={logo} alt="Logo" className="logo" />
          <h2>TIDALY</h2>
        </div>
      </div>
      <div className="right-panel">
        {displayErrorMessage && (
          <p>{errorMessageDisplay}</p>
        )}
        <div className="test">
          <h1 style={{ fontFamily: "Arial", fontSize: "54px", color: "rgb(75, 171, 240)" }}>S'identifier</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="label">Adresse email</label>
              <input
                type="email"
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="label">Mot de passe</label>
              <input
                type="password"
                className="input"
                value={password}
                onChange={(e) => setPass(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
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
