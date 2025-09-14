// backend/src/routes/formRoutes.cjs
const express = require("express");
const router = express.Router();

// Controllers
const quoteController = require("../controllers/quoteController.cjs");
const formController = require("../controllers/formController.cjs");

// ===== QUOTE ROUTES =====

// Create a new quote
router.post("/quote", quoteController.createQuote);

// ===== CONTACT ROUTES =====
// Handle contact form submissions
router.post("/contact", formController.handleContact);

// Get all quotes (for admin / testing)
router.get("/quote", quoteController.getQuotes);

// (Optional) Get a single quote by id
router.get("/quote/:id", async (req, res) => {
  try {
    const Quote = require("../models/Quote.cjs");
    const quote = await Quote.findOne({ id: req.params.id });

    if (!quote) {
      return res.status(404).json({
        success: false,
        message: `Quote with id ${req.params.id} not found`,
      });
    }

    res.status(200).json({
      success: true,
      data: quote,
    });
  } catch (err) {
    console.error("Get Quote by ID Error:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching quote",
      error: err.message,
    });
  }
});

module.exports = router;
