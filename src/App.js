import { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import SignIn from "./scenes/login/login";
import Register from "./scenes/register/register";
import AccountSetup from "./scenes/accountSetup/accountSetup";
import WaterMeter from "./scenes/waterMeter/waterMeter";
import WaterMeterSetup from "./scenes/waterMeterSetup/waterMeterSetup";
import UserProfile from "./scenes/userProfile/userProfile";
import SensorConsumption from "./scenes/sensorConsumption/sensorConsumption";
import Home from "./scenes/home";
import Statistics from "./scenes/statistics/statistics";
import SharedSensorConsumption from "./scenes/sharedSensorConsumption";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import SensorDetails from "./scenes/sensorDetails/sensorDetails";
import Tutorial from "./scenes/tutorial/tutorial";
import RecoverPassword from "./scenes/recoverPassword/recoverPassword";
import Feedback from "./scenes/feedback/feedback";
import Hearth from "./scenes/hearth/hearth";
import Hearth2 from "./scenes/hearth/hearth2";
import Estimator from "./scenes/estimator/estimator";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();
  const hideSidebarRoutes = ["/", "/register", "/recoverPassword", "/AccountSetup", "/WaterMeter", "/WaterMeterSetup", "/tutorial", "/feedback", "/hearth", "/hearth2"];
  const shouldShowSidebar = !hideSidebarRoutes.includes(location.pathname);

  return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            {shouldShowSidebar && <Sidebar isSidebar={isSidebar} />}
            <main className="content">
              {shouldShowSidebar && <Topbar setIsSidebar={setIsSidebar} />}
              <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/register" element={<Register />} />
                <Route path="/recoverPassword" element={<RecoverPassword />} />
                <Route path="/accountSetup" element={<AccountSetup />} />
                <Route path="/waterMeter" element={<WaterMeter />} />
                <Route path="/waterMeterSetup" element={<WaterMeterSetup />} />
                <Route path="/userProfile" element={<UserProfile />} />
                <Route path="/sensorConsumption" element={<SensorConsumption />} />
                <Route path={"/sensorDetails"} element={<SensorDetails />} />
                <Route path="/sharedSensorConsumption" element={<SharedSensorConsumption />} />
                <Route path="/statistics" element={<Statistics/>} />
                <Route path="/tutorial" element={<Tutorial/>} />
                <Route path="/home" element={<Home />} />
                <Route path="/feedback" element={<Feedback />} />
                <Route path="/hearth" element={<Hearth />} />
                <Route path="/hearth2" element={<Hearth2 />} />
                <Route path="/estimator" element={<Estimator />} />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
  );
}

export default App;
