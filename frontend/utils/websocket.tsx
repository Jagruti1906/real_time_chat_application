import { WebSocketEvent } from '../types';

class WebSocketService {
  private socket: WebSocket | null = null;
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  connect(onMessage: (event: WebSocketEvent) => void, onStatusChange: (status: boolean) => void) {
    this.socket = new WebSocket(this.url);

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

  sendMessage(message: string) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type: 'message', payload: message }));
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }
}

export const webSocketService = new WebSocketService('ws://localhost:8000/ws');
