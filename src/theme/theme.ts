'use client';
import { createTheme } from '@mui/material/styles';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

const theme = createTheme({
  palette: {
    primary: {
      main: '#2F4858', // Deep blue-grey
    },
    secondary: {
      main: '#6B7C85', // Soft grey
    },
    warning: {
      main: '#C9A14A', // gold accent
    },
    background: {
      default: '#FFFFFF',
      paper: '#F5F7F9',
    },
    text: {
      primary: '#2F4858',
      secondary: '#6B7C85',
    },
  },
  typography: {
    fontFamily: inter.style.fontFamily,
    h1: {
      fontWeight: 700,
      color: '#2F4858',
    },
    h2: {
      fontWeight: 700,
      color: '#2F4858',
    },
    h3: {
      fontWeight: 600,
      color: '#2F4858',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        },
      },
    },
  },
});

export default theme;
