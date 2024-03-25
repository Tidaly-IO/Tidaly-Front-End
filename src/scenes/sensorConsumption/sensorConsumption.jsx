import { Box, Typography, useTheme } from "@mui/material";
import { PieChart } from '@mui/x-charts/PieChart';
import Header from "../../components/Header";
import SelectButton from "../../components/SelectButton";
import { tokens } from "../../theme";
import { WaterDamage } from "@mui/icons-material";

const SensorConsumption = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
        <Box m="20px">
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Header title="RÉPARTITION DE LA CONSOMMATION DES CAPTEURS" subtitle="Consultez la consommation d'eau de chacun de vos capteurs" />
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
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        mt="25px"
                    >
                        <PieChart
                            series={[
                                {
                                    data: [
                                        { id: 0, value: 200, label: 'Toilettes' },
                                        { id: 1, value: 150, label: 'Douche du haut' },
                                        { id: 2, value: 100, label: 'Douche du bas' },
                                        { id: 3, value: 150, label: 'Robinet du haut' },
                                        { id: 4, value: 180, label: 'Robinet du bas' },
                                        { id: 5, value: 120, label: 'Robinet cuisine' },
                                    ],
                                },
                            ]}
                            width={800}
                            height={250}
                        />
                    </Box>
                </Box>

                <Box
                    gridColumn="span 12"
                    gridRow="span 2"
                    backgroundColor={colors.primary[400]}
                    p="20px"
                    borderRadius="10px"
                    position="relative"
                    textAlign="center"
                >
                    <WaterDamage style={{ fontSize: '30px', color: colors.tidaly[100], position: 'absolute', top: '40%', left: '5%' }} />
                    <Typography
                        variant="h4"
                        color={colors.grey[100]}
                        position="absolute"
                        top="40%"
                        left="10%"
                        transform="translate(-50%, -50%)"
                        fontWeight="600"
                    >
                        Toilettes : 500 L
                    </Typography>

                    <WaterDamage style={{ fontSize: '30px', color: colors.tidaly[100], position: 'absolute', top: '75%', left: '5%' }} />
                    <Typography
                        variant="h4"
                        fontWeight="600"
                        color={colors.grey[100]}
                        position="absolute"
                        top="75%"
                        left="10%"
                        transform="translate(-50%, -50%)"
                    >
                        Douche : 700 L
                    </Typography>

                    <WaterDamage style={{ fontSize: '30px', color: colors.tidaly[100], position: 'absolute', top: '40%', left: '40%' }} />
                    <Typography
                        variant="h4"
                        fontWeight="600"
                        color={colors.grey[100]}
                        position="absolute"
                        top="40%"
                        left="45%"
                        transform="translate(-50%, -50%)"
                    >
                        Robinet du haut : 150 L
                    </Typography>

                    <WaterDamage style={{ fontSize: '30px', color: colors.tidaly[100], position: 'absolute', top: '75%', left: '40%' }} />
                    <Typography
                        variant="h4"
                        fontWeight="600"
                        color={colors.grey[100]}
                        position="absolute"
                        top="75%"
                        left="45%"
                        transform="translate(-50%, -50%)"
                    >
                        Robinet du bas : 50 L
                    </Typography>

                    <WaterDamage style={{ fontSize: '30px', color: colors.tidaly[100], position: 'absolute', top: '40%', left: '75%' }} />
                    <Typography
                        variant="h4"
                        fontWeight="600"
                        color={colors.grey[100]}
                        position="absolute"
                        top="40%"
                        left="80%"
                        transform="translate(-50%, -50%)"
                    >
                        Douche du haut : 150 L
                    </Typography>

                    <WaterDamage style={{ fontSize: '30px', color: colors.tidaly[100], position: 'absolute', top: '75%', left: '75%' }} />
                    <Typography
                        variant="h4"
                        fontWeight="600"
                        color={colors.grey[100]}
                        position="absolute"
                        top="75%"
                        left="80%"
                        transform="translate(-50%, -50%)"
                    >
                        Douche du bas : 50 L
                    </Typography>

                    <Box
                        mt="25px"
                        p="0 30px"
                        display="flex "
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <Box>
                            <Typography
                                variant="h4"
                                fontWeight="600"
                                color={colors.grey[100]}
                            >
                                Dernières activités
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default SensorConsumption;
