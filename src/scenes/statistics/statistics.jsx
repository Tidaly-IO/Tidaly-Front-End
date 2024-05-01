import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import SelectButton from "../../components/SelectButton";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import axios from "axios";
import { useEffect, useState } from "react";
// import { Transmit } from '@adonisjs/transmit-client'

const Statistics = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [isLoading, setIsLoading] = useState(true);
    const [time, setTime] = useState('Semaine');
    const [data, setData] = useState(null);
    // const [hubPrice, setHubPrice] = useState(0);

    // const transmit = new Transmit({
    //     baseUrl: 'http://20.111.43.70:4444',
    //     maxReconnectionAttempts: 5,
    // });
    
    // const setupSSE = async () => {
    //     const subscription = transmit.subscription('notify');
    
    //     await subscription.create();
    
    //     subscription.onMessage((message) => {
    //         console.log("SSE", message);
    //         setTimeout(fetchStatistics, 100000);
    //         //setTest(JSON.parse(message.data));
    //     });
    
    //     /*return () => {
    //         subscription.delete();
    //     };*/
    // }

    const getSelectedTimeScale = async (value) => {
      setTime(value);
    };

    const fetchFromInput = async (event) => {
        if (!isNaN(event.target.value) && event.keyCode === 13 && event.target.value.length > 0) {
            const response = await fetchDays(event.target.value);
            setTime('Jour');
            setData(response);
            console.log('enter ', response);
        }
    };

    const fetchDays = async (time) => {
        const day = await axios.get(`https://tidaly-api-backend.onrender.com/consumption/global?day=${time}`, 
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });

        // Format day time data
        day.data.result.map((item) => {
            const date = new Date(item.time);
            return item.time = date.toLocaleDateString('fr-FR', { weekday: 'long' });
        });
        
        return { day: day.data };
    };

    const fetchStatistics = async () => {
        try {
            const hub = await axios.get('https://tidaly-api-backend.onrender.com/api/v1/hub', 
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            

            const week = await axios.get('https://tidaly-api-backend.onrender.com/consumption/global?period=week', 
            { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });

            // Format week time data
            week.data.consumption.map((item) => {
                const date = new Date(item.time);
                return item.time = date.toLocaleDateString('fr-FR', { weekday: 'long' });
            });
            
            const month = await axios.get('https://tidaly-api-backend.onrender.com/consumption/global?period=month', 
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
            
            // Format month time data
            month.data.consumption.map((item) => {
                const date = new Date(item.time);
                return item.time = date.toLocaleDateString('fr-FR', { weekday: 'long' });

            });

            const year = await axios.get('https://tidaly-api-backend.onrender.com/consumption/global?period=year', 
                { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });

            // Format month time data
            year.data.consumption.map((item) => {
                const date = new Date(item.time);
                return item.time = date.toLocaleDateString('fr-FR', { weekday: 'long' });

            });
            
            // setHubPrice(hub.data.m_cube_price);
            setData({ year: year.data, month: month.data, week: week.data });
            setIsLoading(false);
            console.log('[HUB]: ', hub.data);
            console.log(`[STATISTICS]: `, { year: year.data, month: month.data, week: week.data });
        } catch (error) {
            console.log(`[STATISTICS ERROR]: ${error}`);
        }
    };

    const parseData = () => {
        if (!data) return;
        if (data.week !== undefined || 
            data.month !== undefined || 
            data.year !== undefined) {
            switch (time) {
                case 'Semaine':
                    const week = data.week.consumption.map((item) => { return { 'Eau en L': item.value, "Prix en €": (item.value / 1000 * data.week.priceM3), time: item.time } });
                    
                    return week; 
                case 'Mois': 
                    const month = data.month.consumption.map((item) => { return { 'Eau en L': item.value, "Prix en €": (item.value / 1000 * data.month.priceM3), time: item.time } });

                    console.log('[MAP]: ', month);
                    
                    return month;
                case 'Année': 
                    const year = data.month.consumption.map((item) => { return { 'Eau en L': item.value, "Prix en €": (item.value / 1000 * data.year.priceM3), time: item.time } });
                    
                    return year;
                default: return week;
            }
        } else if (data.day !== undefined) {
            return data.day.result;
        }
      
        return null;
    }

    useEffect(() => {
        if (time !== 'Jour') { fetchStatistics(); }
    }, [time]);

    // export const generateWeekBarData = (weeks, pricem3) => {
    //     if (!Array.isArray(weeks) || !weeks.length) {
    //         return [];
    //     }
    
    //     const daysOfWeek = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
    //     const pricePerLiter = pricem3 / 1000;
    
    //    // console.log("dsd", weeks);
    
    //     return weeks.map((dayData, index) => ({
    //         time: daysOfWeek[index],
    //         "Eau en L": dayData / 1000,
    //         "Prix en €": dayData / 1000 * pricem3,
    //     }));
    // };

    // useEffect(() => {
    //     setupSSE();
    //     fetchStatistics();
    //     //getConsumptionObjective();
    // }, []);

    console.log('[PARSEDDATA]: ', parseData());
    console.log('DATA -> ', data);
    console.log('TIME -> ', time);

    return (
        !isLoading ? <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="STATISTIQUES" subtitle="Consultez vos différentes statistiques" />
                <Box>
                    <SelectButton getSelectedTimeScale={getSelectedTimeScale} fetchFromInput={fetchFromInput} />
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
                    <Box mt="25px" p="0 30px">
                        <Typography variant="h4" fontWeight="600">
                            Historique de la consommation d'eau
                        </Typography>
                    </Box>
                    <Box height="250px" m="-20px 0 0 0">
                        <BarChart data={parseData()} time={time} isDashboard={true} />
                    </Box>
                </Box>

                <Box
                    gridColumn="span 6"
                    gridRow="span 2"
                    backgroundColor={colors.tidaly[100]}
                    p="20px"
                    borderRadius="10px"
                >
                    <Box mt="25px" p="0 30px">
                        <Typography variant="h3" fontWeight="600" color={"white"}>
                           Résumé de ma consommation
                        </Typography>
                    </Box>
                    <Box mt="45px" p="0 30px" display={"flex"}>
                        <ArrowDownwardIcon style={{color: "red", marginRight: "15px"}}/>
                        <Typography variant="h4" fontWeight="600" color={"white"}>
                            Argent depensé : 130.00€
                        </Typography>
                    </Box>
                    <Box mt="65px" p="0 30px" display={"flex"}>
                        <ArrowDownwardIcon style={{color: "red", marginRight: "15px"}}/>
                        <Typography variant="h4" fontWeight="600" color={"white"}>
                            Litres consommés : 3000L
                        </Typography>
                    </Box>
                </Box>

                <Box
                    gridColumn="span 6"
                    gridRow="span 2"
                    backgroundColor={colors.tidaly[100]}
                    p="20px"
                    borderRadius="10px"
                >
                    <Box mt="25px" p="0 30px">
                        <Typography variant="h3" fontWeight="600" color={"white"}>
                            Résumé de mes gains
                        </Typography>
                    </Box>
                    <Box mt="45px" p="0 30px" display={"flex"}>
                        <ArrowUpwardIcon style={{color: "green", marginRight: "15px"}}/>
                        <Typography variant="h4" fontWeight="600" color={"white"}>
                            Économies : 250.00€
                        </Typography>
                    </Box>
                    <Box mt="65px" p="0 30px" display={"flex"}>
                        <ArrowUpwardIcon style={{color: "green", marginRight: "15px"}}/>
                        <Typography variant="h4" fontWeight="600" color={"white"}>
                            Litres économisés : 5000L
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box> : null
    );
};

export default Statistics;
