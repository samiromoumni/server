import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});
export const sendEmail = async (to, subject, html) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_FROM || 'Reliqua Travel <noreply@reliquatravel.com>',
            to,
            subject,
            html,
        });
        console.log(`✅ Email sent to ${to}`);
    }
    catch (error) {
        console.error('❌ Error sending email:', error);
        throw error;
    }
};
export const sendReservationConfirmation = async (email, reservationData) => {
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #4A90E2; color: white; padding: 20px; text-align: center; }
          .content { background: #f9f9f9; padding: 20px; }
          .footer { text-align: center; padding: 20px; color: #666; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Reliqua Travel</h1>
            <h2>Confirmation de Réservation</h2>
          </div>
          <div class="content">
            <p>Hello ${reservationData.firstName} ${reservationData.lastName},</p>
            <p>We have received your reservation for the package <strong>${reservationData.packageTitle}</strong>.</p>
            <h3>Reservation Details:</h3>
            <ul>
              <li><strong>Package:</strong> ${reservationData.packageTitle}</li>
              <li><strong>Departure Date:</strong> ${new Date(reservationData.startDate).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}</li>
              <li><strong>Arrival Date:</strong> ${new Date(reservationData.endDate).toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' })}</li>
              <li><strong>Number of People:</strong> ${reservationData.numberOfPersons}</li>
              <li><strong>Total Price:</strong> ${reservationData.totalPrice} DZD</li>
            </ul>
            <p>Your reservation is being processed. We will contact you shortly to confirm the details.</p>
            <p>Thank you for your trust!</p>
          </div>
          <div class="footer">
            <p>Reliqua Travel<br>Ain Temouchent, Algérie</p>
          </div>
        </div>
      </body>
    </html>
  `;
    await sendEmail(email, 'Reservation Confirmation - Reliqua Travel', html);
};
//# sourceMappingURL=email.js.map