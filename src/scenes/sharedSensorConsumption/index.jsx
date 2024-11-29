import { Box, Typography, useTheme } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';
import Header from "../../components/Header";
import SelectButton from "../../components/SelectButton";
import { tokens } from "../../theme";
import { WaterDamage } from "@mui/icons-material";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { WebSocketContext } from '../../WebSocketContext';

const SharedSensorConsumption = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selectedYear, setSelectedYear] = useState(2024);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [totalConsumption, setTotalConsumption] = useState('');
    const [totalConsumptionSensors, setTotalConsumptionSensors] = useState('');
    const [globalConsumption, setGlobalConsumption] = useState([]);
    const [sensorsGlobalConsumption, setSensorsGlobalConsumption] = useState([]);
    const [activityData, setActivityData] = useState([]);
    const [selectedView, setSelectedView] = useState('Année');
    const [haveSensor, setHaveSensor] = useState(true);
    const { notificationReceived, setNotificationReceived } = useContext(WebSocketContext);
    const { updateHub, setUpdateHub } = useContext(WebSocketContext);

    const getGlobalConsumption = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
        };

        try {
            const response = await axios.get('https://tidaly-api-backend.onrender.com/consumption/global?period=year&year=' + selectedYear , config);
            console.log(response)
            if (selectedView === "Année") {
                setTotalConsumption(response.data.totalConsumption)
                const monthMap = {
                    "Janvier": 0, "Février": 1, "Mars": 2, "Avril": 3,
                    "Mai": 4, "Juin": 5, "Juillet": 6, "Août": 7,
                    "Septembre": 8, "Octobre": 9, "Novembre": 10, "Décembre": 11
                };

                const monthNum = monthMap[selectedMonth];
                const activityList = [];

                const sensorsConsumption = response.data.sensorsResults.map(sensorObj => {
                    const { sensor, data } = sensorObj;
                    const filteredData = data.filter(item => {
                        const date = new Date(item.time);
                        const itemYear = date.getFullYear();
                        const itemMonth = date.getMonth();

                        return itemYear === selectedYear && (selectedMonth === '' || itemMonth === monthNum);
                    });

                    filteredData.forEach(entry => {
                        activityList.push({
                            sensorName: sensor.name,
                            date: new Date(entry.time).toLocaleDateString(),
                            value: entry.value
                        });
                    });

                    return filteredData.reduce((sum, item) => sum + item.value, 0);
                });

                setActivityData(activityList);
                setTotalConsumptionSensors(sensorsConsumption.reduce((sum, consumption) => sum + consumption, 0));
            } else {
                const monthMap = {
                    "Janvier": 0, "Février": 1, "Mars": 2, "Avril": 3,
                    "Mai": 4, "Juin": 5, "Juillet": 6, "Août": 7,
                    "Septembre": 8, "Octobre": 9, "Novembre": 10, "Décembre": 11
                };

                const currentMonth = monthMap[selectedMonth]
                setTotalConsumption(response.data.results[currentMonth].total)

                const activityList = [];

                const sensorsConsumption = response.data.sensorsResults.map(sensorObj => {
                    const { sensor, data } = sensorObj;
                    const filteredData = data.filter(item => {
                        const date = new Date(item.time);
                        const itemYear = date.getFullYear();
                        const itemMonth = date.getMonth();

                        return itemYear === selectedYear && (selectedMonth === '' || itemMonth === currentMonth);
                    });

                    filteredData.forEach(entry => {
                        activityList.push({
                            sensorName: sensor.name,
                            date: new Date(entry.time).toLocaleDateString(),
                            value: entry.value
                        });
                    });

                    return filteredData.reduce((sum, item) => sum + item.value, 0);
                });

                setActivityData(activityList);
                setTotalConsumptionSensors(sensorsConsumption.reduce((sum, consumption) => sum + consumption, 0));
            }

        } catch (error) {
            if (error.response.data.message === "Hub not found") {
                setHaveSensor(false)
            }
            console.error("Erreur lors de la récupération des informations :", error);
        }
    };

    useEffect(() => {
        getGlobalConsumption();
        if (notificationReceived) {
            getGlobalConsumption();
            setNotificationReceived(false);
        }
        if (updateHub) {
            getGlobalConsumption();
            setUpdateHub(false)
        }
    }, [selectedYear, selectedMonth, selectedView, notificationReceived, updateHub]);

    const handleYearChange = (year) => {
        setSelectedYear(Number(year));
        setSelectedMonth('');
    };

    const handleMonthChange = (month) => {
        setSelectedMonth(month);
    };

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="CONSOMMATION GLOBALE DES CAPTEURS" subtitle="Consultez votre consommation d'eau par rapport à votre consommation globale et par capteurs" />
                <Box>
                    <SelectButton
                        onYearChange={handleYearChange}
                        onMonthChange={handleMonthChange}
                        onViewChange={setSelectedView}
                    />
                </Box>
            </Box>

            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="50px"
            >
                <Box
                    gridColumn="span 12"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    p="20px"
                    borderRadius="10px"
                >
                    <Box display="flex" flexDirection="column" alignItems="center" mt="25px">
                        {haveSensor === false ? (
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                p="10px 20px"
                                borderRadius="10px"
                                minHeight="250px"
                            >
                                <Typography
                                    variant="h4"
                                    align="center"
                                    style={{
                                        color: colors.grey[100],
                                    }}
                                >
                                    Vous n'avez pas de hub
                                </Typography>
                            </Box>
                        ) : (
                            <PieChart
                                series={[
                                    {
                                        data: [
                                            { id: 0, value: totalConsumption, label: 'Consommation globale' },
                                            { id: 1, value: totalConsumptionSensors, label: 'Consommation des capteurs' },
                                        ],
                                    },
                                ]}
                                width={800}
                                height={250}
                            />
                        )}
                    </Box>
                </Box>

                {/* Section des dernières activités */}
                <Box
                    gridColumn="span 12"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    p="20px"
                    borderRadius="10px"
                    position="relative"
                >
                    <Typography variant="h4" fontWeight="600" color={colors.grey[100]} textAlign="left">
                        Dernières activités
                    </Typography>

                    <Box mt="20px" display="flex" flexDirection="column" gap="10px" style={{ maxHeight: '250px', overflow: 'auto' }}>
                        {haveSensor === false ? (
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                p="10px 20px"
                                borderRadius="10px"
                                minHeight="250px"
                            >
                                <Typography
                                    variant="h4"
                                    align="center"
                                    style={{
                                        color: colors.grey[100],
                                    }}
                                >
                                    Vous n'avez pas de hub
                                </Typography>
                            </Box>
                            ) : (
                                activityData.map((activity, index) => (
                                    <Box
                                        key={index}
                                        display="flex"
                                        justifyContent="space-between"
                                        alignItems="center"
                                        p="10px 20px"
                                        borderRadius="10px"
                                        backgroundColor={colors.grey[900]}
                                    >
                                        <Box display="flex" alignItems="center">
                                            <WaterDamage sx={{ color: colors.tidaly[100], fontSize: "24px", mr: "10px" }} />
                                            <Typography variant="h6" fontWeight="600" color={colors.grey[100]}>
                                                {activity.sensorName}
                                            </Typography>
                                        </Box>
                                        <Typography variant="h6" fontWeight="600" color={colors.grey[100]}>
                                            {activity.value} L ({activity.date})
                                        </Typography>
                                    </Box>
                                ))
                            )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default SharedSensorConsumption;
