import { type Message } from './bundles/chat/libs/types/types.ts';

declare module 'fastify' {
    interface Session {
        chatHistory: Message[];
    }
}
