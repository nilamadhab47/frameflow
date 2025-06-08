# Environment Variables Setup

Add these variables to your `.env.local` file:

## Database Configuration
```
# MongoDB connection string
MONGODB_URI=

# Example: mongodb://localhost:27017/frameflow
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/frameflow
```

## Resend Email Configuration
```
# Resend API Key
RESEND_API_KEY=

# From email address (must be verified in Resend)
RESEND_FROM_EMAIL=

# Admin email for notifications
ADMIN_EMAIL=
```

## How to Get Resend API Key

### Step 1: Create Resend Account
1. Go to [https://resend.com](https://resend.com)
2. Click "Sign Up" and create an account
3. Verify your email address

### Step 2: Get API Key
1. Log into your Resend dashboard
2. Go to "API Keys" in the sidebar
3. Click "Create API Key"
4. Name it (e.g., "FrameFlow Production")
5. Select appropriate permissions (Full access for development)
6. Copy the API key (starts with `re_`)

### Step 3: Verify Domain (for production)
1. In Resend dashboard, go to "Domains"
2. Click "Add Domain"
3. Enter your domain (e.g., `frameflow.dev`)
4. Follow DNS setup instructions
5. Wait for verification (can take up to 24 hours)

### Step 4: Configure From Email
- For development: Use `onboarding@resend.dev` (no setup required)
- For production: Use `noreply@yourdomain.com` (after domain verification)

## Example .env.local File
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/frameflow
RESEND_API_KEY=re_your_api_key_here
RESEND_FROM_EMAIL=noreply@frameflow.dev
ADMIN_EMAIL=admin@frameflow.dev
```

## Testing the Setup

1. Start your development server: `npm run dev`
2. Fill out the contact form on your site
3. Check that:
   - Form submission saves to database
   - User receives demo email
   - Admin receives notification email

## Troubleshooting

### Common Issues:
1. **Database connection failed**: Check MongoDB URI format and credentials
2. **Email not sending**: Verify Resend API key and from email address
3. **Domain not verified**: Wait for DNS propagation (up to 24 hours)

### Debug Steps:
1. Check console logs for error messages
2. Test API endpoint directly with Postman/curl
3. Verify environment variables are loaded correctly 