import React, { useState, useEffect } from 'react';
import { getCart, updateCartItem, removeFromCart, checkout } from '../services/api';
import CheckoutModal from './CheckoutModal';
import ReceiptModal from './ReceiptModal';
import './Cart.css';

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [updating, setUpdating] = useState({});
  const [removing, setRemoving] = useState({});

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const data = await getCart();
      setCart(data);
      setError(null);
    } catch (err) {
      setError('Failed to load cart. Please try again later.');
      console.error('Cart fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    // if quantity goes to 0, just remove it
    if (newQuantity < 1) {
      handleRemoveItem(itemId);
      return;
    }

    try {
      setUpdating(prev => ({ ...prev, [itemId]: true }));
      await updateCartItem(itemId, newQuantity);
      await fetchCart(); // refresh cart after update
    } catch (err) {
      alert('Failed to update quantity. Please try again.');
      console.error('Update quantity error:', err);
    } finally {
      setUpdating(prev => ({ ...prev, [itemId]: false }));
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      setRemoving(prev => ({ ...prev, [itemId]: true }));
      await removeFromCart(itemId);
      await fetchCart();
    } catch (err) {
      alert('Failed to remove item. Please try again.');
      console.error(err);
    } finally {
      setRemoving(prev => ({ ...prev, [itemId]: false }));
    }
  };

  const handleCheckout = async (name, email) => {
    try {
      const response = await checkout(name, email, cart.items);
      setReceipt(response.receipt);
      setShowCheckout(false);
      await fetchCart(); // cart should be empty now
    } catch (err) {
      alert('Checkout failed. Please try again.');
      console.error('Checkout error:', err);
    }
  };

  const handleCloseReceipt = () => {
    setReceipt(null);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading cart...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={fetchCart} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="cart-container">
        <h1 className="page-title">Your Cart</h1>
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <a href="/" className="continue-shopping-btn">
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1 className="page-title">Your Cart</h1>
      <div className="cart-content">
        <div className="cart-items">
          {cart.items.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image">
                <img
                  src={item.product.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop'}
                  alt={item.product.name}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop';
                  }}
                />
              </div>
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.product.name}</h3>
                <p className="cart-item-price">${item.product.price.toFixed(2)} each</p>
              </div>
              <div className="cart-item-controls">
                <div className="quantity-controls">
                  <button
                    className="quantity-btn"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                    disabled={updating[item.id] || removing[item.id]}
                  >
                    -
                  </button>
                  <span className="quantity-value">{item.quantity}</span>
                  <button
                    className="quantity-btn"
                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                    disabled={updating[item.id] || removing[item.id]}
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-total">
                  ${parseFloat(item.itemTotal).toFixed(2)}
                </div>
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveItem(item.id)}
                  disabled={removing[item.id]}
                >
                  {removing[item.id] ? 'Removing...' : 'Remove'}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Items ({cart.itemCount}):</span>
            <span>${parseFloat(cart.total).toFixed(2)}</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>${parseFloat(cart.total).toFixed(2)}</span>
          </div>
          <button
            className="checkout-btn"
            onClick={() => setShowCheckout(true)}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>

      {showCheckout && (
        <CheckoutModal
          onClose={() => setShowCheckout(false)}
          onCheckout={handleCheckout}
        />
      )}

      {receipt && (
        <ReceiptModal receipt={receipt} onClose={handleCloseReceipt} />
      )}
    </div>
  );
}

export default Cart;

