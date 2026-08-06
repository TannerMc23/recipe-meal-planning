const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Recipe = require('../models/Recipe');

describe('GET /recipes', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns 200 and an array of recipes', async () => {
    const mockRecipes = [
      {
        _id: new mongoose.Types.ObjectId(),
        title: 'Test Recipe',
        cuisine: 'Test Cuisine',
        prepTime: 10,
        cookTime: 20,
        servings: 4,
        difficulty: 'easy',
        instructions: ['Step 1'],
        createdBy: 'tester'
      }
    ];

    jest.spyOn(Recipe, 'find').mockResolvedValue(mockRecipes);

    const res = await request(app).get('/recipes');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].title).toBe('Test Recipe');
  });

  it('returns 500 when the database call fails', async () => {
    jest.spyOn(Recipe, 'find').mockRejectedValue(new Error('DB failure'));

    const res = await request(app).get('/recipes');

    expect(res.statusCode).toBe(500);
  });
});

describe('GET /recipes/:id', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns 200 and the matching recipe for a valid id', async () => {
    const id = new mongoose.Types.ObjectId();
    const mockRecipe = {
      _id: id,
      title: 'Single Recipe',
      cuisine: 'Test Cuisine',
      prepTime: 5,
      cookTime: 15,
      servings: 2,
      difficulty: 'medium',
      instructions: ['Step 1'],
      createdBy: 'tester'
    };

    jest.spyOn(Recipe, 'findById').mockResolvedValue(mockRecipe);

    const res = await request(app).get(`/recipes/${id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('Single Recipe');
  });

  it('returns 400 for an invalid id format', async () => {
    const res = await request(app).get('/recipes/not-a-valid-id');
    expect(res.statusCode).toBe(400);
  });

  it('returns 404 when no recipe matches a valid id', async () => {
    const id = new mongoose.Types.ObjectId();
    jest.spyOn(Recipe, 'findById').mockResolvedValue(null);

    const res = await request(app).get(`/recipes/${id}`);

    expect(res.statusCode).toBe(404);
  });
});
