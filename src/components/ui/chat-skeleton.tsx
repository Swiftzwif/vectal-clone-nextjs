import React from 'react';

const ChatSkeleton: React.FC = () => (
  <div className="flex flex-col h-full w-full lg:w-[55%] mx-auto bg-[#1E1E1E] p-4">
    <div className="h-12 bg-gray-700 rounded-md animate-pulse mb-4"></div>
    
    <div className="flex-1 space-y-4">
      {/* User message skeleton */}
      <div className="flex justify-end mb-4">
        <div className="max-w-[70%] rounded-lg p-3 bg-gray-700 animate-pulse h-10"></div>
        <div className="h-8 w-8 rounded-full bg-gray-700 animate-pulse ml-2"></div>
      </div>
      
      {/* AI message skeleton */}
      <div className="flex justify-start mb-4">
        <div className="h-8 w-8 rounded-full bg-gray-700 animate-pulse mr-2"></div>
        <div className="max-w-[70%] rounded-lg p-3 bg-gray-700 animate-pulse h-20"></div>
      </div>
    </div>
    
    {/* Input skeleton */}
    <div className="h-14 bg-gray-700 rounded-lg animate-pulse mt-4"></div>
  </div>
);

export default ChatSkeleton;