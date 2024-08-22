import  { type RowDefinition } from 'dnd-timeline';

interface SidebarProperties {
	row: RowDefinition;
}
const Sidebar = (properties: SidebarProperties): JSX.Element => {
    return (
        <div style={{ width: 200, border: '1px solid grey' }}>
            {`Row ${properties.row.id}`}
        </div>
    );
};

export { Sidebar };