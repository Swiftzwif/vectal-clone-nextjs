import { Message } from '@/lib/stores/use-chat-store';

export interface Chat {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
}

export async function fetchChats(): Promise<Chat[]> {
  const response = await fetch('/api/chats');
  
  if (!response.ok) {
    throw new Error('Failed to fetch chats');
  }
  
  const data = await response.json();
  return data.chats;
}

export async function fetchChat(chatId: string): Promise<Chat> {
  const response = await fetch(`/api/chats/${chatId}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch chat');
  }
  
  const data = await response.json();
  return data.chat;
}

export async function createChat(title?: string): Promise<Chat> {
  const response = await fetch('/api/chats', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to create chat');
  }
  
  const data = await response.json();
  return data.chat;
}

export async function sendMessage(chatId: string, message: string): Promise<Message> {
  const response = await fetch(`/api/chats/${chatId}/messages`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text: message }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to send message');
  }
  
  const data = await response.json();
  return data.message;
}
