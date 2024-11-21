import { Box, IconButton } from "@mui/material";
import { Link } from "react-router-dom";
import NotificationsMenu from "../../components/NotificationsMenu";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
 const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      <Box display="flex"></Box>

      <Box display="flex">
        {/* Notifications */}
        <NotificationsMenu />

        {/* Profil */}
        <IconButton component={Link} to="/userProfile">
          <PersonOutlinedIcon />
        </IconButton>

        {/* Déconnexion */}
        <IconButton onClick={handleLogout}>
          <ExitToAppIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
