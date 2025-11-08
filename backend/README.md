# Backend API

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file with:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vibe-commerce
NODE_ENV=development
```

3. Make sure MongoDB is running

4. Start server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## API Endpoints

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `GET /api/cart` - Get cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:id` - Update cart item
- `DELETE /api/cart/:id` - Remove item from cart
- `POST /api/checkout` - Process checkout
- `GET /api/fakestore/products` - Sync products from Fake Store API
- `GET /api/health` - Health check
