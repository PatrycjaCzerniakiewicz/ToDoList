const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const app = express();

require('./startup/config')();
require('./startup/routes')(app);
require('./startup/prod');(app)


mongoose.connect(config.get("db"))
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));



const port = process.env.PORT || 3000;
 const index = app.listen(port, () => console.log(`Listening on port ${port}...`));
 module.exports = index;