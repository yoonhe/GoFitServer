const express = require('express');
const db = require('../models');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    // Database Logic
    res.send(200, 'Hi');
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
