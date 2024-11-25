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

  // 'family' field: an optional string indicating the plant family
  family: {
    type: String,
    required: false, // This field is optional
  },
});

/**
 * Adds a pre-save hook to the Plant schema to ensure the `name` field is fully capitalized before saving.
 * - This hook triggers before a new document is saved to the database.
 * - The `pre()` method accepts:
 *   - The type of hook ('save') as the first argument.
 *   - A callback function to manipulate the document as the second argument.
 *
 * Functionality:
 * - Converts the value of the `name` field to uppercase before saving.
 * - Ensures consistency in the format of the `name` field across all documents.
 * - The save method is call under the hood by the create method, triggering this hook.
 * - Some methods do not trigger this hook, like update, updateOne, and findOneAndUpdate, and insertMany.
 *
 * @see https://mongoosejs.com/docs/middleware.html#pre
 */

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
