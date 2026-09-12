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

const SYSTEM_PROMPT = `You are an AI assistant for GL Solutions, a technology company specializing in:
- Custom Software Development
- AI & Automation Solutions
- Web Experience Design
- Digital Transformation
- Product Strategy
- Cloud & Integration Services

Key information about GL Solutions:
- We help businesses turn complexity into clarity through modern technology
- We work with startups, enterprises, and growing businesses
- Our approach is business-first, focusing on practical outcomes
- We use modern tech stack: React, Next.js, Node.js, TypeScript, Python, Java, Cloud platforms
- Contact: hello@glsolutions.com | +91 84899 68612
- Website: https://gl-solutions.vercel.app/

Be helpful, professional, and concise. Answer questions about services, technology, processes, and how to get started. If asked about specific pricing or detailed proposals, guide them to contact the team directly.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const payload = await readBody(req);
    
    if (!payload || !payload.messages || !Array.isArray(payload.messages)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid request. Expected { messages: [...] }' 
      });
    }

    // Check for AI API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        success: false,
        message: 'AI service not configured. Please contact support.',
      });
    }

    // Build messages array for OpenAI
    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...payload.messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.content || ''
      }))
    ];

    // Call OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
        messages: messages,
        temperature: 0.7,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('OpenAI API error:', response.status, errorText);
      
      if (response.status === 401) {
        return res.status(503).json({
          success: false,
          message: 'AI service authentication failed.',
        });
      }
      
      if (response.status === 429) {
        return res.status(503).json({
          success: false,
          message: 'AI service is temporarily unavailable. Please try again.',
        });
      }

      return res.status(503).json({
        success: false,
        message: 'AI service error. Please try again.',
      });
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'I apologize, I could not generate a response.';

    return res.status(200).json({
      success: true,
      status: 'SUCCESS',
      reply: reply,
    });

  } catch (error) {
    console.error('Chat API error:', error);
    return res.status(500).json({
      success: false,
      message: 'Sorry, I couldn\'t process that right now. Please try again or contact our team directly.',
    });
  }
}
