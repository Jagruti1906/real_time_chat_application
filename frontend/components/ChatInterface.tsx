'use client'

import React, { useState, useEffect } from 'react'
import MessageInput from './MessageInput'
import MessageList from './MessageList'
import ConnectionStatus from './ConnectionStatus'
import { webSocketService } from './../utils/websocket'
import { Message, WebSocketEvent } from './../types'

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    webSocketService.connect(handleWebSocketMessage, handleConnectionStatus)

    return () => {
      webSocketService.disconnect()
    }
  }, [])

  const handleWebSocketMessage = (event: WebSocketEvent) => {
    if (event.type === 'message') {
      setMessages((prevMessages) => [...prevMessages, event.payload])
    }
  }

  const handleConnectionStatus = (status: boolean) => {
    setIsConnected(status)
  }

  const sendMessage = (text: string) => {
    webSocketService.sendMessage(text)
  }

  return (
    <div className="chat-interface">
      <ConnectionStatus isConnected={isConnected} />
      <MessageList messages={messages} />
      <MessageInput onSendMessage={sendMessage} />
    </div>
  )
}

export default ChatInterface
