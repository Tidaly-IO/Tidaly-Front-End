import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import GasMeterIcon from '@mui/icons-material/GasMeter';
import {TextField, useTheme} from "@mui/material";
import { tokens } from "../theme";
import WaterDamageIcon from '@mui/icons-material/WaterDamage';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import {useState} from "react";
import axios from "axios";
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';


const separatorStyle = {
    borderBottom: '1px solid #e0e0e0',
    paddingBottom: '8px',
    marginBottom: '8px',
};

export default function SensorCard({ typOfSensor, currentConsumption, consumptionGoal, city, postalCode, waterPointLocation, nameOfWaterPoint, sensorId, SensorToUserList, water_consumption_target, waterPointConsumption, WaterPointUuid }) {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [openModal, setOpenModal] = React.useState(false);
    const [openModalSensor, setOpenModalSensor] = React.useState(false);
    const [modifyCurrentConsumption, setCurrentConsumption] = useState('');
    const [modifyConsumptionGoal, setConsumptionGoal] = useState('');
    const [modifyCity, setCity] = useState('');
    const [modifyPostalCode, setPostalCode] = useState('');
    const [newName, setNewName] = useState('');
    var [newLocation, setNewLocation] = useState('')
    const [consumptionGoalWaterPoint, setConsumptionGoalWaterPoint] = useState(0);


    if (waterPointLocation === "toilet") {
        waterPointLocation = "Toilette";
    }
    if (waterPointLocation === "sink") {
        waterPointLocation = "Robinet";
    }
    if (waterPointLocation === "shower") {
        waterPointLocation = "Douche";
    }

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleOpenModalSensor = () => {
        setOpenModalSensor(true);
    };

    const handleCloseModalSensor = () => {
        setOpenModalSensor(false);
        setNewLocation('')
        setNewName('')
    };

    const handleConsumptionGoalWaterPoint = (event) => {
        setConsumptionGoalWaterPoint(event.target.value);
    }

    const handleDeleteSensor = async () => {
        const confirmDelete = window.confirm("Êtes-vous sûr de vouloir supprimer ce capteur ?");

        if (confirmDelete) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(("token"))}`
                    },
                };

                await axios.delete('https://tidaly-api-backend.onrender.com/api/v1/sensor/' + sensorId, config);
            } catch (error) {
                console.error('Erreur lors de la requête de suppression:', error);
            }
        }
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

    const handleSaveChanges = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(("token"))}`
                },
            };

            const userData = {
                postalCode: modifyPostalCode,
                city: modifyCity,
                waterConsumptionTarget: modifyConsumptionGoal,
                baseWaterConsumption: modifyCurrentConsumption,
            }

            await axios.put('https://tidaly-api-backend.onrender.com/api/v1/hub', userData, config);


        } catch (error) {
            console.error('Erreur lors de la requête de modification:', error);
        }

        setOpenModal(false);
    }

    const handleSaveChangesSensor = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(("token"))}`
                },
            };

            if (newLocation === 'Robinet') {
                newLocation ='sink'
            }
            if (newLocation === 'Douche') {
                newLocation = 'shower'
            }
            if (newLocation === 'Toilette') {
                newLocation = 'toilet'
            }
            console.log("ooooooooooooh")

            console.log(consumptionGoalWaterPoint)

            console.log(newLocation)
            const userData = {
                name: newName,
                type: newLocation,
                waterConsumptionTarget: consumptionGoalWaterPoint,
                uuid: WaterPointUuid
            }

            await axios.put('https://tidaly-api-backend.onrender.com/api/v1/sensor/' + sensorId, userData, config);


        } catch (error) {
            console.error('Erreur lors de la requête de modification:', error);
        }

        setOpenModalSensor(false);
    }


    if (typOfSensor === 'WaterMeter') {
        return (
            <Card sx={{ backgroundColor: colors.tidaly[100], borderRadius: "10px", marginRight: 2, marginBottom: 2 }}>
                <CardContent style={{ textAlign: 'center' }}>
                    <Button onClick={SensorToUserList}>
                        <GasMeterIcon sx={{ fontSize: 50, mb: 1 }} />
                    </Button>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary">
                        Consommation actuelle
                    </Typography>
                    <Typography sx={{ fontSize: 10 }} variant="body2" style={separatorStyle}>
                        {currentConsumption}
                    </Typography>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary">
                        Objectif de consommation
                    </Typography>
                    <Typography sx={{ fontSize: 10 }} variant="body2" style={separatorStyle}>
                        {consumptionGoal}
                    </Typography>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary">
                        Ville
                    </Typography>
                    <Typography sx={{ fontSize: 10 }} variant="body2" style={separatorStyle}>
                        {city}
                    </Typography>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary">
                        Code postal
                    </Typography>
                    <Typography sx={{ fontSize: 10 }} variant="body2">
                        {postalCode}
                    </Typography>
                    <Button size="small" onClick={handleOpenModal}>Modifier</Button>
                </CardContent>

                {/* Modal */}
                <Modal
                    open={openModal}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{ backgroundColor: 'white', boxShadow: 24, padding: 4, borderRadius: '8px', width: '600px', margin: 'auto', marginTop: '200px'}}>
                        <Typography id="modal-modal-title" variant="h4" component="h2">
                            Modifier les informations
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            <TextField
                                label="Consommation actuelle"
                                fullWidth
                                type="number"
                                name="currentConsumption"
                                value={modifyCurrentConsumption}
                                onChange={handleCurrentConsumption}
                                style={{ marginTop: '10px' }}
                            />
                            <TextField
                                label="Objectif de consommation"
                                fullWidth
                                type="number"
                                name="consumptionGoal"
                                value={modifyConsumptionGoal}
                                onChange={handleConsumptionGoal}
                                style={{ marginTop: '10px' }}
                            />
                            <TextField
                                label="Ville"
                                fullWidth
                                name="city"
                                value={modifyCity}
                                onChange={handleCity}
                                style={{ marginTop: '10px' }}
                            />
                            <TextField
                                label="Code postal"
                                fullWidth
                                name="postalCode"
                                value={modifyPostalCode}
                                onChange={handlePostalCode}
                                style={{ marginTop: '10px' }}
                            />
                        </Typography>
                        <Box display="flex" justifyContent="center" marginTop={"20px"}>
                            <Button onClick={handleCloseModal} sx={{ mr: 2 }}>Annuler</Button>
                            <Button variant="contained" onClick={handleSaveChanges} style={{ backgroundColor: colors.tidaly[100]}}>Enregistrer</Button>
                        </Box>
                    </Box>
                </Modal>

            </Card>
        );
    } else {
        let cardColor = '';
        switch (waterPointLocation) {
            case "Toilette":
                cardColor = "white";
                break;
            case "Robinet":
                cardColor = colors.greenAccent[500];
                break;
            case "Douche":
                cardColor = colors.redAccent[500];
                break;
            default:
                cardColor = 'white';
        }

        return (
            <Card sx={{ backgroundColor: cardColor, borderRadius: "10px", marginRight: 2, marginBottom: 2, maxWidth: 170, maxHeight: 650 }}>
                <CardContent style={{ textAlign: 'center' }}>
                    <WaterDamageIcon sx={{ fontSize: 50, mb: 1 }} />
                    <Typography sx={{ fontSize: 12 }} color="text.secondary" style={separatorStyle}>
                        {nameOfWaterPoint}
                    </Typography>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary">
                        Emplacement
                    </Typography>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary" style={separatorStyle}>
                        {waterPointLocation}
                    </Typography>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary">
                        Consommation actuelle
                    </Typography>
                    <Typography sx={{ fontSize: 10 }} variant="body2" style={separatorStyle}>
                        {waterPointConsumption}
                    </Typography>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary">
                        Consommation moyenne
                    </Typography>
                    <Typography sx={{ fontSize: 10 }} variant="body2" style={separatorStyle}>
                        12345
                    </Typography>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary">
                        Objectif de consommation
                    </Typography>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary">
                        {water_consumption_target}
                    </Typography>
                    <Button size="small" onClick={handleOpenModalSensor}>Modifier</Button>
                    <Button size="small" onClick={handleDeleteSensor}>Supprimer</Button>
                </CardContent>

                <Modal
                    open={openModalSensor}
                    onClose={handleCloseModalSensor}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={{ backgroundColor: 'white', boxShadow: 24, padding: 4, borderRadius: '8px', width: '600px', margin: 'auto', marginTop: '200px'}}>
                        <Typography id="modal-modal-title" variant="h4" component="h2">
                            Modification de votre capteur
                        </Typography>
                        <TextField
                            label="Nouveau nom"
                            fullWidth
                            value={newName}
                            onChange={(e) => setNewName(e.target.value)}
                            style={{ marginTop: '10px' }}
                            inputProps={{ maxLength: 40 }}
                        />
                        <FormControl fullWidth style={{ marginTop: '10px' }}>
                            <InputLabel id="new-location-label">Nouvel emplacement</InputLabel>
                            <Select
                                labelId="new-location-label"
                                id="new-location"
                                value={newLocation}
                                onChange={(e) => setNewLocation(e.target.value)}
                            >
                                <MenuItem value="Douche">Douche</MenuItem>
                                <MenuItem value="Robinet">Robinet</MenuItem>
                                <MenuItem value="Toilette">Toilette</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            label="Objectif de consommation"
                            fullWidth
                            name="consumptionGoal"
                            value={consumptionGoalWaterPoint}
                            onChange={handleConsumptionGoalWaterPoint}
                            style={{ marginTop: '10px', marginBottom: '10px'}}
                        />
                        <Box display="flex" justifyContent="center" marginTop={"20px"}>
                            <Button onClick={handleCloseModalSensor} sx={{ mr: 2 }}>Annuler</Button>
                            <Button variant="contained" onClick={handleSaveChangesSensor} sx={{ mr: 2 }} style={{ backgroundColor: colors.tidaly[100]}}>Enregistrer</Button>
                        </Box>
                    </Box>
                </Modal>
            </Card>
        );
    }
}
