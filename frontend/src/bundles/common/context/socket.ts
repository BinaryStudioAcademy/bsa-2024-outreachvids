import React from 'react';
import { type Socket } from 'socket.io-client';
import { io } from 'socket.io-client';

const socket = io('http://localhost:3001');
const SocketContext = React.createContext<Socket>(socket);

export { socket, SocketContext };
