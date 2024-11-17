// src/context/SocketContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { toast } from 'sonner';

// Define the type for the socket context
interface SocketContextType {
  socket: Socket | null;
}

const SOCKET_URL = 'http://localhost:3322';
// Create the context with a default value of null
const SocketContext = createContext<SocketContextType>({ socket: null });

// Custom hook to use the socket
export const useSocket = (): SocketContextType => {
  return useContext(SocketContext);
};

// Provider component to wrap the app
export const SocketProvider: React.FC = ({ children }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    console.log(token);
    // Replace with your server's URL
    const socketInstance = io(SOCKET_URL, {
      transports: ['websocket'],
      query: {
        token: token,
      },
    });

    // Listen for connection
    socketInstance.on('connect', () => {
      console.log('Socket.IO connected with ID:', socketInstance.id);
    });

    // Listen for disconnection
    socketInstance.on('disconnect', () => {
      console.log('Socket.IO disconnected');
    });
    socketInstance.on('new_message', (message) => {
      toast(message);
    });

    // Save the socket instance in the state
    setSocket(socketInstance);

    // Cleanup when the component unmounts
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
