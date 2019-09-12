const auth = require('../middleware/auth');
const {List, validate} = require('../models/list');
const {Card, validateCard = validate} = require('../models/card');
const express = require('express');
const _ = require('lodash');
const router = express.Router();


router.get('/', auth, async (req, res) => {
  const list = await List.find().populate('cards');
  res.send(list);
});

router.get('/:id', auth, async (req, res) => {
  const list = await List.findById(req.params.id).populate('cards');
  res.send(list);
});

router.post('/', auth,  async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  list = new List(_.pick(req.body, ['title', 'cards']));
  await list.save();

  res.send(list);
});

router.post('/:id', auth,  async (req, res) => {
  const { error } = validateCard(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let list = await List.findById(req.params.id);
  if(!list) return res.status(404).send("List not found");

  let card = new Card(_.pick(req.body, ['title', 'description']));
  card = await card.save();
  list.cards.push({_id: card._id});
  list = await list.save();
  res.send(list);
});

router.put('/:id', auth,  async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const list = await List.findByIdAndUpdate(req.params.id, { title: req.body.title }, {
    new: true
  });

  if (!list) return res.status(404).send('The list with the given ID was not found.');
  
  res.send(list);
});

// Changes card's list
router.put('/:id/:cardId', auth,  async (req, res) => {
  let listNew = await List.findById(req.params.id);
  if (!listNew) return res.status(404).send('The list with the given ID was not found.');

  let listOld = await List.findOne({cards: req.params.cardId});
  listOld.cards = listOld.cards.filter(x => x != req.params.cardId);
  listNew.cards.push(req.params.cardId);

  listOld.save();
  listNew.save();
  
  res.send(listNew);
});

// Removes list with all cards inside
router.delete('/:id', auth, async (req, res) => {
  let list = await List.findById(req.params.id);
  for(x of list.cards) {
    await Card.findByIdAndRemove(x);
  }
  list = await list.remove();

  if (!list) return res.status(404).send('The list with the given ID was not found.');

  res.send(list);
});

// Deletes specified card inside specified list
router.delete('/:id/:cardId', auth, async (req, res) => {
  let list = await List.findById(req.params.id);

  list.cards = list.cards.filter(x => x != req.params.cardId);
  list = list.save();
  let card = await Card.findByIdAndRemove(req.params.cardId);

  if (!list) return res.status(404).send('The list with the given ID was not found.');
  if (!card) return res.status(404).send('The card with the given ID was not found.');

  res.send(list, card);
});
  

module.exports = router;