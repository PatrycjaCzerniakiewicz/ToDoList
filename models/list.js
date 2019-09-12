const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const cardSchema = require('mongoose').model('Card').schema

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  cards: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Card'
  }]
});

const List = mongoose.model('List', listSchema);

function validateList(list) {
  const schema = {
    title: Joi.string().min(1).max(50).required(),
    cards: Joi.array().items(Joi.objectId())
  };

  return Joi.validate(list, schema);
}

exports.List = List; 
exports.validate = validateList;