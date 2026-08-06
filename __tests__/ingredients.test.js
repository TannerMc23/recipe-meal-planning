const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Ingredient = require('../models/Ingredient');

describe('GET /ingredients', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns 200 and an array of ingredients', async () => {
    const mockIngredients = [
      {
        _id: new mongoose.Types.ObjectId(),
        name: 'Garlic',
        category: 'produce',
        unit: 'clove',
        recipeId: new mongoose.Types.ObjectId()
      }
    ];

    jest.spyOn(Ingredient, 'find').mockResolvedValue(mockIngredients);

    const res = await request(app).get('/ingredients');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].name).toBe('Garlic');
  });
});

describe('GET /ingredients/:id', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns 200 and the matching ingredient for a valid id', async () => {
    const id = new mongoose.Types.ObjectId();
    const mockIngredient = {
      _id: id,
      name: 'Basil',
      category: 'spice',
      unit: 'tbsp',
      recipeId: new mongoose.Types.ObjectId()
    };

    jest.spyOn(Ingredient, 'findById').mockResolvedValue(mockIngredient);

    const res = await request(app).get(`/ingredients/${id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Basil');
  });

  it('returns 400 for an invalid id format', async () => {
    const res = await request(app).get('/ingredients/bad-id');
    expect(res.statusCode).toBe(400);
  });

  it('returns 404 when no ingredient matches a valid id', async () => {
    const id = new mongoose.Types.ObjectId();
    jest.spyOn(Ingredient, 'findById').mockResolvedValue(null);

    const res = await request(app).get(`/ingredients/${id}`);

    expect(res.statusCode).toBe(404);
  });
});
