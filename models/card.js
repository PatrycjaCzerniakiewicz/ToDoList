const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  description: {
    type: String,
    maxlength: 16384,
  }
});

cardSchema.methods.generateAuthToken = function() { 
    const token = jwt.sign({ _id: this._id}, config.get('jwtPrivateKey'));
    return token;
};

const Card = mongoose.model('Card', cardSchema);

function validateCard(card) {
  const schema = {
    title: Joi.string().min(1).max(50).required(),
    description: Joi.string().max(16384)
  };

  return Joi.validate(card, schema);
}

exports.Card = Card; 
exports.validate = validateCard;