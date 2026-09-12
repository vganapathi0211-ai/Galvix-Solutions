const getBackendBaseUrl = () => {
  const candidates = [
    process.env.JAVA_BACKEND_URL,
    process.env.BACKEND_API_URL,
    process.env.VITE_API_BASE_URL,
  ];

  return candidates.find(Boolean)?.replace(/\/$/, '');
};

const readBody = async (req) => {
  if (req.method === 'GET' || req.method === 'HEAD') {
    return undefined;
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
  const backendBaseUrl = getBackendBaseUrl();

  if (!backendBaseUrl) {
    res.status(503).json({
      success: false,
      message: 'The backend service is not configured for this deployment.',
    });
    return;
  }

  const payload = await readBody(req);
  const response = await fetch(`${backendBaseUrl}/api/chat`, {
    method: req.method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(req.headers && req.headers['x-forwarded-for'] ? { 'X-Forwarded-For': req.headers['x-forwarded-for'] } : {}),
    },
    body: payload && typeof payload !== 'string' ? JSON.stringify(payload) : payload || undefined,
  });

  const text = await response.text();
  const contentType = response.headers.get('content-type') || 'application/json';

  res.setHeader('Content-Type', contentType);
  res.status(response.status).send(text || JSON.stringify({ success: false, message: 'No response returned from backend.' }));
}
