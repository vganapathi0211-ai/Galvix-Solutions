from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(title="GL Solutions AI Service")


class LeadRequest(BaseModel):
    leadId: str
    name: str
    company: str
    service: str
    message: str


class ChatRequest(BaseModel):
    message: str


@app.get("/health")
def health():
    return {"status": "UP", "service": "gl-solutions-ai"}


@app.post("/chat")
def chat(payload: ChatRequest):
    text = (payload.message or "").strip()
    if not text:
        return {"status": "FAILED", "success": False, "reply": "Please enter a message so I can help you."}

    lowered = text.lower()

    if any(keyword in lowered for keyword in ["website", "web", "landing page", "ecommerce", "storefront"]):
        reply = "We design and build modern websites, landing pages, and digital storefronts that help businesses present their offer clearly and convert visitors into leads. Tell us what you are trying to build and we can map the right solution."
    elif any(keyword in lowered for keyword in ["ai", "automation", "workflow", "intelligent"]):
        reply = "GL SOLUTIONS supports AI and automation projects, including business process automation, AI-assisted experiences, and intelligent operational workflows. We can help define the right technical direction for your use case."
    elif any(keyword in lowered for keyword in ["software", "mobile", "app", "platform"]):
        reply = "We build custom software and digital products, including web applications, mobile experiences, and tailored platform solutions designed around business needs."
    elif any(keyword in lowered for keyword in ["contact", "start project", "project", "hire", "quote"]):
        reply = "Absolutely. The best next step is to share a little about your project and goals through the GL SOLUTIONS contact form. We can then recommend the most suitable approach and next steps."
    elif any(keyword in lowered for keyword in ["services", "offerings", "what do you do"]):
        reply = "Our services include web development, custom software, AI solutions, automation, digital transformation, and strategic technology consulting. We help businesses turn complex ideas into practical digital systems."
    elif any(keyword in lowered for keyword in ["process", "how do you work", "workflow"]):
        reply = "We typically begin by understanding your goals, then shape the right product, technology, and delivery plan before building and refining the experience."
    else:
        reply = "I can help you explore GL SOLUTIONS services, technology direction, and project approach. Tell me what you are trying to build and I can guide you toward the right next step."

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
