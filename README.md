# E-Commerce Web App

A modern e-commerce experience that lets shoppers browse curated products, view rich product details, and manage a responsive shopping cart across devices. The project is organised as a React frontend and a Node/Express + MongoDB backend communicating over a REST API.

## Architecture

```
frontend (React + Redux Toolkit + Tailwind)
   └─ Routes (React Router)
   └─ Store (cart slice)
   └─ Services (REST clients)
    |
    | REST /api/*
    ▼
backend (Express)
   └─ Routes → Controllers → Services
   └─ Middlewares (validation, errors)
   └─ Models (Product, User, Cart)
    |
    ▼
MongoDB Atlas (Mongoose ODM)
```

### Key Flows
- **Product listing**: React fetches `GET /api/products`, renders cards, and uses Tailwind for adaptive layout.
- **Product detail**: `GET /api/products/:id` powers a detailed view with highlights, pricing, and add-to-cart CTA.
- **Cart management**: Redux Toolkit stores local cart state for instant UX and can sync with backend cart endpoints.
- **Data persistence**: Express services map requests to Mongoose models; Atlas stores product catalog and user/cart docs.

## Tech Stack
- **Frontend**: React 18, React Router, Redux Toolkit, Tailwind CSS, Axios, Vite build
- **Backend**: Node.js 20+, Express 4, Mongoose 8, express-validator, dotenv, cors, morgan
- **Database**: MongoDB Atlas cluster
- **Tooling**: ESLint, Nodemon, PostCSS, Tailwind CLI, npm scripts

## Getting Started

### Prerequisites
- Node.js ≥ 18
- npm ≥ 8
- MongoDB Atlas cluster (or local Mongo instance)

### Environment Variables
Create `.env` files (not committed) or export variables in your shell.

**Backend `.env` example**
```
PORT=4000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/ecommerce
NODE_ENV=development
SEED_SAMPLE_COUNT=12
```

**Frontend `.env` example (optional)**
```
VITE_API_BASE_URL=http://localhost:4000/api
```
*(The frontend defaults to `/api` and proxies to `localhost:4000` during development via Vite config.)*

## Frontend Setup
```bash
cd frontend
npm install
npm run dev          # starts Vite dev server on http://localhost:5173
npm run build        # optional: production build
npm run preview      # serves built assets
```

## Backend Setup
```bash
cd backend
npm install
npm run seed         # populate baseline products (uses MongoDB Atlas connection)
npm run dev          # starts Express server with Nodemon (default port 4000)
# or
npm start            # runs server without Nodemon
```

### MongoDB Connection
1. Create/obtain a MongoDB Atlas cluster.
2. Whitelist your IP (or 0.0.0.0/0 for development).
3. Create a database user with password.
4. Copy the connection string and place it in `MONGODB_URI`.
5. Run `npm run dev` (backend) to verify a successful connection in logs.

### Seeding Data
- `npm run seed` inserts a small curated set of products (defined in `backend/src/seed.js`).
- `npm run seed:products` uses the extended seeder in `src/scripts/seedProducts.js`.

## API Reference (Backend)
Base URL: `http://localhost:4000/api`

| Method | Endpoint                  | Description                           |
| ------ | ------------------------- | ------------------------------------- |
| GET    | `/products`               | List all products                     |
| GET    | `/products/:productId`    | Fetch product details by ID          |
| GET    | `/cart`                   | Retrieve current user cart            |
| POST   | `/cart/items`             | Add item to cart                      |
| PUT    | `/cart/items/:productId` | Update cart item quantity             |
| DELETE | `/cart/items/:productId` | Remove product from cart              |
| DELETE | `/cart`                   | Clear cart                            |

**Headers**
- `Content-Type: application/json`
- `x-user-id` *(optional)*: Simulates user identity for cart operations.

**Sample Request**
```bash
curl -X POST http://localhost:4000/api/cart/items \
  -H "Content-Type: application/json" \
  -H "x-user-id: demo-user" \
  -d '{"productId": "<mongo-id>", "quantity": 2}'
```

## Features Implemented
- Responsive React frontend with modern Tailwind styling.
- Product catalog browsing and detailed product view.
- Client-side cart state with add/update/remove actions.
- RESTful backend with layered architecture (routes, controllers, services).
- Mongoose models for Product, User, and Cart with validation.
- Input validation and structured error handling via middleware.
- MongoDB Atlas connection helper and seed scripts for rapid bootstrapping.

## Future Improvements
- Authentication & authorization (JWT sessions, secure password management).
- Persist cart state to MongoDB via `Cart` or `User.cart` for multi-device sync.
- Product search, filters, and sorting on the backend.
- Inventory management and order checkout/payment integration.
- Automated tests (unit/integration) and CI setup.
- Image CDN and caching strategy for faster asset delivery.
- Internationalisation and multi-currency pricing.

---
Happy hacking! Feel free to open issues or send improvements 💡

