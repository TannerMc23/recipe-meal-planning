const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Review = require('../models/Review');

describe('GET /reviews', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns 200 and an array of reviews', async () => {
    const mockReviews = [
      {
        _id: new mongoose.Types.ObjectId(),
        recipeId: new mongoose.Types.ObjectId(),
        rating: 5,
        comment: 'Delicious',
        reviewer: 'tanner'
      }
    ];

    jest.spyOn(Review, 'find').mockResolvedValue(mockReviews);

    const res = await request(app).get('/reviews');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].rating).toBe(5);
  });
});

describe('GET /reviews/:id', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('returns 200 and the matching review for a valid id', async () => {
    const id = new mongoose.Types.ObjectId();
    const mockReview = {
      _id: id,
      recipeId: new mongoose.Types.ObjectId(),
      rating: 4,
      comment: 'Pretty good',
      reviewer: 'tanner'
    };

    jest.spyOn(Review, 'findById').mockResolvedValue(mockReview);

    const res = await request(app).get(`/reviews/${id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.rating).toBe(4);
  });

  it('returns 400 for an invalid id format', async () => {
    const res = await request(app).get('/reviews/bad-id');
    expect(res.statusCode).toBe(400);
  });

  it('returns 404 when no review matches a valid id', async () => {
    const id = new mongoose.Types.ObjectId();
    jest.spyOn(Review, 'findById').mockResolvedValue(null);

    const res = await request(app).get(`/reviews/${id}`);

    expect(res.statusCode).toBe(404);
  });
});
