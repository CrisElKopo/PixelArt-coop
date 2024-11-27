const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// Aquí se configura Socket.IO con las opciones de CORS
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',  // El origen del cliente (Next.js)
        methods: ['GET', 'POST', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,  // Asegúrate de permitir credenciales
    },
});


io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id);

    socket.on('pixelPainted', (data) => {
        console.log('Pixel pintado:', data);
        io.emit('pixelPainted', data);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado:', socket.id);
    });
});

server.listen(3001, () => {
    console.log('Servidor escuchando en http://localhost:3001');
});
