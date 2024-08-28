type Message = {
    id: number;
    sender: 'user' | 'ai';
    text: string;
    timeStamp: Date;
};

export { type Message };
