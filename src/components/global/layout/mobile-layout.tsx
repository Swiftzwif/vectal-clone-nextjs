"use client"

import React from 'react';
import { MessageCircle, ListCheck, Settings2 } from "lucide-react";
import { useLayout } from './layout-provider';
import ChatUI from "@/components/global/chat-interface";
import TaskList from "@/components/global/task-list";
import Notes from "@/components/global/notes";
import { timelineData } from "@/data/timeline";

export const MobileLayout: React.FC = () => {
  const { activeView, setActiveView } = useLayout();
  
  return (
    <div className="flex flex-col h-screen bg-[#151515]">
      {/* Navigation Bar */}
      <div className="bg-[#1E1E1E] p-4 border-b border-gray-800">
        <div className="flex justify-around">
          <button
            onClick={() => setActiveView('chat')}
            className={`p-3 rounded-lg transition-colors duration-200 ${
              activeView === 'chat' ? 'text-white bg-[#333333]' : 'text-gray-400'
            }`}
          >
            <MessageCircle className="size-6" />
          </button>
          
          <button
            onClick={() => setActiveView('tasks')}
            className={`p-3 rounded-lg transition-colors duration-200 ${
              activeView === 'tasks' ? 'text-white bg-[#333333]' : 'text-gray-400'
            }`}
          >
            <ListCheck className="size-6" />
          </button>
          
          <button
            onClick={() => setActiveView('notes')}
            className={`p-3 rounded-lg transition-colors duration-200 ${
              activeView === 'notes' ? 'text-white bg-[#333333]' : 'text-gray-400'
            }`}
          >
            <Settings2 className="size-6" />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden">
        {activeView === 'chat' && <ChatUI />}
        {activeView === 'tasks' && <TaskList />}
        {activeView === 'notes' && <Notes items={timelineData} />}
      </div>
    </div>
  );
};