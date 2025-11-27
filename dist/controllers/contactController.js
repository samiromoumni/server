import ContactMessage from '../models/ContactMessage.js';
import { sendEmail } from '../utils/email.js';
export const sendContactMessage = async (req, res) => {
    try {
        const contactMessage = await ContactMessage.create(req.body);
        // Send notification email to admin
        try {
            const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
            if (adminEmail) {
                await sendEmail(adminEmail, `New Contact Message: ${req.body.subject}`, `
            <h2>New Contact Message</h2>
            <p><strong>Name:</strong> ${req.body.name}</p>
            <p><strong>Email:</strong> ${req.body.email}</p>
            ${req.body.phone ? `<p><strong>Phone:</strong> ${req.body.phone}</p>` : ''}
            <p><strong>Subject:</strong> ${req.body.subject}</p>
            <p><strong>Message:</strong></p>
            <p>${req.body.message}</p>
          `);
            }
        }
        catch (emailError) {
            console.error('Error sending notification email:', emailError);
            // Don't fail the contact message if email fails
        }
        res.status(201).json({ message: 'Message sent successfully', contactMessage });
    }
    catch (error) {
        res.status(400).json({ message: 'Error sending message', error: error.message });
    }
};
//# sourceMappingURL=contactController.js.map