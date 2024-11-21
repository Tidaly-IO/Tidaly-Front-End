import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Modal, Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import axios from "axios";
import SensorCard from "../../components/SensorCard";
import Typography from "@mui/material/Typography";
import HubInfo from "../hubInfo/hubInfo";
import { Snackbar, Alert } from '@mui/material';


const SensorDetails = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [openModal, setOpenModal] = useState(false);
    const [selectedSensor, setSelectedSensor] = useState('');
    const [joinWaterMeter, setJoinWaterMeter] = useState('');
    const [waterPointName, setWaterPointName] = useState('');
    var [waterPointLocation, setWaterPointLocation] = useState('');
    const [uuid, setUuid] = useState('');
    const [uuidSensor, setUuidSensor] = useState('');
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
    const [consumptionGoalWaterPointAdd, setConsumptionGoalWaterPointAdd] = useState('');
    const [waterPointConsumption, setWaterPointConsumption] = useState(0);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');


    const handleSensorDetails = async (e) => {
        e.preventDefault();
        console.log(waterPointName, waterPointLocation, selectedSensor, joinWaterMeter, uuid , currentConsumption, consumptionGoal, city, postalCode);
        if (selectedSensor === "Point d'eau" ) {
            if (
                !selectedSensor ||
                !waterPointName ||
                !waterPointLocation ||
                uuidSensor === "" ||
                !consumptionGoalWaterPointAdd ||
                isNaN(consumptionGoalWaterPointAdd)
            ) {
                if (!selectedSensor || !waterPointName || !waterPointLocation || uuidSensor === "" || !consumptionGoalWaterPointAdd) {
                    setSnackbarMessage("Veuillez remplir tous les champs.");
                } else if (isNaN(consumptionGoalWaterPointAdd)) {
                    setSnackbarMessage("L'objectif de consommation doit être un nombre.");
                }
                setOpenSnackbar(true);
                return;
            }

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
                    waterConsumptionTarget: consumptionGoalWaterPointAdd,
                    uuid: uuidSensor
                }

                await axios.post('https://tidaly-api-backend.onrender.com/api/v1/sensor', waterPointData, config);
            } catch (error) {
                if (error.response && error.response.data) {
                    if (error.response.data.message === "Sensor already exists") {
                        setSnackbarMessage("Vous ne pouvez pas ajouter un capteur pour un point d'eau qui a déjà été ajouté. Veuillez saisir un UUID unique");
                        setOpenSnackbar(true);
                        return
                    }
                    if (error.response.data.message ===	"Invalid sensor uuid") {
                        setSnackbarMessage("Le UUID renseigné n'est pas valide.");
                        setOpenSnackbar(true);
                        return
                    }
                    else if (error.response.data.errors) {
                        const validationErrorName = error.response.data.errors.find(err => err.rule === "minLength" && err.field === "name");
                        const validationErrorUUID = error.response.data.errors.find(err => (err.rule === "minLength" ||  err.rule === "maxLength") && err.field === "uuid");
                        if (validationErrorName) {
                            setSnackbarMessage("Le champ nom doit avoir au moins 4 caractères.");
                            setOpenSnackbar(true);
                            return
                        }
                        if (validationErrorUUID) {
                            setSnackbarMessage("Le champ UUID doit avoir une longueur valide conformément au format d'un UUID.");
                            setOpenSnackbar(true);
                            return
                        }
                    } else {
                        console.error("Erreur lors de l'ajout du point d'eau :", error);
                    }
                }
            }
        }
        if (selectedSensor === "Compteur d'eau") {
            if (
                !postalCode ||
                !consumptionGoal ||
                !city ||
                uuid === "" ||
                !currentConsumption ||
                isNaN(consumptionGoal) ||
                isNaN(currentConsumption) ||
                isNaN(postalCode)
            ) {
                if (!postalCode || !consumptionGoal || !city || uuid === "" || !currentConsumption) {
                    setSnackbarMessage("Veuillez remplir tous les champs.");
                } else if (isNaN(consumptionGoal) || isNaN(currentConsumption)) {
                    setSnackbarMessage("Les champs consommation actuelle et objectif de consommation doivent être des nombres.");
                } else if (isNaN(postalCode)) {
                    setSnackbarMessage("Le code postal doit être un nombre.");
                }
                setOpenSnackbar(true);
                return;
            }


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
                if (error.response.data.message === "Invalid hub uuid") {
                    setSnackbarMessage("Le UUID renseigné n'est pas valide.");
                    setOpenSnackbar(true);
                    return
                }
                if (error.response.data) {
                    if (error.response.data.errors) {
                        const validationErrorPostalCode = error.response.data.errors.find(err => (err.rule === "minLength" ||  err.rule === "maxLength") && err.field === "postalCode");
                        const validationErrorCity = error.response.data.errors.find(err => err.rule === "minLength" && err.field === "city");
                        const validationErrorUUID = error.response.data.errors.find(err => (err.rule === "minLength" ||  err.rule === "maxLength") && err.field === "uuid");
                        if (validationErrorPostalCode) {
                            setSnackbarMessage("Le champ code postal doit avoir 5 chiffres.");
                            setOpenSnackbar(true);
                            return
                        }
                        if (validationErrorCity) {
                            setSnackbarMessage("Le champ ville doit avoir au moins 3 caractères.");
                            setOpenSnackbar(true);
                            return
                        }
                        if (validationErrorUUID) {
                            setSnackbarMessage("Le champ UUID doit avoir une longueur valide conformément au format d'un UUID.");
                            setOpenSnackbar(true);
                            return
                        }
                    }
                }
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
        setUuidSensor('');
        setConsumptionGoalWaterPointAdd('');
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

    const handleUuidSensor = (event) => {
        setUuidSensor(event.target.value);
    }

    const handleConsumptionGoalWaterPointAdd = (event) => {
        setConsumptionGoalWaterPointAdd(event.target.value);
    }

    const generateDemoId = () => {
        const demoId = "hub-a73dba94-32b2-4ef2-89fb-b745c628cd33";
        setUuid(demoId);
    };

    const generateDemoSensorId = () => {
        const demoId = "sensor-27c83111-3225-4b76-a7ad-96d750456163";
        setUuidSensor(demoId);
    };

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
                    water_consumption_target: sensor.water_consumption_target,
                    uuid: sensor.uuid
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
                    setWaterPointConsumption(0);
                    console.log("Aucun résultat trouvé dans sensorsResults");
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des informations :", error);
            }
        }

        const fetchData = () => {
            getWaterMeter();
            getWaterPoint();
            getConsumptionWaterPoint();
        };

        const interval = setInterval(fetchData, 2000);
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
                        !showUserList ?
                            <SensorCard typOfSensor={"WaterMeter"} currentConsumption={getCurrentConsumption} consumptionGoal={getConsumptionGoal} city={getCity} postalCode={getPostalCode} SensorToUserList={SensorToUserList} />
                        : <HubInfo SensorToUserList={SensorToUserList} />
                    )}

                    {waterPoints.length > 0 ? (
                        waterPoints.map((waterPoint, index) => (
                            <SensorCard key={index} typeOfSensor={"WaterPoint"} nameOfWaterPoint={waterPoint.name} waterPointLocation={waterPoint.location} sensorId={waterPoint.id} water_consumption_target={waterPoint.water_consumption_target} waterPointConsumption={waterPointConsumption} WaterPointUuid={waterPoint.uuid} />
                        ))
                    ) : (
                        !isWaterMeter && (
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                style={{
                                    marginTop: "50px",
                                    minHeight: "200px",   // Hauteur minimale pour centrer le contenu
                                    width: "100%",         // Occupe toute la largeur disponible
                                }}
                            >
                                <Typography
                                    variant="h4"
                                    align="center"
                                    style={{
                                        color: colors.grey[100],
                                    }}
                                >
                                    Vous n’avez pour le moment aucun capteur
                                </Typography>
                            </Box>
                        )
                    )}
                </Box>
            </Box>

            <Box display="flex" justifyContent="center" mt={2}>
                <Button variant="contained" onClick={handleOpenModal} style={{ backgroundColor: colors.tidaly[100], color: '#fff' }}>Ajouter un capteur</Button>
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
                        position: 'absolute',
                        top: '40%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'white',
                        boxShadow: 24,
                        padding: 4,
                        borderRadius: '8px',
                        width: '600px',
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
                            {!isWaterMeter && <MenuItem value="Compteur d'eau">Hub connecté</MenuItem>}
                            {isWaterMeter && <MenuItem value="Point d'eau">Point d'eau</MenuItem>}
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
                                        name="currentConsumption"
                                        value={currentConsumption}
                                        onChange={handleCurrentConsumption}
                                        style={{ marginTop: '10px' }}
                                    />
                                    <TextField
                                        label="Objectif de consommation"
                                        fullWidth
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
                                    <Box display="flex" justifyContent="center" mt={2}>
                                        <Button onClick={generateDemoId} variant="contained" style={{ backgroundColor: colors.tidaly[100], color: '#fff', marginTop: '16px' }}>
                                            Demo : Générer un ID automatique
                                        </Button>
                                    </Box>
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
                                inputProps={{ maxLength: 40 }}
                                required
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
                                    required
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
                                required
                            />
                            <TextField
                                label="UUID"
                                fullWidth
                                name="uuid"
                                value={uuidSensor}
                                onChange={handleUuidSensor}
                                style={{ marginTop: '10px' }}
                                required
                            />
                            <Box display="flex" justifyContent="center" mt={2}>
                                <Button onClick={generateDemoSensorId} variant="contained" style={{ backgroundColor: colors.tidaly[100], color: '#fff', marginTop: '16px' }}>
                                    Demo : Générer un ID automatique
                                </Button>
                            </Box>
                        </>
                    )}
                    <Box display="flex" justifyContent="center" mt={2}>
                        <Button variant="contained" onClick={handleSensorDetails} style={{ backgroundColor: colors.tidaly[100], color: '#fff', marginTop: '10px' }}>Ajouter</Button>
                    </Box>
                </Box>
            </Modal>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity="error" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default SensorDetails;
