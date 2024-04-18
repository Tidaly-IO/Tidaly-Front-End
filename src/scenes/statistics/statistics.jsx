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

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
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
                
                setData({ year: year.data, month: month.data, week: week.data });
                setIsLoading(false);
                console.log(`[STATISTICS]: `, { year: year.data, month: month.data, week: week.data });
            } catch (error) {
                console.log(`[STATISTICS ERROR]: ${error}`);
            }
        };

        if (time !== 'Jour') fetchStatistics();
    }, [time]);

    const getRealtimeData = (data) => {
        // process the data here,
        // then pass it to the state to be rendered
        console.log('[SSE]: ', data);
    }

    useEffect(() => {
        const serverSentEvent = async () => {
            try {

                const sse = new EventSource(`https://tidaly-api-backend.onrender.com/consumption/global?period=${time === 'Semaine' ? 'week' : 'month'}`, 
                { 
                    withCredentials: true, 
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                
                sse.onmessage = event => getRealtimeData(JSON.parse(event.data));
                
                sse.onerror = () => {
                    // error log here 
                    console.log('[SSE]: ERROR');
                    sse.close();
                }
                
                sse.close();

            } catch (error) {
                console.log(`[SSE ERROR]: ${error}`);
            }
        };

        // serverSentEvent();
    }, [time]);

    // getRealtimeData();

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
                        <BarChart data={data} time={time} isDashboard={true} />
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
