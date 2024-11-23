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
            if (selectedView === 'Année') {
                const response = await axios.get('https://tidaly-api-backend.onrender.com/consumption/global?period=year&year=' + selectedYear, config);
                console.log("response", response)
                const monthNames = {
                    january: "Janvier",
                    february: "Février",
                    march: "Mars",
                    april: "Avril",
                    may: "Mai",
                    june: "Juin",
                    july: "Juillet",
                    august: "Août",
                    september: "Septembre",
                    october: "Octobre",
                    november: "Novembre",
                    december: "Décembre",
                };

                const data = response.data.results.map((monthData) => {
                    const monthName = monthNames[monthData.name];
                    const waterConsumption = monthData.total / 1000;
                    const price = waterConsumption * response.data.priceM3;

                    return {
                      time: monthName,
                      "Eau en M3": waterConsumption,
                      "Prix en €":  Math.round(price),
                    };
                });

                console.log("data", data);
                setData(data)

                setDisplayData(data.map((item) => ({
                    label: item.time,
                    value: Math.round(item["Eau en M3"] * 1000),
                    cost:  Math.round(item["Prix en €"]),
                })));

            } else if (selectedView === 'Mois') {
                const frenchToEnglishMonths = {
                    Janvier: "january",
                    Février: "february",
                    Mars: "march",
                    Avril: "april",
                    Mai: "may",
                    Juin: "june",
                    Juillet: "july",
                    Août: "august",
                    Septembre: "september",
                    Octobre: "october",
                    Novembre: "november",
                    Décembre: "december",
                };
                const selectedMonthInEnglish = frenchToEnglishMonths[selectedMonth];

                const response = await axios.get('https://tidaly-api-backend.onrender.com/consumption/global?period=month&year=' + selectedYear + '&month=' + selectedMonthInEnglish, config);
                console.log("response2", response)

                const data = response.data.weeks.map((weekData) => {
                    const weekName = weekData.week;
                    const waterConsumption = weekData.total / 1000;
                    const price = waterConsumption * response.data.priceM3;

                    return {
                      time:  "Semaine " + weekName,
                      "Eau en M3": waterConsumption,
                      "Prix en €":  Math.round(price),
                    };
                });

                setData(data);
                setDisplayData(data.map((value, index) => ({
                    label: `Semaine ${index + 1}`,
                    value: Math.round(value["Eau en M3"] * 1000),
                    cost:  Math.round(value["Prix en €"]),
                })));
            }

        } catch (error) {
            console.error('Erreur lors de la récupération des données:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedYear, selectedMonth, selectedView]);

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

                {displayData.length === 0 ? (
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
                ):(
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
                )}
            </Box>
        </Box>
    );
};

export default Statistics;
