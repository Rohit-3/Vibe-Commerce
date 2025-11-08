// script to clear products so new ones with better images will be seeded
const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/vibe-commerce';

async function clearProducts() {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB');
    
    // clear all products
    const result = await Product.deleteMany({});
    console.log(`Deleted ${result.deletedCount} products`);
    console.log('Database cleared! New products with professional images will be seeded on next API call.');
    
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

clearProducts();

