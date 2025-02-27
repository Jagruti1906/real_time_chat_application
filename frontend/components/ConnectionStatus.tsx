import React from 'react';

interface ConnectionStatusProps {
  isConnected: boolean;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ isConnected }) => {
  return (
    <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
      {isConnected ? 'Connected' : 'Disconnected'}
    </div>
  );
};

export default ConnectionStatus;
