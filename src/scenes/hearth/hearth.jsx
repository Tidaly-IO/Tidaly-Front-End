import React, { useState } from 'react';
import { Grid, Container, Button, TextField, MenuItem, Select, FormControl, InputLabel, Typography, Snackbar, Alert } from '@mui/material';
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import logo from '../../assets/logoTidaly.png';
import house from '../../assets/house.png';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Hearth = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [comparisonArea, setComparisonArea] = useState('');
    const [housingType, setHousingType] = useState('');
    const [region, setRegion] = useState('');
    const [peapoleInTheHouse, setPeapoleInTheHouse] = useState('');
    const [waterPointInTheHouse, setWaterPointInTheHouse] = useState('');
    const navigate = useNavigate();
    var isAlreadySetup = false;
    const handleHearth = async (e) => {
        e.preventDefault();
    };

    const handleButton = async (e) => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(("token"))}`
                }
            };

            await axios.get('https://tidaly-api-backend.onrender.com/api/v1/user/profile', config);
            isAlreadySetup = true;

        } catch (error) {
            navigate("/WaterMeter");
            console.error('Erreur lors de la requête get:', error);

        }
        if (isAlreadySetup === true)
            navigate("/userProfile");
    }

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
                <Container maxWidth="sm" style={{ marginTop: '50px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h1" gutterBottom style={{ color: colors.tidaly[100] }}>
                            Mon foyer
                        </Typography>
                        <img src={house} alt="House" style={{ width: '100%', maxWidth: '150px', marginTop: '16px' }} />

                        <Typography variant="h4" style={{ marginTop: '16px' }}>Votre consommation</Typography>
                        <Typography variant="h4">2024</Typography>
                        <Typography variant="h5" style={{ marginTop: '10px' }}>125000 L</Typography>
                        <Typography variant="h5" style={{ marginTop: '10px' }}>Votre place</Typography>
                        <Typography variant="h5">20000/100000</Typography>
                        <Typography variant="h5" style={{ marginTop: '10px', textAlign: "center" }}>Félicitation selon les litres consommés sur cette année là, vous figurez en 20000èmes position sur 100000 autres foyer de votre région similaire au votre !</Typography>

                        <form onSubmit={handleHearth} style={{ width: '100%' }}>
                            <FormControl variant="outlined" margin="normal" fullWidth>
                                <InputLabel>Zone de comparaison</InputLabel>
                                <Select
                                    value={comparisonArea}
                                    onChange={(e) => setComparisonArea(e.target.value)}
                                    label="Zone de comparaison"
                                    required
                                >
                                    <MenuItem value="feature1">National</MenuItem>
                                    <MenuItem value="feature2">Régional</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl variant="outlined" margin="normal" fullWidth>
                                <InputLabel>Type de logement</InputLabel>
                                <Select
                                    value={housingType}
                                    onChange={(e) => setHousingType(e.target.value)}
                                    label="Type de logement"
                                    required
                                >
                                    <MenuItem value="feature1">Maison</MenuItem>
                                    <MenuItem value="feature2">Appartement</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                label="Région de résidence"
                                variant="outlined"
                                margin="normal"
                                type="text"
                                required
                                fullWidth
                                value={region}
                                onChange={(e) => setRegion(e.target.value)}
                            />
                            <TextField
                                label="Nombre de personne dans le foyer"
                                variant="outlined"
                                margin="normal"
                                type="number"
                                required
                                fullWidth
                                value={peapoleInTheHouse}
                                onChange={(e) => setPeapoleInTheHouse(e.target.value)}
                            />
                            <TextField
                                label="Nombre de point d'eau dans le foyer"
                                variant="outlined"
                                margin="normal"
                                type="number"
                                required
                                fullWidth
                                value={waterPointInTheHouse}
                                onChange={(e) => setWaterPointInTheHouse(e.target.value)}
                            />
                            <Button type="submit" variant="contained" style={{ backgroundColor: colors.tidaly[100], color: '#fff', marginTop: '16px' }} fullWidth>
                                Envoyer
                            </Button>
                            <Typography onClick={handleButton} variant="body2" style={{ marginTop: '16px', textAlign: "center" }}>
                                <Link to="/userProfile">Passer</Link>
                            </Typography>
                        </form>
                    </div>
                </Container>
            </Grid>
        </Grid>
    );
};

export default Hearth;
