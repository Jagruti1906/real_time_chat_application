export interface Message {
    id: string;
    text: string;
    sender: string;
    timestamp: number;
  }
  
  export interface WebSocketEvent {
    type: 'message' | 'connection_status';
    payload: any;
  }
  