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
  await transporter.sendMail({
    from: `"Status Admin" <${process.env.SMTP_USER}>`,
    to: email,
    subject: "Your admin access code",
    text: `Your OTP is ${otp}. It expires in 5 minutes.`,
  });
}
