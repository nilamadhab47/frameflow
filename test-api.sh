#!/bin/bash

# Test the contact form API endpoint
echo "Testing FrameFlow Contact API..."
echo "================================"

curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "YOUR_EMAIL@gmail.com",
    "company": "Test Company",
    "useCase": "research",
    "companySize": "11-50",
    "message": "This is a test submission to verify the API is working correctly."
  }' \
  -w "\n\nStatus Code: %{http_code}\n" \
  -s

echo "================================"
echo "Check your email and database for the submission!" 