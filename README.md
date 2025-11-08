# Vibe Commerce - Shopping Cart App

Full stack shopping cart application built with React, Node.js/Express, and MongoDB.

## Features

### Backend
- REST API with Express
- MongoDB for storing data
- Product endpoints (get all, get by id)
- Cart endpoints (add, update, remove, get)
- Checkout endpoint with receipt generation
- Fake Store API integration (bonus feature)

### Frontend
- React app with routing
- Products page with grid layout
- Shopping cart page
- Checkout form
- Receipt modal
- Responsive design

## Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file in backend folder:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vibe-commerce
NODE_ENV=development
```

4. Make sure MongoDB is running (or use MongoDB Atlas)

5. Start the server:
```bash
npm start
```

Backend runs on http://localhost:5000

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the app:
```bash
npm start
```

Frontend runs on http://localhost:3000

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Cart
- `GET /api/cart` - Get cart with total
- `POST /api/cart` - Add item to cart
  Body: `{ "productId": "id", "quantity": 1 }`
- `PUT /api/cart/:id` - Update quantity
  Body: `{ "quantity": 2 }`
- `DELETE /api/cart/:id` - Remove item

### Checkout
- `POST /api/checkout` - Process checkout
  Body: `{ "name": "Name", "email": "email@example.com", "cartItems": [...] }`

### Fake Store API
- `GET /api/fakestore/products` - Sync products from Fake Store API

## Project Structure

```
backend/
  models/       - MongoDB models
  routes/       - API routes
  server.js     - Express server

frontend/
  src/
    components/ - React components
    services/   - API calls
    App.js      - Main app
```

## Notes

- Products are auto-seeded on first API call (8 default products)
- Cart uses "default-user" for now (can add auth later)
- Checkout generates a receipt with order ID, totals, and timestamp
- Tax is 10% for now
- Cart clears after checkout

## Troubleshooting

**MongoDB connection issues:**
- Make sure MongoDB is running
- Check the MONGODB_URI in .env file
- For Atlas, use the connection string from MongoDB Atlas

**Port already in use:**
- Change PORT in backend .env file
- Or stop the process using that port

**CORS errors:**
- Backend has CORS enabled
- Make sure backend is running before frontend

**Products not loading:**
- Check if MongoDB is connected
- Check browser console for errors
- Verify backend is running on port 5000

## Bonus Features

- Database persistence with MongoDB
- Error handling on frontend and backend
- Fake Store API integration
- Responsive design

## Screenshots

Screenshots of the application are available in the `/screenshots` folder.

## Demo Video

Create a 1-2 minute demo video showing:
1. Application overview
2. Browsing products
3. Adding items to cart
4. Cart management
5. Checkout process
6. Receipt display

Upload to YouTube (unlisted) or Loom and add link here.

## Future Improvements

- User authentication
- Multi-user support
- Product search
- Order history
- Payment integration
- Admin dashboard

---

Built for Vibe Commerce assignment.
