const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// GET /api/products
router.get('/', async (req, res) => {
  try {
    // check if we have products, if not add some default ones
    const productCount = await Product.countDocuments();
    
    if (productCount === 0) {
      // adding some starter products
      const initialProducts = [
        {
          name: 'Wireless Headphones',
          price: 79.99,
          description: 'High-quality wireless headphones with noise cancellation',
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
          category: 'electronics'
        },
        {
          name: 'Smart Watch',
          price: 199.99,
          description: 'Feature-rich smartwatch with fitness tracking',
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
          category: 'electronics'
        },
        {
          name: 'Laptop Stand',
          price: 39.99,
          description: 'Ergonomic aluminum laptop stand',
          image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
          category: 'accessories'
        },
        {
          name: 'Mechanical Keyboard',
          price: 129.99,
          description: 'RGB mechanical keyboard with Cherry MX switches',
          image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=500&fit=crop',
          category: 'electronics'
        },
        {
          name: 'USB-C Hub',
          price: 49.99,
          description: '7-in-1 USB-C hub with multiple ports',
          image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=500&h=500&fit=crop',
          category: 'accessories'
        },
        {
          name: 'Wireless Mouse',
          price: 29.99,
          description: 'Ergonomic wireless mouse with long battery life',
          image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
          category: 'accessories'
        },
        {
          name: 'Monitor Stand',
          price: 59.99,
          description: 'Adjustable monitor stand with storage',
          image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=500&fit=crop',
          category: 'accessories'
        },
        {
          name: 'Webcam HD',
          price: 89.99,
          description: '1080p HD webcam with auto-focus',
          image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500&h=500&fit=crop',
          category: 'electronics'
        }
      ];

      await Product.insertMany(initialProducts);
      console.log('Products seeded successfully');
    }

    // fetch all products and return
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products', message: error.message });
  }
});

// get single product by id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product', message: error.message });
  }
});

module.exports = router;

