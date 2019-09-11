const config = require('config');
const Joi = require('joi');
const express = require('express');
const users = require('./routes/users');
const auth = require('./routes/auth');
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const app = express();

app.set('view-engine','ejs');

mongoose.connect('mongodb+srv://Wojtek:coderscamp_WGF@tdacluster-yvt8y.azure.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));


app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth',auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));