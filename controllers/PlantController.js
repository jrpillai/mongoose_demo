const Plant = require('../models/PlantModel');

const PlantController = {};

/**
 * Creates a new plant document in the database based on request body data.
 * Stores the created plant in `res.locals.newPlant` and proceeds to the next middleware.
 */
PlantController.createPlant = (req, res, next) => {
  const { name, type, price, family } = req.body;

  /**
   * `create` is a Mongoose method of the Plant model that inserts a new document into the collection.
   * @see https://mongoosejs.com/docs/api/model.html#Model.create()
   * It returns a fully fledged Promise object that resolves to the newly created document or rejects with an error.
   * The new document is specified in the object passed to the `create` method.
   * The object contains the fields and values for the new document.
   * You can also insert multiple documents by passing an array of document objects, where each object represents a new document to be saved.
   * create calls `new MyModel(doc).save()` on each document under the hood.
   */
  Plant.create({ name, type, price, family })
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
};

/**
 * Retrieves a plant document from the database by name.
 * Stores the found plant in `res.locals.foundPlant` or passes an error if not found.
 */
PlantController.getPlant = (req, res, next) => {
  const { name } = req.params;

  /**
   * `findOne` is a Mongoose method of the Plant model that finds a single document and returns it - the first one that matches.
   * @see https://mongoosejs.com/docs/api/model.html#Model.findOne()
   * If no document is found, it returns null.
   * `findOne` returns a thenable Query object that we can chain with .then() and .catch().
   * The Query object is not a Promise, but it is similar in practice.
   * @see https://mongoosejs.com/docs/promises.html#queries-are-not-promises
   */
  Plant.findOne({ name })
    .then((plant) => {
      // uncomment the line below to test the global error handler
      // throw new Error('This is my custom error I made up');
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
};

/**
 * Updates a plant document in the database identified by name.
 * Applies updates from the request body and stores the updated plant in `res.locals.updatedPlant`.
 */
PlantController.updatePlant = (req, res, next) => {
  const { name } = req.params;
  const updates = req.body;

  /**
   * `findOneAndUpdate` is a Mongoose method of the Plant model that finds a single document by query,
   * applies the specified updates, and returns the updated document.
   * The `new: true` option returns the updated document instead of the original document.
   * The updates are specified in the `updates` object, which contains the fields to update and their new values.
   * @see https://mongoosejs.com/docs/api/model.html#Model.findOneAndUpdate()
   * If no document is found, it returns null.
   * `findOneAndUpdate` returns a thenable Query object that we can chain with .then() and .catch().
   * The Query object is not a Promise, but it is similar in practice.
   * @see https://mongoosejs.com/docs/promises.html#queries-are-not-promises
   */
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
};

/**
 * Deletes a plant document from the database by name.
 * Stores the deleted plant in `res.locals.deletedPlant` or passes an error if not found.
 */
PlantController.deletePlant = (req, res, next) => {
  const { name } = req.params;

  /**
   * `findOneAndDelete` is a Mongoose method of the Plant model that finds a single document by a specified query
   * and removes it from the collection.
   * The query is specified in the `{ name }` object, which searches for a document where the `name` field matches the provided `name`.
   * @see https://mongoosejs.com/docs/api/model.html#Model.findOneAndDelete()
   * If no document is found, it returns `null`.
   * `findOneAndDelete` returns a thenable Query object that we can chain with .then() and .catch().
   * The Query object is not a Promise, but it is similar in practice.
   * @see https://mongoosejs.com/docs/promises.html#queries-are-not-promises
   */
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
};

/**
 * Loads initial plant documents into the database if they are unique.
 * Uses `insertMany` to bulk insert plant data and skips duplicates.
 * Starts your database with a set of initial plants.
 * insertMany bypasses save hooks and pre/post middleware.
 * @see https://mongoosejs.com/docs/api/model.html#Model.insertMany()
 */
PlantController.loadInitialPlants = async (req, res, next) => {
  const initialPlants = [
    { name: 'ROSE', type: 'Flower', family: 'Rosaceae', price: 10 },
    { name: 'CACTUS', type: 'Succulent', family: 'Cactaceae', price: 15 },
    { name: 'BONSAI', type: 'Tree', family: 'Various', price: 50 },
    { name: 'TULIP', type: 'Flower', family: 'Liliaceae', price: 12 },
    { name: 'FERN', type: 'Shrub', family: 'Polypodiaceae', price: 8 },
    { name: 'LAVENDER', type: 'Herb', family: 'Lamiaceae', price: 20 },
    { name: 'ORCHID', type: 'Flower', family: 'Orchidaceae', price: 25 },
    {
      name: 'ALOE VERA',
      type: 'Succulent',
      family: 'Asphodelaceae',
      price: 18,
    },
    { name: 'MAPLE', type: 'Tree', family: 'Sapindaceae', price: 45 },
    { name: 'SUNFLOWER', type: 'Flower', family: 'Asteraceae', price: 14 },
  ];

  try {
    await Plant.insertMany(initialPlants, { ordered: false });
    console.log('Plants loaded successfully');
    return next();
  } catch (err) {
    if (err.code === 11000) {
      console.log('Duplicate key error: Skipping duplicates');
      return next();
    }
    return next({
      log: `Error loading plants: ${err}`,
      status: 500,
      message: { err: 'Failed to load plants' },
    });
  }
};

module.exports = PlantController;
