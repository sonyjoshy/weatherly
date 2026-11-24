import { AppBar, Toolbar, Typography, IconButton, Tooltip, ToggleButtonGroup, ToggleButton, Box } from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

function Navbar({ mode, toggleTheme, unit, setUnit }) {
  const night = mode === 'night';

  return (
    <AppBar position="static" elevation={0} color="transparent" sx={{ color: 'text.primary' }}>
      <Toolbar sx={{ maxWidth: 900, width: '100%', mx: 'auto', px: { xs: 2, md: 3 }, gap: 1 }}>
        <CloudIcon color="primary" sx={{ fontSize: 32 }} />
        <Typography variant="h5" component="div" fontWeight={700} sx={{ flexGrow: 1 }}>
          Weatherly
        </Typography>

        <ToggleButtonGroup
          exclusive
          size="small"
          value={unit}
          onChange={(_, v) => v && setUnit(v)}
          aria-label="Temperature unit"
        >
          <ToggleButton value="metric" aria-label="Celsius">°C</ToggleButton>
          <ToggleButton value="imperial" aria-label="Fahrenheit">°F</ToggleButton>
        </ToggleButtonGroup>

        <Box>
          <Tooltip title={night ? 'Switch to day mode' : 'Switch to night mode'}>
            <IconButton onClick={toggleTheme} aria-label="Toggle day and night mode" color="primary">
              {night ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;