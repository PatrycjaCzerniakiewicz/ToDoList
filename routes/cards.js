const auth = require('../middleware/auth');
const {Card, validate} = require('../models/card');
const express = require('express');
const _ = require('lodash');
const router = express.Router();


router.get('/', auth, async (req, res) => {
  const card = await Card.find();
  res.send(card);
});

router.get('/:id', auth, async (req, res) => {
  const card = await Card.findById(req.card._id);
  res.send(card);
});

router.post('/', auth,  async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let card = new Card(_.pick(req.body, ['title', 'description']));
  card = await card.save();

  res.send(card);
});

router.put('/:id', auth,  async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const card = await Card.findByIdAndUpdate(req.params.id, { title: req.body.title, description: req.body.description }, {
    new: true
  });

  if (!card) return res.status(404).send('The card with the given ID was not found.');
  
  res.send(card);
});

// Removes card from it's parent list and deletes card
router.delete('/:id', auth, async (req, res) => {
  let list = await List.findOne({cards: req.params.id});
  if(list){
    list.cards = list.cards.filter(x => x != req.params.id);
    await list.save();
  }
  const card = await Card.findByIdAndRemove(req.params.id);

  if (!card) return res.status(404).send('The card with the given ID was not found.');

  res.send(card);
});

module.exports = router;