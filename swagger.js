const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Recipe & Meal Planning API',
    description:
      'CSE 341 Final Project - Week 5: Recipes and Ingredients collections with full CRUD.'
  },
  host: process.env.RENDER_HOST || 'localhost:3000',
  schemes: ['https', 'http']
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
