import React, { useState } from "react";
import './App.css';
import { Login } from './views/Login';
import { Register } from './views/Register';
import { AccountSetup } from './views/AccountSetup';
import { WaterMeterSetup } from './views/WaterMeterSetup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SensorDetails from "./views/SensorDetails.jsx";


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
        </Routes>
    </Router>
    </div>
  );
}


export default App;