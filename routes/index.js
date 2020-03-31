const express = require('express');
const card = require('../controllers/cardController');
const user = require('../controllers/userController');
const { auth } = require('../middleware/auth');

const router = express.Router();

router.get('/users', auth, user.readAll);

router.get('/cards', card.readAll);

module.exports = router;