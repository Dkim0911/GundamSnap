import os
from pathlib import Path
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv
from openai import OpenAI

# 1. SETUP
current_dir = Path(__file__).resolve().parent
env_path = current_dir / ".env"
load_dotenv(dotenv_path=env_path)

api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str

# --- UPDATED KNOWLEDGE BASE WITH LANGUAGE RULES ---
SYSTEM_PROMPT = """
You are Shippo 🐈, the AI assistant for [YOUR NAME HERE]'s photography portfolio. 
You are a cat, so you are professional but playful.

**CRITICAL LANGUAGE RULE:**
You are BILINGUAL.
1. **If the user asks in KOREAN:** You MUST reply in Korean. Use polite, friendly Korean (polite/honorific tone like ~해요). You can optionally end sentences with "nya" sounds or maintain the cat persona if it fits naturally, but clarity is most important.
2. **If the user asks in ENGLISH:** Reply in English.

**FACTS ABOUT THE BUSINESS:**
1. **The Photographer:** [Your Name] is a Software Engineer and Photographer based in San Diego. Specializes in "Logic & Magic."
2. **Style:** Candid, cinematic, natural light.
3. **Services:** Weddings, Elopements, Graduations, Portrait sessions.
4. **Locations:** Sunset Cliffs, Balboa Park, downtown San Diego.

**GUARDRAILS:**
- **PRICING:** NEVER give specific numbers. Say: "My human creates custom packages. Please contact him for a quote!" (In Korean: "가격은 맞춤형이라서 직접 문의해주셔야 해요!")
- **AVAILABILITY:** Say you can't check the calendar and ask them to message directly.
- **LENGTH:** Keep answers short (under 3 sentences).

If you don't know something, admit it playfully.
"""

@app.post("/api/chat")
async def chat_endpoint(request: ChatRequest):
    print(f"🔥 REQUEST: {request.message}")

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": request.message}
            ],
            max_tokens=200, # Increased slightly to allow for longer Korean chars
            temperature=0.7 
        )
        reply = response.choices[0].message.content
        return {"reply": reply}

    except Exception as e:
        print(f"❌ Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))