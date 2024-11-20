import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import SelectButton from "../../components/SelectButton";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import axios from "axios";
import { useEffect, useState } from "react";
import BarChart from "../../components/BarChart";
import { generateYearsStatsBarData, generateWeeksStatsBarData } from "../../data/mockData";

const Statistics = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [selectedYear, setSelectedYear] = useState('2024');
    const [selectedMonth, setSelectedMonth] = useState('Janvier');
    const [selectedView, setSelectedView] = useState('Année');
    const [data, setData] = useState([]);
    const [displayData, setDisplayData] = useState([]);

    const fetchData = async () => {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
        };

        try {
            const response = await axios.get('https://tidaly-api-backend.onrender.com/consumption/global?period=year', config);
            const consumptionData = response.data.consumption;
            const pricem3 = response.data.priceM3;

            if (selectedView === 'Année') {
                const uniqueData = {};
                consumptionData.forEach(item => {
                    const year = new Date(item.time).getFullYear();
                    if (year.toString() === selectedYear) {
                        const key = new Date(item.time).toISOString();
                        if (!uniqueData[key]) {
                            uniqueData[key] = item.value;
                        }
                    }
                });

                const monthlyTotals = Array(12).fill(0);
                Object.keys(uniqueData).forEach(key => {
                    const month = new Date(key).getMonth();
                    monthlyTotals[month] += uniqueData[key];
                });

                setData(generateYearsStatsBarData(monthlyTotals, pricem3));
                setDisplayData(monthlyTotals.map((value, index) => ({
                    label: getMonthName(index),
                    value: Math.round(value),  // Arrondi des litres consommés
                    cost: calculateCost(value, pricem3),
                })));

            } else if (selectedView === 'Mois') {
                const monthIndex = getMonthIndex(selectedMonth);
                const uniqueData = {};

                consumptionData.forEach(item => {
                    const date = new Date(item.time);
                    const year = date.getFullYear();
                    const month = date.getMonth();

                    if (year.toString() === selectedYear && month === monthIndex) {
                        const week = getWeekOfMonth(date);
                        const key = `${year}-${month}-${week}`;
                        if (!uniqueData[key]) {
                            uniqueData[key] = 0;
                        }
                        uniqueData[key] += item.value;
                    }
                });

                const weeksInMonth = getWeeksInMonth(selectedYear, monthIndex);
                const weeklyTotals = Array.from({ length: weeksInMonth }, () => 0);

                Object.keys(uniqueData).forEach(key => {
                    const [, , week] = key.split('-').map(Number);
                    weeklyTotals[week - 1] += uniqueData[key];
                });

                setData(generateWeeksStatsBarData(weeklyTotals, pricem3));
                setDisplayData(weeklyTotals.map((value, index) => ({
                    label: `Semaine ${index + 1}`,
                    value: Math.round(value),  // Arrondi des litres consommés
                    cost: calculateCost(value, pricem3),
                })));
            }

        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedYear, selectedMonth, selectedView]);

    const getMonthIndex = (monthName) => {
        const months = [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ];
        return months.indexOf(monthName);
    };

    const getMonthName = (monthIndex) => {
        const months = [
            'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
            'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
        ];
        return months[monthIndex];
    };

    const getWeekOfMonth = (date) => {
        const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
        return Math.ceil((date.getDate() + firstDay) / 7);
    };

    const getWeeksInMonth = (year, month) => {
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();
        return Math.ceil((lastDate + firstDay) / 7);
    };

    const calculateCost = (value, pricem3) => {
        let price = 0
        if (pricem3 === 0) {
            price = 4
        } else {
            price = pricem3
        }
        return Math.round((value / 1000) * price);  // Divise par 1000 pour convertir en m³ et arrondir le coût
    };

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="STATISTIQUES" subtitle="Consultez vos différentes statistiques" />
                <Box>
                    <SelectButton
                        onYearChange={setSelectedYear}
                        onMonthChange={setSelectedMonth}
                        onViewChange={setSelectedView}
                    />
                </Box>
            </Box>

            <Box display="grid" gridTemplateColumns="repeat(12, 1fr)" gridAutoRows="140px" gap="50px">
                <Box
                    gridColumn="span 12"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    p="20px"
                    borderRadius="10px"
                >
                    <Box mt="25px" p="0 30px">
                        <Typography variant="h4" fontWeight="600">
                            Historique de la consommation d'eau
                        </Typography>
                    </Box>
                    {displayData.length === 0 ? (
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            height="250px"
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
                        <Box height="250px" m="-20px 0 0 0">
                            <BarChart data={data} isDashboard={true} />
                        </Box>
                    )}
                </Box>

                {displayData.length === 0 && (
                    <Box
                        gridColumn="span 12"
                        gridRow="span 2"
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        backgroundColor={colors.primary[400]}
                        p="20px"
                        borderRadius="10px"
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
                )}

                {/* Conteneur pour les cartes défilantes */}
                <Box
                    gridColumn="span 12"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    p="20px"
                    borderRadius="10px"
                    overflow="auto"
                >
                    <Box
                        display="flex"
                        flexDirection="row"
                        gap="20px"
                        width="max-content"
                        overflowX="auto"
                        p="10px"
                        sx={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {displayData.map((item, index) => (
                            <Box
                                key={index}
                                minWidth="250px"
                                backgroundColor={colors.tidaly[100]}
                                p="20px"
                                borderRadius="10px"
                                color="white"
                                sx={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}
                            >
                                <Typography variant="h3" fontWeight="600">
                                    {item.label}
                                </Typography>
                                <Box mt="45px" display="flex" alignItems="center">
                                    <ArrowDownwardIcon style={{ color: "red", marginRight: "15px" }} />
                                    <Typography variant="h4" fontWeight="600">
                                        Litres consommés : {item.value} litre(s)
                                    </Typography>
                                </Box>
                                <Box mt="65px" display="flex" alignItems="center">
                                    <ArrowDownwardIcon style={{ color: "red", marginRight: "15px" }} />
                                    <Typography variant="h4" fontWeight="600">
                                        Argent dépensé : {item.cost} €
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Statistics;
