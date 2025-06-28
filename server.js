// server.js
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/weather', (req, res) => {
  // You can later fetch real weather using req.query.lat and req.query.lon
  // For now, just send fixed example data:
  res.json({
    weather: 'clear',
    temperature: 25,
    city: 'Sample City',
    localHour: new Date().getHours()
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});