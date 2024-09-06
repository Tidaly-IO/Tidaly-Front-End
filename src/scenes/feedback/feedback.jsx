import React, { useState } from 'react';
import { Grid, Container, Button, TextField, MenuItem, Select, FormControl, InputLabel, Rating, Snackbar, Alert } from '@mui/material';
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import logo from '../../assets/logoTidaly.png';
import Typography from '@mui/material/Typography';
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";

const Feedback = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [device, setDevice] = useState('');
    const [rating, setRating] = useState(0);
    const [favoriteFeature, setFavoriteFeature] = useState('');
    const [favoriteFeatureReason, setFavoriteFeatureReason] = useState('');
    const [leastFavoriteFeature, setLeastFavoriteFeature] = useState('');
    const [leastFavoriteFeatureReason, setLeastFavoriteFeatureReason] = useState('');
    const [additionalFeedback, setAdditionalFeedback] = useState('');
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const navigate = useNavigate();

    const handleFeedback = async (e) => {
        e.preventDefault();

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
            };

            const formData = {
                stars: rating,
                favoriteFunctionality: favoriteFeature,
                favoriteFunctionalityReason: favoriteFeatureReason,
                worstFunctionalityReason: leastFavoriteFeatureReason,
                worstFunctionality: leastFavoriteFeature,
                suggestion: additionalFeedback,
                device: "Web"
            };

            await axios.post('https://tidaly-api-backend.onrender.com/api/v1/form', formData, config);
            setSnackbarOpen(true);
        } catch (error) {
            console.error('Erreur lors de la requête:', error);
        }
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbarOpen(false);
    };

    return (
        <Grid container>
            {/* Colonne pour la bande bleue */}
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

            {/* Colonne pour le formulaire de setup */}
            <Grid item xs={8}>
                <Container maxWidth="sm" style={{ marginTop: '150px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h1" gutterBottom style={{ color: colors.tidaly[100] }}>
                            Vos retours
                        </Typography>
                        <form onSubmit={handleFeedback} style={{ width: '100%' }}>
                            <TextField
                                label="Appareil"
                                variant="outlined"
                                margin="normal"
                                type="text"
                                required
                                fullWidth
                                disabled
                                value={"Web"}
                                //onChange={(e) => setDevice(e.target.value)}
                            />
                            <Typography variant="h6" style={{ marginTop: '16px', marginBottom: '8px' }}>
                                Votre avis compte
                            </Typography>
                            <Rating
                                name="simple-controlled"
                                value={rating}
                                onChange={(event, newValue) => {
                                    setRating(newValue);
                                }}
                                onMouseOver={(event, newValue) => {
                                    if (newValue !== null) {
                                        event.target.style.color = colors.tidaly[100];
                                    }
                                }}
                                onMouseLeave={(event) => {
                                    event.target.style.color = '';
                                }}
                                style={{ color: colors.tidaly[100], marginBottom: '16px' }}
                            />
                            <FormControl variant="outlined" margin="normal" fullWidth>
                                <InputLabel>Votre fonctionnalité préférée</InputLabel>
                                <Select
                                    value={favoriteFeature}
                                    onChange={(e) => setFavoriteFeature(e.target.value)}
                                    label="Votre fonctionnalité préférée"
                                    required
                                >
                                    <MenuItem value="Page d'accueil">Page d'accueil</MenuItem>
                                    <MenuItem value="Statistique">Statistique</MenuItem>
                                    <MenuItem value="Mes capteurs">Mes capteurs</MenuItem>
                                    <MenuItem value="Consommation globale des capteurs">Consommation globale des capteurs</MenuItem>
                                    <MenuItem value="Répartition de la consommation des capteurs">Répartition de la consommation des capteurs</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                label="Pourquoi cette fonctionnalité ?"
                                variant="outlined"
                                margin="normal"
                                type="text"
                                required
                                fullWidth
                                value={favoriteFeatureReason}
                                onChange={(e) => setFavoriteFeatureReason(e.target.value)}
                            />
                            <FormControl variant="outlined" margin="normal" fullWidth>
                                <InputLabel>Quelle fonctionnalité avez-vous le moins préférée ?</InputLabel>
                                <Select
                                    value={leastFavoriteFeature}
                                    onChange={(e) => setLeastFavoriteFeature(e.target.value)}
                                    label="Quelle fonctionnalité avez-vous le moins préférée ?"
                                    required
                                >
                                    <MenuItem value="Page d'accueil">Page d'accueil</MenuItem>
                                    <MenuItem value="Statistique">Statistique</MenuItem>
                                    <MenuItem value="Mes capteurs">Mes capteurs</MenuItem>
                                    <MenuItem value="Consommation globale des capteurs">Consommation globale des capteurs</MenuItem>
                                    <MenuItem value="Répartition de la consommation des capteurs">Répartition de la consommation des capteurs</MenuItem>
                                </Select>
                            </FormControl>
                            <TextField
                                label="Pourquoi cette fonctionnalité ?"
                                variant="outlined"
                                margin="normal"
                                type="text"
                                required
                                fullWidth
                                value={leastFavoriteFeatureReason}
                                onChange={(e) => setLeastFavoriteFeatureReason(e.target.value)}
                            />
                            <TextField
                                label="Qu'aimeriez-vous de plus ?"
                                variant="outlined"
                                margin="normal"
                                type="text"
                                required
                                fullWidth
                                value={additionalFeedback}
                                onChange={(e) => setAdditionalFeedback(e.target.value)}
                            />
                            <Button type="submit" variant="contained" style={{ backgroundColor: colors.tidaly[100], color: '#fff', marginTop: '16px' }} fullWidth>
                                Envoyer
                            </Button>
                        </form>
                        <Typography variant="body2" style={{ marginTop: '16px' }}>
                            <Link to="/userProfile">Retour</Link>
                        </Typography>
                    </div>
                </Container>
                <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}  anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
                    <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                        Réponse enregistrée avec succès !
                    </Alert>
                </Snackbar>
            </Grid>
        </Grid>
    );
};

export default Feedback;
