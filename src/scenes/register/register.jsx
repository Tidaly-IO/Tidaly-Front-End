import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Alert, Grid } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import logo from '../../assets/logoTidaly.png';

const Register = () => {
    const [verifyPassword, setVerifyPassword] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAlertPassword, setShowAlertPassword] = useState(false);
    const [showAlertPasswordLength, setShowAlertPasswordLength] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [showAlertEmail, setShowAlertEmail] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password.length < 8) {
            setShowAlertPasswordLength(true);
            return;
        }

        if (password !== verifyPassword) {
            setShowAlertPassword(true);
            return;
        }

        const userData = {
            email: email,
            password: password
        };

        try {
            const response = await axios.post('https://tidaly-api-backend.onrender.com/api/v1/register', userData);

            console.log('Réponse du serveur:', response.data);

            navigate('/');
        } catch (error) {
            if (error.response && error.response.status === 422) {
                setShowAlertEmail(true);
            } else {
                console.error('Erreur lors de la requête :', error);
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

            {/* Colonne pour le formulaire d'inscription */}
            <Grid item xs={8}>
                <Container maxWidth="xs" style={{ marginTop: '250px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h1" gutterBottom style={{ color: colors.tidaly[100] }}>
                            Inscription
                        </Typography>
                        {showAlertPasswordLength && (
                            <Alert severity="error" style={{ width: '100%', marginBottom: '16px' }}
                                   onClose={() => setShowAlertPasswordLength(false)}>Le mot de passe doit contenir au moins 8 caractères.
                            </Alert>
                        )}
                        {showAlertPassword && (
                            <Alert severity="error" style={{ width: '100%', marginBottom: '16px' }}
                                   onClose={() => setShowAlertPassword(false)}>Les mots de passe ne correspondent pas.
                            </Alert>
                        )}
                        {showAlertEmail && (
                            <Alert severity="error" style={{ width: '100%', marginBottom: '16px' }}
                                   onClose={() => setShowAlertEmail(false)}>Cet email est déjà utilisé.
                            </Alert>
                        )}
                        <form onSubmit={handleRegister} style={{ width: '100%' }}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                margin="normal"
                                type="email"
                                required
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                            <TextField
                                label="Confirmer le mot de passe"
                                variant="outlined"
                                type="password"
                                margin="normal"
                                required
                                fullWidth
                                value={verifyPassword}
                                onChange={(e) => setVerifyPassword(e.target.value)}
                            />
                            <Button type="submit" variant="contained" style={{ backgroundColor: colors.tidaly[100], color: '#fff', marginTop: '16px' }} fullWidth>
                                S'inscrire
                            </Button>
                        </form>
                        <Typography variant="body2" style={{ marginTop: '16px' }}>
                            Vous avez déjà un compte ? <Link to="/">Se connecter ici</Link>
                        </Typography>
                    </div>
                </Container>
            </Grid>
        </Grid>
    );
};

export default Register;
