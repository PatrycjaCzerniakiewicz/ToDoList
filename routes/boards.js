const access = require('../middleware/access');
const auth = require('../middleware/auth');
const {
  Board,
  validate,
  validateUpdate
} = require('../models/board');
const {
  List,
  validateList = validate,
  validateListUpdate = validateUpdate
} = require('../models/list');
const express = require('express');
const _ = require('lodash');
const router = express.Router();
const ObjectId = require('mongoose').Types.ObjectId;


router.get('/', auth, async (req, res) => {
  let boards = await Board.find().populate({
    path: 'lists',
    populate: {
      path: 'cards',
      model: 'Card'
    }
  });
  if (!req.user.isAdmin) boards = boards.filter(b => b.admin == req.user.email);
  res.send(boards);
});

router.get('/:id', [auth, access], async (req, res) => {
  const board = await Board.findById(req.params.id).populate('lists');
  res.send(board);
});

router.post('/', auth, async (req, res) => {
  req.body.admin = req.user.email;
  const {
    error
  } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let board = await Board.findOne({
    name: req.body.name
  });
  if (board) return res.status(400).send('Board name is occupied.');


  board = new Board(req.body);
  await board.save();

  res.send(board);
});

router.post('/:id', [auth, access], async (req, res) => {
  const {
    error
  } = validateList(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let board = await Board.findById(req.params.id);
  if (!board) return res.status(404).send("Board not found");

  let list = new List(req.body);
  list = await list.save();
  board.lists.push(list._id);
  board = await board.save();
  res.send(board);
});

router.put('/:id', [auth, access], async (req, res) => {
  const {
    error
  } = validateUpdate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const board = await Board.findById(req.params.id);
  if (!board) return res.status(404).send('The board with the given ID was not found.');

  if (req.body.title) board.title = req.body.title;
  if (req.body.description) board.description = req.body.description;
  if (req.body.admin) board.admin = req.body.admin;

  if (req.body.lists)
    for (const x of req.body.lists) {
      const {
        error
      } = validateList(x);
      const {
        errorUpdate
      } = validateListUpdate(x);
      if (ObjectId.isValid(x)) {
        if (!board.lists.find(y => y == x) && (await List.findById(x))) {
          await List.removeFromParentBoard(x);
          board.lists.push(x)
        };
        // Valid list object with valid ID was given
      } else if (!errorUpdate && ObjectId.isValid(x._id)) {
        let list = await List.findByIdAndUpdate(x._id, x, {
          new: true
        });
        if (!board.lists.find(y => y == x._id) && list) board.lists.push(x._id);
        // Valid list object without valid ID was given (creates new list)
      } else if (!error) {
        let list = new List(x);
        list = await list.save();
        board.lists.push(list._id);
        // Nothing valid was given
      } else {
        await board.save();
        return res.status(400).send(error.details[0].message)
      }
    }

  await board.save();

  res.send(board);
});

// Removes board with all lists inside
router.delete('/:id', [auth, access], async (req, res) => {
  let board = await Board.findByIdAndremoveWithContent(req.params.id);

  if (!board) return res.status(404).send('The board with the given ID was not found.');

  res.send(board);
});

// Deletes specified list inside specified board
router.delete('/:id/:listId', [auth, access], async (req, res) => {
  let board = await Board.findById(req.params.id);
  if (!board) return res.status(404).send('The board with the given ID was not found.');

  board.lists = board.lists.filter(x => x != req.params.listId);
  board = board.save();
  let list = await List.findByIdAndremoveWithContent(req.params.listId);

  if (!list) return res.status(404).send('The list with the given ID was not found.');

  res.send(list);
});

module.exports = router;