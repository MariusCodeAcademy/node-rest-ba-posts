/* eslint-disable linebreak-style */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const postRoutes = require('./routes/postRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

//  Middleware
app.use(morgan('dev'));
app.use(cors());
// kad galetume gauti duomenis json formatu
app.use(express.json());

// Routes
// people masyvas kuriame yra objektai su id, name, email, married
// Sukuriam routes
// GET /api/people (grazina zmones)
// POST /api/people/new (irasom nauja zmogu i sarasa)
// sukurti peopleConntroller

// GET /api/users (grazina users is test db)
// app.get('/api/users', async (req, res) => {});

const usersRoutes = require('./routes/usersRoutes');

app.use('/', usersRoutes);
app.use('/', postRoutes);

app.all('*', (req, res) => {
  res.json('404 not found');
});

// Launch app
app.listen(PORT, console.log(`server online on port ${PORT}`));
