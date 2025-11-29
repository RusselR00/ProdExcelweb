import nodemailer from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  if (transporter) return transporter;

  // Using Gmail SMTP - requires app password
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  return transporter;
}

export async function sendEmail(options: EmailOptions): Promise<void> {
  try {
    // If credentials not set, log to console for development
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.log(`📧 Email (dev mode - not sent):`);
      console.log(`   To: ${options.to}`);
      console.log(`   Subject: ${options.subject}`);
      return;
    }

    const transporter = getTransporter();
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: options.to,
      subject: options.subject,
      html: options.html,
    });

    console.log(`✅ Email sent to ${options.to}`);
  } catch (error) {
    console.error(`❌ Email error:`, error);
    throw error;
  }
}
