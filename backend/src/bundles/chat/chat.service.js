import { encoding_for_model } from 'tiktoken';
import { CHAT_MODEL } from '~/common/services/open-ai/libs/constants/constants.js';
class ChatService {
    modelEncoding;
    constructor() {
        this.modelEncoding = encoding_for_model(CHAT_MODEL);
    }
    addMessageToHistory(chatHistory, userMessage, role) {
        const newUserMessage = {
            content: userMessage,
            role,
        };
        return [...chatHistory, newUserMessage];
    }
    countTokens(messages) {
        return messages.reduce((sum, message) => sum + this.modelEncoding.encode(message.content).length, 0);
    }
    deleteOldMessages(messages, maxTokens) {
        let totalTokens = this.countTokens(messages);
        let updatedMessages = [...messages];
        while (totalTokens > maxTokens && updatedMessages.length > 0) {
            const [removedMessage, ...rest] = updatedMessages;
            updatedMessages = rest;
            if (!removedMessage) {
                break;
            }
            totalTokens -= this.modelEncoding.encode(removedMessage.content).length;
        }
        return updatedMessages;
    }
}
export { ChatService };
