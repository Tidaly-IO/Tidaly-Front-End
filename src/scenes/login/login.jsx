import React, { useState } from 'react';
import {Button, TextField, Container, Typography, Alert, Grid, Snackbar} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import logo  from '../../assets/logoTidaly.png';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    var isLogin = false;
    var isAlreadySetup = false;

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const userData = {
                email: username,
                password: password
            };

            const response = await axios.post('https://tidaly-api-backend.onrender.com/api/v1/login', userData);

            localStorage.setItem("token", response.data.token.token);

            isLogin = true;

        } catch (error) {
            console.error('Erreur lors de la requête post:', error);
            setShowAlert(true);
        }

        if (isLogin === true) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(("token"))}`
                    }
                };

                await axios.get('https://tidaly-api-backend.onrender.com/api/v1/user/profile', config);

                isAlreadySetup = true;

            } catch (error) {
                navigate("/tutorial");
                console.error('Erreur lors de la requête get:', error);

            }
        }

        if (isAlreadySetup === true) {

            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(("token"))}`
                    }
                };

                await axios.get('https://tidaly-api-backend.onrender.com/api/v1/hub', config);

                navigate("/home");

            } catch (error) {
                navigate("/WaterMeter");
                console.error('Erreur lors de la requête get:', error);
            }
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
                        </div>
                        <Typography variant="h1" style={{ color: '#000', position: 'absolute', bottom: '5%', left: '50%', transform: 'translateX(-50%)', fontSize: '2vw' }}>
                            TIDALY
                        </Typography>
                    </div>
                </div>
            </Grid>

            {/* Colonne pour le formulaire de connexion */}
            <Snackbar open={showAlert} autoHideDuration={6000} onClose={() => setShowAlert(false)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} >
                <Alert onClose={() => setShowAlert(false)} severity="error" sx={{ width: '100%' }}>
                    Adresse email ou mot de passe incorrect
                </Alert>
            </Snackbar>
            <Grid item xs={8}>
                <Container maxWidth="xs" style={{ marginTop: '250px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h1" gutterBottom style={{ color: colors.tidaly[100] }}>
                            Connexion
                        </Typography>
                        <form onSubmit={handleLogin} style={{ width: '100%' }}>
                            <TextField
                                label="Utilisateur"
                                variant="outlined"
                                margin="normal"
                                type="email"
                                required
                                fullWidth
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                            <TextField
                                label="Mot de passe"
                                variant="outlined"
                                type="password"
                                margin="normal"
                                required
                                fullWidth
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button type="submit" variant="contained" style={{ backgroundColor: colors.tidaly[100], color: '#fff', marginTop: '16px' }} fullWidth>
                                Se connecter
                            </Button>
                        </form>
                        <Typography variant="body2" style={{ marginTop: '16px' }}>
                            Vous n'avez pas encore de compte ? <Link to="/register">S'inscrire ici</Link>
                        </Typography>
                        <Typography variant="body2" style={{ marginTop: '16px' }}>
                            Mot de passe oublier ? <Link to="/recoverPassword">Retrouvez le ici</Link>
                        </Typography>
                    </div>
                </Container>
            </Grid>
        </Grid>

    );
};

export default Login;
