import { type RowDefinition } from 'dnd-timeline';
import { useRow } from 'dnd-timeline';

interface RowProperties extends RowDefinition {
	children: React.ReactNode;
	sidebar: React.ReactNode;
}
const Row = (properties: RowProperties): JSX.Element => {
    const {
        setNodeRef,
        setSidebarRef,
        rowWrapperStyle,
        rowStyle,
        rowSidebarStyle,
    } = useRow({ id: properties.id });

    return (
        <div style={{ ...rowWrapperStyle, minHeight: 50 }}>
            <div ref={setSidebarRef} style={rowSidebarStyle}>
                {properties.sidebar}
            </div>
            <div ref={setNodeRef} style={{ ...rowStyle, border: '1px solid grey' }}>
                {properties.children}
            </div>
        </div>
    );
};

export { Row };