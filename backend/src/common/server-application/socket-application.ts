import { type Server, type Socket } from 'socket.io';

import { socketEvent } from '../socket/socket.js';

const initSocketConnection = (io: Server, socket: Socket): void => {
    socketEvent.initSocketConnection(io, socket);

    socket.on('disconnect', () => {});
};

export { initSocketConnection };
