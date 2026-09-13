const readBody = async (req) => {
  if (req.body) {
    if (typeof req.body === 'string') {
      try {
        return JSON.parse(req.body);
      } catch {
        return req.body;
      }
    }
    return req.body;
  }

  if (req.method === 'GET' || req.method === 'HEAD') {
    return undefined;
  }

  const chunks = [];
  try {
    for await (const chunk of req) {
      chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
    }
  } catch (err) {
    console.error('Error reading request stream:', err);
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

const SYSTEM_PROMPT = `You are an AI assistant for GALVIX SOLUTIONS, a technology company specializing in:
- Custom Software Development
- AI & Automation Solutions
- Web Experience Design
- Digital Transformation
- Product Strategy
- Cloud & Integration Services

Key information about GALVIX SOLUTIONS:
- We help businesses turn complexity into clarity through modern technology
- We work with startups, enterprises, and growing businesses
- Our approach is business-first, focusing on practical outcomes
- We use modern tech stack: React, Next.js, Node.js, TypeScript, Python, Java, Cloud platforms
- Contact: galvixsolutions@gmail.com | +91 84899 68612
- Website: https://gl-solutions.vercel.app/

Be helpful, professional, and concise. Answer questions about services, technology, processes, and how to get started. If asked about specific pricing or detailed proposals, guide them to contact the team directly.`;

function generateKnowledgeReply(messages) {
  if (!Array.isArray(messages) || messages.length === 0) {
    return 'Hi! Welcome to GALVIX SOLUTIONS. How can I help you today? Feel free to ask about our services, technology stack, or how we can help bring your project to life.';
  }

  let lastUserMessage = '';
  for (let i = messages.length - 1; i >= 0; i--) {
    const msg = messages[i];
    if (msg && (msg.role === 'user' || msg.sender === 'user') && (msg.content || msg.text)) {
      lastUserMessage = String(msg.content || msg.text).trim();
      break;
    }
  }

  if (!lastUserMessage) {
    return 'Hi there! I am the GALVIX SOLUTIONS assistant. What kind of project or digital solution are you looking to explore?';
  }

  const query = lastUserMessage.toLowerCase();

  // 1. Gratitude / Thanks
  if (
    query.includes('thank') ||
    query.includes('thx') ||
    query.includes('appreciate')
  ) {
    return `You're very welcome! 😊 If you have any more questions or want to discuss an upcoming project, feel free to ask or reach out to our team at [galvixsolutions@gmail.com](mailto:galvixsolutions@gmail.com) or [+91 84899 68612](https://wa.me/918489968612).`;
  }

  // 2. Greetings
  if (
    query === 'hi' ||
    query === 'hello' ||
    query === 'hey' ||
    query.startsWith('hi ') ||
    query.startsWith('hello ') ||
    query.startsWith('hey ') ||
    query.includes('good morning') ||
    query.includes('good afternoon') ||
    query.includes('good evening')
  ) {
    return `Hello! 👋 Welcome to GALVIX SOLUTIONS. I'm here to help you explore our services, understand our tech stack, or discuss your upcoming digital project.

What are you looking to build or improve today?`;
  }

  // 3. Contact Info
  if (
    query.includes('contact') ||
    query.includes('email') ||
    query.includes('phone') ||
    query.includes('call') ||
    query.includes('number') ||
    query.includes('whatsapp') ||
    query.includes('location') ||
    query.includes('where are you') ||
    query.includes('address') ||
    query.includes('reach')
  ) {
    return `You can reach the GALVIX SOLUTIONS team directly through:

• **Email**: [galvixsolutions@gmail.com](mailto:galvixsolutions@gmail.com)
• **Phone & WhatsApp**: [+91 84899 68612](https://wa.me/918489968612)
• **Location**: Remote-first delivery with global client support
• **Direct Inquiry**: Submit the form in the Contact section on our homepage for a fast response from our team.

Would you like us to schedule an introductory consultation about your project?`;
  }

  // 4. Startups & Early Stage
  if (
    query.includes('startup') ||
    query.includes('early stage') ||
    query.includes('mvp') ||
    query.includes('founder') ||
    query.includes('small business')
  ) {
    return `Yes! We work extensively with startups and early-stage founders. We understand that speed, agility, and cost-efficiency are critical.

How we support startups:
• **Rapid MVP Development**: Helping you build and launch a polished, functional version to validate your market quickly.
• **Scalable Architecture**: Designing your product so you won't need an expensive rewrite when user traction surges.
• **Product Strategy**: Helping you prioritize high-impact features and avoid unnecessary technical complexity.

Are you building a new venture or looking to scale an existing product?`;
  }

  // 5. Start a project / Hire / Next steps / Consultation
  if (
    query.includes('start a project') ||
    query.includes('start project') ||
    query.includes('hire') ||
    query.includes('get started') ||
    query.includes('how to start') ||
    query.includes('consultation') ||
    query.includes('next step') ||
    query.includes('onboard')
  ) {
    return `Getting started with GALVIX SOLUTIONS is simple and transparent:

1. **Initial Discovery**: Share your project goals, timeline, and requirements with us.
2. **Strategy & Scope**: We'll review your objectives and suggest the most effective technical architecture and roadmap.
3. **Proposal & Kickoff**: We agree on clear milestones, deliverables, and start building!

You can begin right now by filling out the contact form below or reaching out directly on WhatsApp at [+91 84899 68612](https://wa.me/918489968612) or email at [galvixsolutions@gmail.com](mailto:galvixsolutions@gmail.com).`;
  }

  // 6. Technology Stack (handles "technology", "technologies", "tech stack")
  if (
    query.includes('technolog') ||
    query.includes('tech stack') ||
    query.includes('stack') ||
    query.includes('framework') ||
    query.includes('languages') ||
    query.includes('react') ||
    query.includes('next.js') ||
    query.includes('python') ||
    query.includes('java') ||
    query.includes('node')
  ) {
    return `GALVIX SOLUTIONS works across a modern, battle-tested technology ecosystem:

• **Frontend**: React, Next.js, TypeScript, Tailwind CSS, Framer Motion
• **Backend**: Node.js, Express, Java (Spring Boot), Python (FastAPI), REST & GraphQL APIs
• **AI & Data**: OpenAI/LLM APIs, prompt engineering, automated workflows, data processing
• **Cloud & DevOps**: Vercel, Azure, Docker, CI/CD pipelines, automated testing & monitoring
• **Databases & Storage**: PostgreSQL, MongoDB, Redis, Cloud Storage

We select the best technology tailored to your specific project needs and scale.`;
  }

  // 7. Mobile App Development / iOS / Android
  if (
    query.includes('mobile') ||
    query.includes('ios') ||
    query.includes('android') ||
    query.includes('app dev') ||
    query.includes('react native') ||
    (query.includes('app') && !query.includes('whatsapp') && !query.includes('approach'))
  ) {
    return `Yes! We build custom mobile applications and cross-platform mobile experiences for both iOS and Android.

Our mobile capabilities include:
• **Cross-Platform Apps**: High-performance applications built with modern frameworks (e.g. React Native) for unified iOS & Android delivery.
• **Progressive Web Apps (PWAs)**: Fast, offline-capable, responsive web apps that function seamlessly across devices.
• **Backend & API Integrations**: Secure cloud backends, real-time sync, push notifications, and payment gateways.
• **UX/UI for Mobile**: Clean, conversion-focused mobile interfaces crafted for intuitive user journeys.

Tell us about the mobile experience you're planning!`;
  }

  // 8. AI & Automation / Chatbots
  if (
    query.includes('ai') ||
    query.includes('chatbot') ||
    query.includes('bot') ||
    query.includes('automation') ||
    query.includes('machine learning') ||
    query.includes('workflow') ||
    query.includes('intelligent')
  ) {
    return `Yes, we specialize in practical AI and automation solutions that deliver tangible business value:

• **Custom AI Chatbots & Assistants**: Intelligent, context-aware conversational bots trained on your company's data and workflows.
• **Workflow & Process Automation**: Automating repetitive manual tasks, administrative data entry, and multi-system handoffs.
• **Data Extraction & Intelligence**: AI-assisted document parsing, automated summarization, and insight generation.
• **AI Integrations**: Embedding cutting-edge models (OpenAI, Claude, Gemini) into your existing web, mobile, or enterprise software.

What repetitive process or AI feature are you hoping to implement?`;
  }

  // 9. Web Development / Custom Website
  if (
    query.includes('website') ||
    query.includes('web dev') ||
    query.includes('web app') ||
    query.includes('landing page') ||
    query.includes('storefront') ||
    query.includes('ecommerce') ||
    query.includes('frontend')
  ) {
    return `Yes, custom web development is one of our core specialties! We design and engineer modern, ultra-fast websites and web applications.

What we deliver:
• **High-Performance Web Apps**: Built using React, Next.js, and TypeScript for blazing speed and responsiveness.
• **Polished Design & UX**: Clean, interactive interfaces styled with Tailwind CSS and Framer Motion.
• **SEO & Conversion Optimization**: Fast load times, responsive on all screen sizes, and optimized for customer conversion.
• **Full-Stack Integrations**: Seamless connections to databases, CRM tools, authentication, and custom APIs.

Whether you need a high-converting marketing site or a complex web platform, we can build it. What are your main goals for the website?`;
  }

  // 10. Services / What do you do / Offerings
  if (
    query.includes('service') ||
    query.includes('what do you do') ||
    query.includes('what you do') ||
    query.includes('offer') ||
    query.includes('what can you do') ||
    query.includes('capabilities')
  ) {
    return `GALVIX SOLUTIONS helps businesses turn complexity into clarity through modern technology and digital products. Our core services include:

• **Custom Software Development**: Scalable business systems, internal platforms, workflow automation, and custom API integrations.
• **AI & Automation**: Custom AI chatbots, process automation, operational intelligence, and LLM-powered workflows.
• **Web Experience Design**: Fast, modern web applications, conversion-driven websites, and responsive design systems.
• **Product Strategy**: Discovery workshops, technical roadmaps, and turning uncertainty into a concrete execution plan.
• **Cloud & Integration**: Architecture on Vercel and Azure, performance tuning, security hardening, and database optimization.
• **Digital Transformation**: Modernizing legacy operations and architecting scalable systems for growing companies.

Which of these areas aligns best with what you're looking to build?`;
  }

  // 11. Pricing / Cost / Budget / Rates / Quote
  if (
    query.includes('price') ||
    query.includes('pricing') ||
    query.includes('cost') ||
    query.includes('rate') ||
    query.includes('budget') ||
    query.includes('quote') ||
    query.includes('how much') ||
    query.includes('charge')
  ) {
    return `Our pricing is milestone-based and tailored to your project's specific scope and complexity:

• **Sprint / Milestone-Based**: Clear deliverables with predictable costs and no surprise fees.
• **Custom Product Development**: Scoped according to features, integrations, and technical requirements.
• **Consultation & Strategy**: Focused workshops to define requirements and architecture.

Because every solution is custom-built, we provide an accurate estimate after a quick discovery conversation. Contact us at [galvixsolutions@gmail.com](mailto:galvixsolutions@gmail.com) or WhatsApp at [+91 84899 68612](https://wa.me/918489968612) with a brief overview of your project!`;
  }

  // 12. Process / How do you work
  if (
    query.includes('process') ||
    query.includes('how do you work') ||
    query.includes('methodology') ||
    query.includes('steps')
  ) {
    return `We follow a transparent 7-step delivery process:

1. **Discover**: Understand your core business challenges and desired outcomes.
2. **Define**: Outline scope, architecture, and technology selection.
3. **Design**: User flows, wireframes, and intuitive UI prototypes.
4. **Build**: Agile engineering with regular progress updates and clean code.
5. **Test**: Comprehensive QA, security audits, and performance checks.
6. **Launch**: Seamless deployment to production.
7. **Improve**: Continuous monitoring, support, and feature expansion.

This ensures you stay in control throughout the entire lifecycle.`;
  }

  // 13. Projects / Portfolio / Past Work / Case studies
  if (
    query.includes('project') ||
    query.includes('portfolio') ||
    query.includes('past work') ||
    query.includes('case stud') ||
    query.includes('example')
  ) {
    return `Here are a few examples of solutions built by GALVIX SOLUTIONS:

• **Operations Dashboard**: Centralized operations and activity tracking into a modular real-time dashboard, improving team visibility.
• **Client Experience Portal**: Designed a guided digital client onboarding journey that streamlined lead intake and boosted conversions.
• **AI Assist Workflow**: Automated administrative tasks and manual research using AI tooling, saving significant operational hours.

Check out the Projects section on our homepage to see more details!`;
  }

  // 14. About GALVIX SOLUTIONS / Who are you / Company
  if (
    query.includes('about') ||
    query.includes('who are you') ||
    query.includes('GALVIX SOLUTIONS') ||
    query.includes('tell me about yourself') ||
    query.includes('company')
  ) {
    return `GALVIX SOLUTIONS is a technology partner that helps businesses turn complexity into clarity through modern technology, smarter workflows, and digital products built for growth.

We combine business-first strategy with engineering excellence—whether building custom software, designing web experiences, or automating operations with AI.

How can we assist your business today?`;
  }

  // 15. Default Fallback
  return `Thank you for reaching out! At GALVIX SOLUTIONS, we build custom software, web applications, AI automation tools, and scalable cloud solutions tailored to your business needs.

Could you tell me a little more about what you're working on, or would you like to speak directly with our team? You can reach us directly at [galvixsolutions@gmail.com](mailto:galvixsolutions@gmail.com) or WhatsApp at [+91 84899 68612](https://wa.me/918489968612).`;
}

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

    const messages = payload.messages;
    const apiKey = process.env.OPENAI_API_KEY;

    // If OpenAI API key is present, try calling OpenAI
    if (apiKey) {
      try {
        const formattedMessages = [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages.map(msg => ({
            role: msg.role === 'user' || msg.sender === 'user' ? 'user' : 'assistant',
            content: msg.content || msg.text || ''
          }))
        ];

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
            messages: formattedMessages,
            temperature: 0.7,
            max_tokens: 500,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) {
            return res.status(200).json({
              success: true,
              status: 'SUCCESS',
              reply: reply,
            });
          }
        } else {
          console.warn('OpenAI returned non-OK status:', response.status);
        }
      } catch (openAiError) {
        console.warn('OpenAI request failed, falling back to built-in knowledge engine:', openAiError);
      }
    }

    // Always provide a reliable, high-quality response
    const reply = generateKnowledgeReply(messages);

    return res.status(200).json({
      success: true,
      status: 'SUCCESS',
      reply: reply,
    });

  } catch (error) {
    console.error('Chat handler error:', error);
    return res.status(200).json({
      success: true,
      status: 'SUCCESS',
      reply: 'Thanks for reaching out to GALVIX SOLUTIONS! We specialize in custom software, AI & automation, and web development. How can we help with your project? You can also contact us directly at galvixsolutions@gmail.com or +91 84899 68612.',
    });
  }
}
