import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useState } from 'react';

const SelectButton = ({ onYearChange, onMonthChange, onViewChange }) => {
    const [view, setView] = useState('Année');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('2025');

    const handleViewChange = (event) => {
        const newView = event.target.value;
        setView(newView);
        if (onViewChange) {
            onViewChange(newView);
        }
    };

    const handleMonthChange = (event) => {
        const newMonth = event.target.value;
        setMonth(newMonth);
        if (onMonthChange) {
            onMonthChange(newMonth);
        }
    };

    const handleYearChange = (event) => {
        const newYear = event.target.value;
        setYear(newYear);
        if (onYearChange) {
            onYearChange(newYear);
        }
    };

    return (
        <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
                <InputLabel id="view-label">Vue</InputLabel>
                <Select
                    labelId="view-label"
                    id="view-select"
                    value={view}
                    label="Vue"
                    onChange={handleViewChange}
                >
                    <MenuItem value="Mois">Mois</MenuItem>
                    <MenuItem value="Année">Année</MenuItem>
                    <MenuItem value="Jour" style={{ display: 'none' }}>Jour</MenuItem>
                </Select>
            </FormControl>

            {(view === 'Mois' || view === 'Année') && (
                <Box sx={{ display: 'flex', gap: 2, marginTop: 2 }}>
                    {view === 'Mois' && (
                        <FormControl fullWidth>
                            <InputLabel id="month-label">Mois</InputLabel>
                            <Select
                                labelId="month-label"
                                id="month-select"
                                value={month}
                                label="Mois"
                                onChange={handleMonthChange}
                            >
                                <MenuItem value="Janvier">Janvier</MenuItem>
                                <MenuItem value="Février">Février</MenuItem>
                                <MenuItem value="Mars">Mars</MenuItem>
                                <MenuItem value="Avril">Avril</MenuItem>
                                <MenuItem value="Mai">Mai</MenuItem>
                                <MenuItem value="Juin">Juin</MenuItem>
                                <MenuItem value="Juillet">Juillet</MenuItem>
                                <MenuItem value="Août">Août</MenuItem>
                                <MenuItem value="Septembre">Septembre</MenuItem>
                                <MenuItem value="Octobre">Octobre</MenuItem>
                                <MenuItem value="Novembre">Novembre</MenuItem>
                                <MenuItem value="Décembre">Décembre</MenuItem>
                            </Select>
                        </FormControl>
                    )}

                    <FormControl fullWidth>
                        <InputLabel id="year-label">Année</InputLabel>
                        <Select
                            labelId="year-label"
                            id="year-select"
                            value={year}
                            label="Année"
                            onChange={handleYearChange}
                        >
                            <MenuItem value="2023">2023</MenuItem>
                            <MenuItem value="2024">2024</MenuItem>
                            <MenuItem value="2025">2025</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            )}
        </Box>
    );
};

export default SelectButton;
