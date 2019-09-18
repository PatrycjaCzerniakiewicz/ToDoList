const users = require('../routes/users');
const auth = require('../routes/auth');
const fb_users = require('../routes/FB_users');
const express = require('express');


module.exports = function(app) {
app.use(express.json());
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/fb_users',fb_users);
}