import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Alert, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import logo from '../../assets/logoTidaly.png';

const WaterMeter = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [hubId, setHubId] = useState("");
    const [showAlert, setShowAlert] = useState(false);

    const handleWaterMeter = async (e) => {
        e.preventDefault();

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(("token"))}`
                },
            };

            const response = await axios.get('https://tidaly-api-backend.onrender.com/api/v1/hub/' + hubId, config);
            localStorage.setItem("hubId", hubId);

            if (response.data === false) {
                navigate("/WaterMeterSetup");
            } else {
                navigate("/home");
            }
        } catch (error) {
            console.error('Erreur lors de la requête:', error);
            setShowAlert(true);
        }
    };

    const generateDemoId = () => {
        const demoId = "hub-a73dba94-32b2-4ef2-89fb-b745c628cd33";
        setHubId(demoId);
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
                <Container maxWidth="sm" style={{ marginTop: '300px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h1" gutterBottom style={{ color: colors.tidaly[100] }}>
                            Ajout du compteur d'eau
                        </Typography>

                        <Typography variant="body1" gutterBottom style={{ textAlign: 'center', marginBottom: '16px' }}>
                            Le hub connecté est un dispositif qui se positionnera directement sur votre compteur d'eau.
                        </Typography>
                        <Typography variant="body1" gutterBottom style={{ textAlign: 'center', marginBottom: '32px' }}>
                            Il récupère les informations de votre consommation d'eau. Puis celles-ci vous seront transmises directement via votre application Tidaly.
                        </Typography>

                        {showAlert && (
                            <Alert severity="error" onClose={() => setShowAlert(false)}>
                                Veuillez saisir un ID existant
                            </Alert>
                        )}
                        <form onSubmit={handleWaterMeter} style={{ width: '100%' }}>
                            <TextField
                                label="Id du hub"
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                value={hubId}
                                onChange={(e) => setHubId(e.target.value)}
                            />
                            {/* Bouton Demo pour générer un ID */}
                            <Button onClick={generateDemoId} variant="contained" style={{ backgroundColor: colors.tidaly[100], color: '#fff', marginTop: '16px' }} fullWidth>
                                Demo : Générer un ID automatique
                            </Button>
                            <Button type="submit" variant="contained" style={{ backgroundColor: colors.tidaly[100], color: '#fff', marginTop: '16px' }} fullWidth>
                                Enregistrer
                            </Button>
                        </form>
                        <Typography variant="body2" style={{ marginTop: '16px' }}>
                            Vous n'avez pas encore de hub ? <Link to="/home">Passer cette étape</Link>
                        </Typography>
                    </div>
                </Container>
            </Grid>
        </Grid>
    );
};

export default WaterMeter;