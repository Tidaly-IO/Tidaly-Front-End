import React, { useEffect, useState } from "react";
import {Box, TextField, Button, Typography, FormControl, Snackbar, Alert} from '@mui/material';
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import waterMeterLogo from "../../assets/img.png";
import axios from "axios";

const Estimator = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [howManyToilet, setHowManyToilet] = useState(0);
    const [howManyFaucet, setHowManyFaucet] = useState(0);
    const [howManyShower, setHowManyShower] = useState(0);
    const [userReview, setUserReview] = useState('');
    const [estimateNumberOfSensors, setEstimateNumberOfSensors] = useState(0);
    const [result, setResult] = useState('');
    const [isAccomodationExist, setIsAccomodationExist] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [messageSnackbar, setMessageSnackbar] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

    const handleEstimateClick = async (e) => {
        e.preventDefault();  // Empêche la soumission par défaut du formulaire

        const data = {
            howManyToilet: howManyToilet,
            howManyFaucet: howManyFaucet,
            howManyShower: howManyShower,
            userReview: userReview
        };

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            },
        };

        try {
            if (isAccomodationExist) {
                await axios.put('https://tidaly-api-backend.onrender.com/api/v1/accommodation', data, config);
                setMessageSnackbar("Réponse enregistrée avec succès");
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
            } else {
                await axios.post('https://tidaly-api-backend.onrender.com/api/v1/accommodation', data, config);
                setMessageSnackbar("Réponse enregistrée avec succès");
                setSnackbarSeverity('success');
                setSnackbarOpen(true);
            }
        } catch (error) {
            console.error('Erreur:', error);
            if (error.response.data.message = "You must have a hub to create an accommodation") {
                setMessageSnackbar("Vous devez avoir un hub pour faire une estimation");
                setSnackbarSeverity('error');
                setSnackbarOpen(true);
            }
        }
    };

    const getAccomodation = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            };
            const response = await axios.get('https://tidaly-api-backend.onrender.com/api/v1/accommodation', config);
            setHowManyToilet(response.data.how_many_toilet);
            setHowManyFaucet(response.data.how_many_faucet);
            setHowManyShower(response.data.how_many_shower);
            setUserReview(response.data.user_review);
            setEstimateNumberOfSensors(response.data.estimate_number_of_sensors);
            setResult(response.data.details);
            setIsAccomodationExist(true);
        } catch (error) {
            console.error('Erreur:', error);
        }
    };

    useEffect(() => {
        getAccomodation();
    }, []);

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="ESTIMATEUR DE CAPTEUR PAR POINT D'EAU TIDALY" subtitle="Estimation du nombre de capteurs par point d'eau" />
            </Box>

            <Box
                gridColumn="span 12"
                gridRow="span 2"
                backgroundColor={colors.primary[400]}
                p="20px"
                borderRadius="10px"
                height="auto"
                overflowY="auto"
            >
                <Box display="flex" flexDirection="column" alignItems="center" textAlign="center">
                    <img src={waterMeterLogo} alt="Water Meter Logo" style={{ height: '150px', margin: '20px 0' }} />
                    <Typography variant="h6" component="p" style={{ marginBottom: '20px', maxWidth: '600px' }}>
                        En répondant précisément à notre formulaire, nous générerons le nombre de capteurs dont vous aurez besoin pour gérer au mieux votre consommation d'eau.
                    </Typography>
                </Box>

                <Typography variant="h4" component="h2" style={{ marginBottom: '20px' }}>Formulaires</Typography>

                <form onSubmit={handleEstimateClick}>
                    <Box display="flex" justifyContent="space-between" flexWrap="wrap">
                        <Box flexBasis="45%" mb={2}>
                            <FormControl fullWidth>
                                <TextField
                                    fullWidth
                                    label="Combien de toilettes possédez-vous ?"
                                    variant="outlined"
                                    type="number"
                                    value={howManyToilet}
                                    onChange={(e) => setHowManyToilet(e.target.value)}
                                    required
                                />
                            </FormControl>
                        </Box>
                        <Box flexBasis="45%" mb={2}>
                            <FormControl fullWidth>
                                <TextField
                                    fullWidth
                                    label="Combien de robinets possédez-vous ?"
                                    variant="outlined"
                                    type="number"
                                    value={howManyFaucet}
                                    onChange={(e) => setHowManyFaucet(e.target.value)}
                                    required
                                />
                            </FormControl>
                        </Box>
                        <Box flexBasis="45%" mb={2}>
                            <FormControl fullWidth>
                                <TextField
                                    fullWidth
                                    label="Combien de douches possédez-vous ?"
                                    variant="outlined"
                                    type="number"
                                    value={howManyShower}
                                    onChange={(e) => setHowManyShower(e.target.value)}
                                    required
                                />
                            </FormControl>
                        </Box>
                        <Box flexBasis="45%" mb={2}>
                            <TextField
                                fullWidth
                                label="Pouvez-vous nous en dire plus sur l'utilisation de vos points d'eau ?"
                                variant="outlined"
                                multiline
                                rows={1}
                                value={userReview}
                                onChange={(e) => setUserReview(e.target.value)}
                                required
                            />
                        </Box>
                    </Box>

                    <Box display="flex" justifyContent="center" mt={2}>
                        <Button
                            variant="contained"
                            size="large"
                            style={{ backgroundColor: colors.tidaly[100], color: "white" }}
                            type="submit"
                        >
                            Estimer
                        </Button>
                    </Box>
                </form>

                {/* Affichage du résultat ici */}
                <Typography variant="h4" component="h2" style={{ marginTop: '20px', marginBottom: '20px' }}>Résultat</Typography>
                <Box display="flex" alignItems="center">
                    <Typography variant="h5" component="p">Le nombre de capteurs dont vous avez besoin est </Typography>
                    <Box ml={2} display="flex" alignItems="center" justifyContent="center" width="50px" height="50px" borderRadius="50%" backgroundColor="white" style={{ color: colors.tidaly[100] }}>
                        {estimateNumberOfSensors}
                    </Box>
                </Box>
                <Typography variant="body1" style={{ marginTop: '20px' }}>
                    {result}
                </Typography>
                <Box display="flex" justifyContent="center" mt={2}>
                    <Button
                        variant="contained"
                        size="large"
                        style={{ backgroundColor: colors.tidaly[100], color: "white" }}
                    >
                        PDF
                    </Button>
                </Box>
            </Box>
            <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {messageSnackbar}
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default Estimator;
