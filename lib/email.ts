import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface EmailData {
  name: string;
  email: string;
  company?: string;
  useCase?: string;
}

export async function sendDemoEmail(data: EmailData) {
  const { name, email, company, useCase } = data;

  const emailHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>FrameFlow Demo Access</title>
      <style>
        body { 
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
          line-height: 1.6; 
          color: #333; 
          max-width: 600px; 
          margin: 0 auto; 
          padding: 20px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .container {
          background: white;
          border-radius: 10px;
          padding: 30px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        .logo {
          font-size: 32px;
          font-weight: bold;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 10px;
        }
        .credentials-box {
          background: #f8f9fa;
          border: 2px solid #e9ecef;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
          text-align: center;
        }
        .credential-item {
          margin: 10px 0;
          font-size: 16px;
        }
        .credential-label {
          font-weight: bold;
          color: #495057;
        }
        .credential-value {
          background: #667eea;
          color: white;
          padding: 5px 15px;
          border-radius: 5px;
          font-family: monospace;
          display: inline-block;
          margin-left: 10px;
        }
        .demo-button {
          display: inline-block;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 15px 30px;
          text-decoration: none;
          border-radius: 8px;
          font-weight: bold;
          margin: 20px 0;
          text-align: center;
        }
        .footer {
          text-align: center;
          margin-top: 30px;
          padding-top: 20px;
          border-top: 1px solid #eee;
          color: #666;
          font-size: 14px;
        }
        .highlight {
          color: #667eea;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">FrameFlow</div>
          <h1>Welcome to Your Demo Access!</h1>
        </div>
        
        <p>Hi <span class="highlight">${name}</span>,</p>
        
        <p>Thank you for your interest in FrameFlow! We're excited to show you how our AI-powered video annotation platform can transform your workflow.</p>
        
        ${company ? `<p>We see you're from <strong>${company}</strong>${useCase ? ` and are interested in <strong>${useCase}</strong> applications` : ''}. This demo will give you a hands-on experience with features specifically relevant to your use case.</p>` : ''}
        
        <div class="credentials-box">
          <h3>🔐 Your Demo Credentials</h3>
          <div class="credential-item">
            <span class="credential-label">Username:</span>
            <span class="credential-value">admin</span>
          </div>
          <div class="credential-item">
            <span class="credential-label">Password:</span>
            <span class="credential-value">admin</span>
          </div>
        </div>
        
        <div style="text-align: center;">
          <a href="https://frameflow-tool.vercel.app/test" class="demo-button">
            🚀 Access Your Demo Now
          </a>
        </div>
        
        <h3>What you can explore in the demo:</h3>
        <ul>
          <li>🎯 <strong>AI-Powered Detection:</strong> See YOLO models in action</li>
          <li>📹 <strong>Video Annotation:</strong> Try our intuitive interface</li>
          <li>⚡ <strong>Smart Frame Inheritance:</strong> Experience 70% faster workflows</li>
          <li>👥 <strong>Team Collaboration:</strong> Explore multi-user features</li>
          <li>📊 <strong>Analytics Dashboard:</strong> View performance metrics</li>
        </ul>
        
        <p><strong>Need help or have questions?</strong> Simply reply to this email or schedule a live walkthrough with our team.</p>
        
        <p>We're here to help you see exactly how FrameFlow can streamline your annotation pipeline!</p>
        
        <p>Best regards,<br/>
        <strong>The FrameFlow Team</strong></p>
        
        <div class="footer">
          <p>FrameFlow - Smart Video Annotation Platform<br/>
          <small>This demo link is active for 30 days. Need an extension? Just let us know!</small></p>
        </div>
      </div>
    </body>
    </html>
  `;

  const emailText = `
    Hi ${name},

    Thank you for your interest in FrameFlow!

    Here are your demo credentials:
    Username: admin
    Password: admin

    Access your demo: https://frameflow-tool.vercel.app/test

    What you can explore:
    - AI-Powered Detection with YOLO models
    - Video Annotation interface
    - Smart Frame Inheritance (70% faster workflows)
    - Team Collaboration features
    - Analytics Dashboard

    Need help? Simply reply to this email.

    Best regards,
    The FrameFlow Team
  `;

  try {
    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'noreply@frameflow.dev',
      to: [email],
      subject: '🚀 Your FrameFlow Demo is Ready!',
      html: emailHtml,
      text: emailText,
    });

    return { success: true, data: result };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error };
  }
}

export async function sendNotificationEmail(data: EmailData) {
  const { name, email, company, useCase } = data;

  const notificationHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>New FrameFlow Demo Request</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #667eea; color: white; padding: 20px; border-radius: 5px; }
        .content { padding: 20px; background: #f9f9f9; border-radius: 5px; margin-top: 10px; }
        .field { margin: 10px 0; }
        .label { font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>New Demo Request - FrameFlow</h2>
        </div>
        <div class="content">
          <div class="field">
            <span class="label">Name:</span> ${name}
          </div>
          <div class="field">
            <span class="label">Email:</span> ${email}
          </div>
          ${company ? `<div class="field"><span class="label">Company:</span> ${company}</div>` : ''}
          ${useCase ? `<div class="field"><span class="label">Use Case:</span> ${useCase}</div>` : ''}
          <div class="field">
            <span class="label">Submitted At:</span> ${new Date().toLocaleString()}
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const result = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'noreply@frameflow.dev',
      to: [process.env.ADMIN_EMAIL || 'admin@frameflow.dev'],
      subject: `New Demo Request from ${name}${company ? ` (${company})` : ''}`,
      html: notificationHtml,
    });

    return { success: true, data: result };
  } catch (error) {
    console.error('Notification email failed:', error);
    return { success: false, error: error };
  }
} 