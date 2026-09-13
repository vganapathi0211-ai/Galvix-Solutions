from typing import List, Optional

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="GALVIX Solutions AI Service")


class LeadRequest(BaseModel):
    leadId: str
    name: str
    company: str
    service: str
    message: str


class ChatMessage(BaseModel):
    role: str = "user"
    content: str = ""


class ChatRequest(BaseModel):
    message: Optional[str] = None
    messages: Optional[List[ChatMessage]] = None


@app.get("/health")
def health():
    return {"status": "UP", "service": "gl-solutions-ai"}


@app.post("/chat")
def chat(payload: ChatRequest):
    history = payload.messages or []
    if payload.message:
        history.append(ChatMessage(role="user", content=payload.message))

    last_user_message = ""
    if history:
        for message in reversed(history):
            if str(message.role).lower() == "user" and (message.content or "").strip():
                last_user_message = str(message.content).strip()
                break

    text = last_user_message.strip()
    if not text:
        return {"status": "FAILED", "success": False, "reply": "Please enter a message so I can help you."}

    lowered = text.lower()
    context = "\n".join(
        f"{message.role}: {message.content}"
        for message in history
        if (message.content or "").strip()
    )
    context_lower = context.lower()

    if any(keyword in lowered for keyword in ["website", "web", "landing page", "ecommerce", "storefront"]):
        reply = "We design and build modern websites, landing pages, and digital storefronts that help businesses present their offer clearly and convert visitors into leads. Tell us what you are trying to build and we can map the right solution."
    elif any(keyword in lowered for keyword in ["mobile", "ios", "android", "app"]):
        reply = "Yes — we can help with mobile app strategy, product planning, and digital experiences that fit your business goals. We focus on building useful, scalable experiences rather than just a feature checklist."
    elif any(keyword in lowered for keyword in ["ai", "automation", "workflow", "intelligent"]):
        reply = "GALVIX SOLUTIONS supports AI and automation projects, including business process automation, AI-assisted experiences, and intelligent operational workflows. We can help define the right technical direction for your use case."
    elif any(keyword in lowered for keyword in ["software", "platform"]):
        reply = "We build custom software and digital products, including web applications, mobile experiences, and tailored platform solutions designed around business needs."
    elif any(keyword in lowered for keyword in ["contact", "start project", "project", "hire", "quote", "hello", "how can i contact"]):
        reply = "Absolutely. The best next step is to share a little about your project and goals through the GALVIX SOLUTIONS contact form or WhatsApp. We can then recommend the most suitable approach and next steps."
    elif any(keyword in lowered for keyword in ["services", "offerings", "what do you do"]):
        reply = "Our services include web development, custom software, AI solutions, automation, digital transformation, and strategic technology consulting. We help businesses turn complex ideas into practical digital systems."
    elif any(keyword in lowered for keyword in ["technology", "tech", "stack", "tools"]):
        reply = "We work across modern product and platform stacks, with a strong focus on web systems, AI workflows, automation, and digital transformation initiatives."
    elif any(keyword in lowered for keyword in ["thank you", "thanks"]):
        reply = "You’re welcome. We’re happy to help and would love to explore your next digital opportunity."
    else:
        reply = f"I can help you explore GALVIX SOLUTIONS services, technology direction, and project approach. Based on your conversation, I’d recommend we look at the right solution for your goals: {context_lower[:140] if context_lower else 'your next digital initiative'}."

    return {"status": "SUCCESS", "success": True, "reply": reply}


@app.post("/ai/analyze-lead")
def analyze_lead(payload: LeadRequest):
    message = payload.message.lower()
    classification = payload.service.strip() if payload.service.strip() else "General inquiry"

    summary = f"Client {payload.name} from {payload.company} is requesting {payload.service}."
    if "website" in message or "web" in message:
        classification = "Website Development"
        summary = f"Client requires a website solution for {payload.company}."
    elif "ai" in message or "automation" in message:
        classification = "AI & Automation"
        summary = f"Client is exploring AI and automation opportunities for {payload.company}."
    elif "software" in message or "platform" in message:
        classification = "Custom Software"
        summary = f"Client needs a custom software or platform solution for {payload.company}."

    priority = "HIGH" if any(term in message for term in ["urgent", "immediately", "need now", "launch soon"]) else "MEDIUM"
    recommended_service = payload.service if payload.service else "Strategy Consultation"

    return {
        "leadId": payload.leadId,
        "classification": classification,
        "summary": summary,
        "recommendedService": recommended_service,
        "priority": priority,
        "status": "SUCCESS",
    }
