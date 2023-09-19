import React from 'react';
import './App.css';
import Login from './pages/login/Login';
import { Register } from './pages/register/Register';
import AccountSetup from './pages/account-setup/AccountSetup';
import { WaterMeterSetup } from './pages/waterMeter-setup/WaterMeterSetup';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import SensorDetails from "./pages/sensorDetails/SensorDetails";
import { HomePage } from "./pages/homePage/HomePage";
import { Statistics } from "./pages/statistics/Statistics";
import { UserProfile } from "./pages/userProfile/UserProfile";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/AccountSetup" element={<AccountSetup />} />
          <Route path="/WaterMeterSetup" element={<WaterMeterSetup />} />
          <Route path="/SensorDetails" element={<SensorDetails />} />
          <Route path="/HomePage" element={<HomePage />} />
          <Route path="/Statistics" element={<Statistics />} />
          <Route path="/UserProfile" element={<UserProfile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
