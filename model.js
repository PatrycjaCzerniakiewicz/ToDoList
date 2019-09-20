const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    name: String,
    facebookID: String,
    email: String,
    accessToken: String
},{collection:"FB_users"}
);

const model = mongoose.model('FB_users',Schema);
module.exports = model;