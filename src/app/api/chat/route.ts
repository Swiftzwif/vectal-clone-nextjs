import { NextResponse } from 'next/server';
import { generateChatResponse } from '@/lib/openai';
import { auth } from '@clerk/nextjs';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { messages, chatId } = await req.json();
    
    // Generate AI response
    const aiResponseText = await generateChatResponse(messages);
    
    // Save to database
    const newMessage = await prisma.message.create({
      data: {
        text: aiResponseText,
        sender: 'ai',
        chat: {
          connect: { id: chatId }
        }
      }
    });

    return NextResponse.json({ 
      message: {
        id: newMessage.id,
        text: aiResponseText,
        sender: 'ai'
      }
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 });
  }
}