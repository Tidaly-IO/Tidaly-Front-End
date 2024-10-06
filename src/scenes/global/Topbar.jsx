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
    const theme = useTheme();
    const navigate = useNavigate();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const [notificationRecurrence, setNotificationRecurrence] = useState('1min');
    const [seuilAlerte, setSeuilAlerte] = useState(0);
    const [notifications, setNotifications] = useState([]);
    const [consumption, setConsumption] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [anchor, setAnchor] = useState(null);
    const open = Boolean(anchor);
    const id = open ? 'simple-popover' : undefined;
    const [receiveNotifications, setReceiveNotifications] = useState(false);

    const handleReceiveNotificationsToggle = (event) => {
        setReceiveNotifications(event.target.checked);
    };

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

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        console.log("ddsdfds")

        localStorage.setItem('notificationRecurrence', notificationRecurrence);
        localStorage.setItem('seuilAlerte', seuilAlerte);
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(("token"))}`
            },
        };

        try {
            const consoData = await axios.get('https://tidaly-api-backend.onrender.com/consumption/global?day', config);
            console.log(consoData)
            const consommationActuelle = 800 // a chnager

            const objectiveData = await axios.get('https://tidaly-api-backend.onrender.com/api/v1/hub', config);
            console.log(objectiveData.data.water_consumption_target)
            const objectifConso = objectiveData.data.water_consumption_target;

            const res = objectifConso - consommationActuelle;

            if (res <= seuilAlerte ) {
                envoyerNotification(res);
            }

        } catch (error) {
            console.error("Erreur lors de la récupération des données :", error);
        }
    };

    const envoyerNotification = (res) => {
        const getIntervalMs = (recurrence) => {
            switch (recurrence) {
              case "1min":
                return 60 * 1000; // 1 minute
              case "30mins":
                return 30 * 60 * 1000; // 30 minutes
              case "1h":
                return 60 * 60 * 1000; // 1 heure
              case "12h":
                return 12 * 60 * 60 * 1000; // 12 heures
              case "Journée":
                return 24 * 60 * 60 * 1000; // 1 jour
              default:
                return 60 * 1000; // Par défaut, 1 minute
            }
        };
        const intervalMs = getIntervalMs(localStorage.getItem(("notificationRecurrence")));

        const checkAndSendNotification = () => {
            const message = `Il vous reste ${res} litres avant d'atteindre votre objectif de consommation.`
            console.log("Notification envoyée : ", message);
            alert(message);
        };

        // const notificationInterval = setInterval(() => {
        //     console.log('Intervalle atteint, vérification des seuils...');
        //     checkAndSendNotification();
        // }, intervalMs);
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
                        width: '600px',
                        margin: 'auto',
                        marginTop: '200px',
                    }}
                    >
                    <Typography variant="h3" component="h3" sx={{ marginBottom: '20px', marginLeft: '100px' }}>
                        Paramétrage des notifications
                    </Typography>

                    <form onSubmit={handleFormSubmit}>
                        <Box display="flex" flexDirection="column">
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Récurrence des notifications</InputLabel>
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={notificationRecurrence}
                            onChange={handleNotificationRecurrence}
                            required
                            >
                            <MenuItem value={"1min"}>1min</MenuItem>
                            <MenuItem value={"30mins"}>30mins</MenuItem>
                            <MenuItem value={"1h"}>1H</MenuItem>
                            <MenuItem value={"12h"}>12H</MenuItem>
                            <MenuItem value={"Journée"}>1J</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            label="Définissez le seuil d'alerte (litres)"
                            fullWidth
                            type="number"
                            name="currentConsumption"
                            value={seuilAlerte}
                            onChange={(e) => setSeuilAlerte(e.target.value)}
                            style={{ marginTop: '10px' }}
                            required
                        />

                        <Button type="submit" variant="contained" style={{ backgroundColor: colors.tidaly[100], color: '#fff', marginTop: '10px' }}>
                            Envoyer
                        </Button>
                        </Box>
                    </form>
                    </Box>
                </Modal>
                { notificationList() }
            </Popover>
        );
    };

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const hub = await axios.get('https://tidaly-api-backend.onrender.com/api/v1/hub', { 
    //                 headers: { Authorization: `Bearer ${localStorage.getItem(("token"))}` },
    //             });
    //             console.log(hub)

    //             setConsumption(hub.data?.water_consumption_target - hub.data?.base_water_consumption);
    //             if (!consumption) return;
    //             console.log(consumption)
    //             console.log(hub.data?.base_water_consumption)
    //             console.log(hub.data?.water_consumption_target)
    //             if (hub.data?.base_water_consumption > hub.data?.water_consumption_target) {
    //                 const today = new Date();
    //                 console.log(today)

    //                 switch (notificationRecurrence) {
    //                     case "1min":
    //                         if (today.toLocaleDateString("fr-EU", { weekday: 'long' }) === 'lundi') {
    //                             const message = `Objectif de consommation dépassé de ${consumption}L le ${today.toLocaleDateString("fr-EU")}`;
    //                             addNotification({ message: message });
    //                         } break;
    //                     case "30mins":
    //                         if (today.getDate() === '0') {
    //                             const message = `Objectif de consommation dépassé de ${consumption}L le ${today.toLocaleDateString("fr-EU")}`;
    //                             addNotification({ message: message });
    //                         } break;
    //                     case "1h":
    //                         if (today.toLocaleDateString("fr-EU", { month: 'long' }) === 'décembre') {
    //                             const message = `Objectif de consommation dépassé de ${consumption}L le ${today.toLocaleDateString("fr-EU")}`;
    //                             addNotification({ message: message });
    //                         } break;
    //                     case "Journée":
    //                         const message = `Objectif de consommation dépassé de ${consumption}L le ${today.toLocaleDateString("fr-EU")}`;
    //                         addNotification({ message: message });
    //                         break;
    //                     default: break;
    //                 };
    //             }

    //         } catch (error) {
    //             console.log('Unable to fetch notifications data', error);
    //         }
    //     };

    //     fetchData();
    // }, [consumption, notificationRecurrence]);

    return (
        <Box display="flex" justifyContent="space-between" p={2}>
            <Box display="flex"></Box>
            <Box display="flex">
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
