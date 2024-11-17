import {useEffect, useState, useContext} from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import SensorsIcon from '@mui/icons-material/Sensors';
import EdgesensorHighIcon from '@mui/icons-material/EdgesensorHigh';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import axios from "axios";
import avatarImage from '../../assets/img_avatar.png';
import { AppContext } from '../../AppContext';

const Item = ({ title, to, icon, selected, setSelected }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <MenuItem
            active={selected === title}
            style={{
                color: colors.tidaly[200],
            }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to} />
        </MenuItem>
    );
};

const Sidebar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [selected, setSelected] = useState("Dashboard");
    const [userName, setUserName] = useState("");
    const [picture, setPicture] = useState(avatarImage);
    const { sharedVariable } = useContext(AppContext);
    const { refreshName, setRefreshName } = useContext(AppContext);

    const getUserInformations = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(("token"))}`
                },
            };

            const response = await axios.get('https://tidaly-api-backend.onrender.com/api/v1/user/profile', config);

            setUserName(response.data.firstname + " " + response.data.lastname)
            if (response.data.picture !== null)
                setPicture(response.data.picture);

        } catch (error) {
            console.error("Erreur lors de la récupération des informations: ", error);
        }
    };

    useEffect(() => {
        getUserInformations();
    }, []);

    useEffect(() => {
        if (sharedVariable) {
            getUserInformations();
        }
    }, [sharedVariable]);

    useEffect(() => {
        if (refreshName) {
            getUserInformations();
            setRefreshName(false)
        }
    }, [refreshName]);


    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${colors.tidaly[100]} !important`,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                },
            }}
        >
            <ProSidebar collapsed={isCollapsed}>
                <Menu iconShape="square">
                    {/* LOGO AND MENU ICON */}
                    <MenuItem
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
                        style={{
                            margin: "10px 0 20px 0",
                            color: colors.tidaly[200],
                        }}
                    >
                        {!isCollapsed && (
                            <Box
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                ml="15px"
                            >
                                <Typography variant="h3" color={colors.tidaly[200]}>
                                    TIDALY
                                </Typography>
                                <IconButton onClick={() => setIsCollapsed(!isCollapsed)} style={{ color: "white" }}>
                                    <MenuOutlinedIcon />
                                </IconButton>

                            </Box>
                        )}
                    </MenuItem>

                    {!isCollapsed && (
                        <Box mb="25px">
                            <Box display="flex" justifyContent="center" alignItems="center">
                                <img
                                    alt="profile-user"
                                    width="100px"
                                    height="100px"
                                    src={picture}
                                    style={{ cursor: "pointer", borderRadius: "50%" }}
                                />
                            </Box>
                            <Box textAlign="center">
                                <Typography
                                    variant="h2"
                                    color={colors.tidaly[200]}
                                    fontWeight="bold"
                                    sx={{ m: "10px 0 0 0" }}
                                >
                                    {userName}
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    <Box>
                        <Item
                            title="Accueil"
                            to="/home"
                            icon={<HomeOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Statistiques"
                            to="/statistics"
                            icon={<QueryStatsIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                          title="Mes capteurs"
                          to="/sensorDetails"
                          icon={<EdgesensorHighIcon />}
                          selected={selected}
                          setSelected={setSelected}
                        />
                        <Item
                            title="Consommation globale capteurs"
                            to="/sharedSensorConsumption"
                            icon={<SensorsIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Répartition de la consommation des capteurs"
                            to="/sensorConsumption"
                            icon={<SensorsIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                        <Item
                            title="Mon profil"
                            to="/userProfile"
                            icon={<PersonOutlinedIcon />}
                            selected={selected}
                            setSelected={setSelected}
                        />
                    </Box>
                </Menu>
            </ProSidebar>
        </Box>
    );
};

export default Sidebar;
