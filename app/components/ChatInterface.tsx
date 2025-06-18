"use client"
import React, { useState } from 'react';
import { MessageList } from './MessageList';
import { ChatInput } from './ChatInput';
import { ChatHeader } from './ChatHeader';
import { VideoCallModal } from './VideoCallModal';
import { Message, User } from '../types/chat';

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m here to help with your legal consultation. How can I assist you today?',
      sender: {
        id: 'lawyer1',
        name: 'Sarah Johnson',
        isLawyer: true,
        avatar: '/placeholder.svg'
      },
      timestamp: new Date(Date.now() - 300000),
      type: 'text'
    },
    {
      id: '2',
      text: 'Thank you for connecting with me. I have some questions about contract law.',
      sender: {
        id: 'client1',
        name: 'John Smith',
        isLawyer: false,
        avatar: '/placeholder.svg'
      },
      timestamp: new Date(Date.now() - 240000),
      type: 'text'
    }
  ]);

  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const [activeCall, setActiveCall] = useState<'video' | 'audio' | null>(null);

  const currentUser: User = {
    id: 'client1',
    name: 'John Smith',
    isLawyer: false,
    avatar: '/placeholder.svg'
  };

  const otherUser: User = {
    id: 'lawyer1',
    name: 'Sarah Johnson',
    isLawyer: true,
    avatar: '/placeholder.svg'
  };

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: currentUser,
      timestamp: new Date(),
      type: 'text'
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleFileUpload = (file: File) => {
    const fileType = file.type.startsWith('image/') ? 'image' : 
                    file.type.startsWith('video/') ? 'video' : 'document';
    
    const newMessage: Message = {
      id: Date.now().toString(),
      text: `Shared ${file.name}`,
      sender: currentUser,
      timestamp: new Date(),
      type: fileType,
      fileName: file.name,
      fileUrl: URL.createObjectURL(file)
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleVideoCall = () => {
    setActiveCall('video');
    setIsVideoCallOpen(true);
  };

  const handleAudioCall = () => {
    setActiveCall('audio');
    // In a real app, this would initiate an audio call
    console.log('Starting audio call...');
  };

  const handleEndCall = () => {
    setActiveCall(null);
    setIsVideoCallOpen(false);
  };

  return (
    <div className="h-screen bg-slate-50 flex flex-col">
      <ChatHeader 
        user={otherUser} 
        onVideoCall={handleVideoCall}
        onAudioCall={handleAudioCall}
        isCallActive={activeCall !== null}
      />
      
      <div className="flex-1 overflow-hidden">
        <MessageList messages={messages} currentUser={currentUser} />
      </div>
      
      <ChatInput 
        onSendMessage={handleSendMessage}
        onFileUpload={handleFileUpload}
        onVideoCall={handleVideoCall}
        onAudioCall={handleAudioCall}
      />

      {isVideoCallOpen && (
        <VideoCallModal 
          user={otherUser}
          onEndCall={handleEndCall}
          callType={activeCall || 'video'}
        />
      )}
    </div>
  );
};

export default ChatInterface;
