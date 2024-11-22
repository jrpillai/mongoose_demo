const express = require('express');
const mongoose = require('mongoose');
const PlantController = require('./controllers/PlantController');
const path = require('path');

const app = express();
const PORT = 3000;

mongoose
  .connect(
    'mongodb+srv://jayanrpillai:codesmithapplegreen@cluster0.svxifty.mongodb.net/mongo_demo?retryWrites=true&w=majority&appName=Cluster0'
  )
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Explicitly send the index.html file for the root route
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/index.html'));
});

const plantRouter = express.Router();
app.use('/plants', plantRouter);

plantRouter.post('/', PlantController.createPlant, (req, res) =>
  res.status(201).json(res.locals.newPlant)
);

plantRouter.get('/:name', PlantController.getPlant, (req, res) =>
  res.status(200).json(res.locals.foundPlant)
);

plantRouter.patch('/:name', PlantController.updatePlant, (req, res) =>
  res.status(200).json(res.locals.updatedPlant)
);

plantRouter.delete('/:name', PlantController.deletePlant, (req, res) =>
  res.status(200).json(res.locals.deletedPlant)
);

// Unknown route handler
app.use((req, res) => res.sendStatus(404));

// Global error handler
// Global error handler middleware
app.use((err, req, res, next) => {
  // Step 1: Define a default error object
  const defaultErr = {
    log: 'Express error handler caught an unknown error', // Log message for debugging
    status: 500, // Default status code for server errors
    message: { err: 'An internal server error occurred' }, // Default error message for the client
  };

  // Merge the incoming error with the default error object
  // If any property (log, status, or message) is missing in `err`, it will use the default values
  // By specifically defining the properties, we get around the fact that some properties of the Error object are non-enumerable
  const errorDetails = {
    log: err.log || defaultErr.log,
    status: err.status || defaultErr.status,
    message: err.message || defaultErr.message,
  };

  // Log the error details for debugging on the server
  // Include the timestamp and request information to make logs easier to trace
  console.error(errorDetails.log);
  console.error(`Request Method: ${req.method}`);
  console.error(`Request URL: ${req.originalUrl}`);

  // Send the error response to the client
  // Use the status and message from the errorDetails object
  res.status(errorDetails.status).json(errorDetails.message);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
