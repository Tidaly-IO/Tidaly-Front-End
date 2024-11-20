import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";

function getDaysInCurrentMonth() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const nextMonth = new Date(year, month + 1, 0);
    return nextMonth.getDate();
  }

const ProgressCircle = ({ size = 40, currentDayConsumption, consumptionObjective, onClick }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const daysInMonth = getDaysInCurrentMonth();
    const consumptionObjectiveByDays = Math.floor(consumptionObjective / daysInMonth);
    const progress = currentDayConsumption >= consumptionObjectiveByDays ? 1 : currentDayConsumption / consumptionObjectiveByDays;
    const angle = progress * 360;
    const backgroundColor = currentDayConsumption >= consumptionObjectiveByDays ? colors.redAccent[500]: colors.tidaly[100];

    return (
        <Box
            sx={{
                position: 'relative',
                borderRadius: "50%",
                width: `${size}px`,
                height: `${size}px`,
            }}
            onClick={onClick}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: `radial-gradient(${colors.primary[400]} 55%, transparent 56%),
                    conic-gradient(transparent 0deg ${angle}deg, ${colors.tidaly[200]} ${angle}deg 360deg),
                    ${backgroundColor}`,
                    borderRadius: "50%",
                    width: `${size}px`,
                    height: `${size}px`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Typography variant="body1">{currentDayConsumption} / {consumptionObjectiveByDays}</Typography>
            </Box>
        </Box>
    );
};

export default ProgressCircle;
