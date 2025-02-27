import { WebSocketEvent } from '../types';
import { v4 as uuidv4 } from 'uuid';



class WebSocketService {
  private socket: WebSocket | null = null;
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  connect(onMessage: (event: WebSocketEvent) => void, onStatusChange: (status: boolean) => void) {
    const clientId = uuidv4(); // You'll need to import uuid
    this.socket = new WebSocket(`${this.url}/${clientId}`);

    this.socket.onopen = () => {
      onStatusChange(true);
    };

    this.socket.onclose = () => {
      onStatusChange(false);
    };

    this.socket.onmessage = (event) => {
      const data: WebSocketEvent = JSON.parse(event.data);
      onMessage(data);
    };
  }

  sendMessage(message: string, username: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type: 'message', payload: { text: message, sender: username } }));
    }
  }
  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

export const webSocketService = new WebSocketService('https://real-time-chat-application-1-weuf.onrender.com/ws');
