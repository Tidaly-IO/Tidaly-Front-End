import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import SelectButton from "../../components/SelectButton";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const Statistics = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="STATISTIQUES" subtitle="Consultez vos différentes statistiques" />
                <Box>
                    <SelectButton/>
                </Box>
            </Box>

            <Box
                display="grid"
                gridTemplateColumns="repeat(12, 1fr)"
                gridAutoRows="140px"
                gap="50px"
            >
                <Box
                    gridColumn="span 12"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    p="20px"
                    borderRadius="10px"
                >
                    <Box mt="25px" p="0 30px">
                        <Typography variant="h4" fontWeight="600">
                            Historique de la consommation d'eau
                        </Typography>
                    </Box>
                    <Box height="250px" m="-20px 0 0 0">
                        <BarChart isDashboard={true} />
                    </Box>
                </Box>

                <Box
                    gridColumn="span 6"
                    gridRow="span 2"
                    backgroundColor={colors.tidaly[100]}
                    p="20px"
                    borderRadius="10px"
                >
                    <Box mt="25px" p="0 30px">
                        <Typography variant="h3" fontWeight="600" color={"white"}>
                           Résumé de ma consommation
                        </Typography>
                    </Box>
                    <Box mt="45px" p="0 30px" display={"flex"}>
                        <ArrowDownwardIcon style={{color: "red", marginRight: "15px"}}/>
                        <Typography variant="h4" fontWeight="600" color={"white"}>
                            Argent depensé : 130.00€
                        </Typography>
                    </Box>
                    <Box mt="65px" p="0 30px" display={"flex"}>
                        <ArrowDownwardIcon style={{color: "red", marginRight: "15px"}}/>
                        <Typography variant="h4" fontWeight="600" color={"white"}>
                            Litres consommés : 3000L
                        </Typography>
                    </Box>
                </Box>

                <Box
                    gridColumn="span 6"
                    gridRow="span 2"
                    backgroundColor={colors.tidaly[100]}
                    p="20px"
                    borderRadius="10px"
                >
                    <Box mt="25px" p="0 30px">
                        <Typography variant="h3" fontWeight="600" color={"white"}>
                            Résumé de mes gains
                        </Typography>
                    </Box>
                    <Box mt="45px" p="0 30px" display={"flex"}>
                        <ArrowUpwardIcon style={{color: "green", marginRight: "15px"}}/>
                        <Typography variant="h4" fontWeight="600" color={"white"}>
                            Économies : 250.00€
                        </Typography>
                    </Box>
                    <Box mt="65px" p="0 30px" display={"flex"}>
                        <ArrowUpwardIcon style={{color: "green", marginRight: "15px"}}/>
                        <Typography variant="h4" fontWeight="600" color={"white"}>
                            Litres économisés : 5000L
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Statistics;
