import React from 'react';
import { type Socket, io } from 'socket.io-client';

import { SOCKET_TRANSPORT_WEBSOCKETS } from '~/bundles/common/constants/constants.js';

const serverUrl = import.meta.env['VITE_APP_PROXY_SERVER_URL'];

const socket = io(serverUrl, {
    // This is to ensure that it dosent fall back to long polling as it return a 404 if it does
    transports: [SOCKET_TRANSPORT_WEBSOCKETS],
});
const SocketContext = React.createContext<Socket>(socket);

export { socket, SocketContext };
