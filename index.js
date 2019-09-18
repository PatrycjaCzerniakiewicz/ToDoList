const config = require('config');
const Joi = require('joi');
const express = require('express');
const auth = require('./routes/auth');
const users = require('./routes/users');
const boards = require('./routes/boards');
const lists = require('./routes/lists');
const cards = require('./routes/cards');
const fb_users = require('./routes/FB_users');
// NEED TO FB LOGIN
const fetch = require('node-fetch')
const path = require('path');
const FBuser = require('./model');
const bodyParser = require('body-parser');
//
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require('mongoose');
const app = express();
require('./startup/prod')(app);
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
app.use('/',express.static(path.join(__dirname,'template')));
app.use(bodyParser.json());



if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

app.set('view-engine','ejs');

mongoose.connect(config.get('db'))
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

 

app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/cards', cards);
app.use('/api/lists', lists);
app.use('/api/boards', boards);
app.use('/api/fb_users',fb_users);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));