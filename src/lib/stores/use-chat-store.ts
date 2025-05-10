import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Message {
  id: string | number;
  text: string;
  role: 'user' | 'assistant';
}

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  activeChatId: string | null;
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  clearMessages: () => void;
  setLoading: (isLoading: boolean) => void;
  setActiveChatId: (chatId: string | null) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      isLoading: false,
      activeChatId: null,
      addMessage: (message) => set((state) => ({ 
        messages: [...state.messages, message] 
      })),
      setMessages: (messages) => set({ messages }),
      clearMessages: () => set({ messages: [] }),
      setLoading: (isLoading) => set({ isLoading }),
      setActiveChatId: (activeChatId) => set({ activeChatId }),
    }),
    {
      name: 'chat-storage',
    }
  )
);