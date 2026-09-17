from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from backend.app.services.ai_chat import process_chat_message

router = APIRouter(prefix="/api/chat", tags=["AI Chatbot"])

class ChatMessageItem(BaseModel):
    role: str = "user"
    content: str

class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=2000)
    history: Optional[List[ChatMessageItem]] = []

class ChatResponse(BaseModel):
    reply: str
    recommendation: Optional[Dict[str, Any]] = None
    channels: Optional[List[Dict[str, Any]]] = None
    source: str

@router.post("", response_model=ChatResponse)
def chat_endpoint(payload: ChatRequest):
    try:
        history_dicts = [{"role": h.role, "content": h.content} for h in payload.history]
        result = process_chat_message(payload.message, history_dicts)
        return ChatResponse(
            reply=result.get("reply", "Sorry, an unexpected error occurred. Please try again."),
            recommendation=result.get("recommendation"),
            channels=result.get("channels"),
            source=result.get("source", "unknown")
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chat processing failed: {str(e)}")
