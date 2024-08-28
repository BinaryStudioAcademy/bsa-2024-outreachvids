import { type Message } from './message.js';

type MessageGroup = {
    sender: 'user' | 'ai';
    messages: Message[];
};

export { type MessageGroup };
