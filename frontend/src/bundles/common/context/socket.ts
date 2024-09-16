import React from 'react';
import { type Socket } from 'socket.io-client';
import { io } from 'socket.io-client';

const serverUrl = import.meta.env['VITE_APP_PROXY_SERVER_URL'];

const socket = io(serverUrl);
const SocketContext = React.createContext<Socket>(socket);

export { socket, SocketContext };
