import { Box, Typography, useTheme } from "@mui/material";
import React, { useState, useEffect, useContext } from "react";
import { PieChart } from '@mui/x-charts/PieChart';
import Header from "../../components/Header";
import SelectButton from "../../components/SelectButton";
import { tokens } from "../../theme";
import { WaterDamage } from "@mui/icons-material";
import axios from "axios";
import { WebSocketContext } from '../../WebSocketContext';

const SensorConsumption = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [sensorData, setSensorData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(2025);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [pieChartData, setPieChartData] = useState([]);
    const [activityData, setActivityData] = useState([]);
    const { notificationReceived, setNotificationReceived } = useContext(WebSocketContext);
    const { updateHub, setUpdateHub } = useContext(WebSocketContext);

    const getConsumptionWaterPoint = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
        };

        try {
            const response = await axios.get('https://tidaly-api-backend.onrender.com/consumption/global?period=year', config);
            const sensorsResults = response.data.sensorsResults;
            setSensorData(sensorsResults);
        } catch (error) {
            console.error("Erreur lors de la récupération des informations :", error);
        }
    };

    const calculateConsumptionData = () => {
        const consumptionData = {};
        const activityList = [];

        const monthMap = {
            "Janvier": 1, "Février": 2, "Mars": 3, "Avril": 4,
            "Mai": 5, "Juin": 6, "Juillet": 7, "Août": 8,
            "Septembre": 9, "Octobre": 10, "Novembre": 11, "Décembre": 12
        };

        const monthNum = monthMap[selectedMonth];

        sensorData.forEach(sensor => {
            const sensorName = sensor.sensor.name;
            
            const sensorConsumption = sensor.data.filter(entry => {
                const entryDate = new Date(entry.time);
                const isSameYear = entryDate.getFullYear() === selectedYear;
                const isSameMonth = monthNum ? entryDate.getMonth() + 1 === monthNum : true;
                return isSameYear && isSameMonth;
            });

            consumptionData[sensorName] = sensorConsumption.reduce(
                (total, entry) => total + entry.value,
                0
            );

            sensorConsumption.forEach(entry => {
                activityList.push({
                    sensorName: sensorName,
                    date: new Date(entry.time).toLocaleDateString(),
                    value: entry.value
                });
            });
        });

        const pieData = sensorData.map(sensor => ({
            sensorName: sensor.sensor.name,
            value: consumptionData[sensor.sensor.name] || 0,
        }));

        setPieChartData(pieData); // Met à jour les données du Pie Chart
        setActivityData(activityList); // Met à jour les dernières activités
    };

    useEffect(() => {
        getConsumptionWaterPoint();
        if (notificationReceived) {
            console.log("MESSAGE RECU")
            getConsumptionWaterPoint();
            setNotificationReceived(false);
        }
        if (updateHub) {
            getConsumptionWaterPoint();
            setUpdateHub(false)
        }
    }, [notificationReceived, updateHub]);

    useEffect(() => {
        calculateConsumptionData();
    }, [sensorData, selectedYear, selectedMonth]);

    const handleYearChange = (year) => {
        setSelectedYear(Number(year));
        setSelectedMonth('');
    };

    const handleMonthChange = (month) => {
        setSelectedMonth(month);
        getConsumptionWaterPoint();
    };

    const noDataMessage = "Vous ne possédez aucun capteur par point d'eau";

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="RÉPARTITION DE LA CONSOMMATION DES CAPTEURS" subtitle="Consultez la consommation d'eau de chacun de vos capteurs" />
                <Box>
                    <SelectButton
                        onYearChange={handleYearChange}
                        onMonthChange={handleMonthChange}
                    />
                </Box>
            </Box>

            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="50px"
            >
                {/* Pie Chart Section */}
                <Box
                    gridColumn="span 12"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    p="20px"
                    borderRadius="10px"
                >
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mt="25px"
                    >
                        {sensorData.length === 0 ? (
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
                                    {noDataMessage}
                                </Typography>
                            </Box>
                        ) : (
                        <PieChart
                            series={[
                                {
                                    data: pieChartData.length > 0 ? pieChartData.map(sensor => ({
                                        id: sensor.sensorName,
                                        value: sensor.value,
                                        label: sensor.sensorName
                                    })) : [{ id: 0, value: 0, label: 'Aucune consommation' }],
                                },
                            ]}
                            width={800}
                            height={250}
                        />
                        )}
                    </Box>
                </Box>

                <Box
                    gridColumn="span 12"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    p="20px"
                    borderRadius="10px"
                    position="relative"
                >
                    <Box mt="25px" p="0 30px" style={{ maxHeight: '250px', overflow: 'auto' }}>
                        <Typography variant="h4" fontWeight="600" color={colors.grey[100]} textAlign="left">
                            Dernières activités
                        </Typography>

                        <Box mt="20px" display="flex" flexDirection="column" gap="10px">
                            {sensorData.length === 0 ? (
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    p="10px 20px"
                                    borderRadius="10px"
                                    minHeight="150px"
                                >
                                <Typography
                                    variant="h4"
                                    align="center"
                                    style={{
                                        color: colors.grey[100],
                                    }}
                                >
                                        {noDataMessage}
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
        </Box>
    );
};

export default SensorConsumption;
