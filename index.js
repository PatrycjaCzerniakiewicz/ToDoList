const config = require('config');
const Joi = require('joi');
const express = require('express');
const users = require('./routes/users');
const auth = require('./routes/auth');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const app = express();
require('./startup/prod')(app);

app.set('view-engine','ejs');

mongoose.connect(config.get('db'))
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));


app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth',auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));