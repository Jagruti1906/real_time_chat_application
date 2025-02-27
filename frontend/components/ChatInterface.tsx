'use client'
import React, { useState, useEffect } from 'react';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import ConnectionStatus from './ConnectionStatus';
import UsernameInput from './UserNameInput';
import { webSocketService } from '../utils/websocket';
import { Message, WebSocketEvent } from '../types';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    if (username) {
      webSocketService.connect(handleWebSocketMessage, handleConnectionStatus);
    }

    return () => {
      webSocketService.disconnect();
    };
  }, [username]);

  const handleWebSocketMessage = (event: WebSocketEvent) => {
    if (event.type === 'message') {
      setMessages((prevMessages) => [...prevMessages, event.payload]);
    }
  };

  const handleConnectionStatus = (status: boolean) => {
    setIsConnected(status);
  };

  const sendMessage = (text: string) => {
    webSocketService.sendMessage(text, username!);
  };

  const handleUsernameSubmit = (newUsername: string) => {
    setUsername(newUsername);
  };

  if (!username) {
    return <UsernameInput onUsernameSubmit={handleUsernameSubmit} />;
  }

  return (
    <div className="chat-interface">
      <ConnectionStatus isConnected={isConnected} />
      <MessageList messages={messages} />
      <MessageInput onSendMessage={sendMessage} />
    </div>
  );
};

export default ChatInterface;
