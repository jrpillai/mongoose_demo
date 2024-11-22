// import dependencies
const dotenv = require('dotenv'); // import dotenv library to access environment variables
dotenv.config(); // invoke dotenv.config() to read .env file and load into process.env

const express = require('express'); // import express
const path = require('path'); // import path
const mongoose = require('mongoose'); // import mongoose

const PlantController = require('./controllers/PlantController'); // import PlantController

const app = express(); // instantiate an express app
const PORT = 3000; // declare a port to listen to

const plantRouter = require('./routes/plantRoutes'); // import plantRouter

// connect to MongoDB using mongoose ODM and the connection string stored in process.env.MONGO_URI
// EITHER add an .env file to the root of the project with the key value pair MONGO_URI=<your-mongo-uri>, with the <your-mongo-uri> replaced with your MongoDB connection string in double quotes
// OR replace process.env.MONGO_URI with your MongoDB connection string
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    // Load initial plants after database connection
    PlantController.loadInitialPlants({}, {}, (err) => {
      if (err) console.error(err);
    });
  })
  .catch((err) => console.error('MongoDB connection error:', err));

// middleware to parse incoming requests with JSON payloads
app.use(express.json());
// middleware to parse incoming requests with urlencoded payloads
app.use(express.urlencoded({ extended: true }));

// explicitly send the index.html file for the root route
app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './public/index.html'));
});

// mount the plantRouter at the /plants route
app.use('/plants', plantRouter);

// Unknown route handler
app.use((req, res) => res.sendStatus(404));

// Global error handler middleware
app.use((err, req, res, next) => {
  // Define a default error object
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
  // Include the request information to make logs easier to trace
  console.error(errorDetails.log);
  console.error(`Request Method: ${req.method}`);
  console.error(`Request URL: ${req.originalUrl}`);

  // Send the error response to the client
  // Use the status and message from the errorDetails object
  res.status(errorDetails.status).json(errorDetails.message);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
