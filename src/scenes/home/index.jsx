import { Box, Typography, useTheme, Modal, TextField, Button } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import ProgressCircle from "../../components/ProgressCircle";
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useEffect } from "react";
import axios from "axios";
import { generateWeekBarData } from "../../data/mockData";
import { useState } from "react";
import { Transmit } from '@adonisjs/transmit-client';

function getCurrentDate() {
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return currentDate.toLocaleDateString('fr-FR', options);
}

const Home = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [data, setData] = useState([]);
    const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
    const [weeks, setWeeks] = useState([]);
    const [priceM3, setPriceM3] = useState(0);
    const [currentDayConsumption, setCurrentDayConsumption] = useState(0);
    const [consumptionObjective, setConsumptionObjective] = useState(120000);
    const [maxWeekIndex, setMaxWeekIndex] = useState(0);
    const [test, setTest] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [changeConsumptionObjective, setChangeConsumptionObjective] = useState(0);
    const[isChangeConsumptionObjective, setIsChangeConsumptionObjective] = useState(false);

    useEffect(() => {
        setupSSE();
        fetchData();
        //getConsumptionObjective();
    }, []);

    const openModal = () => {
        console.log("openModal");
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const fetchData = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(("token"))}`
                },
            };

            const response = await axios.get('https://tidaly-api-backend.onrender.com/consumption/global?period=year', config);
            const consumptionData = response.data.consumption;
            const priceM3 = response.data.priceM3;

            console.log(consumptionData);

            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const currentMonth = currentDate.getMonth() + 1

            const valuesAndDatesOfMonth = consumptionData.filter(item => {
                const itemDate = new Date(item.time);
                const itemYear = itemDate.getFullYear();
                const itemMonth = itemDate.getMonth() + 1;
                return itemYear === currentYear && itemMonth === currentMonth;
            }).map(item => ({ value: item.value, date: new Date(item.time) }));

            console.log(valuesAndDatesOfMonth);

            const currentDay = currentDate.getDate();
            const currentDayData = valuesAndDatesOfMonth.find(item => item.date.getDate() === currentDay);

            if (currentDayData === undefined || currentDayData.value === undefined) {
                setCurrentDayConsumption(0);
            } else {
                setCurrentDayConsumption(currentDayData.value);
            }

            let weeks = [];
            let week = [];

            const firstDayOfWeek = valuesAndDatesOfMonth[0].date.getDay();

            const nullValuesToAdd = (firstDayOfWeek + 6) % 7;

            for (let j = 0; j < nullValuesToAdd; j++) {
                week.push(0);
            }

            for (let i = 0; i < valuesAndDatesOfMonth.length; i++) {
                week.push(valuesAndDatesOfMonth[i].value);

                if (week.length === 7 || i === valuesAndDatesOfMonth.length - 1) {
                    weeks.push(week);
                    week = [];
                }
            }

            console.log(weeks);

            setMaxWeekIndex(weeks.length - 1);
            setCurrentWeekIndex(weeks.length - 1);
            setPriceM3(priceM3);
            setData(generateWeekBarData(weeks[weeks.length - 1], priceM3));
            setWeeks(weeks);
            //console.log(priceM3);

        } catch (error) {
            console.error("Erreur lors de la récupération des informations: ", error);
        }
    }

    const transmit = new Transmit({
        baseUrl: 'http://20.111.43.70:4444',
        maxReconnectionAttempts: 5,
    });

    const setupSSE = async () => {
        const subscription = transmit.subscription('notify');

        await subscription.create();

        subscription.onMessage((message) => {
            console.log("SSE", message);
            setTimeout(fetchData, 100000);
            //setTest(JSON.parse(message.data));
        });

        /*return () => {
            subscription.delete();
        };*/
    }


    const getConsumptionObjective = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(("token"))}`
                },
            };

            const response = await axios.get('https://tidaly-api-backend.onrender.com/api/v1/hub', config);
            const consumptionObjective = response.data.water_consumption_target;

            setConsumptionObjective(consumptionObjective);

        } catch (error) {
            console.error("Erreur lors de la récupération des informations: ", error);
        }
    }

    const ChangeConsumptionObjective = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(("token"))}`
                },
            };
            console.log(changeConsumptionObjective);
            const hubData = {
                waterConsumptionTarget: changeConsumptionObjective,
            }

            await axios.put('https://tidaly-api-backend.onrender.com/api/v1/hub', hubData, config);
            setIsChangeConsumptionObjective(true);
        } catch (error) {
            console.error("Erreur lors de la récupération des informations: ", error);
        }
        if (isChangeConsumptionObjective) {
            getConsumptionObjective();
            setIsModalOpen(false);
        }
    }


    const goToPreviousWeek = () => {
        if (currentWeekIndex > 0) {
            setCurrentWeekIndex(prevWeekIndex => {
                const newWeekIndex = prevWeekIndex - 1;
                setData(generateWeekBarData(weeks[newWeekIndex], priceM3));
                return newWeekIndex; // Met à jour l'index de la semaine actuelle
            });
        }
    };

    const goToNextWeek = () => {
        if (currentWeekIndex < maxWeekIndex) {
            setCurrentWeekIndex(prevWeekIndex => {
                const newWeekIndex = prevWeekIndex + 1;
                setData(generateWeekBarData(weeks[newWeekIndex], priceM3));
                return newWeekIndex;
            });
        }
    };

    return (
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="ACCUEIL" subtitle="Bienvenue sur Tidaly" />
            </Box>

            {/* GRID & CHARTS */}
            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="50px"
            >
                {/* ROW 1 */}
                <Box
                    gridColumn="span 12"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    p="20px"
                    borderRadius="10px"
                >
                    <Typography variant="h4" fontWeight="600">
                        Consommation du jour :
                    </Typography>
                    <Typography variant="h4" fontWeight="600">
                        {getCurrentDate()}
                    </Typography>
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mt="25px"
                    >
                        <ProgressCircle size="125" currentDayConsumption={currentDayConsumption} consumptionObjective={consumptionObjective} onClick={openModal}/>
                    </Box>
                </Box>

                {/* ROW 2 */}
                <Box
                    gridColumn="span 12"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    p="20px"
                    borderRadius="10px"
                >
                    <Box
                        mt="25px"
                        p="0 30px"
                        display="flex "
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Box>
                            <Typography
                                variant="h4"
                                fontWeight="600"
                                color={colors.grey[100]}
                            >
                                Historique de la consommation d'eau
                            </Typography>
                        </Box>
                        <Box mt={2} display="flex" justifyContent="right">
                            <IconButton onClick={goToPreviousWeek}>
                                <ChevronLeftIcon />
                            </IconButton>
                            <IconButton onClick={goToNextWeek}>
                                <ChevronRightIcon />
                            </IconButton>
                        </Box>
                    </Box>
                    <Box height="250px" m="-20px 0 0 0">
                        <BarChart data={data} isDashboard={true} />
                    </Box>
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
                        <form onSubmit={ChangeConsumptionObjective}>
                            <TextField
                                label="Objectif de consommation par mois"
                                fullWidth
                                type="number"
                                name="changeConsumptionObjective"
                                value={changeConsumptionObjective}
                                onChange={e => setChangeConsumptionObjective(e.target.value)}
                                style={{marginTop: '10px'}}
                            />
                            <Button type="submit" variant="contained" style={{backgroundColor: colors.tidaly[100], color: '#fff', marginTop: '10px'}}>
                                Changer l'objectif
                            </Button>
                        </form>
                    </Box>
                </Modal>
            </Box>
        </Box>
    );
};

export default Home;
