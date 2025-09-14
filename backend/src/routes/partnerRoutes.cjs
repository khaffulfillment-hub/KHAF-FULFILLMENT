const express = require("express");
const router = express.Router();

// Import the partner controller (we'll create this next)
const partnerController = require("../controllers/partnerController.cjs");

// Define the POST route for partner submissions
router.post("/", partnerController.submitPartnerProposal);

module.exports = router;
