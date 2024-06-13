import { Alert, Box, Button, IconButton, MenuItem, Modal, Select, Typography, useTheme } from "@mui/material";
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
    const theme = useTheme();
    const navigate = useNavigate();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const [notificationRecurrence, setNotificationRecurrence] = useState('Jour');
    const [notifications, setNotifications] = useState([]);
    const [consumption, setConsumption] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [anchor, setAnchor] = useState(null);
    const open = Boolean(anchor);
    const id = open ? 'simple-popover' : undefined;

    const handleLogout = () => {
        localStorage.clear();
        navigate("/");
    };

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleNotificationRecurrence = (event) => {
        setNotificationRecurrence(event.target.value);
    };

    const handleClick = (event) => {
      setAnchor(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchor(null);
    };

    const addNotification = (newItem) => {
        setNotifications((prevItems) => [...prevItems, newItem]);
    };

    const removeNotification = (index) => {
        setNotifications((prevItems) => prevItems.filter((_, i) => i !== index));
    };

    const notificationList = () => {
        return (
            notifications.length > 0 ? notifications.map((element, index) => {
                return (
                    <Box display="flex" p={1} sx={{ width: '100%' }} key={index}>
                        <Button onClick={() => {
                            removeNotification(index);
                        }} sx={{ width: '100%' }}>
                            <Alert severity="error" sx={{ width: '100%' }}>
                                {element.message}
                            </Alert>
                        </Button>
                    </Box>
                );
            }) : 
            <Box display="flex" p={1} sx={{ width: '100%' }}>
                <Button onClick={handleClose}>
                    <Alert severity="success" sx={{ width: '100%' }}>
                        Pas de notifications
                    </Alert>
                </Button>
            </Box>
        );
    };

    const notificationPopup = () => {
        return ( 
            <Popover
                id={id}
                open={open}
                anchorEl={anchor}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                sx={{ width: '100%' }}>
                <Box display="flex" justifyContent="start" p={1}>
                    <IconButton onClick={openModal}>
                        <AccessAlarmOutlinedIcon />
                    </IconButton>
                </Box>
                <Modal open={isModalOpen} onClose={closeModal}>
                    <Box
                        sx={{
                            backgroundColor: 'white',
                            boxShadow: 24,
                            padding: 4,
                            borderRadius: '8px',
                            width: '600px',
                            margin: 'auto',
                            marginTop: '200px',
                        }}
                    >
                        <form onSubmit={() => {}}>
                            <Box display="flex" flexDirection="column">
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={notificationRecurrence}
                                    label="Récurrence des notifications"
                                    onChange={handleNotificationRecurrence}>
                                    <MenuItem value={"Semaine"}>Semaine</MenuItem>
                                    <MenuItem value={"Mois"}>Mois</MenuItem>
                                    <MenuItem value={"Année"}>Année</MenuItem>
                                    <MenuItem value={"Jour"}>Jour</MenuItem>
                                </Select>
                                <Button type="submit" variant="contained" style={{backgroundColor: colors.tidaly[100], color: '#fff', marginTop: '10px'}}>
                                    Changer la récurrence des notifications
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Modal>
                { notificationList() }
            </Popover> 
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const hub = await axios.get('https://tidaly-api-backend.onrender.com/api/v1/hub', { 
                    headers: { Authorization: `Bearer ${localStorage.getItem(("token"))}` },
                });

                setConsumption(hub.data?.water_consumption_target - hub.data?.base_water_consumption);
                if (!consumption) return;

                if (hub.data?.base_water_consumption > hub.data?.water_consumption_target) {
                    const today = new Date(hub.data?.updated_at);
                    
                    switch (notificationRecurrence) {
                        case "Semaine": 
                            if (today.toLocaleDateString("fr-EU", { weekday: 'long' }) === 'lundi') {
                                const message = `Objectif de consommation dépassé de ${consumption}L le ${today.toLocaleDateString("fr-EU")}`;
                                addNotification({ message: message });
                            } break;
                        case "Mois": 
                            if (today.getDate() === '0') {
                                const message = `Objectif de consommation dépassé de ${consumption}L le ${today.toLocaleDateString("fr-EU")}`;
                                addNotification({ message: message });
                            } break;
                        case "Année":
                            if (today.toLocaleDateString("fr-EU", { month: 'long' }) === 'décembre') {
                                const message = `Objectif de consommation dépassé de ${consumption}L le ${today.toLocaleDateString("fr-EU")}`;
                                addNotification({ message: message });
                            } break;
                        case "Jour": 
                            const message = `Objectif de consommation dépassé de ${consumption}L le ${today.toLocaleDateString("fr-EU")}`;
                            addNotification({ message: message });
                            break;
                        default: break;
                    };
                    
                }

            } catch (error) {
                console.log('Unable to fetch notifications data', error);
            }
        };

        fetchData();
    }, [consumption, notificationRecurrence]);

    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            <Box display="flex"></Box>
            <Box display="flex">
                {/* <IconButton onClick={colorMode.toggleColorMode}>
                  {theme.palette.mode === "dark" ? (
                    <DarkModeOutlinedIcon />
                  ) : (
                    <LightModeOutlinedIcon />
                  )}
                </IconButton> */}
                {notifications.length > 0 ? 
                <IconButton onClick={handleClick}>
                    <NotificationsIcon />
                </IconButton> 
                : <IconButton onClick={handleClick}>
                    <NotificationsNoneOutlinedIcon />
                </IconButton>}
                { notificationPopup() }
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
