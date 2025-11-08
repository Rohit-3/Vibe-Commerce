const express = require('express');
const router = express.Router();
const axios = require('axios');
const Product = require('../models/Product');

const FAKE_STORE_API = 'https://fakestoreapi.com';

// sync products from fake store api
router.get('/products', async (req, res) => {
  try {
    // fetch from fake store api
    const response = await axios.get(`${FAKE_STORE_API}/products?limit=10`);
    const fakeStoreProducts = response.data;

    // sync to our database
    const syncedProducts = [];
    for (const product of fakeStoreProducts) {
      // check if we already have this product
      let dbProduct = await Product.findOne({ name: product.title });
      
      if (!dbProduct) {
        // create new product
        dbProduct = new Product({
          name: product.title,
          price: product.price,
          description: product.description,
          image: product.image,
          category: product.category
        });
        await dbProduct.save();
      } else {
        // update existing one
        dbProduct.price = product.price;
        dbProduct.description = product.description;
        dbProduct.image = product.image;
        dbProduct.category = product.category;
        await dbProduct.save();
      }
      
      syncedProducts.push(dbProduct);
    }

    res.json({
      message: 'Products synced from Fake Store API',
      count: syncedProducts.length,
      products: syncedProducts
    });
  } catch (error) {
    console.error('Error syncing Fake Store API products:', error);
    res.status(500).json({ 
      error: 'Failed to sync products from Fake Store API', 
      message: error.message 
    });
  }
});

module.exports = router;

