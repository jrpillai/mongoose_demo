const mongoose = require('mongoose');

const plantSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true }, // unique constraint
  type: { type: String, required: true }, // required constraint
  price: { type: Number, required: true }, // required constraint
});

module.exports = mongoose.model('Plant', plantSchema);
