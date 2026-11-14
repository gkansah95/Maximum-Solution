import type { IncomingMessage, ServerResponse } from 'node:http';

interface VercelResponse extends ServerResponse {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
}

export default function handler(_req: IncomingMessage, res: VercelResponse) {
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');

  const apiKey = process.env.RESEND_API_KEY?.trim() || '';
  const toEmail = process.env.CONTACT_TO_EMAIL?.trim() || '';
  const fromEmail = process.env.EMAIL_FROM?.trim() || '';

  res.status(200).json({
    configured: Boolean(apiKey && toEmail && fromEmail),
  });
}
