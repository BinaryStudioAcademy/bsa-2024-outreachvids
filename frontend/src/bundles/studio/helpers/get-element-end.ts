const getElementEnd = (itemsEnd: number, elementWidth: number): number => {
    return itemsEnd + (Number.isFinite(elementWidth) ? elementWidth : 0);
};

export { getElementEnd };
