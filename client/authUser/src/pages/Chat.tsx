import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';
import { useAuth } from '../StateContext/AuthContext';

const socket = io('http://localhost:8080'); // Replace with your server URL

const Chat: React.FC = () => {
  const {user} = useAuth();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ text: string; id: number; userId: string }[]>([]);

  const userId = user?.username!;
  useEffect(() => {
    // Authenticate the user
    socket.emit('authenticate', userId);

    socket.on('message', (serializedMsg) => {
        console.log('Received message:', serializedMsg);
        // const parsedMsg =  JSON.parse(serializedMsg);
    
        try {
            setMessages((prev) => [...prev, serializedMsg]); 
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    });

    return () => {
      // Disconnect socket when the component unmounts
      // socket.disconnect();
      socket.off()
    };
  }, []);

  const sendMessage = () => {
    // Emit 'chat message' event to the server
    socket.emit('message', {userId, text: message, id: Date.now() });
    setMessage('');
    console.log(messages)
  };

  return (
    <div>
      <h1>A simple chat app</h1>
      <button type="button" ><Link to={'/loggedin'}>Profile</Link></button>
      <form onSubmit={(e) => e.preventDefault()}>
        <input value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Type a message" />
        <button type="submit" onClick={sendMessage}>
          Send
        </button>
      </form>
      <ul>
        {messages.map((msg, i) => (
          <li key={i} style={{listStyle: "none"}}>{msg.userId}:{msg.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Chat;
