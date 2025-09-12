require("dotenv").config();
const express = require("express");
const connectToDB = require("./src/config/db");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors("*"));

// Routes
app.use("/api/auth", require("./src/routes/auth.js"));
app.use("/api/transactions", require("./src/routes/transactions.js"));

// Health check
app.get("/", (req, res) => {
  res.send("Welcome to Personal Finance Tracker API 🚀");
});

// Start server
const startServer = async () => {
  try {
    await connectToDB();
    console.log("DB Connected Success");
    app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
  } catch (error) {
    console.error("DB connection failed", error);
    process.exit(1);
  }
};
startServer();
