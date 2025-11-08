import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// products api
export const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// cart api
export const getCart = async () => {
  try {
    const response = await api.get('/cart');
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

export const addToCart = async (productId, quantity = 1) => {
  try {
    const response = await api.post('/cart', { productId, quantity });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const updateCartItem = async (itemId, quantity) => {
  try {
    const response = await api.put(`/cart/${itemId}`, { quantity });
    return response.data;
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
};

export const removeFromCart = async (itemId) => {
  try {
    const response = await api.delete(`/cart/${itemId}`);
    return response.data;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

// checkout
export const checkout = async (name, email, cartItems) => {
  try {
    const response = await api.post('/checkout', {
      name,
      email,
      cartItems: cartItems.map(item => ({
        productId: item.product._id || item.product.id,
        quantity: item.quantity
      }))
    });
    return response.data;
  } catch (error) {
    console.error('Checkout error:', error);
    throw error;
  }
};

// fake store api sync
export const syncFakeStoreProducts = async () => {
  try {
    const response = await api.get('/fakestore/products');
    return response.data;
  } catch (error) {
    console.error('Fake Store sync error:', error);
    throw error;
  }
};

export default api;

