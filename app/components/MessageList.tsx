
import React from 'react';
import { MessageBubble } from './MessageBubble';
import { Message, User } from '../types/chat';

interface MessageListProps {
  messages: Message[];
  currentUser: User;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, currentUser }) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          isOwnMessage={message.sender.id === currentUser.id}
        />
      ))}
    </div>
  );
};
