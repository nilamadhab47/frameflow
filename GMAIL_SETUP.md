# Gmail Email Setup for FrameFlow Demo

This guide will help you set up Gmail for sending demo emails from your FrameFlow application.

## 🔧 Environment Variables

Add these to your `.env.local` file:

```bash
# Database
MONGODB_URI=your_mongodb_connection_string

# Gmail Configuration (instead of Resend)
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-app-password

# Admin email (can be the same as GMAIL_USER)
ADMIN_EMAIL=your-email@gmail.com
```

## 📧 How to Set Up Gmail App Password

### Step 1: Enable 2-Factor Authentication
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Under "Signing in to Google", click **2-Step Verification**
3. Follow the setup process to enable 2FA (required for app passwords)

### Step 2: Generate App Password
1. Go back to [Google Account Security](https://myaccount.google.com/security)
2. Under "Signing in to Google", click **App passwords**
3. You might need to sign in again
4. Click **Select app** → Choose "Mail"
5. Click **Select device** → Choose "Other (custom name)"
6. Type "FrameFlow Demo" as the name
7. Click **Generate**
8. **Copy the 16-character password** (it looks like: `abcd efgh ijkl mnop`)

### Step 3: Update Environment Variables
```bash
# Example .env.local
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/frameflow
GMAIL_USER=john.doe@gmail.com
GMAIL_APP_PASSWORD=abcd efgh ijkl mnop
ADMIN_EMAIL=john.doe@gmail.com
```

## 🚀 Test Your Setup

1. **Restart your development server**:
   ```bash
   npm run dev
   ```

2. **Test the contact form**:
   - Go to `http://localhost:3000`
   - Click "Get Started" to open the contact form
   - Fill out with your real email address
   - Submit the form

3. **Check your email**:
   - You should receive a demo credentials email
   - Admin email will also receive a notification

## 🛠️ Quick Test Script

Run this to test the API directly:

```bash
# Make executable
chmod +x test-api.sh

# Run test
./test-api.sh
```

## 📊 View Submissions

Visit the admin dashboard at: `http://localhost:3000/admin/submissions`

## 🔍 Troubleshooting

### Common Issues:

**1. "Invalid login" error**
- Make sure 2-Factor Authentication is enabled
- Use App Password, not your regular Gmail password
- Check that GMAIL_USER is correct

**2. "Authentication failed" error**
- Double-check the app password (16 characters with spaces)
- Try generating a new app password
- Make sure you're using your full Gmail address

**3. Emails not sending**
- Check console logs for error messages
- Verify environment variables are loaded
- Test with a simple email first

### Debug Steps:

1. **Check environment variables**:
   ```javascript
   console.log('Gmail user:', process.env.GMAIL_USER);
   console.log('Has app password:', !!process.env.GMAIL_APP_PASSWORD);
   ```

2. **Test Gmail connection**:
   - Use your Gmail credentials in a Gmail client first
   - Make sure 2FA is working

3. **Check network**:
   - Gmail SMTP requires internet connection
   - Some corporate networks block SMTP

## 💡 Production Considerations

### For Production:
- Consider using a dedicated email service (SendGrid, Mailgun, Resend)
- Set up proper email authentication (SPF, DKIM)
- Use a business email domain
- Monitor email delivery rates

### Gmail Limitations:
- **Sending Limit**: 500 emails per day for free accounts
- **Rate Limit**: 100 emails per hour
- **Perfect for demos**: But not recommended for high-volume production

## 🔄 Switching Back to Resend

When Resend is approved, you can switch back by:

1. Update imports in `app/api/contact/route.ts`:
   ```typescript
   import { sendDemoEmail, sendNotificationEmail } from '@/lib/email';
   ```

2. Update function calls:
   ```typescript
   const demoEmailResult = await sendDemoEmail(emailData);
   const notificationEmailResult = await sendNotificationEmail(emailData);
   ```

3. Update environment variables to use Resend instead of Gmail 