const express = require('express');
const card = require('../controllers/cardController');
const user = require('../controllers/userController');
const { auth } = require('../middleware/auth');

const router = express.Router();

// user
router.post('/signup', user.create);
router.post('/login', user.login);
router.get('/users', auth, user.readAll);
router.get('/user/:id', auth, user.readOne);
router.put('/user/:id', auth, user.update);
router.delete('/user/:id', auth, user.delete);

// card
router.post('/card', auth, card.create);
router.get('/cards', auth, card.readAll);
router.get('/card/:id', auth, card.readOne);
router.put('/card/:id', auth, card.update);
router.delete('/cards', auth, card.deleteAll);
router.delete('/card/:id', auth, card.deleteOne);

module.exports = router;