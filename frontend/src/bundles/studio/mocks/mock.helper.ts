import { minutesToMilliseconds } from 'date-fns';
import { type ItemDefinition } from 'dnd-timeline';

const getRandomInRange = (min: number, max: number): number => {
    return Math.random() * (max - min) + min;
};

const generateMockItems = (count: number): ItemDefinition[] => {
    let avatarsStart = 0;
    let scriptsStart = 0;

    return Array.from({ length: count })
        .fill(0)
        .map((_, index): ItemDefinition => {
            const rowId = getRandomInRange(0, 2) <= 1 ? 'avatars' : 'scripts';

            switch (rowId) {
                case 'avatars': {
                    const duration = minutesToMilliseconds(8);
                    const span = {
                        start: avatarsStart,
                        end: avatarsStart + duration,
                    };
                    avatarsStart += duration;
                    return { id: `${index + 1}`, rowId, span };
                }
                case 'scripts': {
                    const duration = minutesToMilliseconds(4);
                    const span = {
                        start: scriptsStart,
                        end: scriptsStart + duration,
                    };
                    scriptsStart += duration;
                    return { id: `${index + 1}`, rowId, span };
                }
            }
        });
};

export { generateMockItems };
