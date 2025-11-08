const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

// checkout - process order and return receipt
router.post('/', async (req, res) => {
  try {
    const { name, email, cartItems, userId = 'default-user' } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // calculate totals
    let total = 0;
    const receiptItems = [];

    for (const item of cartItems) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ error: `Product ${item.productId} not found` });
      }

      const itemTotal = product.price * item.quantity;
      total += itemTotal;

      receiptItems.push({
        product: {
          id: product._id,
          name: product.name,
          price: product.price
        },
        quantity: item.quantity,
        itemTotal: itemTotal.toFixed(2)
      });
    }

    // generate order receipt
    const receipt = {
      orderId: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      customer: {
        name,
        email
      },
      items: receiptItems,
      subtotal: total.toFixed(2),
      tax: (total * 0.1).toFixed(2), // 10% tax for now
      total: (total * 1.1).toFixed(2),
      timestamp: new Date().toISOString(),
      status: 'completed'
    };

    // clear the cart
    await CartItem.deleteMany({ userId });

    res.status(201).json({
      message: 'Checkout successful',
      receipt
    });
  } catch (error) {
    console.error('Error processing checkout:', error);
    res.status(500).json({ error: 'Failed to process checkout', message: error.message });
  }
});

module.exports = router;

