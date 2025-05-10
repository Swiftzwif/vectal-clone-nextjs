import { prisma } from '@/lib/prisma';
import { Message } from '@/components/global/chat-interface';

// PostgreSQL-based memory persistence
export async function saveChat(userId: string, messages: Message[], title?: string) {
  // Create or update chat
  const chatTitle = title || messages[0]?.text.substring(0, 50) || 'New Chat';
  
  const chat = await prisma.chat.create({
    data: {
      title: chatTitle,
      user: { connect: { clerkId: userId } },
      messages: {
        create: messages.map(msg => ({
          text: msg.text,
          sender: msg.sender
        }))
      }
    },
    include: { messages: true }
  });
  
  return chat;
}

export async function getChatHistory(userId: string) {
  return prisma.chat.findMany({
    where: { user: { clerkId: userId } },
    orderBy: { updatedAt: 'desc' },
    include: { 
      messages: {
        orderBy: { createdAt: 'asc' },
        take: 1 // Just get the first message for preview
      }
    }
  });
}

export async function getChat(chatId: string) {
  return prisma.chat.findUnique({
    where: { id: chatId },
    include: { 
      messages: {
        orderBy: { createdAt: 'asc' }
      }
    }
  });
}