import React from 'react';
import { Message } from './../types';

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="message-list">
      {messages.map((message) => (
        <div key={message.id} className="message">
          <span className="sender">{message.sender}: </span>
          <span className="text">{message.text}</span>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
