import { Paper, Typography, Box } from '@mui/material';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import AirIcon from '@mui/icons-material/Air';
import CompressIcon from '@mui/icons-material/Compress';
import VisibilityIcon from '@mui/icons-material/Visibility';
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import { cityTime } from './WeatherCard';

function WeatherDetails({ weather, unit }) {
  const { main, wind, sys, visibility, timezone } = weather;
  const time = (ts) => cityTime(ts, timezone, { hour: 'numeric', minute: '2-digit' });

  // OpenWeather returns wind in m/s when units=metric
  const windText = unit === 'metric'
    ? `${(wind.speed * 3.6).toFixed(1)} km/h`
    : `${(wind.speed * 2.237).toFixed(1)} mph`;
  const visText = unit === 'metric'
    ? `${(visibility / 1000).toFixed(1)} km`
    : `${(visibility / 1609).toFixed(1)} mi`;

  const stats = [
    { icon: <WaterDropIcon />, label: 'Humidity', value: `${main.humidity}%` },
    { icon: <AirIcon />, label: 'Wind', value: windText },
    { icon: <CompressIcon />, label: 'Pressure', value: `${main.pressure} hPa` },
    { icon: <VisibilityIcon />, label: 'Visibility', value: visText },
    { icon: <WbTwilightIcon />, label: 'Sunrise', value: time(sys.sunrise) },
    { icon: <NightsStayIcon />, label: 'Sunset', value: time(sys.sunset) }
  ];

  return (
    <Paper
      elevation={0}
      component="dl"
      sx={{
        m: 0, p: { xs: 2, md: 3 }, border: 1, borderColor: 'divider',
        display: 'grid', gap: 2.5,
        gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }
      }}
    >
      {stats.map((s) => (
        <Box key={s.label} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ color: 'primary.main', display: 'flex' }}>{s.icon}</Box>
          <Box>
            <Typography component="dt" variant="body2" color="text.secondary">{s.label}</Typography>
            <Typography component="dd" fontWeight={600} sx={{ m: 0 }}>{s.value}</Typography>
          </Box>
        </Box>
      ))}
    </Paper>
  );
}

export default WeatherDetails;