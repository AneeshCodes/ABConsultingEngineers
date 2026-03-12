const CALENDLY_URL = process.env.CALENDLY_URL || 'https://calendly.com/aneeshparasa/30min';

async function sendEmail({ name, email, type }) {
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Thank You</title>
</head>
<body style="margin:0;padding:0;background-color:#FAF8F5;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAF8F5;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background-color:#0D0D12;padding:40px 48px;border-radius:16px 16px 0 0;">
              <p style="margin:0;color:#C9A84C;font-size:11px;font-family:'Courier New',monospace;letter-spacing:3px;text-transform:uppercase;">// AB Consulting Engineers</p>
              <h1 style="margin:16px 0 0;color:#ffffff;font-size:28px;font-weight:700;letter-spacing:-0.5px;line-height:1.3;">
                Thanks for reaching out,<br/>${name}.
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background-color:#ffffff;padding:40px 48px;border-left:1px solid #e8e4de;border-right:1px solid #e8e4de;">
              <p style="margin:0 0 24px;color:#2A2A35;font-size:16px;line-height:1.7;">
                We've received your enquiry${type ? ` regarding <strong>${type}</strong>` : ''} and our team will review your project parameters shortly.
              </p>
              <p style="margin:0 0 32px;color:#2A2A35;font-size:16px;line-height:1.7;">
                In the meantime, you're welcome to book a <strong>free 30-minute diagnostic call</strong> directly in our calendar. We'll use the time to understand your site conditions, timeline, and any structural constraints — so we can hit the ground running.
              </p>

              <!-- CTA Button -->
              <table cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td style="background-color:#C9A84C;border-radius:8px;">
                    <a href="${CALENDLY_URL}" target="_blank"
                       style="display:inline-block;padding:16px 32px;color:#0D0D12;font-size:14px;font-weight:700;text-decoration:none;letter-spacing:1px;text-transform:uppercase;">
                      Schedule a Diagnostic Call &rarr;
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;color:#888;font-size:14px;line-height:1.6;">
                If you have urgent questions before then, reply directly to this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#0D0D12;padding:28px 48px;border-radius:0 0 16px 16px;">
              <p style="margin:0;color:#ffffff;font-size:13px;font-weight:600;">AB Consulting Engineers</p>
              <p style="margin:6px 0 0;color:#ffffff60;font-size:12px;line-height:1.6;">
                Chartered Structural &amp; Civil Engineers &middot; New Zealand
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
            'api-key': process.env.BREVO_API_KEY,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            sender: {
                name: 'AB Consulting Engineers',
                email: process.env.BREVO_FROM_EMAIL,
            },
            to: [{ email, name }],
            subject: 'Thanks for reaching out — AB Consulting Engineers',
            htmlContent,
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Brevo error: ${error}`);
    }
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, phone, type, message } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    const errors = [];

    // --- Send confirmation email via Brevo ---
    try {
        await sendEmail({ name, email, type });
    } catch (err) {
        console.error('Email error:', err);
        errors.push('email');
    }

    // --- Send SMS via Twilio (only runs if env vars are set) ---
    if (
        phone &&
        process.env.TWILIO_ACCOUNT_SID &&
        process.env.TWILIO_AUTH_TOKEN &&
        process.env.TWILIO_FROM_NUMBER
    ) {
        try {
            const { default: twilio } = await import('twilio');
            const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
            await client.messages.create({
                body: `Hi ${name}, thanks for contacting AB Consulting Engineers. We'll be in touch shortly. Book a free diagnostic call: ${CALENDLY_URL}`,
                from: process.env.TWILIO_FROM_NUMBER,
                to: phone,
            });
        } catch (err) {
            console.error('Twilio error:', err);
            errors.push('sms');
        }
    }

    if (errors.includes('email')) {
        return res.status(500).json({ error: 'Failed to send confirmation email' });
    }

    return res.status(200).json({ success: true });
}
