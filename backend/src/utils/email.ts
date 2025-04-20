// utils/email.ts
import nodemailer from "nodemailer";

export const sendBookingEmail = async ({
  to,
  name,
  restaurantName,
  date,
  time,
  people,
}: {
  to: string;
  name: string;
  restaurantName: string;
  date: string;
  time: string;
  people: number;
}) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"QuickByte" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Your Booking at ${restaurantName}`,
    html: `
      <h2>Hi ${name},</h2>
      <p>Thank you for booking with <strong>${restaurantName}</strong>!</p>
      <p><strong>Booking Details:</strong></p>
      <ul>
        <li>Date: ${date}</li>
        <li>Time: ${time}</li>
        <li>People: ${people}</li>
      </ul>
      <p>We look forward to serving you. 🍽️</p>
      <br/>
      <p>— QuickByte Team</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
