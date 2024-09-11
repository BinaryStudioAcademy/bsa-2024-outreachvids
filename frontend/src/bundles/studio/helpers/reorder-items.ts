const reorderItemsByIndexes = <T>({
    oldIndex,
    newIndex,
    items,
}: {
    oldIndex: number;
    newIndex: number;
    items: Array<T>;
}): Array<T> => {
    const item = items[oldIndex] as T;

    if (newIndex === oldIndex) {
        return items;
    }

    if (newIndex > oldIndex) {
        return items.toSpliced(newIndex, 0, item).toSpliced(oldIndex, 1);
    }

    return items.toSpliced(oldIndex, 1).toSpliced(newIndex, 0, item);
};

export { reorderItemsByIndexes };
