const Partner = require('../models/Partner.cjs'); // Import the Partner model
const { getNextId } = require('../services/idService.cjs'); // Assuming idService is available
const { sendNotificationEmail, sendConfirmationEmail } = require('../services/emailService.cjs'); // Assuming email services are available

const submitPartnerProposal = async (req, res) => {
  try {
    const uniqueId = await getNextId('partner'); // Get a unique ID for the partner submission
    const { originalname, mimetype, size, buffer } = req.file || {}; // Handle file uploads if any

    // Construct partner data object
    const partnerData = {
      id: uniqueId,
      // Map fullName from frontend to contactName in the database, as contactName is required.
      // Prioritize fullName as per user's payload, then fall back to name or contactName.
      contactName: req.body.fullName || req.body.name || req.body.contactName,
      email: req.body.email,
      phone: req.body.phone || '',
      companyName: req.body.companyName,
      industries: Array.isArray(req.body.industries) ? req.body.industries : [req.body.industries].filter(Boolean),
      estimatedUnits: req.body.totalUnits || '', // Mapping totalUnits to estimatedUnits
      comments: req.body.comments || '', // Assuming 'comments' might be sent, though not in payload example
      ...(req.file && { // Include file data if a file was uploaded
        file: {
          originalName: originalname,
          mimeType: mimetype,
          size,
          buffer
        }
      })
    };

    // Validate contactName before saving
    if (!partnerData.contactName) {
      console.error("Missing contactName in request body. Payload:", req.body); // Log the actual request body for debugging
      return res.status(400).json({
        success: false,
        message: "Contact name is required for partnership proposal.",
      });
    }

    // Save to database
    const newPartner = await Partner.create(partnerData);

    // Send emails (optional, but good practice)
    try {
      await sendNotificationEmail('partner', partnerData);
      await sendConfirmationEmail(partnerData.email, partnerData.contactName, 'partner');
    } catch (emailError) {
      console.warn('Email sending failed:', emailError.message);
    }

    res.status(201).json({
      success: true,
      message: "Partner proposal received and saved successfully!",
      id: uniqueId, // Return the ID of the saved record
      data: newPartner, // Optionally return the saved data
    });
  } catch (err) {
    console.error("Error submitting partner proposal:", err);
    res.status(500).json({
      success: false,
      message: "Error submitting partner proposal",
      error: err.message,
    });
  }
};

module.exports = {
  submitPartnerProposal,
};
