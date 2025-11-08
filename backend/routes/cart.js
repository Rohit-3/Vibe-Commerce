const express = require('express');
const router = express.Router();
const CartItem = require('../models/CartItem');
const Product = require('../models/Product');

// get cart with totals
router.get('/', async (req, res) => {
  try {
    const userId = req.query.userId || 'default-user'; // todo: use actual user auth later
    const cartItems = await CartItem.find({ userId }).populate('productId');
    
    let total = 0;
    // calculate totals for each item
    const items = cartItems.map(item => {
      const itemTotal = item.productId.price * item.quantity;
      total += itemTotal;
      return {
        id: item._id,
        product: item.productId,
        quantity: item.quantity,
        itemTotal: itemTotal.toFixed(2)
      };
    });

    res.json({
      items,
      total: total.toFixed(2),
      itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0) // total items count
    });
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ error: 'Failed to fetch cart', message: error.message });
  }
});

// add item to cart
router.post('/', async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const userId = req.body.userId || 'default-user';

    if (!productId) {
      return res.status(400).json({ error: 'productId is required' });
    }

    // make sure product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // check if already in cart
    let cartItem = await CartItem.findOne({ productId, userId });

    if (cartItem) {
      // just update the quantity
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      // new item, create it
      cartItem = new CartItem({
        productId,
        quantity,
        userId
      });
      await cartItem.save();
    }

    const populatedItem = await CartItem.findById(cartItem._id).populate('productId');
    res.status(201).json({
      message: 'Item added to cart',
      item: {
        id: populatedItem._id,
        product: populatedItem.productId,
        quantity: populatedItem.quantity
      }
    });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ error: 'Failed to add item to cart', message: error.message });
  }
});

// update cart item quantity
router.put('/:id', async (req, res) => {
  try {
    const { quantity } = req.body;
    const userId = req.query.userId || 'default-user';

    if (!quantity || quantity < 1) {
      return res.status(400).json({ error: 'Valid quantity is required' });
    }

    const cartItem = await CartItem.findOne({ _id: req.params.id, userId });
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    // update and save
    cartItem.quantity = quantity;
    await cartItem.save();

    const populatedItem = await CartItem.findById(cartItem._id).populate('productId');
    res.json({
      message: 'Cart item updated',
      item: {
        id: populatedItem._id,
        product: populatedItem.productId,
        quantity: populatedItem.quantity
      }
    });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ error: 'Failed to update cart item', message: error.message });
  }
});

// delete item from cart
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.query.userId || 'default-user';
    const cartItem = await CartItem.findOneAndDelete({ _id: req.params.id, userId });

    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ error: 'Failed to remove item from cart', message: error.message });
  }
});

module.exports = router;

