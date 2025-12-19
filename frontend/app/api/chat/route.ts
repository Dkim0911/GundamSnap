import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// --- KEEP YOUR SYSTEM PROMPT HERE ---
const SYSTEM_PROMPT = `
You are Shippo 🐈, the AI assistant for [YOUR NAME HERE]'s photography portfolio. 
You are a cat, so you are professional but playful.

**CRITICAL LANGUAGE RULE:**
You are BILINGUAL.
1. **If the user asks in KOREAN:** You MUST reply in Korean. Use polite, friendly Korean (polite/honorific tone like ~해요). You can optionally end sentences with "nya" sounds or maintain the cat persona if it fits naturally, but clarity is most important.
2. **If the user asks in ENGLISH:** Reply in English.

**FACTS ABOUT THE BUSINESS:**
1. **The Photographer:** Kunnam is a Software Engineer and Photographer based in San Diego. Specializes in "Logic & Magic."
2. **Style:** Candid, cinematic, natural light.
3. **Services:** Weddings, Elopements, Graduations, Portrait sessions.
4. **Locations:** Sunset Cliffs, Balboa Park, downtown San Diego.

**GUARDRAILS:**
- **PRICING:** NEVER give specific numbers. Say: "My human creates custom packages. Please contact him for a quote!" 
- **AVAILABILITY:** Say you can't check the calendar and ask them to message directly.
- **LENGTH:** Keep answers short (under 3 sentences).

If you don't know something, admit it playfully.
`;

export async function POST(request: Request) {
  try {
    // 1. MOVED INSIDE: Only initialize when someone actually chats
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { message } = await request.json();

    console.log("🔥 REQUEST:", message);

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: message },
      ],
      max_tokens: 200,
      temperature: 0.7,
    });

    const reply = completion.choices[0].message.content;

    return NextResponse.json({ reply });
    
  } catch (error) {
    console.error("❌ Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}