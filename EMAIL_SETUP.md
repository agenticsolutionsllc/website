# Email Setup Guide

This guide explains how to set up the email functionality for the consultation form on your Agentic Solutions website.

## Option 1: EmailJS (Recommended for Simple Setup)

EmailJS allows you to send emails directly from the frontend without a backend server.

### Steps:
1. Go to [EmailJS](https://www.emailjs.com/) and create a free account
2. Create a new service (Gmail, Outlook, etc.)
3. Create an email template with the following variables:
   - `{{to_email}}`
   - `{{from_name}}`
   - `{{from_email}}`
   - `{{company}}`
   - `{{phone}}`
   - `{{message}}`
   - `{{subject}}`
   - `{{reply_to}}`

4. Get your Service ID, Template ID, and Public Key
5. Update the following in `index.html`:
   ```javascript
   emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your actual public key
   ```

6. Update the following in `js/script.js`:
   ```javascript
   const response = await emailjs.send(
       'YOUR_SERVICE_ID',    // Replace with your service ID
       'YOUR_TEMPLATE_ID',   // Replace with your template ID
       // ... rest of the parameters
       'YOUR_PUBLIC_KEY'     // Replace with your public key
   );
   ```

### EmailJS Template Example:
```
Subject: {{subject}}

New consultation request received:

Name: {{from_name}}
Email: {{from_email}}
Company: {{company}}
Phone: {{phone}}

Message:
{{message}}

Please follow up with this prospect as soon as possible.
```

## Option 2: Node.js Backend (More Professional)

For a more robust solution, use the included Node.js server.

### Steps:
1. Install Node.js on your server
2. Navigate to your website directory
3. Run: `npm install`
4. Create a `.env` file with:
   ```
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   PORT=3000
   ```

5. If using Gmail, you'll need to:
   - Enable 2-factor authentication
   - Generate an "App Password" for your application
   - Use the app password in the `EMAIL_PASS` field

6. Start the server: `npm start`

### Gmail App Password Setup:
1. Go to Google Account settings
2. Security → 2-Step Verification (enable if not already)
3. Security → App passwords
4. Generate a new app password
5. Use this password in your `.env` file

## Testing

Test your setup by:
1. Opening your website
2. Filling out the consultation form
3. Submitting the form
4. Checking that you receive the email at info@agenticsolutionsllc.com
5. Verifying the user receives a confirmation email

## Troubleshooting

### EmailJS Issues:
- Check browser console for errors
- Verify service ID, template ID, and public key are correct
- Ensure your EmailJS service is properly configured

### Node.js Backend Issues:
- Check server logs for errors
- Verify environment variables are set correctly
- Test email credentials with a simple nodemailer test script
- Check firewall settings if hosting on a server

## Alternative Email Services

Instead of Gmail, you can use:
- **SendGrid**: Professional email API service
- **Mailgun**: Reliable email service for developers
- **AWS SES**: Amazon's email service
- **Postmark**: Transactional email service

Just update the nodemailer configuration in `server.js` accordingly.

## Security Notes

- Never commit `.env` files to version control
- Use app passwords instead of your actual email password
- Consider rate limiting for production use
- Implement proper input validation and sanitization 