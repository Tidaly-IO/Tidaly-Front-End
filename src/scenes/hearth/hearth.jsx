import React, { useEffect, useState } from 'react';
import { Grid, Container, Button, TextField, MenuItem, Select, FormControl, InputLabel, Typography, Snackbar, Alert } from '@mui/material';
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import logo from '../../assets/logoTidaly.png';
import house from '../../assets/house.png';
import apartment from '../../assets/img_1.png';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const regions = [
    "Île-de-France", "Centre-Val de Loire", "Bourgogne-Franche-Comté", "Normandie", "Hauts-de-France", "Grand Est",
    "Pays de la Loire", "Bretagne", "Nouvelle-Aquitaine", "Occitanie", "Auvergne-Rhône-Alpes",
    "Provence-Alpes-Côte d'Azur", "Corse", "Guadeloupe", "Martinique", "Guyane", "La Réunion", "Mayotte"
];

const Hearth = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [comparisonArea, setComparisonArea] = useState('');
    const [housingType, setHousingType] = useState('');
    const [region, setRegion] = useState('');
    const [peapoleInTheHouse, setPeapoleInTheHouse] = useState('');
    const [waterPointInTheHouse, setWaterPointInTheHouse] = useState('');
    const [housingImage, setHousingImage] = useState(house);
    const [hasData, setHasData] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const fetchHubInfo = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            };

            const response = await axios.get('https://tidaly-api-backend.onrender.com/api/v1/hub/infos/compare', config);

            if (response.data.infos) {
                setHasData(true);
                setPeapoleInTheHouse(response.data.infos.number_of_people);
                setWaterPointInTheHouse(response.data.infos.number_of_water_point);
                setRegion(response.data.infos.location_of_home);
                const housingType = response.data.infos.housing_type;
                setHousingType(housingType);
                setHousingImage(housingType === 'House' ? house : apartment);
                const comparisonZone = response.data.infos.comparison_zone;
                setComparisonArea(comparisonZone === 'country' ? 'feature1' : 'feature2');
            } else {
                setHasData(false);
            }
        } catch (error) {
            console.error('Erreur lors de la requête get:', error);
        }
    };

    useEffect(() => {
        fetchHubInfo();
    }, []);

    const handleHearth = async (e) => {
        e.preventDefault();
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            };

            const payload = {
                numberOfPeople: peapoleInTheHouse,
                numberOfWaterPoint: waterPointInTheHouse,
                locationOfHome: region,
                housingType: housingType,
                comparisonZone: comparisonArea === 'feature1' ? 'country' : 'region'
            };

            if (hasData) {
                await axios.put('https://tidaly-api-backend.onrender.com/api/v1/hub/infos', payload, config);
            } else {
                await axios.post('https://tidaly-api-backend.onrender.com/api/v1/hub/infos', payload, config);
            }
            setSuccessMessage("Vos informations ont été enregistrées avec succès");
            setOpenSnackbar(true);
            fetchHubInfo()
        } catch (error) {
            console.error('Erreur lors de la requête:', error);
        }
    };

    const handleButton = async () => {
        navigate("/userProfile");
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
                <Container
                    maxWidth="sm"
                    style={{
                        marginTop: hasData ? '50px' : '20vh', // Adjusts the top margin based on hasData
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        transition: 'margin-top 0.3s ease', // Smooth transition for aesthetic touch
                    }}
                >
                    <Typography variant="h1" gutterBottom style={{ color: colors.tidaly[100] }}>
                        Mon foyer
                    </Typography>
                    {hasData && (
                        <>
                            <img src={housingImage} alt="Housing" style={{ width: '100%', maxWidth: '150px', marginTop: '16px' }} />

                            <Typography variant="h4" style={{ marginTop: '16px' }}>Votre consommation</Typography>
                            <Typography variant="h4">2024</Typography>
                            <Typography variant="h5" style={{ marginTop: '10px' }}>9 192 084 L</Typography>
                            <Typography variant="h5" style={{ marginTop: '10px' }}>Votre place</Typography>
                            <Typography variant="h5">20000/100000</Typography>
                            <Typography variant="h5" style={{ marginTop: '10px', textAlign: "center" }}>
                                Félicitation selon les litres consommés sur cette année-là, vous figurez en 20000èmes position sur 100000 autres foyers de votre région similaire au vôtre !
                            </Typography>
                        </>
                    )}

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
                                <MenuItem value="House">Maison</MenuItem>
                                <MenuItem value="Apartment">Appartement</MenuItem>
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
                                {regions.map((regionName) => (
                                    <MenuItem key={regionName} value={regionName}>
                                        {regionName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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
                        <Button type="submit" variant="contained" style={{ backgroundColor: colors.tidaly[100], marginTop: '16px' }} fullWidth>
                            Soumettre
                        </Button>
                        <Typography
                            onClick={handleButton}
                            style={{ color: colors.tidaly[100], marginTop: '16px', textAlign: 'center', cursor: 'pointer' }}>
                            Vous avez terminé? Passez à votre profil !
                        </Typography>
                    </form>
                </Container>
            </Grid>
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                <Alert onClose={() => setOpenSnackbar(false)} severity="success">
                    {successMessage}
                </Alert>
            </Snackbar>
        </Grid>
    );
};

export default Hearth;
