import type { IncomingMessage, ServerResponse } from 'node:http';

interface VercelResponse extends ServerResponse {
  status: (code: number) => VercelResponse;
  json: (body: unknown) => void;
}

export default function handler(_req: IncomingMessage, res: VercelResponse) {
  res.setHeader('X-Robots-Tag', 'noindex, nofollow');
  res.status(200).json({ ok: true });
}
