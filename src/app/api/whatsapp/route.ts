import { NextResponse } from 'next/server';
import Twilio from 'twilio';
import OpenAI from 'openai';
import { kv } from '@vercel/kv';

// Initialize clients
const twilioClient = Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Type definitions
interface WhatsAppRequest {
  name: string;
  phone: string;
  message: string;
}

interface ConversationMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export async function POST(request: Request) {
  try {
    const { name, phone, message } = (await request.json()) as WhatsAppRequest;

    // Get existing conversation from KV store
    const conversationKey = `whatsapp-conversation:${phone}`;
    let conversation: ConversationMessage[] = await kv.get(conversationKey) || [];

    // If new conversation, add system prompt
    if (conversation.length === 0) {
      conversation.push({
        role: 'system',
        content: `You are Brian's professional assistant. Respond to potential clients in a friendly but professional tone.
        Provide estimates in KES (1 USD ≈ 150 KES) when appropriate. Ask clarifying questions if needed.
        Current user: ${name}`
      });
    }

    // Add user message to conversation
    conversation.push({
      role: 'user',
      content: message
    });

    // Generate AI response
    const aiResponse = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: conversation,
      temperature: 0.7,
      max_tokens: 256
    });

    const responseText = aiResponse.choices[0]?.message?.content || 
      "Thanks for your message! Brian will get back to you soon.";

    // Add assistant response to conversation
    conversation.push({
      role: 'assistant',
      content: responseText
    });

    // Save conversation with 24h TTL
    await kv.set(conversationKey, conversation, { ex: 86400 });

    // Send WhatsApp message
    const twilioResponse = await twilioClient.messages.create({
      body: responseText,
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${phone}`
    });

    return NextResponse.json({ 
      success: true,
      message: responseText,
      sid: twilioResponse.sid
    });

  } catch (error) {
    console.error('WhatsApp API error:', error);
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process message'
      },
      { status: 500 }
    );
  }
}