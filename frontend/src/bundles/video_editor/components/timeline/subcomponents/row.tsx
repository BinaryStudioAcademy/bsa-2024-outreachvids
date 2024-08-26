import { type RowDefinition, useRow } from 'dnd-timeline';

interface RowProperties extends RowDefinition {
	children: React.ReactNode;
}
const Row = (properties: RowProperties): JSX.Element => {
    const {
        setNodeRef,
        rowWrapperStyle,
        rowStyle,
    } = useRow({ id: properties.id });

    return (
        <div style={{ ...rowWrapperStyle, minHeight: 50 }}>
            <div ref={setNodeRef} style={{ ...rowStyle, border: '1px solid white' }}>
                {properties.children}
            </div>
        </div>
    );
};

export { Row };