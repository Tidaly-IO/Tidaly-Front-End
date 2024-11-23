import { Box, Typography, useTheme, Modal, TextField, Button, Snackbar, Alert } from "@mui/material";
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
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip'
import SettingsIcon from "@mui/icons-material/Settings";
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


function getCurrentDate() {
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return currentDate.toLocaleDateString('fr-FR', options);
}

function getCurrentMonth() {
    const currentDate = new Date();
    const options = { month: 'long' };
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
    const [consumptionObjective, setConsumptionObjective] = useState(0);
    const [maxWeekIndex, setMaxWeekIndex] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [changeConsumptionObjective, setChangeConsumptionObjective] = useState(0);
    const [consumptionObjectiveJanuary, setConsumptionObjectiveJanuary] = useState(0);
    const [consumptionObjectiveFebruary, setConsumptionObjectiveFebruary] = useState(0);
    const [consumptionObjectiveMarch, setConsumptionObjectiveMarch] = useState(0);
    const [consumptionObjectiveApril, setConsumptionObjectiveApril] = useState(0);
    const [consumptionObjectiveMay, setConsumptionObjectiveMay] = useState(0);
    const [consumptionObjectiveJune, setConsumptionObjectiveJune] = useState(0);
    const [consumptionObjectiveJuly, setConsumptionObjectiveJuly] = useState(0);
    const [consumptionObjectiveAugust, setConsumptionObjectiveAugust] = useState(0);
    const [consumptionObjectiveSeptember, setConsumptionObjectiveSeptember] = useState(0);
    const [consumptionObjectiveOctober, setConsumptionObjectiveOctober] = useState(0);
    const [consumptionObjectiveNovember, setConsumptionObjectiveNovember] = useState(0);
    const [consumptionObjectiveDecember, setConsumptionObjectiveDecember] = useState(0);
    const[isChangeConsumptionObjective, setIsChangeConsumptionObjective] = useState(false);
    const [consumptionObjectiveYear, setConsumptionObjectiveYear] = useState(0);
    const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [selectedView, setSelectedView] = useState('La semaine actuelle');


    useEffect(() => {
        //setupSSE();
        fetchData();
        getConsumptionObjective();
    }, [selectedView]);

    const openModal = () => {
        setIsModalOpen(true);
        getAllConsumptionObjective()
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openSnackbar = (message) => {
        setSnackbarMessage(message);
        setIsSnackbarOpen(true);
    };

    const closeSnackbar = () => {
        setIsSnackbarOpen(false);
        setSnackbarMessage("");
    };

    const handleSelectedView = (event) => {
        setSelectedView(event.target.value);
    };


    const getConsumptionOfTheDay = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(("token"))}`
                },
            };

            const currentDay = new Date().getDay() - 1;
            const response = await axios.get('https://tidaly-api-backend.onrender.com/consumption/global?period=currentWeek', config);
            const consumptionData = response.data.data[currentDay].value;
            setCurrentDayConsumption(consumptionData)

        } catch (error) {
            console.error("Erreur lors de la récupération des informations: ", error);
        }
    };

    const fetchData = async () => {
        getConsumptionOfTheDay()

        if (selectedView === 'La semaine actuelle') {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(("token"))}`
                    },
                };

                const response = await axios.get('https://tidaly-api-backend.onrender.com/consumption/global?period=currentWeek', config);
                console.log("response", response)
                const consumptionData = response.data.data;
                console.log("consumption", consumptionData)

                const data = consumptionData.map((days) => {
                    const daysName = days.day;
                    const waterConsumption = days.value / 1000;
                    const price = waterConsumption * 2.5; // 4 = prix du m3 a changer

                    return {
                      time: daysName,
                      "Eau en M3": waterConsumption,
                      "Prix en €":  Math.round(price),
                    };
                });

                console.log("data", data)
                setData(data)

            } catch (error) {
                console.error("Erreur lors de la récupération des informations: ", error);
            }
        } else {
            const monthNamesInEnglish = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];

            const currentMonth = new Date().getMonth() + 1;
            const monthNameInEnglish = monthNamesInEnglish[currentMonth - 1];
            const currentYear = new Date().getFullYear();

            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(("token"))}`
                    },
                };

                const response = await axios.get('https://tidaly-api-backend.onrender.com/consumption/global?period=month&year=' + currentYear + '&month=' + monthNameInEnglish, config);
                console.log("response", response)
                const consumptionData = response.data.weeks;
                console.log("consumption", consumptionData)

                const data = consumptionData.map((week) => {
                    const weekName = week.week;
                    const waterConsumption = week.total / 1000;
                    const price = waterConsumption * 2.5; // 4 = prix du m3 a changer

                    return {
                      time: "Semaine " + weekName,
                      "Eau en M3": waterConsumption,
                      "Prix en €":  Math.round(price),
                    };
                });

                setData(data)

            } catch (error) {
                console.error("Erreur lors de la récupération des informations: ", error);
            }
        }

    }

    const transmit = new Transmit({
        baseUrl: 'https://tidaly-sse.onrender.com',
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

            console.log("consommation", consumptionObjective);

            setConsumptionObjective(consumptionObjective);

        } catch (error) {
            console.error("Erreur lors de la récupération des informations: ", error);
        }
    }

    const getAllConsumptionObjective = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(("token"))}`
                },
            };

            const response = await axios.get('https://tidaly-api-backend.onrender.com/api/v1/target', config);

            setConsumptionObjectiveJanuary(response.data[0].target);
            setConsumptionObjectiveFebruary(response.data[1].target);
            setConsumptionObjectiveMarch(response.data[2].target);
            setConsumptionObjectiveApril(response.data[3].target);
            setConsumptionObjectiveMay(response.data[4].target);
            setConsumptionObjectiveJune(response.data[5].target);
            setConsumptionObjectiveJuly(response.data[6].target);
            setConsumptionObjectiveAugust(response.data[7].target);
            setConsumptionObjectiveSeptember(response.data[8].target);
            setConsumptionObjectiveOctober(response.data[9].target);
            setConsumptionObjectiveNovember(response.data[10].target);
            setConsumptionObjectiveDecember(response.data[11].target);

            let sum = 0;
            for (let i = 0; i < response.data.length; i++) {
                sum += response.data[i].target;
            }

            setConsumptionObjectiveYear(sum)



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

            if (getCurrentMonth() === "janvier") {
                setChangeConsumptionObjective(consumptionObjectiveJanuary)
            }
            else if (getCurrentMonth() === "février") {
                setChangeConsumptionObjective(consumptionObjectiveFebruary)
            }
            else if (getCurrentMonth() === "mars") {
                setChangeConsumptionObjective(consumptionObjectiveMarch)
            }
            else if (getCurrentMonth() === "avril") {
                setChangeConsumptionObjective(consumptionObjectiveApril)
            }
            else if (getCurrentMonth() === "mai") {
                setChangeConsumptionObjective(consumptionObjectiveMay)
            }
            else if (getCurrentMonth() === "juin") {
                setChangeConsumptionObjective(consumptionObjectiveJune)
            }
            else if (getCurrentMonth() === "juillet") {
                console.log("juillet", consumptionObjectiveJuly);
                setChangeConsumptionObjective(consumptionObjectiveJuly)
            }
            else if (getCurrentMonth() === "août") {
                setChangeConsumptionObjective(consumptionObjectiveAugust)
            }
            else if (getCurrentMonth() === "septembre") {
                setChangeConsumptionObjective(consumptionObjectiveSeptember)
            }
            else if (getCurrentMonth() === "octobre") {
                setChangeConsumptionObjective(consumptionObjectiveOctober)
            }
            else if (getCurrentMonth() === "novembre") {
                setChangeConsumptionObjective(consumptionObjectiveNovember)
            }
            else if (getCurrentMonth() === "décembre") {
                setChangeConsumptionObjective(consumptionObjectiveDecember)
            }

            console.log("laa",changeConsumptionObjective);
            const hubData = {
                waterConsumptionTarget: changeConsumptionObjective,
            }

            const data = {
                targets: [
                    consumptionObjectiveJanuary, consumptionObjectiveFebruary, consumptionObjectiveMarch,
                    consumptionObjectiveApril, consumptionObjectiveMay, consumptionObjectiveJune,
                    consumptionObjectiveJuly, consumptionObjectiveAugust, consumptionObjectiveSeptember,
                    consumptionObjectiveOctober, consumptionObjectiveNovember, consumptionObjectiveDecember
                ]
            }
            await axios.put('https://tidaly-api-backend.onrender.com/api/v1/target', data, config);
            await axios.put('https://tidaly-api-backend.onrender.com/api/v1/hub', hubData, config);
            setIsChangeConsumptionObjective(true)
            getConsumptionObjective()
        } catch (error) {
            console.error("Erreur lors de la récupération des informations: ", error);
            if (error.response && error.response.data.message === "You must have a hub to update the target") {
                openSnackbar("Vous devez avoir un hub pour mettre à jour l'objectif");
            }
        }
        if (isChangeConsumptionObjective) {
            setIsModalOpen(false);
        }
    }

    const isMonthPast = (month) => {
        const currentMonth = new Date().getMonth() + 1;
        return month < currentMonth && month !== currentMonth;
    };

    return (
        <Box m="20px">
            {/* HEADER */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="ACCUEIL" subtitle="Bienvenue sur Tidaly" />
                <Box sx={{ minWidth: 120 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Vue</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedView}
                            label="Vue"
                            onChange={handleSelectedView}
                        >
                            <MenuItem value={"La semaine actuelle"}>La semaine actuelle</MenuItem>
                            <MenuItem value={"Les semaines du mois"}>Les semaines du mois</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
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
                    position="relative"
                >
                    <IconButton
                        onClick={openModal}
                        style={{
                            position: "absolute",
                            top: "10px",
                            right: "10px",
                            color: "black",
                        }}
                    >
                        <SettingsIcon />
                    </IconButton>
                    <Typography variant="h4" fontWeight="600">
                        Consommation du jour en litres :
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
                            maxHeight: '60vh',
                            overflowY: 'auto'
                        }}
                    >
                        <Typography variant="h4" fontWeight="600" textAlign="center" mb={2}>
                            Modifier l'objectif de consommation
                        </Typography>
                        <form onSubmit={ChangeConsumptionObjective}>
                            <TextField
                                label="Objectif total de l'année"
                                fullWidth
                                type="number"
                                disabled
                                name="Objectif total de l'année"
                                value={consumptionObjectiveYear}
                                style={{marginTop: '10px'}}
                                InputProps={{
                                    endAdornment: (
                                        <Tooltip
                                            title={
                                                <Typography variant="body2" sx={{ p: 1, fontSize: '1rem' }}>
                                                    L’objectif total est calculé automatiquement en fonction de vos objectifs.
                                                </Typography>
                                            }
                                            arrow
                                            sx={{
                                                tooltip: {
                                                    maxWidth: 200,
                                                    fontSize: '0.5rem',
                                                    padding: '10px',
                                                },
                                            }}
                                        >
                                            <IconButton>
                                                <InfoIcon />
                                            </IconButton>
                                        </Tooltip>
                                    ),
                                }}
                            />
                            <TextField
                                label="Janvier"
                                fullWidth
                                type="number"
                                name="January"
                                value={consumptionObjectiveJanuary}
                                onChange={e => setConsumptionObjectiveJanuary(e.target.value)}
                                disabled={isMonthPast(1)}
                                style={{marginTop: '10px'}}
                            />
                            <TextField
                                label="Février"
                                fullWidth
                                type="number"
                                name="February"
                                value={consumptionObjectiveFebruary}
                                onChange={e => setConsumptionObjectiveFebruary(e.target.value)}
                                disabled={isMonthPast(2)}
                                style={{marginTop: '10px'}}
                            />
                            <TextField
                                label="Mars"
                                fullWidth
                                type="number"
                                name="March"
                                value={consumptionObjectiveMarch}
                                onChange={e => setConsumptionObjectiveMarch(e.target.value)}
                                disabled={isMonthPast(3)}
                                style={{marginTop: '10px'}}
                            />
                            <TextField
                                label="Avril"
                                fullWidth
                                type="number"
                                name="April"
                                value={consumptionObjectiveApril}
                                onChange={e => setConsumptionObjectiveApril(e.target.value)}
                                disabled={isMonthPast(4)}
                                style={{marginTop: '10px'}}
                            />
                            <TextField
                                label="Mai"
                                fullWidth
                                type="number"
                                name="May"
                                value={consumptionObjectiveMay}
                                onChange={e => setConsumptionObjectiveMay(e.target.value)}
                                disabled={isMonthPast(5)}
                                style={{marginTop: '10px'}}
                            />
                            <TextField
                                label="Juin"
                                fullWidth
                                type="number"
                                name="June"
                                value={consumptionObjectiveJune}
                                onChange={e => setConsumptionObjectiveJune(e.target.value)}
                                disabled={isMonthPast(6)}
                                style={{marginTop: '10px'}}
                            />
                            <TextField
                                label="Juillet"
                                fullWidth
                                type="number"
                                name="July"
                                value={consumptionObjectiveJuly}
                                onChange={e => setConsumptionObjectiveJuly(e.target.value)}
                                disabled={isMonthPast(7)}
                                style={{marginTop: '10px'}}
                            />
                            <TextField
                                label="Août"
                                fullWidth
                                type="number"
                                name="August"
                                value={consumptionObjectiveAugust}
                                onChange={e => setConsumptionObjectiveAugust(e.target.value)}
                                disabled={isMonthPast(8)}
                                style={{marginTop: '10px'}}
                            />
                            <TextField
                                label="Septembre"
                                fullWidth
                                type="number"
                                name="September"
                                value={consumptionObjectiveSeptember}
                                onChange={e => setConsumptionObjectiveSeptember(e.target.value)}
                                disabled={isMonthPast(9)}
                                style={{marginTop: '10px'}}
                            />
                            <TextField
                                label="Octobre"
                                fullWidth
                                type="number"
                                name="October"
                                value={consumptionObjectiveOctober}
                                onChange={e => setConsumptionObjectiveOctober(e.target.value)}
                                disabled={isMonthPast(10)}
                                style={{marginTop: '10px'}}
                            />
                            <TextField
                                label="Novembre"
                                fullWidth
                                type="number"
                                name="November"
                                value={consumptionObjectiveNovember}
                                onChange={e => setConsumptionObjectiveNovember(e.target.value)}
                                disabled={isMonthPast(11)}
                                style={{marginTop: '10px'}}
                            />
                            <TextField
                                label="Décembre"
                                fullWidth
                                type="number"
                                name="December"
                                value={consumptionObjectiveDecember}
                                onChange={e => setConsumptionObjectiveDecember(e.target.value)}
                                disabled={isMonthPast(12)}
                                style={{marginTop: '10px'}}
                            />
                            <Box display="flex" justifyContent="center" mt="10px">
                                <Button type="submit" variant="contained" style={{backgroundColor: colors.tidaly[100], color: '#fff', marginTop: '10px'}}>
                                    Changer l'objectif
                                </Button>
                            </Box>
                        </form>
                    </Box>
                </Modal>
                <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={closeSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                    <Alert onClose={closeSnackbar} severity="error" sx={{ width: '100%' }}>
                        {snackbarMessage}
                    </Alert>
                </Snackbar>
            </Box>
        </Box>
    );
};

export default Home;
