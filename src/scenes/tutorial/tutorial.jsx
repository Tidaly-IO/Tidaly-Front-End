import React from 'react';
import {Grid, Container, Button} from '@mui/material';
import Caroussel from '../../components/Caroussel';
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import logo from '../../assets/logoTidaly.png';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Tutorial = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    var isAlreadySetup = false;

    const handleButton = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(("token"))}`
                }
            };

            const response = await axios.get('https://tidaly-api-backend.onrender.com/api/v1/user/profile', config);

            console.log(response)

            isAlreadySetup = true;

        } catch (error) {
            navigate("/AccountSetup");
            console.error('Erreur lors de la requête get:', error);

        }
        if (isAlreadySetup === true)
            navigate("/userProfile");
    }

    return (
        <Grid container>
            {/* Colonne pour la bande bleue */}
            <Grid item xs={4} style={{ backgroundColor: colors.tidaly[100], height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div>
                    <div style={{ width: '18vw', height: '18vw', borderRadius: '50%', backgroundColor: '#fff', position: 'relative' }}>
                        <div style={{ width: '11vw', height: '11vw', borderRadius: '50%', backgroundColor: '#fff', backgroundImage: `url(${logo})`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                            <Typography variant="h1" style={{ color: '#000', marginTop: '11vw' }}>TIDALY</Typography>
                        </div>
                    </div>
                </div>
            </Grid>

            <Grid item xs={8} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h1" gutterBottom style={{ color: colors.tidaly[100] }}>
                    Tutoriel de l'application Tidaly
                </Typography>
                <Container style={{ marginTop: '20px', maxWidth: '100%' }}>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Caroussel />
                    </div>
                </Container>
                <Button onClick={handleButton} variant="contained" style={{ backgroundColor: colors.tidaly[100], color: '#fff', marginTop: '16px' }} >
                    Passer le tutoriel
                </Button>
            </Grid>
        </Grid>
    );
};

export default Tutorial;
