import React, { useState, useRef, useEffect  } from "react";
import './App.css';
import { Login } from './views/Login';
import { Register } from './views/Register';
import { AccountSetup } from './views/AccountSetup';
import { WaterMeterSetup } from './views/WaterMeterSetup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SensorDetails from "./views/SensorDetails.jsx";
import { HomePage } from "./views/HomePage.jsx";
import { Statistics } from "./views/Statistics.jsx";
import { UserProfile } from "./views/UserProfile.jsx";


function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/Register" element={<Register/>}/>
          <Route exact path="/AccountSetup" element={<AccountSetup/>}/>
          <Route exact path="/WaterMeterSetup" element={<WaterMeterSetup/>}/>
          <Route exact path="/SensorDetails" element={<SensorDetails />} />
          <Route exact path="/HomePage" element={<HomePage />} />
          <Route exact path="/Statistics" element={<Statistics />} />
          <Route exact path="/UserProfile" element={<UserProfile />} />
        </Routes>
      </Router>
    </div>
  );
}


export default App;