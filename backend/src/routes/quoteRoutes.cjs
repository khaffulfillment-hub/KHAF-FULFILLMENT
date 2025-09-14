const express = require("express");
const { createQuote, getQuotes } = require("../controllers/quoteController.cjs");
const { validateQuote } = require("../middleware/validation.cjs");

const router = express.Router();

// POST /api/forms/quote
router.post("/", validateQuote, createQuote);

// GET /api/forms/quote
router.get("/", getQuotes);

module.exports = router;
