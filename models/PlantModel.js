const mongoose = require('mongoose');

const plantSchema = mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  price: { type: Number, required: true },
});

module.exports = mongoose.model('Plant', plantSchema);
