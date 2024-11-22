const express = require('express'); // import express
const PlantController = require('../controllers/PlantController'); // import PlantController

// instantiate a router for the /plants route
const plantRouter = express.Router();

// POST method route handlers for the /plants route
plantRouter.post('/', PlantController.createPlant, (req, res) =>
  res.status(201).json(res.locals.newPlant)
);

// GET method route handlers for the '/plants/:name' route
plantRouter.get('/:name', PlantController.getPlant, (req, res) =>
  res.status(200).json(res.locals.foundPlant)
);

// PATCH method route handlers for the '/plants/:name' route
plantRouter.patch('/:name', PlantController.updatePlant, (req, res) =>
  res.status(200).json(res.locals.updatedPlant)
);

// DELETE method route handlers for the '/plants/:name' route
plantRouter.delete('/:name', PlantController.deletePlant, (req, res) =>
  res.status(200).json(res.locals.deletedPlant)
);

module.exports = plantRouter;
