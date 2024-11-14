import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Grid, Snackbar, Alert } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import logo from '../../assets/logoTidaly.png';

const WaterMeterSetup = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [consumption, setConsumption] = useState();
    const [objective, setObjective] = useState();
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");

    const [errors, setErrors] = useState({
        postalCode: '',
        city: '',
        uuid: '',
    });

    const [errorMessages, setErrorMessages] = useState([]);
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleSnackbarClose = (index) => {
        setErrorMessages(prev => prev.filter((_, i) => i !== index));
        if (errorMessages.length === 1) setSnackbarOpen(false);
    };

    const handleWaterMeterSetup = async (e) => {
        e.preventDefault();

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(("token"))}`
                },
            };

            const userData = {
                city: city,
                postalCode: postalCode,
                uuid : localStorage.getItem("hubId"),
                waterConsumptionTarget: objective,
                baseWaterConsumption: consumption,
            }

            await axios.post('https://tidaly-api-backend.onrender.com/api/v1/hub', userData, config);

            navigate("/hearth2");

        }
        catch (error) {
            console.error('Erreur lors de la requête:', error);

            if (error.response && error.response.data && error.response.data.errors) {
                const apiErrors = error.response.data.errors;
                const newErrors = { postalCode: '', city: '', uuid: '' };
                const newErrorMessages = [];

                apiErrors.forEach(err => {
                    if (err.field === 'postalCode' && err.rule === 'minLength') {
                        const message = `Le code postal doit avoir au moins ${err.args.minLength} caractères.`;
                        newErrorMessages.push(message);
                        newErrors.postalCode = message;
                    }
                    if (err.field === 'city' && err.rule === 'minLength') {
                        const message = `La ville doit avoir au moins ${err.args.minLength} caractères.`;
                        newErrorMessages.push(message);
                        newErrors.city = message;
                    }
                    if (err.field === 'uuid' && err.rule === 'required') {
                        const message = `L'UUID est requis.`;
                        newErrorMessages.push(message);
                        newErrors.uuid = message;
                    }
                });

                setErrors(newErrors);
                setErrorMessages(newErrorMessages);
                setSnackbarOpen(true);
            }
        }
    };

    return (
        <Grid container>
            {/* Colonne pour la bande bleue */}
            <Grid item xs={4} style={{ backgroundColor: colors.tidaly[100], height: '100vh', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                    <div style={{ width: '18vw', height: '18vw', borderRadius: '50%', backgroundColor: '#fff', position: 'relative' }}>
                        <div style={{ width: '11vw', height: '11vw', borderRadius: '50%', backgroundColor: '#fff', backgroundImage: `url(${logo})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                            <Typography variant="h1" style={{ color: '#000', marginTop: '11vw' }}>TIDALY</Typography>
                        </div>
                    </div>
                </div>
            </Grid>

            {/* Colonne pour le formulaire de setup */}
            <Grid item xs={8}>
                <Container maxWidth="sm" style={{ marginTop: '250px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h1" gutterBottom style={{ color: colors.tidaly[100] }}>
                            Paramétrage du compteur d'eau
                        </Typography>
                        <form onSubmit={handleWaterMeterSetup} style={{ width: '100%' }}>
                            <TextField
                                label="Consommation actuelle"
                                variant="outlined"
                                margin="normal"
                                type="number"
                                required
                                fullWidth
                                value={consumption}
                                onChange={(e) => setConsumption(e.target.value)}
                            />
                            <TextField
                                label="Objectif de consommation"
                                variant="outlined"
                                margin="normal"
                                type="number"
                                required
                                fullWidth
                                value={objective}
                                onChange={(e) => setObjective(e.target.value)}
                            />
                            <TextField
                                label="Ville"
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                            <TextField
                                label="Code postale"
                                variant="outlined"
                                margin="normal"
                                type="number"
                                required
                                fullWidth
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                            />
                            <Button type="submit" variant="contained" style={{ backgroundColor: colors.tidaly[100], color: '#fff', marginTop: '16px' }} fullWidth>
                                Enregistrer
                            </Button>
                        </form>
                        <Typography variant="body2" style={{ marginTop: '16px' }}>
                            Souhaitez-vous revenir à l'étape précédente ? <Link to="/">Cliquez ici</Link>
                        </Typography>
                    </div>
                </Container>
            </Grid>

            {errorMessages.map((message, index) => (
                <Snackbar
                    key={index}
                    open={snackbarOpen}
                    autoHideDuration={6000}
                    onClose={() => handleSnackbarClose(index)}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                >
                    <Alert onClose={() => handleSnackbarClose(index)} severity="error" sx={{ width: '100%' }}>
                        {message}
                    </Alert>
                </Snackbar>
            ))}
        </Grid>
    );
};

export default  WaterMeterSetup;