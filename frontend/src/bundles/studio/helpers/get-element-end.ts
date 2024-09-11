import { type PixelsToValue } from 'dnd-timeline';

const getElementEnd = (
    itemsEnd: number,
    widthInPixels: number,
    pixelsToValue: PixelsToValue,
): number => {
    const elementWidth = Math.round(pixelsToValue(widthInPixels));
    return itemsEnd + (Number.isFinite(elementWidth) ? elementWidth : 0);
};

export { getElementEnd };
