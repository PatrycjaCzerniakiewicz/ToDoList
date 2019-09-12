const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const express = require('express');
const app = express();

require('./startup/config')();
require('./startup/routes')(app);
require('./startup/prod');(app)


mongoose.connect('mongodb+srv://Wojtek:wiatrGoniFale@tdacluster-yvt8y.azure.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));



const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));