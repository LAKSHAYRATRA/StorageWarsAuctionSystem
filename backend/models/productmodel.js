const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startingBid: {
    type: Number,
    required: true,
  },
  currentBid: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Product', ProductSchema);