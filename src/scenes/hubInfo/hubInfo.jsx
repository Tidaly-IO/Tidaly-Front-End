import { useEffect, useState } from "react";
import axios from 'axios';
import { Avatar, Card, CardContent, Grid, Paper, Typography, Button } from "@mui/material";
import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import GasMeterIcon from '@mui/icons-material/GasMeter';

import tidaly from '../../assets/logoTidaly.png'

const HubInfo = ({ SensorToUserList }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchHubInfo = async () => {
            try {
                const response = await axios.get('https://tidaly-api-backend.onrender.com/api/v1/hub/users', { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } });
                console.log(response.data);
                setData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.log(`[HUBINFO ERROR]: ${error}`);
            }
        };

        fetchHubInfo();
    }, []);

    const getUserList = () => {
        return data !== null && data.users.map((item) => {
            return (
                <Grid container spacing={1}>
                    <Grid container item xs={12} spacing={3}>
                        <Grid item xs={20} mb={1} overflow={'scroll'} maxHeight={205} width={230}>
                            <Paper style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Avatar src={item !== null ? item.profile.picture : null} sx={{ width: 18, height: 18 }} cov />
                                <Typography ml={1} sx={{ fontSize: 12 }} color="text.secondary">
                                    { item !== null ? item.profile.firstname : 'Not' }
                                </Typography>
                                <Typography ml={1} sx={{ fontSize: 12 }} color="text.secondary">
                                    { item !== null ? item.profile.lastname : 'Found' }
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
            );
        });
    };

    return (
        !isLoading ? 
            <Card sx={{ backgroundColor: colors.tidaly[100], borderRadius: "10px", marginRight: 2, marginBottom: 2 }}>
                <CardContent style={{ textAlign: 'center' }}>
                    <Button onClick={SensorToUserList}>
                        <GasMeterIcon sx={{ fontSize: 50, mb: 1 }} />
                    </Button>
                    <Typography sx={{ fontSize: 12 }} color="text.secondary">
                        Utiisateurs
                    </Typography>
                    { getUserList() }
                </CardContent>
            </Card>
            : null
    );
};

export default HubInfo;
