import React from 'react';
import './css/SideBar.css';
import { SideBarData } from './SideBarData';
import { SideBarData2 } from './SideBarData';
import logo from '../../../assets/tidaly/LogoTidaly.png';

function SideBar() {
    return (
        <div className='SideBar'>

            <div className="circle-Container2">
                <div className="circle2">
                        <img className="logo" src={logo} alt="Cloudy Sky"></img>
                        <h2>TIDALY</h2>
                </div>
            </div>
            <ul className='SideBarList'>
                {SideBarData.map((val, key) => {
                    return (
                        <li
                            key={key}
                            className='row'
                            id={window.location.pathname === val.link ? "active" : ""}
                            onClick={() => {window.location.pathname = val.link}}
                        >
                            <div>
                                <div id ="icon"> {val.icon} </div>
                                <div id="title"> {val.title} </div>
                            </div>
                        </li>
                    );
                })}
                <div className='addSpace'></div>
                {SideBarData2.map((val, key) => {
                    return (
                        <li
                            key={key}
                            className='row'
                            id={window.location.pathname === val.link ? "active" : ""}
                            onClick={() => {window.location.pathname = val.link}}
                        >
                            <div>
                                <div id ="icon"> {val.icon} </div>
                                <div id="title"> {val.title} </div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default SideBar;