import { type ReactNode } from 'react';

const stringToReactNode = (message: string): ReactNode => {
    return message.split('\n').map((line, index) => (
        <div key={index} style={{ whiteSpace: 'pre-wrap' }}>
            {line}
        </div>
    ));
};

export { stringToReactNode };
