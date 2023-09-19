import React from "react";
import logo from '../../assets/tidaly/LogoTidaly.png';
import './css/AccountSetup.css';
import FormLogic from './components/FormLogic';

const AccountSetup: React.FC = () => {
  return (
    <div className="containerAccountSetup">
      <div className="left-panelAccountSetup">
        <div className="circleAccountSetup">
          <img src={logo} alt="Logo" className="logo" />
          <h2 className="circle-textAccountSetup">TIDALY</h2>
        </div>
      </div>
      <div className="right-panel">
        <div className="testAccountSetup">
          <h1 style={{ fontFamily: "Arial, sans-serif", fontSize: "35px", color: "rgb(75, 171, 240)" }}>Paramétrage du compte</h1>
          <FormLogic />
        </div>
      </div>
    </div>
  );
};

export default AccountSetup;
