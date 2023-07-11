import React from 'react';
import '../css/SideBar.css';
import { SideBarData } from './SideBarData';
import { SideBarData2 } from './SideBarData';
import logo from '../assets/LogoTidaly.png';
import { useMediaQuery } from 'react-responsive'

function SideBar() {

    const Main = ({ uiProperties }) => {
        return (
            <div className={uiProperties.sideBar}>
    
                {uiProperties.compute && <div className={uiProperties.circleContainer2}>
                    <div className={uiProperties.circle2}>
                            <img className={uiProperties.logo} src={logo} alt="Cloudy Sky"></img>
                            <h2>TIDALY</h2>
                    </div>
                </div>}
                <ul className={uiProperties.sideBarList}>
                    {SideBarData.map((val, key) => {
                        return (
                            <li
                                key={key}
                                className={uiProperties.row}
                                id={window.location.pathname == val.link ? "active" : ""}
                                onClick={() => {window.location.pathname = val.link}}
                            >
                                <div>
                                    <div id ="icon"> {val.icon} </div>
                                    <div id="title"> {val.title} </div>
                                </div>
                            </li>
                        );
                    })}
                    <div className={uiProperties.addSpace}></div>
                    {SideBarData2.map((val, key) => {
                        return (
                            <li
                                key={key}
                                className={uiProperties.row}
                                id={window.location.pathname == val.link ? "active" : ""}
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
    };

    const Desktop = () => {
        const isDesktop = useMediaQuery({ minWidth: 992 });
        let uiProperties = {};
        uiProperties.sideBar = "SideBar-desktop";
        uiProperties.circleContainer2 = "circle-Container2-desktop";
        uiProperties.circle2 = "circle2-desktop";
        uiProperties.logo = "logo";
        uiProperties.sideBarList = "SideBarList-desktop";
        uiProperties.row = "row-desktop";
        uiProperties.addSpace = "addSpace-desktop";
        return isDesktop ? <Main uiProperties={uiProperties} /> : null;
      }
      
      const Tablet = () => {
        const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
       let uiProperties = {};
        return isTablet ? <Main uiProperties={uiProperties} /> : null;
      }
      
      const Mobile = () => {
        const isMobile = useMediaQuery({ maxWidth: 767 });
        let uiProperties = {};
        uiProperties.sideBar = "SideBar-mobile";
        uiProperties.circleContainer2 = "circle-Container2-mobile";
        uiProperties.circle2 = "circle2-mobile";
        uiProperties.logo = "logo-mobile";
        uiProperties.sideBarList = "SideBarList-mobile";
        uiProperties.row = "row-mobile";
        uiProperties.addSpace = "addSpace-mobile";
        return isMobile ? <Main uiProperties={uiProperties} /> : null;
      }

    return (
      <div>
        <Desktop />
        <Tablet />
        <Mobile />
      </div>
    );
}

export default SideBar;