import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
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

    const handleAccountSetup = async (e) => {
        e.preventDefault();

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

            navigate("/hearth2");

        } catch (error) {
            console.error('Erreur lors de la requête:', error);
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
        </Grid>
    );
};

export default AccountSetup;