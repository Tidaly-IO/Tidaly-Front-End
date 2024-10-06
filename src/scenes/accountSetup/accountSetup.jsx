import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Grid, Select, MenuItem, FormControl, InputLabel, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import logo from '../../assets/logoTidaly.png';

const AccountSetup = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [name, setName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [city, setCity] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [address, setAddress] = useState("");
    const [country, setCountry] = useState("");

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const validateFields = () => {
        if (name.length < 2) {
            return "Le nom doit contenir au moins 2 caractères.";
        }
        if (firstName.length < 2) {
            return "Le prénom doit contenir au moins 2 caractères.";
        }
        if (address.length < 9) {
            return "L'adresse doit contenir au moins 9 caractères.";
        }
        if (city.length < 3) {
            return "La ville doit contenir au moins 3 caractères.";
        }
        if (!/^[0-9]{5}$/.test(postalCode)) {
            return "Le code postal doit être un nombre de 5 chiffres.";
        }
        if (!country) {
            return "Veuillez sélectionner un pays.";
        }
        return null;
    };

    const handleAccountSetup = async (e) => {
        e.preventDefault();

        const validationError = validateFields();
        if (validationError) {
            setErrorMessage(validationError);
            setOpenSnackbar(true);
            return;
        }

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(("token"))}`
                },
            };

            const userData = {
                firstname: firstName,
                lastname: name,
                address: address,
                countryCode: country,
                city: city,
                postalCode: postalCode
            };

            await axios.post('https://tidaly-api-backend.onrender.com/api/v1/user/profile', userData, config);

            navigate("/WaterMeter");

        } catch (error) {
            setErrorMessage("Une erreur est survenue lors de la soumission du formulaire.");
            setOpenSnackbar(true);
        }
    };

    return (
        <Grid container>
            <Grid item xs={4} style={{ backgroundColor: colors.tidaly[100], height: '100vh', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                    <div style={{ width: '18vw', height: '18vw', borderRadius: '50%', backgroundColor: '#fff', position: 'relative' }}>
                        <div style={{ width: '11vw', height: '11vw', borderRadius: '50%', backgroundColor: '#fff', backgroundImage: `url(${logo})`,
                            backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', position: 'absolute', top: '50%',
                            left: '50%', transform: 'translate(-50%, -50%)' }}>
                        </div>
                        <Typography variant="h1" style={{ color: '#000', position: 'absolute', bottom: '5%', left: '50%', transform: 'translateX(-50%)', fontSize: '2vw' }}>
                            TIDALY
                        </Typography>
                    </div>
                </div>
            </Grid>

            <Grid item xs={8}>
                <Container maxWidth="xs" style={{ marginTop: '160px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h1" gutterBottom style={{ color: colors.tidaly[100] }}>
                            Informations
                        </Typography>
                        <form onSubmit={handleAccountSetup} style={{ width: '100%' }}>
                            <TextField
                                label="Nom"
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <TextField
                                label="Prénom"
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                            <TextField
                                label="Adresse"
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
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
                                required
                                fullWidth
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                            />
                            <FormControl fullWidth variant="outlined" margin="normal" required>
                                <InputLabel>Pays</InputLabel>
                                <Select
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    label="Pays"
                                >
                                    <MenuItem value="FRA">France</MenuItem>
                                    <MenuItem value="BEL">Belgique</MenuItem>
                                </Select>
                            </FormControl>
                            <Button type="submit" variant="contained" style={{ backgroundColor: colors.tidaly[100], color: '#fff', marginTop: '16px' }} fullWidth>
                                Continuer
                            </Button>
                        </form>
                    </div>
                </Container>
            </Grid>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={5000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {errorMessage}
                </Alert>
            </Snackbar>
        </Grid>
    );
};

export default AccountSetup;
