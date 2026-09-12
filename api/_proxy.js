const getBackendBaseUrl = () => {
  const configured = process.env.JAVA_BACKEND_URL || process.env.BACKEND_API_URL || process.env.VITE_API_BASE_URL;

  if (!configured) {
    return null;
  }

  return configured.endsWith('/') ? configured.slice(0, -1) : configured;
};

const proxyRequest = async (request, path) => {
  const backendBaseUrl = getBackendBaseUrl();

  if (!backendBaseUrl) {
    return new Response(
      JSON.stringify({
        success: false,
        message: 'The backend service is not configured for this deployment.',
      }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const targetUrl = `${backendBaseUrl}${path}`;
  const response = await fetch(targetUrl, {
    method: request.method,
    headers: {
      ...(request.headers.get('content-type') ? { 'Content-Type': request.headers.get('content-type') } : {}),
      ...(request.headers.get('accept') ? { Accept: request.headers.get('accept') } : {}),
    },
    body: request.method === 'GET' ? undefined : await request.text(),
  });

  const responseText = await response.text();
  const contentType = response.headers.get('content-type') || 'application/json';

  return new Response(responseText || JSON.stringify({ success: false, message: 'No response returned from backend.' }), {
    status: response.status,
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'no-store',
    },
  });
};

module.exports = { proxyRequest };
