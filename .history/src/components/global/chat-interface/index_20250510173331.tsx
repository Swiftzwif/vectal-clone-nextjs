"use client"

import React, { useState, useRef, useEffect } from 'react';
import WelcomeScreen from '@/components/global/chat-interface/welcome-screen';
import MessageComponent from '@/components/global/chat-interface/message';
import { ChatInterfaceNavBar } from './chat-interface-navbar';
export interface Message {
    id: number;
    text: string;
    sender: 'user' | 'ai';
  }

const ChatUI: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (inputMessage.trim() === '') return;

    const newMessage: Message = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user'
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Simulate AI response (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const aiResponse: Message = {
        id: Date.now() + 1,
        text: "This is a simulated AI response.",
        sender: 'ai'
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Failed to get AI response:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handelClearChat = () => {
    setMessages([]);
    setInputMessage('');
    setIsLoading(false);
  }


  return (
    <div className="flex flex-col h-full w-full lg:w-[55%] mx-auto bg-[#1E1E1E]">
      <div>
        <ChatInterfaceNavBar onClearChat={handelClearChat}/>
      </div>
      {/* Chat messages container */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <WelcomeScreen />
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <MessageComponent key={message.id} message={message} />
            ))}
            
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 rounded-lg p-4 max-w-[70%]">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input form */}
      <div className="border-none p-4">
        <form onSubmit={handleSendMessage} className="flex space-x-4">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputMessage}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                setInputMessage(e.target.value)
              }
              placeholder="Type your message..."
              className="w-full p-2 pr-10 pl-5 h-14 bg-[#252525] border-gray-300 rounded-lg focus:outline-none  focus:border-transparent"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading || inputMessage.trim() === ''}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 -rotate-45"
              >
                <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatUI;