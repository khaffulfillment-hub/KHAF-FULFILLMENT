const Contact = require('../models/Contact.cjs');
const Partner = require('../models/Partner.cjs');
const Quote = require('../models/Quote.cjs');
const Tracking = require('../models/Tracking.cjs');
const { getNextId } = require('../services/idService.cjs');
const { sendNotificationEmail, sendConfirmationEmail } = require('../services/emailService.cjs');

// Helper function for error handling
const handleError = (res, error, message = 'An error occurred') => {
  console.error('Controller Error:', error);
  res.status(500).json({ 
    success: false, 
    message,
    ...(process.env.NODE_ENV === 'development' && { error: error.message })
  });
};

// Contact form handler
exports.handleContact = async (req, res) => {
  try {
    const uniqueId = await getNextId('contact');
    const { originalname, mimetype, size, buffer } = req.file || {};

    const contactData = {
      id: uniqueId,
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
      phone: req.body.phone || '',
      ...(req.file && {
        file: {
          originalName: originalname,
          mimeType: mimetype,
          size,
          buffer
        }
      })
    };

    const newContact = await Contact.create(contactData);

    // Send notification and confirmation emails
    try {
      await sendNotificationEmail('contact', contactData);
      await sendConfirmationEmail(contactData.email, contactData.name, 'contact');
    } catch (emailError) {
      console.warn('Email sending failed:', emailError.message);
    }

    res.json({ 
      success: true, 
      id: uniqueId,
      message: 'Contact form submitted successfully' 
    });

  } catch (error) {
    handleError(res, error, 'Error submitting contact form');
  }
};

// Popup contact handler
exports.handlePopupContact = async (req, res) => {
  try {
    const uniqueId = await getNextId('popup');

    const contactData = {
      id: uniqueId,
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
      type: 'popup'
    };

    const newContact = await Contact.create(contactData);

    // Send emails
    try {
      await sendNotificationEmail('popup', contactData);
      await sendConfirmationEmail(contactData.email, contactData.name, 'popup');
    } catch (emailError) {
      console.warn('Email sending failed:', emailError.message);
    }

    res.json({ 
      success: true, 
      id: uniqueId,
      message: 'Message sent successfully' 
    });

  } catch (error) {
    handleError(res, error, 'Error sending message');
  }
};

// Partner proposal handler
exports.handlePartnerProposal = async (req, res) => {
  try {
    const uniqueId = await getNextId('partner');
    const { originalname, mimetype, size, buffer } = req.file || {};

    const partnerData = {
      id: uniqueId,
      contactName: req.body.name,
      email: req.body.email,
      phone: req.body.phone || '',
      companyName: req.body.companyName,
      industries: Array.isArray(req.body.industries) ? req.body.industries : [req.body.industries].filter(Boolean),
      estimatedUnits: req.body.estimatedUnits || '',
      comments: req.body.comments || '',
      ...(req.file && {
        file: {
          originalName: originalname,
          mimeType: mimetype,
          size,
          buffer
        }
      })
    };

    const newPartner = await Partner.create(partnerData);

    // Send emails
    try {
      await sendNotificationEmail('partner', partnerData);
      await sendConfirmationEmail(partnerData.email, partnerData.contactName, 'partner');
    } catch (emailError) {
      console.warn('Email sending failed:', emailError.message);
    }

    res.json({ 
      success: true, 
      id: uniqueId,
      message: 'Partnership proposal submitted successfully' 
    });

  } catch (error) {
    handleError(res, error, 'Error submitting partnership proposal');
  }
};

// Quote handler
exports.handleQuote = async (req, res) => {
  try {
    const uniqueId = await getNextId('quote');
    const quoteData = {
      id: uniqueId,
      fullName: req.body.fullName,
      email: req.body.email,
      phone: req.body.phone,
      companyName: req.body.companyName,
      industries: Array.isArray(req.body.industries) ? req.body.industries : [req.body.industries].filter(Boolean),
      totalUnits: parseInt(req.body.totalUnits) || 0,
      totalPrice: parseFloat(req.body.totalPrice) || 0,
    };

    const newQuote = await Quote.create(quoteData);

    // Send emails
    try {
      await sendNotificationEmail('quote', quoteData);
      await sendConfirmationEmail(quoteData.email, quoteData.fullName, 'quote');
    } catch (emailError) {
      console.warn('Email sending failed:', emailError.message);
    }

    res.json({ 
      success: true, 
      id: uniqueId,
      message: 'Quote request submitted successfully' 
    });

  } catch (error) {
    handleError(res, error, 'Error submitting quote request');
  }
};

// Tracking submission handler
exports.handleTrackingSubmission = async (req, res) => {
  try {
    const uniqueId = await getNextId('tracking');

    const trackingData = {
      id: uniqueId,
      trackingId: req.body.trackingId,
      carrier: req.body.carrier || '',
      userIP: req.ip,
      userAgent: req.get('User-Agent')
    };

    const newTracking = await Tracking.create(trackingData);

    res.json({ 
      success: true, 
      id: uniqueId,
      message: 'Tracking submission recorded' 
    });

  } catch (error) {
    handleError(res, error, 'Error recording tracking submission');
  }
};
