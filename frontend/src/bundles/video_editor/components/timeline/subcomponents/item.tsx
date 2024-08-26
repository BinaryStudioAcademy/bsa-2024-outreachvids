import { type Span, useItem } from 'dnd-timeline';

type Properties = {
	id: string;
	span: Span;
	children: React.ReactNode;
};
const Item = ({ id, span }: Properties): JSX.Element => {
    const { setNodeRef, attributes, listeners, itemStyle, itemContentStyle } =
        useItem({
            id,
            span,
        });
        
    return (
        <div ref={setNodeRef} style={itemStyle} {...listeners} {...attributes}>
            <div style={itemContentStyle}>
                <div
                    style={{
                        width: '100%',
                        overflow: 'hidden',
                        margin: '2px',
                        borderRadius: '15px',
                        backgroundColor: 'lightblue',
                        color: 'darkblue',
                        textAlign: 'center',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%', 
                    }}
                >
                    {properties.children}
                </div>
            </div>
        </div>
    );
};

export { Item };