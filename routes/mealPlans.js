const express = require('express');
const router = express.Router();
const mealPlansController = require('../controllers/mealPlansController');
const isAuthenticated = require('../middleware/isAuthenticated');

router.get('/', mealPlansController.getAllMealPlans);
router.get('/:id', mealPlansController.getMealPlanById);
router.post('/', isAuthenticated, mealPlansController.createMealPlan);
router.put('/:id', isAuthenticated, mealPlansController.updateMealPlan);
router.delete('/:id', mealPlansController.deleteMealPlan);

module.exports = router;
