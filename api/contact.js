const CALENDLY_URL = process.env.CALENDLY_URL || 'https://calendly.com/aneeshparasa/30min';
const OWNER_EMAIL = 'aneeshparasa@gmail.com';

// Escapes user input before embedding in HTML email templates (fixes XSS/injection in emails)
const esc = (s) => String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

async function brevoSend(payload) {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
            'api-key': process.env.BREVO_API_KEY,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    if (!response.ok) {
        const error = await response.text();
        throw new Error(`Brevo error: ${error}`);
    }
}

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
                Thanks for reaching out,<br/>${esc(name)}.
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background-color:#ffffff;padding:40px 48px;border-left:1px solid #e8e4de;border-right:1px solid #e8e4de;">
              <p style="margin:0 0 24px;color:#2A2A35;font-size:16px;line-height:1.7;">
                We've received your enquiry${type ? ` regarding <strong>${esc(type)}</strong>` : ''} and our team will review your project parameters shortly.
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

    await brevoSend({
        sender: { name: 'AB Consulting Engineers', email: process.env.BREVO_FROM_EMAIL },
        to: [{ email, name }],
        subject: 'Thanks for reaching out — AB Consulting Engineers',
        htmlContent,
    });
}

async function sendOwnerNotification({ name, email, phone, type, message }) {
    await brevoSend({
        sender: { name: 'AB Consulting Website', email: process.env.BREVO_FROM_EMAIL },
        to: [{ email: OWNER_EMAIL, name: 'Aneesh' }],
        subject: `New enquiry from ${esc(name)}`,
        htmlContent: `
<p><strong>New form submission from the AB Consulting website:</strong></p>
<table style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
  <tr><td style="padding:6px 16px 6px 0;color:#888;">Name</td><td style="padding:6px 0;"><strong>${esc(name)}</strong></td></tr>
  <tr><td style="padding:6px 16px 6px 0;color:#888;">Email</td><td style="padding:6px 0;"><a href="mailto:${esc(email)}">${esc(email)}</a></td></tr>
  <tr><td style="padding:6px 16px 6px 0;color:#888;">Phone</td><td style="padding:6px 0;">${esc(phone) || '—'}</td></tr>
  <tr><td style="padding:6px 16px 6px 0;color:#888;">Project type</td><td style="padding:6px 0;">${esc(type) || '—'}</td></tr>
  <tr><td style="padding:6px 16px 6px 0;color:#888;vertical-align:top;">Message</td><td style="padding:6px 0;">${esc(message) || '—'}</td></tr>
</table>
        `.trim(),
    });
}

export default async function handler(req, res) {
    // --- CORS: only allow requests from the production domain ---
    const allowedOrigins = [
        'https://ab-consulting-engineers.vercel.app',
        ...(process.env.ALLOWED_ORIGIN ? [process.env.ALLOWED_ORIGIN] : []),
    ];
    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
        res.setHeader('Access-Control-Allow-Origin', origin);
    }
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    // --- Startup env var check (1.6) ---
    if (!process.env.BREVO_API_KEY || !process.env.BREVO_FROM_EMAIL) {
        console.error('Missing required env vars: BREVO_API_KEY or BREVO_FROM_EMAIL');
        return res.status(500).json({ error: 'Service configuration error' });
    }

    // --- Rate limiting via Upstash (activates only when env vars are set) ---
    if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
        const { Ratelimit } = await import('@upstash/ratelimit');
        const { Redis } = await import('@upstash/redis');
        const ratelimit = new Ratelimit({
            redis: Redis.fromEnv(),
            limiter: Ratelimit.slidingWindow(5, '1 h'),
        });
        const ip = (req.headers['x-forwarded-for'] ?? '127.0.0.1').split(',')[0].trim();
        const { success } = await ratelimit.limit(ip);
        if (!success) {
            return res.status(429).json({ error: 'Too many requests. Please try again later.' });
        }
    }

    const { name, email, phone, type, message } = req.body;

    // --- Input validation (4.1) ---
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({ error: 'Name is required' });
    }
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ error: 'Valid email is required' });
    }
    if (name.length > 200 || email.length > 200 || (message && message.length > 5000)) {
        return res.status(400).json({ error: 'Input exceeds maximum allowed length' });
    }

    const errors = [];

    // --- Send confirmation email to submitter ---
    try {
        await sendEmail({ name, email, type });
    } catch (err) {
        console.error('Email error:', err);
        errors.push('email');
    }

    // --- Send notification email to owner ---
    try {
        await sendOwnerNotification({ name, email, phone, type, message });
    } catch (err) {
        console.error('Owner notification error:', err);
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
        }
    }

    if (errors.includes('email')) {
        return res.status(500).json({ error: 'Failed to send confirmation email' });
    }

    return res.status(200).json({ success: true });
}
