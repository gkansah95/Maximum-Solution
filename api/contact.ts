import type { IncomingMessage, ServerResponse } from 'node:http';

interface VercelRequest extends IncomingMessage {
  body?: unknown;
}

interface VercelResponse extends ServerResponse {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
}

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds: number } {
  const now = Date.now();
  const existing = rateLimitStore.get(ip);

  if (!existing || now > existing.resetAt) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, retryAfterSeconds: 0 };
  }

  if (existing.count >= RATE_LIMIT_MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  return { allowed: true, retryAfterSeconds: 0 };
}

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

async function readJsonBody(req: VercelRequest): Promise<Record<string, unknown>> {
  if (req.body && typeof req.body === 'object') {
    return req.body as Record<string, unknown>;
  }
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body) as Record<string, unknown>;
    } catch {
      return {};
    }
  }
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return {};
  }
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed.' });
  }

  const forwarded = req.headers['x-forwarded-for'];
  const clientIp =
    (Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(',')[0]?.trim()) ||
    req.socket?.remoteAddress ||
    'unknown';

  const rateCheck = checkRateLimit(clientIp);
  if (!rateCheck.allowed) {
    res.setHeader('Retry-After', String(rateCheck.retryAfterSeconds));
    return res.status(429).json({
      ok: false,
      error:
        'Too many enquiry attempts from this network address. Please wait a few minutes or call +233 20 384 9792 directly.',
    });
  }

  const body = await readJsonBody(req);

  if (typeof body.website === 'string' && body.website.trim().length > 0) {
    return res.status(400).json({
      ok: false,
      error: 'Unable to process enquiry submission.',
    });
  }

  const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : '';
  const organisation = typeof body.organisation === 'string' ? body.organisation.trim() : '';
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const telephone = typeof body.telephone === 'string' ? body.telephone.trim() : '';
  const subject = typeof body.subject === 'string' ? body.subject.trim() : '';
  const serviceOfInterest =
    typeof body.serviceOfInterest === 'string' ? body.serviceOfInterest.trim() : '';
  const message = typeof body.message === 'string' ? body.message.trim() : '';

  const fieldErrors: Record<string, string> = {};

  if (fullName.length < 2 || fullName.length > 120) {
    fieldErrors.fullName = 'Please enter your full name (2–120 characters).';
  }
  if (organisation.length > 160) {
    fieldErrors.organisation = 'Organisation name must be 160 characters or fewer.';
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email) || email.length > 180) {
    fieldErrors.email = 'Please enter a valid email address.';
  }
  const phoneDigits = telephone.replaceAll(/[^\d]/g, '');
  if (phoneDigits.length < 7 || telephone.length > 30) {
    fieldErrors.telephone = 'Please enter a valid telephone number.';
  }
  if (subject.length < 3 || subject.length > 180) {
    fieldErrors.subject = 'Please provide a clear enquiry subject (3–180 characters).';
  }
  if (serviceOfInterest.length < 2 || serviceOfInterest.length > 100) {
    fieldErrors.serviceOfInterest = 'Please select a service of interest.';
  }
  if (message.length < 15 || message.length > 3000) {
    fieldErrors.message = 'Please enter a message of at least 15 characters (maximum 3,000).';
  }

  if (Object.keys(fieldErrors).length > 0) {
    return res.status(400).json({
      ok: false,
      error: 'Please review the highlighted fields and try again.',
      fieldErrors,
    });
  }

  const apiKey = process.env.RESEND_API_KEY?.trim() || '';
  const toEmail = process.env.CONTACT_TO_EMAIL?.trim() || '';
  const fromEmail = process.env.EMAIL_FROM?.trim() || '';

  if (!apiKey || !toEmail || !fromEmail) {
    return res.status(503).json({
      ok: false,
      unconfigured: true,
      error:
        'The online enquiry service is temporarily unavailable. Please telephone our office directly on +233 20 384 9792 (Monday–Friday, 8:00 AM – 5:00 PM).',
    });
  }

  const textBody = [
    'New Website Enquiry – Maximum Solutions Chartered Accountants',
    '------------------------------------------------------------',
    `Full Name: ${fullName}`,
    `Company / Organisation: ${organisation || 'Not provided'}`,
    `Email Address: ${email}`,
    `Telephone Number: ${telephone}`,
    `Service of Interest: ${serviceOfInterest}`,
    `Subject: ${subject}`,
    '',
    'Message:',
    message,
  ].join('\n');

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #243244; max-width: 640px; margin: 0 auto; padding: 24px;">
      <div style="border-bottom: 2px solid #10243A; padding-bottom: 12px; margin-bottom: 20px;">
        <h2 style="margin: 0; color: #10243A; font-size: 20px;">New Website Enquiry</h2>
        <p style="margin: 4px 0 0; color: #526071; font-size: 13px;">Maximum Solutions Chartered Accountants</p>
      </div>
      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 8px 0; font-weight: 600; width: 180px; color: #10243A;">Full Name:</td><td style="padding: 8px 0;">${escapeHtml(fullName)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 600; color: #10243A;">Organisation:</td><td style="padding: 8px 0;">${escapeHtml(organisation || 'Not provided')}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 600; color: #10243A;">Email Address:</td><td style="padding: 8px 0;">${escapeHtml(email)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 600; color: #10243A;">Telephone:</td><td style="padding: 8px 0;">${escapeHtml(telephone)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 600; color: #10243A;">Service of Interest:</td><td style="padding: 8px 0;">${escapeHtml(serviceOfInterest)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 600; color: #10243A;">Subject:</td><td style="padding: 8px 0;">${escapeHtml(subject)}</td></tr>
      </table>
      <div style="margin-top: 20px; padding: 16px; background-color: #F5F7FA; border: 1px solid #E2E8F0; border-radius: 6px;">
        <p style="margin: 0 0 8px; font-weight: 600; color: #10243A; font-size: 13px;">Enquiry Message</p>
        <p style="margin: 0; white-space: pre-wrap; line-height: 1.6; font-size: 14px;">${escapeHtml(message)}</p>
      </div>
    </div>
  `;

  try {
    const resendResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `[Website Enquiry] ${subject}`,
        text: textBody,
        html: htmlBody,
      }),
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      console.error('Resend API delivery error:', resendResponse.status, errorText);
      return res.status(502).json({
        ok: false,
        error:
          'We were unable to deliver your enquiry electronically at this time. Please telephone our office directly on +233 20 384 9792.',
      });
    }

    return res.status(200).json({
      ok: true,
      message:
        'Thank you. Your enquiry has been received by Maximum Solutions Chartered Accountants. Our office will respond during business hours.',
    });
  } catch (err) {
    console.error('Contact submission error:', err);
    return res.status(502).json({
      ok: false,
      error:
        'An unexpected network error prevented delivery of your enquiry. Please call +233 20 384 9792 directly.',
    });
  }
}
