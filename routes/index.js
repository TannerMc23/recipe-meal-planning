const express = require('express');
const router = express.Router();

router.use('/recipes', require('./recipes'));
router.use('/ingredients', require('./ingredients'));
router.use('/meal-plans', require('./mealPlans'));
router.use('/reviews', require('./reviews'));
router.use('/auth', require('./auth'));

module.exports = router;
