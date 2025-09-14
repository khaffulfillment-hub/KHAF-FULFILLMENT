const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

const app = express();

// ===== Rate limiting =====
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// ===== Middleware =====
app.use(limiter);
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:5173",
      "https://your-frontend-domain.com",
    ],
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ===== MongoDB connection =====
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://selfraushaniimt_db_user:DwhHTaOlNfSbQioP@khaf-fulfillment.mocyw3r.mongodb.net/khaf_fulfillment";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// ===== Import routes =====
const formRoutes = require("./src/routes/formRoutes.cjs");
const partnerRoutes = require("./src/routes/partnerRoutes.cjs");

// ===== Use routes =====
app.use("/api/forms", formRoutes);
app.use("/api/forms/partner", partnerRoutes);

// ===== Health check endpoint =====
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
  });
});

// ===== Error handling middleware =====
app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    ...(process.env.NODE_ENV === "development" && { error: err.message }),
  });
});

// ===== 404 handler =====
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// ===== Start server =====
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 API Health: http://localhost:${PORT}/api/health`);

  // 👇 Print registered routes
  const routes = [
    { method: "POST", path: "/api/forms/quote" },
    { method: "GET", path: "/api/forms/quote" },
    { method: "GET", path: "/api/forms/quote/:id" },
    { method: "POST", path: "/api/forms/contact" }, // Added for contact form submissions
    { method: "GET", path: "/api/health" },
    { method: "POST", path: "/api/forms/partner" }, // Added for partner submissions
  ];

  console.log("✅ Registered Routes:");
  routes.forEach((r) =>
    console.log(`   [${r.method}] http://localhost:${PORT}${r.path}`)
  );
});

module.exports = app;
