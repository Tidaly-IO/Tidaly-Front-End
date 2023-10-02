import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import EdgesensorHighIcon from '@mui/icons-material/EdgesensorHigh';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import SensorsIcon from '@mui/icons-material/Sensors';

interface SidebarItem {
    title: string;
    icon: JSX.Element;
    link: string;
}

export const SideBarData: SidebarItem[] = [
    {
        title: "Accueil",
        icon: <HomeIcon />,
        link: "/HomePage"
    },
    {
        title: "Statistiques",
        icon: <QueryStatsIcon />,
        link: "/Statistics"
    },
    {
        title: "Mes capteurs",
        icon: <EdgesensorHighIcon />,
        link: "/SensorDetails"
    },
    {
        title: "Historiques de consommation",
        icon: <HistoryIcon />,
        link: "/HomePages"
    },
    {
        title: "Profil utilisateur",
        icon: <PersonIcon />,
        link: "/UserProfile"
    },
    {
        title: "Conssommation global des capteurs",
        icon: <SensorsIcon />,
        link: "/SharedSensorConsumption"
    },
    {
        title: "Répartition de la consommation des capteurs",
        icon: <SensorsIcon />,
        link: "/SensorConsumption"
    }
];

export const SideBarData2: SidebarItem[] = [
    {
        title: "Déconnexion",
        icon: <LogoutIcon />,
        link: "/"
    }
];
