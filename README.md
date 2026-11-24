# Weatherly 🌤️

A clean, responsive weather app. Search any city to see current conditions, with sunrise and sunset shown in that city's own local time.

**Live demo:** [https://weatherly-git-main-sonyjoshys-projects.vercel.app/]



## Features

- Current weather for any city worldwide (temperature, feels like, high/low, conditions)
- Humidity, wind, pressure, visibility, sunrise and sunset
- Local time for the searched city, not your device's time
- °C / °F toggle
- Day and night themes, saved between visits and matched to your device by default
- Clear error messages for unknown cities, invalid API keys and offline use
- Responsive layout and keyboard-accessible controls

## Tech stack

React · Vite · Material UI · OpenWeather API

## Getting started

1. Clone the repo and install dependencies:

   ```bash
   git clone https://github.com/YOUR-USERNAME/weatherly.git
   cd weatherly
   npm install
   ```

2. Get a free API key from [OpenWeather](https://openweathermap.org/api).

3. Create a `.env` file in the project root:

   ```
   VITE_WEATHER_API_KEY=your_key_here
   ```

4. Start the dev server:

   ```bash
   npm run dev
   ```

New OpenWeather keys can take a couple of hours to activate.

## Project structure

```
src/
├── components/
│   ├── Navbar.jsx
│   ├── SearchBar.jsx
│   ├── WeatherCard.jsx
│   └── WeatherDetails.jsx
├── theme.js
├── App.jsx
└── main.jsx
```

## Roadmap

- [ ] 5-day forecast
- [ ] Use my location
- [ ] Weather-based backgrounds

## License

MIT
