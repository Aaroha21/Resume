"""
FastAPI Backend for Portfolio Contact Form
Integrates with Supabase database for storing contact messages.

Setup:
1. pip install fastapi uvicorn supabase python-dotenv
2. Create .env file with SUPABASE_URL and SUPABASE_KEY
3. Run: uvicorn main:app --reload
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, field_validator
import os
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="Portfolio API",
    description="Backend API for Aaroha Vartak's Portfolio",
    version="1.0.0",
)

# CORS — allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        os.getenv("FRONTEND_URL", ""),
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Supabase client (lazy init) ───────────────────────────────────────────────
def get_supabase():
    try:
        from supabase import create_client
        url = os.getenv("SUPABASE_URL")
        key = os.getenv("SUPABASE_KEY")
        if not url or not key:
            return None
        return create_client(url, key)
    except ImportError:
        return None


# ─── Schemas ───────────────────────────────────────────────────────────────────
class ContactMessage(BaseModel):
    name: str
    email: EmailStr
    message: str

    @field_validator("name")
    @classmethod
    def name_must_be_valid(cls, v: str) -> str:
        v = v.strip()
        if len(v) < 2:
            raise ValueError("Name must be at least 2 characters.")
        return v

    @field_validator("message")
    @classmethod
    def message_must_be_valid(cls, v: str) -> str:
        v = v.strip()
        if len(v) < 10:
            raise ValueError("Message must be at least 10 characters.")
        return v


class ContactResponse(BaseModel):
    success: bool
    message: str
    id: str | None = None


# ─── Routes ────────────────────────────────────────────────────────────────────
@app.get("/")
def root():
    return {"message": "Portfolio API is running 🚀", "version": "1.0.0"}


@app.get("/health")
def health():
    return {"status": "healthy", "timestamp": datetime.utcnow().isoformat()}


@app.post("/api/contact", response_model=ContactResponse)
async def submit_contact(body: ContactMessage):
    """
    Receives contact form submissions and stores them in Supabase.
    SQL to create table:
        CREATE TABLE contact_messages (
            id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            is_read BOOLEAN DEFAULT FALSE
        );
    """
    supabase = get_supabase()

    payload = {
        "name": body.name,
        "email": body.email,
        "message": body.message,
        "created_at": datetime.utcnow().isoformat(),
        "is_read": False,
    }

    if supabase:
        try:
            result = supabase.table("contact_messages").insert(payload).execute()
            record_id = result.data[0]["id"] if result.data else None
            return ContactResponse(
                success=True,
                message="Message received! I'll get back to you soon.",
                id=str(record_id),
            )
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
    else:
        # Fallback: log to console if Supabase not configured
        print(f"\n📬 New contact message (Supabase not configured):")
        print(f"   Name: {body.name}")
        print(f"   Email: {body.email}")
        print(f"   Message: {body.message}\n")
        return ContactResponse(
            success=True,
            message="Message received! (Demo mode — Supabase not configured)",
        )


@app.get("/api/messages")
async def get_messages(limit: int = 20, offset: int = 0):
    """Fetch contact messages (protected — add auth in production)."""
    supabase = get_supabase()
    if not supabase:
        return {"messages": [], "note": "Supabase not configured"}

    try:
        result = (
            supabase.table("contact_messages")
            .select("*")
            .order("created_at", desc=True)
            .range(offset, offset + limit - 1)
            .execute()
        )
        return {"messages": result.data, "count": len(result.data)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
