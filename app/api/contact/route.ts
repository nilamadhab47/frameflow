import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/database';
import FormSubmission from '@/lib/models/FormSubmission';
import { sendDemoEmailGmail, sendNotificationEmailGmail } from '@/lib/gmail-email';

export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const { name, email, company, useCase, companySize, message } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Check if email already exists
    const existingSubmission = await FormSubmission.findOne({ email });
    if (existingSubmission) {
      return NextResponse.json(
        { 
          error: 'This email has already been used. Please use a different email or contact support.',
          alreadyExists: true 
        },
        { status: 409 }
      );
    }

    // Create new form submission
    const formSubmission = new FormSubmission({
      name,
      email,
      company,
      useCase,
      companySize,
      message,
    });

    // Save to database
    const savedSubmission = await formSubmission.save();

    // Prepare email data
    const emailData = {
      name,
      email,
      company,
      useCase,
    };

    // Send demo email to user
    const demoEmailResult = await sendDemoEmailGmail(emailData);
    
    // Send notification email to admin
    const notificationEmailResult = await sendNotificationEmailGmail(emailData);

    // Update submission with email status
    if (demoEmailResult.success) {
      savedSubmission.emailSent = true;
      savedSubmission.emailSentAt = new Date();
      await savedSubmission.save();
    }

    // Prepare response
    const response = {
      success: true,
      message: 'Demo request submitted successfully!',
      submissionId: savedSubmission._id,
      emailSent: demoEmailResult.success,
    };

    // Add warnings if emails failed
    if (!demoEmailResult.success) {
      response.message += ' Note: There was an issue sending the demo email, but your request has been saved.';
    }

    if (!notificationEmailResult.success) {
      console.error('Failed to send notification email:', notificationEmailResult.error);
    }

    return NextResponse.json(response, { status: 201 });

  } catch (error) {
    console.error('Form submission error:', error);

    // Check for validation errors
    if (error instanceof Error && (error as any).name === 'ValidationError') {
      const validationErrors = Object.values((error as any).errors).map(
        (err: any) => err.message
      );
      return NextResponse.json(
        { error: 'Validation failed', details: validationErrors },
        { status: 400 }
      );
    }

    // Check for duplicate key error
    if (typeof error === 'object' && error !== null && (error as any).code === 11000) {
      return NextResponse.json(
        { error: 'This email has already been used for a demo request.' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

// GET endpoint to fetch submissions (for admin use)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    await connectDB();

    const submissions = await FormSubmission.find()
      .sort({ submittedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await FormSubmission.countDocuments();

    return NextResponse.json({
      success: true,
      data: submissions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });

  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    );
  }
} 