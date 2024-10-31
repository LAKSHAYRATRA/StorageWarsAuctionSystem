const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user:process.env.EMAIL_USER, // Your email address
      pass:process.env.EMAIL_PASS, // Your email password or app-specific password
    },
    secureConnection: false, // Set to false if you're having issues with secure connections
    port: 465, //for ssl
});  
router.post('/contact', async (req, res) => {
    const { name, email, phone, subject, details, preferredContactMethod } = req.body;
    let mailOptions = {
        from: email,
        to: process.env.RECEIVER_EMAIL, // Your email address to receive the messages
        subject: `New Contact Form Submission: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nPreferred Contact Method: ${preferredContactMethod}\n\nDetails:\n${details}`,
      };
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Contact form submitted successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
});

module.exports = router;