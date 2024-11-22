const Plant = require('../models/PlantModel');

const PlantController = {
  createPlant(req, res, next) {
    const { name, type, price } = req.body;

    Plant.create({ name, type, price })
      .then((plant) => {
        res.locals.newPlant = plant;
        return next();
      })
      .catch((err) =>
        next({
          log: `Error creating plant: ${err}`,
          status: 500,
          message: { err: 'Failed to create plant' },
        })
      );
  },

  getPlant(req, res, next) {
    const { name } = req.params;

    Plant.findOne({ name })
      .then((plant) => {
        // uncomment the line below to test the global error handler
        // throw new Error('Test error');
        if (!plant) {
          return next({
            log: `Plant not found: ${name}`,
            status: 404,
            message: { err: 'Plant not found' },
          });
        }
        res.locals.foundPlant = plant;
        return next();
      })
      .catch((err) =>
        next({
          log: `Error fetching plant: ${err}`,
          status: 500,
          message: { err: 'Failed to fetch plant' },
        })
      );
  },

  updatePlant(req, res, next) {
    const { name } = req.params;
    const updates = req.body;

    Plant.findOneAndUpdate({ name }, updates, { new: true })
      .then((updatedPlant) => {
        if (!updatedPlant) {
          return next({
            status: 404,
            message: { err: 'Plant not found' },
          });
        }
        res.locals.updatedPlant = updatedPlant;
        return next();
      })
      .catch((err) =>
        next({
          log: `Error updating plant: ${err}`,
          status: 500,
          message: { err: 'Failed to update plant' },
        })
      );
  },

  deletePlant(req, res, next) {
    const { name } = req.params;

    Plant.findOneAndDelete({ name })
      .then((deletedPlant) => {
        if (!deletedPlant) {
          return next({
            status: 404,
            message: { err: 'Plant not found' },
          });
        }
        res.locals.deletedPlant = deletedPlant;
        return next();
      })
      .catch((err) =>
        next({
          log: `Error deleting plant: ${err}`,
          status: 500,
          message: { err: 'Failed to delete plant' },
        })
      );
  },
};

module.exports = PlantController;
