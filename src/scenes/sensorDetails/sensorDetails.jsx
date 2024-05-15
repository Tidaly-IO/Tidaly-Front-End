import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Modal, Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";
import SensorCard from "../../components/SensorCard";
import Typography from "@mui/material/Typography";
import HubInfo from "../hubInfo/hubInfo";

const SensorDetails = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [openModal, setOpenModal] = useState(false);
    const [selectedSensor, setSelectedSensor] = useState('');
    const [joinWaterMeter, setJoinWaterMeter] = useState('');
    const [waterPointName, setWaterPointName] = useState('');
    var [waterPointLocation, setWaterPointLocation] = useState('');
    const [uuid, setUuid] = useState('');
    const [currentConsumption, setCurrentConsumption] = useState('');
    const [consumptionGoal, setConsumptionGoal] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [isWaterMeter, setIsWaterMeter] = useState(false);
    const [getCurrentConsumption, setGetCurrentConsumption] = useState('');
    const [getConsumptionGoal, setGetConsumptionGoal] = useState('');
    const [getCity, setGetCity] = useState('');
    const [getPostalCode, setGetPostalCode] = useState('');
    const [getWaterPointName, setGetWaterPointName] = useState([]);
    const [waterPoints, setWaterPoints] = useState([]);
    const [showUserList, setShowUserList] = useState(false);
    const [consumptionGoalWaterPointAdd, setConsumptionGoalWaterPointAdd] = useState(0);
    const [waterPointConsumption, setWaterPointConsumption] = useState(0);
    const handleSensorDetails = async (e) => {
        e.preventDefault();
        console.log(waterPointName, waterPointLocation, selectedSensor, joinWaterMeter, uuid , currentConsumption, consumptionGoal, city, postalCode);
        if (selectedSensor === "Point d'eau" && waterPointName !== "" && waterPointLocation !== "") {
            //setNbrOfWaterPoint(nbrOfWaterPoint + 1);
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(("token"))}`
                    },
                };

                if (waterPointLocation === "Toilette") {
                    waterPointLocation = "toilet";
                }
                if (waterPointLocation === "Robinet") {
                    waterPointLocation = "sink";
                }
                if (waterPointLocation === "Douche") {
                    waterPointLocation = "shower";
                }

                const waterPointData = {
                    name: waterPointName,
                    type: waterPointLocation,
                    waterConsumptionTarget: consumptionGoalWaterPointAdd
                }

                await axios.post('https://tidaly-api-backend.onrender.com/api/v1/sensor', waterPointData, config);
            } catch (error) {
                console.error("Erreur lors de l'ajout du point d'eau :", error);
            }
        }
        if (selectedSensor === "Compteur d'eau") {

            if (joinWaterMeter === "Oui" && uuid !== "") {
                try {
                    const config = {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(("token"))}`
                        },
                    };

                    const hubData = {
                        uuid: uuid,
                        waterConsumptionTarget: 0,
                        baseWaterConsumption: 0,
                        city: "     ",
                        postalCode: "     "
                    }

                    await axios.post('https://tidaly-api-backend.onrender.com/api/v1/hub/', hubData, config);

                } catch (error) {
                    console.error("Erreur lors de l'ajout dun compteur d'eau :", error);
                }

            }
            try {

                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(("token"))}`
                    },
                };

                const hubData = {
                    uuid: uuid,
                    waterConsumptionTarget: consumptionGoal,
                    baseWaterConsumption: currentConsumption,
                    city: city,
                    postalCode: postalCode
                }

                const response = await axios.post('https://tidaly-api-backend.onrender.com/api/v1/hub', hubData, config);
                console.log(response);
            } catch (error) {
                console.error("Erreur lors de l'ajout du compteur d'eau :", error);
            }
        }
        handleCloseModal(true);

    };

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedSensor('');
        setJoinWaterMeter('');
        setWaterPointName('');
        setWaterPointLocation('');
        setCurrentConsumption('');
        setConsumptionGoal('');
        setCity('');
        setPostalCode('');
        setUuid('');
    }

    const handleChange = (event) => {
        setSelectedSensor(event.target.value);
    };

    const handleWaterPointName = (event) => {
        setWaterPointName(event.target.value);
    };

    const handleWaterPointLocation = (event) => {
        setWaterPointLocation(event.target.value);
    };

    const handleJoinWaterMeter = (event) => {
        setJoinWaterMeter(event.target.value);
    };
    const handleCurrentConsumption = (event) => {
        setCurrentConsumption(event.target.value);
    };

    const handleConsumptionGoal = (event) => {
        setConsumptionGoal(event.target.value);
    };

    const handleCity = (event) => {
        setCity(event.target.value);
    };

    const handlePostalCode = (event) => {
        setPostalCode(event.target.value);
    };

    const handleUuid = (event) => {
        setUuid(event.target.value);
    };

    const handleConsumptionGoalWaterPointAdd = (event) => {
        setConsumptionGoalWaterPointAdd(event.target.value);
    }

    useEffect(() => {
        const getWaterMeter = async () => {

            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(("token"))}`
                },
            };

            try {
                const response = await axios.get('https://tidaly-api-backend.onrender.com/api/v1/hub', config);

                if (response.data !== null) {
                    setIsWaterMeter(true);
                    setGetCity(response.data.city);
                    setGetPostalCode(response.data.postal_code);
                    setGetCurrentConsumption(response.data.base_water_consumption);
                    setGetConsumptionGoal(response.data.water_consumption_target);
                }

                console.log(response);

            } catch (error) {
                console.error("Erreur lors de la récupération des informations :", error);
            }
        };

        const getWaterPoint = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(("token"))}`
                },
            };

            try {
                const response = await axios.get('https://tidaly-api-backend.onrender.com/api/v1/sensor', config);
                console.log("waterPoint", response);

                const waterPointData = response.data.map(sensor => ({
                    name: sensor.name,
                    location: sensor.type,
                    id : sensor.id,
                    water_consumption_target: sensor.water_consumption_target
                }));

                setWaterPoints(waterPointData);
            } catch (error) {
                console.error("Erreur lors de la récupération des informations :", error);
            }
        }

        const getConsumptionWaterPoint = async () => {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(("token"))}`
                },
            };

            try {
                const response = await axios.get('https://tidaly-api-backend.onrender.com/consumption/global?period=year', config);
                console.log("waterPointConsulptionqsq", response.data.sensorsResults);
                const sensorsResults = response.data.sensorsResults;

                if (sensorsResults && sensorsResults.length > 0) {
                    const firstResult = sensorsResults[0];

                    const waterPointConsulption = firstResult.data[0].value;

                    setWaterPointConsumption(waterPointConsulption)

                    console.log("waterPointConsulption", waterPointConsulption);
                } else {
                    const waterPointConsulption = 0;
                    setWaterPointConsumption(waterPointConsulption)
                    console.log("Aucun résultat trouvé dans sensorsResults");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des informations :", error);
            }
        }

        getWaterMeter();
        getWaterPoint();
        getConsumptionWaterPoint();
    }, []);

    const SensorToUserList = () => {
        setShowUserList(!showUserList);
    };


    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="MES CAPTEURS" subtitle="Consultez vos différents capteurs" />
            </Box>
            <Box gridColumn="span 12" gridRow="span 2" backgroundColor={colors.primary[400]} p="20px" borderRadius="10px" height={660} overflowY="auto">
                <Box display="flex" flexDirection="row" alignItems="center" mt={2} flexWrap="wrap" style={{ maxHeight: '100%', overflowY: 'auto' }}>
                    {isWaterMeter && (
                        // <SensorCard typOfSensor={"WaterMeter"} currentConsumption={getCurrentConsumption} consumptionGoal={getConsumptionGoal} city={getCity} postalCode={getPostalCode} SensorToUserList={SensorToUserList} />
                        !showUserList ? 
                                <SensorCard typOfSensor={"WaterMeter"} currentConsumption={getCurrentConsumption} consumptionGoal={getConsumptionGoal} city={getCity} postalCode={getPostalCode} SensorToUserList={SensorToUserList} />
                            : <HubInfo SensorToUserList={SensorToUserList} />
                    )}
                    {waterPoints.map((waterPoint, index) => (
                        <SensorCard key={index} typeOfSensor={"WaterPoint"} nameOfWaterPoint={waterPoint.name} waterPointLocation={waterPoint.location} sensorId={waterPoint.id} water_consumption_target={waterPoint.water_consumption_target} waterPointConsumption={waterPointConsumption} />
                    ))}

                </Box>
            </Box>

            <Box display="flex" justifyContent="center" mt={2}>
                <Button variant="contained" onClick={handleOpenModal} style={{ backgroundColor: colors.tidaly[100], color: '#fff'}}>Ajouter un capteur</Button>
            </Box>

            {/* Modal pour ajouter un capteur */}
            <Modal
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
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
                    <Typography id="modal-modal-title" variant="h4">
                        Ajouter un capteur
                    </Typography>
                    <FormControl fullWidth sx={{ mt: 3 }}>
                        <InputLabel id="sensor-label">Type du capteur</InputLabel>
                        <Select
                            labelId="sensor-label"
                            id="sensor-select"
                            value={selectedSensor}
                            onChange={handleChange}
                            label="Type du capteur"
                        >
                            <MenuItem value="Compteur d'eau">Compteur d'eau</MenuItem>
                            <MenuItem value="Point d'eau">Point d'eau</MenuItem>
                        </Select>
                    </FormControl>

                    {selectedSensor === 'Compteur d\'eau' && (
                        <>
                            <FormControl fullWidth style={{ marginTop: '10px' }}>
                                <InputLabel id="joinWaterMeter">Rejoindre un compteur ?</InputLabel>
                                <Select
                                    labelId="joinWaterMeter"
                                    id="joinWaterMeter-select"
                                    value={joinWaterMeter}
                                    onChange={handleJoinWaterMeter}
                                >
                                    <MenuItem value="Oui">Oui</MenuItem>
                                    <MenuItem value="Non">Non</MenuItem>
                                </Select>
                            </FormControl>
                            {joinWaterMeter === 'Oui' && (
                                <TextField
                                    label="UUID"
                                    fullWidth
                                    name="uuid"
                                    value={uuid}
                                    onChange={handleUuid}
                                    style={{ marginTop: '10px' }}
                                />
                            )}
                            {joinWaterMeter === 'Non' && (
                                <>
                                    <TextField
                                        label="Consommation actuelle"
                                        fullWidth
                                        type="number"
                                        name="currentConsumption"
                                        value={currentConsumption}
                                        onChange={handleCurrentConsumption}
                                        style={{ marginTop: '10px' }}
                                    />
                                    <TextField
                                        label="Objectif de consommation"
                                        fullWidth
                                        type="number"
                                        name="consumptionGoal"
                                        value={consumptionGoal}
                                        onChange={handleConsumptionGoal}
                                        style={{ marginTop: '10px' }}
                                    />
                                    <TextField
                                        label="Ville"
                                        fullWidth
                                        name="city"
                                        value={city}
                                        onChange={handleCity}
                                        style={{ marginTop: '10px' }}
                                    />
                                    <TextField
                                        label="Code postal"
                                        fullWidth
                                        name="postalCode"
                                        value={postalCode}
                                        onChange={handlePostalCode}
                                        style={{ marginTop: '10px' }}
                                    />
                                    <TextField
                                        label="UUID"
                                        fullWidth
                                        name="uuid"
                                        value={uuid}
                                        onChange={handleUuid}
                                        style={{ marginTop: '10px' }}
                                    />
                                </>
                            )}
                        </>
                    )}

                    {selectedSensor === 'Point d\'eau' && (
                        <>
                            <TextField
                                label="Nom du capteur"
                                fullWidth
                                name="sensorName"
                                value={waterPointName}
                                onChange={handleWaterPointName}
                                style={{ marginTop: '10px', marginBottom: '10px'}}
                            />
                            <FormControl fullWidth>
                                <InputLabel id="sensor-location">Emplacement du point d'eau</InputLabel>

                                <Select
                                    labelId="Emplacement du point d'eau"
                                    id="sensor-location"
                                    value={waterPointLocation}
                                    onChange={handleWaterPointLocation}
                                    label="Emplacement du point d'eau"
                                    style={{ marginTop: '10px' }}
                                >
                                    <MenuItem value="Toilette">Toilette</MenuItem>
                                    <MenuItem value="Robinet">Robinet</MenuItem>
                                    <MenuItem value="Douche">Douche</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                label="Objectif de consommation"
                                fullWidth
                                name="consumptionGoal"
                                value={consumptionGoalWaterPointAdd}
                                onChange={handleConsumptionGoalWaterPointAdd}
                                style={{ marginTop: '10px', marginBottom: '10px'}}
                            />
                        </>
                    )}
                    <Box display="flex" justifyContent="center" mt={2}>
                        <Button variant="contained" onClick={handleSensorDetails} style={{ backgroundColor: colors.tidaly[100], color: '#fff', marginTop: '10px' }}>Ajouter</Button>
                    </Box>
                </Box>
            </Modal>
        </Box>
    );
};

export default SensorDetails;
