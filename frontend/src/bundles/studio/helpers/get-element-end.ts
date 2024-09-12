const getElementEnd = (itemsEnd: number, elementWidth: number): number => {
    return (
        itemsEnd +
        (Number.isFinite(elementWidth) ? Math.round(elementWidth) : 0)
    );
};

export { getElementEnd };
