const GOOGLE_SHEET_WEBHOOK_URL =
  process.env.GOOGLE_SHEET_WEBHOOK_URL ||
  'https://script.google.com/macros/s/AKfycbwJ3CDdhsnSZjlxeheFbNnu_N_0kvSViJnKYNiQ5I_4F_G-aKZVBaw9gC_IxMuGfD8lpw/exec';

const readBody = async (req) => {
  if (req.method === 'GET' || req.method === 'HEAD') {
    return undefined;
  }

  if (req.body && typeof req.body === 'object') {
    return req.body;
  }

  const chunks = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }

  const raw = Buffer.concat(chunks).toString('utf8');
  if (!raw) {
    return undefined;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ success: false, message: 'Method Not Allowed' });
    return;
  }

  try {
    const payload = await readBody(req);
    if (!payload) {
      res.status(400).json({ success: false, message: 'Payload is empty' });
      return;
    }

    const response = await fetch(GOOGLE_SHEET_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: typeof payload === 'string' ? payload : JSON.stringify(payload),
    });

    res.status(200).json({
      success: true,
      message: 'Inquiry received and saved to spreadsheet.',
    });
  } catch (error) {
    console.error('Failed to submit inquiry:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to record your inquiry. Please try again or email us directly.',
    });
  }
}
