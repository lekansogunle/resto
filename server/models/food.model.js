const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const foodSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  picture: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  ingredients: {
    type: [String],
  },
  price: {
    type: Number,
  },
}, {
  timestamps: true,
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;