// Import the Mongoose library to interact with MongoDB
const mongoose = require('mongoose');

// Define a schema for the 'Plant' model
const plantSchema = mongoose.Schema({
  // 'name' field: a unique and required string
  name: {
    type: String,
    required: true, // This field is mandatory
    unique: true, // Ensures the name is unique in the collection
  },

  // 'type' field: a required string indicating the plant type
  type: {
    type: String,
    required: true, // This field is mandatory
  },

  // 'price' field: a required number representing the plant's price
  price: {
    type: Number,
    required: true, // This field is mandatory
  },
});

// Add a pre-save hook to capitalize the entire plant name
plantSchema.pre('save', function (next) {
  // Check if the name field exists
  if (this.name) {
    // Convert the entire name to uppercase
    this.name = this.name.toUpperCase();
  }
  next(); // Proceed to the next middleware or save the document
});

/**
 * Exports the 'Plant' model based on the defined schema.
 *
 * The `mongoose.model()` function takes two arguments:
 * - The first argument is the **name of the model**.
 * - The second argument is the **schema** to use for the model.
 *
 * The function returns a Mongoose Model constructor that you can use to create new instances of documents and interact with the database.
 *
 * Mongoose automatically looks for the pluralized, lowercased version of your model name as the collection name in the database.
 * - Therefore, the 'Plant' model will use the **'plants'** collection in the database.
 *
 * @see https://mongoosejs.com/docs/models.html
 */

module.exports = mongoose.model('Plant', plantSchema);
