const express = require('express');
const router = express.Router();

router.use('/recipes', require('./recipes'));
router.use('/ingredients', require('./ingredients'));

module.exports = router;
