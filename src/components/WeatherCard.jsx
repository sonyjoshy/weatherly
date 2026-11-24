import { Paper, Typography, Box } from '@mui/material';

export const toUnit = (c, unit) => Math.round(unit === 'metric' ? c : (c * 9) / 5 + 32);

// Uses the searched city's own clock (OpenWeather gives a UTC offset in seconds),
// not the visitor's device time.
export const cityTime = (utcSeconds, offset, opts) =>
  new Date((utcSeconds + offset) * 1000).toLocaleString('en-US', { timeZone: 'UTC', ...opts });

function WeatherCard({ weather, unit }) {
  const { name, sys, main, dt, timezone } = weather;
  const { description, icon } = weather.weather[0];
  const symbol = unit === 'metric' ? '°C' : '°F';

  return (
    <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, border: 1, borderColor: 'divider' }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'space-between', gap: 2 }}>
        <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
          <Typography variant="h5" component="h2" fontWeight={600}>
            {name}, {sys.country}
          </Typography>
          <Typography color="text.secondary">
            {cityTime(dt, timezone, { weekday: 'long', hour: 'numeric', minute: '2-digit' })} local time
          </Typography>

          {/* The one big moment on the page */}
          <Typography
            component="p"
            aria-label={`${toUnit(main.temp, unit)} degrees`}
            sx={{ fontSize: { xs: '5.5rem', md: '8rem' }, fontWeight: 300, lineHeight: 1, mt: 2, letterSpacing: '-0.04em' }}
          >
            {toUnit(main.temp, unit)}
            <Box component="span" sx={{ fontSize: '0.35em', fontWeight: 400, color: 'text.secondary', ml: 0.5 }}>{symbol}</Box>
          </Typography>
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <Box component="img" src={`https://openweathermap.org/img/wn/${icon}@4x.png`} alt="" width={160} height={160} />
          <Typography variant="h6" sx={{ textTransform: 'capitalize' }}>{description}</Typography>
          <Typography color="text.secondary">
            Feels like {toUnit(main.feels_like, unit)}{symbol} · H {toUnit(main.temp_max, unit)}° L {toUnit(main.temp_min, unit)}°
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export default WeatherCard;