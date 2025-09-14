const nodemailer = require('nodemailer');

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'your-email@gmail.com',
      pass: process.env.EMAIL_PASS || 'your-app-password'
    }
  });
};

// Email templates
const emailTemplates = {
  contact: {
    subject: 'New Contact Form Submission',
    getNotificationHTML: (data) => `
      <h2>New Contact Form Submission</h2>
      <p><strong>ID:</strong> ${data.id}</p>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
      <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
    `,
    getConfirmationHTML: (name) => `
      <h2>Thank you for contacting Khaf Fulfillment!</h2>
      <p>Dear ${name},</p>
      <p>We have received your message and will get back to you within 24 hours.</p>
      <p>Best regards,<br>Khaf Fulfillment Team</p>
    `
  },
  popup: {
    subject: 'New Popup Contact Submission',
    getNotificationHTML: (data) => `
      <h2>New Popup Contact Submission</h2>
      <p><strong>ID:</strong> ${data.id}</p>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Message:</strong></p>
      <p>${data.message}</p>
      <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
    `,
    getConfirmationHTML: (name) => `
      <h2>Thank you for reaching out!</h2>
      <p>Dear ${name},</p>
      <p>We have received your message and will respond shortly.</p>
      <p>Best regards,<br>Khaf Fulfillment Team</p>
    `
  },
  partner: {
    subject: 'New Partnership Proposal',
    getNotificationHTML: (data) => `
      <h2>New Partnership Proposal</h2>
      <p><strong>ID:</strong> ${data.id}</p>
      <p><strong>Contact Name:</strong> ${data.contactName}</p>
      <p><strong>Company:</strong> ${data.companyName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone || 'Not provided'}</p>
      <p><strong>Industries:</strong> ${data.industries.join(', ')}</p>
      <p><strong>Estimated Units:</strong> ${data.estimatedUnits || 'Not provided'}</p>
      <p><strong>Comments:</strong></p>
      <p>${data.comments || 'No additional comments'}</p>
      <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
    `,
    getConfirmationHTML: (name) => `
      <h2>Thank you for your partnership proposal!</h2>
      <p>Dear ${name},</p>
      <p>We have received your partnership proposal and will review it carefully. Our team will contact you within 48 hours to discuss next steps.</p>
      <p>Best regards,<br>Khaf Fulfillment Partnership Team</p>
    `
  },
  quote: {
    subject: 'New Quote Request',
    getNotificationHTML: (data) => `
      <h2>New Quote Request</h2>
      <p><strong>ID:</strong> ${data.id}</p>
      <p><strong>Name:</strong> ${data.fullName}</p>
      <p><strong>Company:</strong> ${data.companyName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Phone:</strong> ${data.phone}</p>
      <p><strong>Industries:</strong> ${data.industries.join(', ')}</p>
      <p><strong>Total Units:</strong> ${data.totalUnits}</p>
      <p><strong>Estimated Price:</strong> $${data.totalPrice}</p>
      <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
    `,
    getConfirmationHTML: (name) => `
      <h2>Quote Request Received!</h2>
      <p>Dear ${name},</p>
      <p>Thank you for your quote request. We have received your information and will prepare a detailed quote for you within 24 hours.</p>
      <p>Our team will contact you shortly to discuss your requirements and provide the best fulfillment solution.</p>
      <p>Best regards,<br>Khaf Fulfillment Sales Team</p>
    `
  }
};

// Send notification email to admin
const sendNotificationEmail = async (type, data) => {
  try {
    const transporter = createTransporter();
    const template = emailTemplates[type];

    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: process.env.NOTIFICATION_EMAIL || 'rkcrater7@gmail.com',
      subject: `[Khaf Fulfillment] ${template.subject}`,
      html: template.getNotificationHTML(data)
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Notification email sent for ${type} submission`);
  } catch (error) {
    console.error(`❌ Failed to send notification email for ${type}:`, error.message);
    throw error;
  }
};

// Send confirmation email to user
const sendConfirmationEmail = async (userEmail, userName, type) => {
  try {
    const transporter = createTransporter();
    const template = emailTemplates[type];

    const mailOptions = {
      from: process.env.EMAIL_USER || 'your-email@gmail.com',
      to: userEmail,
      subject: `Thank you for contacting Khaf Fulfillment`,
      html: template.getConfirmationHTML(userName)
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Confirmation email sent to ${userEmail}`);
  } catch (error) {
    console.error(`❌ Failed to send confirmation email to ${userEmail}:`, error.message);
    throw error;
  }
};

module.exports = {
  sendNotificationEmail,
  sendConfirmationEmail
};
