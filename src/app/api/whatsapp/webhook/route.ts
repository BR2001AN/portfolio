import { NextResponse } from 'next/server';
import Twilio from 'twilio';
import OpenAI from 'openai';
import { kv } from '@vercel/kv';

const twilioClient = Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(request: Request) {
  const formData = await request.formData();
  const phone = formData.get('From')?.toString().replace('whatsapp:', '');
  const message = formData.get('Body')?.toString();

  if (!phone || !message) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }

  try {
    // Get existing conversation
    const conversationKey = `whatsapp-conversation:${phone}`;
    let conversation = await kv.get<ConversationMessage[]>(conversationKey) || [];

    // Add user message
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

    // Add assistant response
    conversation.push({
      role: 'assistant',
      content: responseText
    });

    // Save conversation
    await kv.set(conversationKey, conversation, { ex: 86400 });

    // Send reply
    await twilioClient.messages.create({
      body: responseText,
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${phone}`
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process message' },
      { status: 500 }
    );
  }
}