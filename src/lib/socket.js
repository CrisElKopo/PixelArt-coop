import { io } from 'socket.io-client';

let socket;

export const getSocket = () => {
  if (!socket) {
    // Configurar la instancia de Socket.IO
    socket = io('http://localhost:3001', {
      withCredentials: true, // Permite el envío de cookies si es necesari
    });
  }
  return socket;
};
