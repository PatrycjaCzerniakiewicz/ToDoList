const config = require('config');
const Joi = require('joi');
const express = require('express');
const cors = require('cors');
const auth = require('./routes/auth');
const users = require('./routes/users');
const boards = require('./routes/boards');
const lists = require('./routes/lists');
const cards = require('./routes/cards');
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
app.use('/', express.static(path.join(__dirname, 'template')));
app.use(bodyParser.json());



if (!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined.');
  process.exit(1);
}

app.set('view-engine', 'ejs');

mongoose.connect(config.get('db'))
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(cors());
app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/users', users);
app.use('/api/cards', cards);
app.use('/api/lists', lists);
app.use('/api/boards', boards);

app.post('/login-with-facebook', async (req, res) => {
  const {
    accessToken,
    userID
  } = req.body

  const response = await fetch(`https://graph.facebook.com/v4.0/me?access_token=${accessToken}&fields=id%2Cname%2Cemail%2Cfirst_name%2Clast_name&method=get&pretty=0&sdk=joey&suppress_http_code=1`);
  const json = await response.json();
  console.log('JSON OBJECT :', json);
  if (json.id === userID) {

    const result = await FBuser.findOne({
      facebookID: userID
    });

    if (result) {
      res.json({
        status: 'ok',
        data: 'You are logged in'
      });
    } else {
      const newUser = new FBuser({
        name: json.name,
        facebookID: userID,
        email: json.email,
        accessToken
      })


      await newUser.save();
      res.json({
        status: "ok"
      });
    }

  } else {
    res.json({
      status: 'error'
    });
  }

});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));