import * as nodemailer from 'nodemailer';

export async function SendEmail(to: string, subject: string, html: string): Promise<void> {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'plazer456@gmail.com',
      pass: 'rqam nixs vfcm qaso'
    },
  });

  await transporter.sendMail({
    from: '"Reservation" <no-reply@yourapp.com>',
    to,
    subject,
    html,
  });
}