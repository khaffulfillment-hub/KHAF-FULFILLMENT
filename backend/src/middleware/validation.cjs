const Joi = require('joi');

// Validation schemas
const contactSchema = Joi.object({
  name: Joi.string().required().min(2).max(100).trim(),
  email: Joi.string().email().required().trim(),
  phone: Joi.string().optional().allow('').max(20).trim(),
  message: Joi.string().required().min(10).max(1000).trim()
});

const partnerSchema = Joi.object({
  name: Joi.string().required().min(2).max(100).trim(),
  email: Joi.string().email().required().trim(),
  phone: Joi.string().optional().allow('').max(20).trim(),
  companyName: Joi.string().required().min(2).max(200).trim(),
  industries: Joi.alternatives().try(
    Joi.array().items(Joi.string().trim()),
    Joi.string().trim()
  ).required(),
  estimatedUnits: Joi.string().optional().allow('').max(50).trim(),
  comments: Joi.string().optional().allow('').max(1000).trim()
});


// --- FIX: Corrected quoteSchema to match the Mongoose model ---

// Define a schema for the nested industry object
const industryValidationSchema = Joi.object({
  industry: Joi.string().required().trim(),
  units: Joi.number().integer().min(0).required()
});

const quoteSchema = Joi.object({
  // --- FIX: Add validation for the 'id' field ---
  // id: Joi.string().optional().trim(), // Removed ID validation as it's server-generated
  fullName: Joi.string().required().min(2).max(100).trim(), // Changed from 'name'
  email: Joi.string().email().required().trim(),
  phone: Joi.string().required().min(5).max(20).trim(), // Reverted phone validation to min(5)
  companyName: Joi.string().required().min(2).max(200).trim(),
  industries: Joi.array().items(industryValidationSchema).min(1).required(), // Validates an array of objects
  totalUnits: Joi.number().integer().min(1).required(),
  totalPrice: Joi.number().min(0).required()
});
// --- END FIX ---


// Middleware functions
const validateContact = (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      details: error.details.map(detail => detail.message)
    });
  }
  next();
};

const validatePartner = (req, res, next) => {
  const { error } = partnerSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      details: error.details.map(detail => detail.message)
    });
  }
  next();
};

const validateQuote = (req, res, next) => {
  // --- DEBUG: Log the request body before validation ---
  console.log('Request body before validation:', JSON.stringify(req.body, null, 2));
  const { error } = quoteSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation error',
      details: error.details.map(detail => detail.message)
    });
  }
  next();
};

module.exports = {
  validateContact,
  validatePartner,
  validateQuote
};
