// import dependencies and initialize express
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./server/models');
db.sequelize.sync({ force: false }).then(() => {
  console.log('Drop and re-sync db.');
});

let corsOption = {
  origin: 'http://localhost:4200',
};

const app = express();
const healthRoutes = require('./server/routes/health-route');
const swaggerRoutes = require('./server/routes/swagger-route');
const heroRoutes = require('./server/routes/heroRoute');

// enable parsing of http request body
app.use(cors(corsOption));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// routes and api calls
app.use('/health', healthRoutes);
app.use('/swagger', swaggerRoutes);
app.use('/api/v1/heroes', heroRoutes);

// default path to serve up index.html (single page application)
app.all('', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../public', 'index.html'));
});

// start node server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App UI available http://localhost:${port}`);
  console.log(`Swagger UI available http://localhost:${port}/swagger/api-docs`);
});

// error handler for unmatched routes or api calls
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '../public', '404.html'));
});

module.exports = app;
