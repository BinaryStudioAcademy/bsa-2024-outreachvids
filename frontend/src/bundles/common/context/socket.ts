import React from 'react';
import { type Socket,io } from 'socket.io-client';

const serverUrl = import.meta.env['VITE_APP_PROXY_SERVER_URL'];

const socket = io(serverUrl);
const SocketContext = React.createContext<Socket>(socket);

export { socket, SocketContext };
