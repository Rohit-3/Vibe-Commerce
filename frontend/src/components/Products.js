import React, { useState, useEffect } from 'react';
import { getProducts, addToCart, syncFakeStoreProducts } from '../services/api';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState({});
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      setAddingToCart(prev => ({ ...prev, [productId]: true }));
      await addToCart(productId, 1);
      // todo: replace alert with better notification
      alert('Item added to cart!');
    } catch (err) {
      alert('Failed to add item to cart. Please try again.');
      console.error('Add to cart error:', err);
    } finally {
      setAddingToCart(prev => ({ ...prev, [productId]: false }));
    }
  };

  const handleSyncFakeStore = async () => {
    try {
      setSyncing(true);
      const response = await syncFakeStoreProducts();
      alert(`Successfully synced ${response.count} products from Fake Store API!`);
      await fetchProducts(); // Refresh products
    } catch (err) {
      alert('Failed to sync products from Fake Store API. Please try again.');
      console.error(err);
    } finally {
      setSyncing(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button onClick={fetchProducts} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="products-container">
      <div className="products-header">
        <h1 className="page-title">Products</h1>
        <button
          className="sync-fakestore-btn"
          onClick={handleSyncFakeStore}
          disabled={syncing}
        >
          {syncing ? 'Syncing...' : '🔄 Sync from Fake Store API'}
        </button>
      </div>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <div className="product-image">
              <img 
                src={product.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=500&fit=crop'} 
                alt={product.name}
                loading="lazy"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=500&fit=crop';
                }}
              />
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-footer">
                <span className="product-price">${product.price.toFixed(2)}</span>
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product._id)}
                  disabled={addingToCart[product._id]}
                >
                  {addingToCart[product._id] ? 'Adding...' : 'Add to Cart'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;

