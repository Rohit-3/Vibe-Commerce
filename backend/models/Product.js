const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  description: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: 'https://via.placeholder.com/300'
  },
  category: {
    type: String,
    default: 'general'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Product', productSchema);

