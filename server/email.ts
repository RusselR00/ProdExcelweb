interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail(options: EmailOptions): Promise<void> {
  // Simple in-memory implementation for now
  // In production, integrate with SendGrid, Resend, or another email service
  console.log(`Email sent to ${options.to}:`);
  console.log(`Subject: ${options.subject}`);
  console.log(`Message: ${options.html}`);
  
  // TODO: Replace with actual email service integration
  // Options:
  // 1. SendGrid: npm install @sendgrid/mail
  // 2. Resend: npm install resend
  // 3. Nodemailer: npm install nodemailer
}
