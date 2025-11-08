import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Products from './components/Products';
import Cart from './components/Cart';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="nav-logo">
              🛍️ Vibe Commerce
            </Link>
            <div className="nav-links">
              <Link to="/" className="nav-link">Products</Link>
              <Link to="/cart" className="nav-link">Cart</Link>
            </div>
          </div>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>&copy; 2024 Vibe Commerce. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;

