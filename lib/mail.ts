import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  service: "gmail",
  auth: {
   user: process.env.GMAIL_USER,
   pass: process.env.GMAIL_PASS,
  },
});    

export async function sendOTP(email: string, otp: string) {
  const htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Admin Access Code</title>
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 20px;
          min-height: 100vh;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        }
        .header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 40px 20px;
          text-align: center;
          color: white;
        }
        .header h1 {
          font-size: 28px;
          font-weight: 700;
          margin-bottom: 8px;
          letter-spacing: -0.5px;
        }
        .header p {
          font-size: 14px;
          opacity: 0.95;
        }
        .content {
          padding: 40px 30px;
        }
        .greeting {
          font-size: 16px;
          color: #1a1a1a;
          margin-bottom: 24px;
          line-height: 1.6;
        }
        .otp-section {
          background: #f8f9fa;
          border-left: 4px solid #667eea;
          padding: 24px;
          border-radius: 8px;
          margin: 32px 0;
          text-align: center;
        }
        .otp-label {
          font-size: 13px;
          color: #666;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 12px;
          font-weight: 600;
        }
        .otp-code {
          font-size: 48px;
          font-weight: 700;
          color: #667eea;
          letter-spacing: 8px;
          font-family: 'Monaco', 'Courier New', monospace;
          word-spacing: 12px;
        }
        .expiry-notice {
          font-size: 13px;
          color: #e74c3c;
          margin-top: 16px;
          font-weight: 500;
        }
        .info-text {
          font-size: 14px;
          color: #555;
          line-height: 1.8;
          margin: 24px 0;
        }
        .security-note {
          background: #f0f4ff;
          border: 1px solid #d0deff;
          padding: 16px;
          border-radius: 8px;
          font-size: 13px;
          color: #444;
          margin: 24px 0;
          line-height: 1.6;
        }
        .security-note strong {
          color: #667eea;
        }
        .footer {
          background: #f8f9fa;
          padding: 24px 30px;
          text-align: center;
          border-top: 1px solid #e0e0e0;
        }
        .footer-text {
          font-size: 12px;
          color: #999;
          line-height: 1.6;
        }
        .footer-text a {
          color: #667eea;
          text-decoration: none;
        }
        .footer-text a:hover {
          text-decoration: underline;
        }
        .divider {
          height: 1px;
          background: #e0e0e0;
          margin: 24px 0;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔐 Access Code</h1>
          <p>Your secure admin authentication code</p>
        </div>
        
        <div class="content">
          <div class="greeting">
            Hello,<br><br>
            You've requested access to your admin dashboard. Use the code below to verify your identity.
          </div>
          
          <div class="otp-section">
            <div class="otp-label">Your Access Code</div>
            <div class="otp-code">${otp}</div>
            <div class="expiry-notice">⏱️ Valid for 5 minutes only</div>
          </div>
          
          <div class="info-text">
            Enter this code in your browser to complete your admin login. Do not share this code with anyone.
          </div>
          
          <div class="security-note">
            <strong>🛡️ Security Notice:</strong> This code is for one-time use only. If you didn't request this, please ignore this email and ensure your account remains secure.
          </div>
          
          <div class="divider"></div>
          
          <div class="info-text" style="font-size: 12px; color: #999;">
            <strong>Questions?</strong> If you need help, please reach out to our support team.
          </div>
        </div>
        
        <div class="footer">
          <div class="footer-text">
            <p>This is an automated email. Please do not reply to this message.</p>
            <p style="margin-top: 12px;">© ${new Date().getFullYear()} Admin Dashboard. All rights reserved.</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  await transporter.sendMail({
    from: `"Status Admin" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Your Admin Access Code - Valid for 5 Minutes",
    html: htmlTemplate,
    text: `Your OTP is ${otp}. It expires in 5 minutes.`,
  });
}
