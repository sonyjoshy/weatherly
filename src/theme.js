import { createTheme } from '@mui/material/styles';

// One source of truth for colours. Components read from the theme,
// so they no longer need an `isDay` prop or repeated hex codes.
export const makeTheme = (mode) => {
  const night = mode === 'night';

  return createTheme({
    palette: {
      mode: night ? 'dark' : 'light',
      primary: { main: night ? '#A78BFA' : '#6D4AD8' },
      background: {
        default: night ? '#14122B' : '#F4F0FF',
        paper: night ? 'rgba(48, 42, 80, 0.72)' : 'rgba(255, 255, 255, 0.78)'
      },
      text: {
        primary: night ? '#FFFFFF' : '#30234D',
        secondary: night ? '#C7B9E8' : '#6B5C86'
      },
      divider: night ? 'rgba(199,185,232,0.18)' : 'rgba(48,35,77,0.12)'
    },
    shape: { borderRadius: 20 },
    typography: {
      fontFamily: "'Outfit', system-ui, sans-serif",
      button: { textTransform: 'none', fontWeight: 600 }
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: { backgroundImage: 'none', backdropFilter: 'blur(14px)' }
        }
      }
    }
  });
};

export const skyGradient = (night) =>
  night
    ? 'linear-gradient(160deg, #14122B 0%, #211D42 55%, #2F2A5C 100%)'
    : 'linear-gradient(160deg, #F4F0FF 0%, #E3DBFF 50%, #DCEEFF 100%)';