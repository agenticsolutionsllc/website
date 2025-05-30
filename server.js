const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Email configuration
const transporter = nodemailer.createTransporter({
    service: 'gmail', // You can use other services like SendGrid, Mailgun, etc.
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS  // Your email password or app password
    }
});

// Route to handle consultation form submissions
app.post('/api/send-consultation', async (req, res) => {
    try {
        const { name, email, company, phone, message } = req.body;

        // Validate required fields
        if (!name || !email) {
            return res.status(400).json({ 
                success: false, 
                message: 'Name and email are required fields.' 
            });
        }

        // Email content
        const emailContent = `
New Consultation Request Received

Contact Information:
• Name: ${name}
• Email: ${email}
• Company: ${company || 'Not provided'}
• Phone: ${phone || 'Not provided'}

Message:
${message || 'No additional details provided'}

---
This email was sent from the Agentic Solutions consultation form.
Please follow up with this prospect as soon as possible.
        `;

        // Email options
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'info@agenticsolutionsllc.com',
            subject: `New Consultation Request from ${name}`,
            text: emailContent,
            replyTo: email
        };

        // Send email
        await transporter.sendMail(mailOptions);

        // Send confirmation email to the user
        const confirmationOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Thank you for your consultation request - Agentic Solutions',
            text: `
Dear ${name},

Thank you for your interest in Agentic Solutions! We have received your consultation request and will be in touch within 24 hours.

Your request details:
• Company: ${company || 'Not provided'}
• Phone: ${phone || 'Not provided'}
• Message: ${message || 'No additional details provided'}

In the meantime, feel free to explore our website to learn more about how AI agents can transform your business operations.

Best regards,
The Agentic Solutions Team

---
This is an automated confirmation email. Please do not reply to this email.
For immediate assistance, contact us at info@agenticsolutionsllc.com
            `
        };

        await transporter.sendMail(confirmationOptions);

        res.json({ 
            success: true, 
            message: 'Your consultation request has been sent successfully!' 
        });

    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Failed to send consultation request. Please try again later.' 
        });
    }
});

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app; 