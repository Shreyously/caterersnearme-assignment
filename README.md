# Assignment 

Full-stack application with a **React + Vite + TypeScript** frontend and an **Express + MongoDB** backend (caterers API).

## Prerequisites

- **Node.js** (v18 or later recommended)
- **MongoDB** (local instance or a connection string such as [MongoDB Atlas](https://www.mongodb.com/atlas))

## Setup

### 1. Clone and enter the project

```bash
cd assignment1
```

### 2. Backend setup

1. Go to the backend folder and install dependencies:

   ```bash
   cd backend
   npm install
   ```

2. Create a `.env` file in the `backend` folder with:

   ```env
   MONGODB_URI=mongodb://localhost:27017/your-database-name
   PORT=3001
   CLIENT_URL=http://localhost:5173
   ```

   - **MONGODB_URI**: Your MongoDB connection string (e.g. `mongodb://localhost:27017/caterers` or an Atlas URI).
   - **PORT**: Port for the API (default `3001`).
   - **CLIENT_URL**: Frontend URL for CORS (use `http://localhost:5173` for local dev).

3. Start the backend:

   ```bash
   npm run dev
   ```

   The API runs at `http://localhost:3001`. It connects to MongoDB, backfills custom IDs, and seeds caterers if the collection is empty.

### 3. Frontend setup

1. In a new terminal, go to the frontend folder and install dependencies:

   ```bash
   cd frontend
   npm install
   ```

2. (Optional) Create a `.env` file in the `frontend` folder if the API is not on the default URL:

   ```env
   VITE_API_URL=http://localhost:3001
   ```

   If you omit this, the app uses `http://localhost:3001` by default.

3. Start the frontend dev server:

   ```bash
   npm run dev
   ```

   The app will be at `http://localhost:5173`.

## Running the application

1. Start **MongoDB** (if using a local instance).
2. Start the **backend**: from `backend`, run `npm run dev`.
3. Start the **frontend**: from `frontend`, run `npm run dev`.
4. Open **http://localhost:5173** in your browser.

## Project structure

- **`backend/`** – Express API, MongoDB via Mongoose, caterer routes and services.
- **`frontend/`** – React + Vite + TypeScript app (e.g. Caterers page) that calls the backend API.

## Scripts

| Location   | Command       | Description                |
|-----------|---------------|----------------------------|
| `backend` | `npm run dev` | Run API with watch mode    |
| `backend` | `npm start`   | Run API (production)       |
| `frontend`| `npm run dev` | Run dev server             |
| `frontend`| `npm run build` | Build for production     |
| `frontend`| `npm run preview` | Preview production build |
