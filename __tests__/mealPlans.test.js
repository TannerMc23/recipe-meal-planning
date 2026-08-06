const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const MealPlan = require('../models/MealPlan');

describe('GET /meal-plans', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns 200 and an array of meal plans', async () => {
    const mockMealPlans = [
      {
        _id: new mongoose.Types.ObjectId(),
        title: 'Week 1 Plan',
        weekStartDate: new Date(),
        userId: 'tanner',
        recipeIds: [new mongoose.Types.ObjectId()]
      }
    ];

    jest.spyOn(MealPlan, 'find').mockResolvedValue(mockMealPlans);

    const res = await request(app).get('/meal-plans');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].title).toBe('Week 1 Plan');
  });
});

describe('GET /meal-plans/:id', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns 200 and the matching meal plan for a valid id', async () => {
    const id = new mongoose.Types.ObjectId();
    const mockMealPlan = {
      _id: id,
      title: 'Single Plan',
      weekStartDate: new Date(),
      userId: 'tanner',
      recipeIds: [new mongoose.Types.ObjectId()]
    };

    jest.spyOn(MealPlan, 'findById').mockResolvedValue(mockMealPlan);

    const res = await request(app).get(`/meal-plans/${id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Single Plan');
  });

  it('returns 400 for an invalid id format', async () => {
    const res = await request(app).get('/meal-plans/bad-id');
    expect(res.statusCode).toBe(400);
  });

  it('returns 404 when no meal plan matches a valid id', async () => {
    const id = new mongoose.Types.ObjectId();
    jest.spyOn(MealPlan, 'findById').mockResolvedValue(null);

    const res = await request(app).get(`/meal-plans/${id}`);

    expect(res.statusCode).toBe(404);
  });
});
