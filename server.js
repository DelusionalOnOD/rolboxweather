const express = require('express');
const axios = require('axios');
const app = express();

const PORT = process.env.PORT || 3000;
const OPENWEATHER_API_KEY = '8b8e2bc44b7799ee4c74d4c2ed04cf5d';

app.get('/weather', async (req, res) => {
  const lat = req.query.lat;
  const lon = req.query.lon;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Missing lat or lon query parameters' });
  }

  try {
    const weatherResponse = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`
    );

    const data = weatherResponse.data;

    const weatherMain = data.weather[0].main.toLowerCase();
    const temperature = data.main.temp;
    const city = data.name;

    const timezoneOffset = data.timezone;
    const localTimestamp = Math.floor(Date.now() / 1000) + timezoneOffset;
    const localDate = new Date(localTimestamp * 1000);
    const localHour = localDate.getUTCHours();

    res.json({
      weather: weatherMain,
      temperature: temperature,
      city: city,
      localHour: localHour
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
