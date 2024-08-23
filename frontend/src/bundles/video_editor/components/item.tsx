import { type Span } from 'dnd-timeline';
import { useItem } from 'dnd-timeline';

interface ItemProperties {
	id: string;
	span: Span;
	children: React.ReactNode;
}
const Item = (properties: ItemProperties): JSX.Element => {
    const { setNodeRef, attributes, listeners, itemStyle, itemContentStyle } =
        useItem({
            id: properties.id,
            span: properties.span,
        });

    return (
        <div ref={setNodeRef} style={itemStyle} {...listeners} {...attributes}>
            <div style={itemContentStyle}>
                <div
                    style={{
                        width: '100%',
                        overflow: 'hidden',
                        margin: '2px',
                        borderRadius: '5px',
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