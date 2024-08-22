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
                        border: '1px solid white',
                        width: '100%',
                        overflow: 'hidden',
                    }}
                >
                    {properties.children}
                </div>
            </div>
        </div>
    );
};

export { Item };