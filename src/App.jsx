import { useMemo, useState, useEffect } from 'react';
import {
  ThemeProvider, CssBaseline, Box, Container, Typography, Alert
} from '@mui/material';

import { makeTheme, skyGradient } from './theme';
import Navbar from './components/Navbar';          // folder is lowercase: fixes the build on Linux/Vercel/Netlify
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import WeatherDetails from './components/WeatherDetails';
import hero from './assets/weather-hero.png';

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

const initialMode = () =>
  localStorage.getItem('theme') ||
  (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'night' : 'day');

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(initialMode);
  const [unit, setUnit] = useState('metric'); // 'metric' | 'imperial'

  const theme = useMemo(() => makeTheme(mode), [mode]);

  useEffect(() => { localStorage.setItem('theme', mode); }, [mode]);

  const toggleTheme = () => setMode((m) => (m === 'day' ? 'night' : 'day'));

  const handleSearch = async () => {
    const query = city.trim();
    if (!query) return setError('Enter a city name to see its weather.');
    if (!API_KEY) return setError('API key missing. Add VITE_WEATHER_API_KEY to your .env file and restart the dev server.');

    try {
      setLoading(true);
      setError('');

      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(query)}&appid=${API_KEY}&units=metric`
      );

      if (res.status === 404) throw new Error(`We couldn't find "${query}". Check the spelling or try "City, Country".`);
      if (res.status === 401) throw new Error('The API key was rejected. New keys can take a couple of hours to activate.');
      if (!res.ok) throw new Error('The weather service had a problem. Try again in a moment.');

      setWeather(await res.json());
    } catch (err) {
      // fetch() itself throws a TypeError when offline
      setError(err instanceof TypeError ? 'Network error. Check your connection and try again.' : err.message);
    } finally {
      setLoading(false);
    }
  };

  const night = mode === 'night';

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', background: skyGradient(night), transition: 'background 0.4s ease' }}>
        <Navbar mode={mode} toggleTheme={toggleTheme} unit={unit} setUnit={setUnit} />

        <Container maxWidth="md" component="main" sx={{ pb: 8 }}>
          {/* Hero shrinks away once there is a result, so the data gets the space */}
          {!weather && (
            <Box sx={{ textAlign: 'center', pt: { xs: 3, md: 6 }, pb: 3 }}>
              <Box
                component="img"
                src={hero}
                alt=""
                sx={{ width: { xs: 180, md: 240 }, maxWidth: '100%', mb: 2 }}
              />
              <Typography variant="h3" component="h1" fontWeight={700} sx={{ fontSize: { xs: '2rem', md: '2.75rem' } }}>
                What's the weather like?
              </Typography>
              <Typography color="text.secondary" sx={{ mt: 1, mb: 1 }}>
                Search any city for current conditions.
              </Typography>
            </Box>
          )}

          <Box sx={{ pt: weather ? 3 : 0, maxWidth: 560, mx: 'auto' }}>
            <SearchBar city={city} setCity={setCity} onSearch={handleSearch} loading={loading} />
            {error && <Alert severity="error" role="alert" sx={{ mt: 2 }}>{error}</Alert>}
          </Box>

          {weather && (
            <Box sx={{ mt: 4, display: 'grid', gap: 3 }}>
              <WeatherCard weather={weather} unit={unit} />
              <WeatherDetails weather={weather} unit={unit} />
            </Box>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;