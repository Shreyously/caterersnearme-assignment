require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDatabase = require("./config/db");
const catererRoutes = require("./routes/catererRoutes");
const catererService = require("./services/catererService");

const app = express();

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";

app.use(
  cors({
    origin: CLIENT_URL,
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
