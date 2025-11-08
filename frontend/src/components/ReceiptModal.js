import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ReceiptModal.css';

function ReceiptModal({ receipt, onClose }) {
  const navigate = useNavigate();

  const handleContinueShopping = () => {
    onClose();
    navigate('/');
  };

  if (!receipt) return null;

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content receipt-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Order Confirmed! 🎉</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="receipt-content">
          <div className="receipt-section">
            <h3>Order Details</h3>
            <p><strong>Order ID:</strong> {receipt.orderId}</p>
            <p><strong>Date:</strong> {formatDate(receipt.timestamp)}</p>
            <p><strong>Status:</strong> <span className="status-completed">{receipt.status}</span></p>
          </div>

          <div className="receipt-section">
            <h3>Customer Information</h3>
            <p><strong>Name:</strong> {receipt.customer.name}</p>
            <p><strong>Email:</strong> {receipt.customer.email}</p>
          </div>

          <div className="receipt-section">
            <h3>Items</h3>
            <div className="receipt-items">
              {receipt.items.map((item, index) => (
                <div key={index} className="receipt-item">
                  <div className="receipt-item-info">
                    <span className="receipt-item-name">{item.product.name}</span>
                    <span className="receipt-item-quantity">Qty: {item.quantity}</span>
                  </div>
                  <span className="receipt-item-total">${item.itemTotal}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="receipt-section">
            <div className="receipt-totals">
              <div className="receipt-total-row">
                <span>Subtotal:</span>
                <span>${receipt.subtotal}</span>
              </div>
              <div className="receipt-total-row">
                <span>Tax (10%):</span>
                <span>${receipt.tax}</span>
              </div>
              <div className="receipt-total-row total">
                <span>Total:</span>
                <span>${receipt.total}</span>
              </div>
            </div>
          </div>

          <div className="receipt-actions">
            <button onClick={handleContinueShopping} className="continue-shopping-btn">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReceiptModal;

