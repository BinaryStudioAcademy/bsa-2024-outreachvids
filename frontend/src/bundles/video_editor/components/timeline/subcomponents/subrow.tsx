
interface SubrowProperties {
	children: React.ReactNode;
}

const Subrow = (properties: SubrowProperties): JSX.Element => {
    return (
        <div style={{ height: 50, position: 'relative' }}>{properties.children}</div>
    );
};

export { Subrow };