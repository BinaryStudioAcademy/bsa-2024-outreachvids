import EventTarget from 'node:events';

import { type Server, type Socket } from 'socket.io';

class SocketEvent extends EventTarget {
    private io: Server | null = null;
    private socket: Socket | null = null;

    public initSocketConnection(io: Server, socket: Socket): void {
        this.io = io;
        this.socket = socket;
    }

    public getIo(): Server | null {
        return this.io;
    }

    public getSocket(): Socket | null {
        return this.socket;
    }

    public emitNotification(event: string): void {
        if (this.socket) {
            this.socket.emit(event);
        }
    }
}

const socketEvent = new SocketEvent();

export { socketEvent };
