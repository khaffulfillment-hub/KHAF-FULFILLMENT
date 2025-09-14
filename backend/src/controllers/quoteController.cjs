// backend/src/controllers/quoteController.cjs
const Quote = require("../models/Quote.cjs");

exports.createQuote = async (req, res) => {
  try {
    console.log("Request body before validation:", req.body);

    // Create a new quote document directly from request body
    const newQuote = new Quote({
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      companyName: req.body.companyName,
      industries: req.body.industries,
      totalUnits: req.body.totalUnits,
      totalPrice: req.body.totalPrice,
    });

    // Save will trigger the pre-save hook → auto-increment id
    await newQuote.save();

    res.status(201).json({
      success: true,
      message: "Quote created successfully",
      data: newQuote,
    });
  } catch (err) {
    console.error("Controller Error:", err);
    res.status(500).json({
      success: false,
      message: "Error creating quote",
      error: err.message,
    });
  }
};

// Optional: get all quotes
exports.getQuotes = async (req, res) => {
  try {
    const quotes = await Quote.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: quotes.length,
      data: quotes,
    });
  } catch (err) {
    console.error("Get Quotes Error:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching quotes",
      error: err.message,
    });
  }
};
