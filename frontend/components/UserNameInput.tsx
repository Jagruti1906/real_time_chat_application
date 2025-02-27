'use client'
import React, { useState } from 'react';

interface UsernameInputProps {
  onUsernameSubmit: (username: string) => void;
}

const UsernameInput: React.FC<UsernameInputProps> = ({ onUsernameSubmit }) => {
  const [username, setUsername] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onUsernameSubmit(username.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="username-input">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Enter your username"
      />
      <button type="submit">Join Chat</button>
    </form>
  );
};

export default UsernameInput;
