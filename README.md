# Recipe & Meal Planning API

CSE 341 Final Project — Week 5 Part 1: `recipes` and `ingredients` collections with full CRUD and Swagger documentation.

## Tech Stack
- Node.js / Express
- MongoDB Atlas + Mongoose
- Swagger (swagger-autogen + swagger-ui-express)

## Setup

1. `npm install`
2. Copy `.env.example` to `.env` and fill in your MongoDB Atlas connection string
3. `node swagger.js` to (re)generate `swagger_output.json` whenever routes change
4. `npm run dev` (or `npm start`) to run the server
5. Visit `http://localhost:3000/api-docs` for Swagger UI

## Deployment (Render)

1. Push this repo to GitHub
2. Create a new Web Service on Render, connect the GitHub repo
3. Set the `MONGODB_URI` environment variable in Render's dashboard
4. Build command: `npm install`
5. Start command: `npm start`
6. Confirm `/api-docs` loads at the deployed URL

## Collections (Week 5)

### recipes
| Field | Type | Notes |
|---|---|---|
| title | String | required |
| cuisine | String | required |
| prepTime | Number | required, minutes |
| cookTime | Number | required, minutes |
| servings | Number | required |
| difficulty | String | required, enum: easy/medium/hard |
| instructions | [String] | required |
| createdBy | String | required |

### ingredients
| Field | Type | Notes |
|---|---|---|
| name | String | required |
| category | String | required, enum |
| unit | String | required |
| recipeId | ObjectId | required, references recipes |

## Endpoints

```
GET    /recipes
GET    /recipes/:id
POST   /recipes
PUT    /recipes/:id
DELETE /recipes/:id

GET    /ingredients
GET    /ingredients/:id
POST   /ingredients
PUT    /ingredients/:id
DELETE /ingredients/:id
```

## Individual Contributions (Week 5)

- [ ] Contribution 1: _fill in after you build/deploy — e.g. "Designed and implemented the recipes and ingredients Mongoose schemas with validation rules"_
- [ ] Contribution 2: _e.g. "Set up swagger-autogen documentation and deployed the API to Render"_

## Links (fill in once deployed)

- GitHub repo:
- Render deployment:
- Swagger docs: `<render-url>/api-docs`
- YouTube video:
