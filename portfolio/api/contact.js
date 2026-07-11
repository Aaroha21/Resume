import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  // Validation
  if (!name || name.trim().length < 2) {
    return res.status(400).json({ success: false, message: 'Name must be at least 2 characters.' });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
  }
  if (!message || message.trim().length < 10) {
    return res.status(400).json({ success: false, message: 'Message must be at least 10 characters.' });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL || 'av.project.2103@gmail.com',
      replyTo: email,
      subject: `Portfolio Contact: ${name}`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a2e; border-radius: 16px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 32px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">📬 New Portfolio Message</h1>
          </div>
          <div style="padding: 32px; color: #e2e8f0;">
            <div style="background: #16213e; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
              <p style="margin: 0 0 8px 0; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">From</p>
              <p style="margin: 0; font-size: 18px; font-weight: 600; color: #f1f5f9;">${name}</p>
            </div>
            <div style="background: #16213e; border-radius: 12px; padding: 20px; margin-bottom: 20px;">
              <p style="margin: 0 0 8px 0; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Email</p>
              <a href="mailto:${email}" style="color: #818cf8; font-size: 16px; text-decoration: none;">${email}</a>
            </div>
            <div style="background: #16213e; border-radius: 12px; padding: 20px;">
              <p style="margin: 0 0 8px 0; color: #94a3b8; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">Message</p>
              <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #e2e8f0; white-space: pre-wrap;">${message}</p>
            </div>
            <p style="margin-top: 24px; color: #64748b; font-size: 12px; text-align: center;">
              Sent from your portfolio website • ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ success: false, message: 'Failed to send message. Please try again.' });
    }

    return res.status(200).json({
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
      id: data?.id,
    });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
}
