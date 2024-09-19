import React, { useState } from 'react';
import { Grid, Container, Button, TextField, MenuItem, Select, FormControl, InputLabel, Typography, Snackbar, Alert } from '@mui/material';
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import logo from '../../assets/logoTidaly.png';
import house from '../../assets/house.png';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Hearth2 = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [comparisonArea, setComparisonArea] = useState('');
    const [housingType, setHousingType] = useState('');
    const [region, setRegion] = useState('');
    const [peapoleInTheHouse, setPeapoleInTheHouse] = useState('');
    const [waterPointInTheHouse, setWaterPointInTheHouse] = useState('');
    const navigate = useNavigate();

    const regions = [
        "Île-de-France",
        "Centre-Val de Loire",
        "Bourgogne-Franche-Comté",
        "Normandie",
        "Hauts-de-France",
        "Grand Est",
        "Pays de la Loire",
        "Bretagne",
        "Nouvelle-Aquitaine",
        "Occitanie",
        "Auvergne-Rhône-Alpes",
        "Provence-Alpes-Côte d'Azur",
        "Corse",
        "Guadeloupe",
        "Martinique",
        "Guyane",
        "La Réunion",
        "Mayotte"
    ];

    const handleHearth = async (e) => {
        e.preventDefault();

        // Crée un objet avec les données du formulaire
        const hubData = {
            comparisonZone: comparisonArea === 'feature1' ? 'country' : 'region',
            housingType: housingType === 'feature1' ? 'House' : 'Apartment' ,
            locationOfHome: region,
            numberOfPeople: parseInt(peapoleInTheHouse),
            numberOfWaterPoint: parseInt(waterPointInTheHouse),
        };
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem(("token"))}`
            },
        };
        try {
            const response = await axios.post('https://tidaly-api-backend.onrender.com/api/v1/hub/infos', hubData, config);
            navigate("/home")
            console.log('Réponse du serveur :', response.data);
        } catch (error) {
            console.error('Erreur lors de la requête :', error);
        }
    };

    const handleButton = async (e) => {
        navigate("/home");
    }

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
                <Container maxWidth="sm" style={{ marginTop: '200px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h1" gutterBottom style={{ color: colors.tidaly[100] }}>
                            Mon foyer
                        </Typography>

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

                            <FormControl variant="outlined" margin="normal" fullWidth>
                                <InputLabel>Région de résidence</InputLabel>
                                <Select
                                    value={region}
                                    onChange={(e) => setRegion(e.target.value)}
                                    label="Région de résidence"
                                    required
                                >
                                    {regions.map((region) => (
                                        <MenuItem key={region} value={region}>{region}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            <TextField
                                label="Nombre de personnes dans le foyer"
                                variant="outlined"
                                margin="normal"
                                type="number"
                                required
                                fullWidth
                                value={peapoleInTheHouse}
                                onChange={(e) => setPeapoleInTheHouse(e.target.value)}
                            />

                            <TextField
                                label="Nombre de points d'eau dans le foyer"
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
                                <Link to="/userProfile" style={{ color: colors.tidaly[100], textDecoration: 'none' }}>Passer</Link>
                            </Typography>
                        </form>
                    </div>
                </Container>
            </Grid>
        </Grid>
    );
};

export default Hearth2;
