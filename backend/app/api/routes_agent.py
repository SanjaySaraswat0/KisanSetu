"""
KisanSetu AI Assistant API Routes — BHASHINI + LangGraph Agent.
"""
from fastapi import APIRouter
from pydantic import BaseModel

from app.agents.orchestrator import run_agent_query
from app.services.bhashini_service import speech_to_text, text_to_speech, translate_text

router = APIRouter(prefix="/agent", tags=["agent"])


class TextQueryRequest(BaseModel):
    text: str
    language: str = "en"  # hi, en, mr, ta, te
    crop_name: str = "Wheat"
    quantity_kg: float = 500.0
    district: str = "Ujjain"
    context: dict | None = None
    history: list[dict] | None = None


class VoiceQueryRequest(BaseModel):
    audio_base64: str
    language: str = "hi"


@router.post("/query")
async def agent_text_query(payload: TextQueryRequest):
    """Text-in / text-out agent query with real KisanSetu context & Gemini AI."""
    agent_result = run_agent_query(
        query=payload.text,
        language=payload.language,
        crop_name=payload.crop_name,
        quantity_kg=payload.quantity_kg,
        district=payload.district,
        custom_context=payload.context,
        history=payload.history,
    )

    return {
        "query": payload.text,
        "answer": agent_result.get("response", ""),
        "response": agent_result.get("response", ""),
        "language": payload.language,
        "engine": agent_result.get("engine", "Gemini 2.5 Flash"),
        "status": agent_result.get("status", "success"),
        "error": agent_result.get("error"),
    }


@router.post("/voice-query")
async def agent_voice_query(payload: VoiceQueryRequest):
    """Full voice pipeline: audio -> BHASHINI STT -> Translate -> Agent -> Translate -> BHASHINI TTS."""
    transcript_local = await speech_to_text(payload.audio_base64, payload.language)
    query_en = await translate_text(transcript_local, payload.language, "en")

    agent_result = run_agent_query(query_en)
    answer_en = agent_result.get("response", "")

    answer_local = await translate_text(answer_en, "en", payload.language)
    audio_bytes = await text_to_speech(answer_local, payload.language)

    return {
        "transcript": transcript_local,
        "answer_text": answer_local,
        "answer_audio_base64": audio_bytes.hex(),
        "language": payload.language,
    }
