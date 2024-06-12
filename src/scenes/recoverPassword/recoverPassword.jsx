import React, { useState } from 'react';
import {Button, TextField, Container, Typography, Alert, Grid, Snackbar} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import logo  from '../../assets/logoTidaly.png';

const RecoverPassword = () => {
    const [email, setEmail] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [isPasswordRecovered, setIsPasswordRecovered] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const handleRecoverPassword = async (e) => {
        e.preventDefault();

        try {
            const userData = {
                email: email
            };

            const response = await axios.post('https://tidaly-api-backend.onrender.com/api/v1/forget-password', userData);

            // localStorage.setItem("token", response.data.token.token);
            response.status === 200 && setIsPasswordRecovered(true);

        } catch (error) {
            console.error('Erreur lors de la requête post:', error);
            setShowAlert(true);
        }
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
                            <Typography variant="h1" style={{ color: '#000', marginTop: '11vw' }}>TIDALY</Typography>
                        </div>
                    </div>
                </div>
            </Grid>

            {/* Colonne pour le formulaire de connexion */}
            <Snackbar open={showAlert} autoHideDuration={6000} onClose={() => setShowAlert(false)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
                <Alert onClose={() => setShowAlert(false)} severity="error" sx={{ width: '100%' }}>
                    Adresse email incorrect
                </Alert>
            </Snackbar>
            
            <Snackbar open={isPasswordRecovered} autoHideDuration={6000} onClose={() => setIsPasswordRecovered(false)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
                <Alert onClose={() => setIsPasswordRecovered(false)} severity="success" sx={{ width: '100%' }}>
                    Nous vous enverrons un mail de réinitialisation de votre mot de passe sur l'adresse email saisi 
                </Alert>
            </Snackbar>
            <Grid item xs={8}>
                <Container maxWidth="xs" style={{ marginTop: '250px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h1" gutterBottom style={{ color: colors.tidaly[100] }}>
                            Mot de passe oublier
                        </Typography>
                        <form onSubmit={handleRecoverPassword} style={{ width: '100%' }}>
                            <TextField
                                label="E-mail"
                                variant="outlined"
                                margin="normal"
                                type="email"
                                required
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button type="submit" variant="contained" style={{ backgroundColor: colors.tidaly[100], color: '#fff', marginTop: '16px' }} fullWidth>
                                Retrouver votre mot de passe
                            </Button>
                            <Typography variant="body2" style={{ marginTop: '16px', display: 'flex', justifyContent: 'center' }}>
                               <Link to="/">Je me connecte !</Link>
                            </Typography>
                        </form>
                    </div>
                </Container>
            </Grid>
        </Grid>
    );
};

export default RecoverPassword;
