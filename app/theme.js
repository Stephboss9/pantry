'use client'
// theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#795548', // Custom primary color (green)
        },
        secondary: {
            main: '#FF9800', // Custom secondary color (orange)
        },
        background: {
            main: '#F5F5DC'
        },
        highlight: {
            main: '#FF9800'
        },
        accent: {
            main: '#455A64'
        },
    },
    typography: {
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    },
    // You can customize more like spacing, breakpoints, etc.
});

export default theme;

