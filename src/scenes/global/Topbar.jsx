import { Alert, Box, Button, IconButton, MenuItem, Modal, Select, TextField, useTheme, FormControl, FormControlLabel, InputLabel, Switch, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { ColorModeContext, tokens } from "../../theme";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Link } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
import Popover from '@mui/material/Popover';
import axios from "axios";

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

                <IconButton >
                    <NotificationsNoneOutlinedIcon />
                </IconButton>


                <IconButton component={Link} to="/userProfile">
                    <PersonOutlinedIcon />
                </IconButton>

                <IconButton onClick={handleLogout}>
                    <ExitToAppIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Topbar;
