require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDatabase = require("./config/db");
const catererRoutes = require("./routes/catererRoutes");
const catererService = require("./services/catererService");

const app = express();

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;
// Frontend origin(s) for CORS. On Render, set to your Vercel URL (e.g. https://caterersnearme-assignment.vercel.app). Comma-separated for multiple.
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

// Support multiple origins (comma-separated) for CORS
const allowedOrigins = CLIENT_URL.split(",").map((s) => s.trim()).filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. Postman, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json());

app.use("/api/caterers", catererRoutes);

app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

async function startServer() {
  await connectDatabase(MONGODB_URI);
  await catererService.backfillCustomIds();
  await catererService.seedIfEmpty();

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Backend running on port ${PORT}`);
  });
}

startServer().catch((error) => {
  // eslint-disable-next-line no-console
  console.error("Failed to start server:", error.message);
  process.exit(1);
});
