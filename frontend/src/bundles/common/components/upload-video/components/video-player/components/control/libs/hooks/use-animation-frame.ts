import {
    useCallback,
    useEffect,
    useRef,
} from '~/bundles/common/hooks/hooks.js';

const useAnimationFrame = (
    nextAnimationFrameHandler: () => void,
    shouldAnimate = true,
): void => {
    const frame = useRef(0);

    const animate = useCallback((): void => {
        nextAnimationFrameHandler();
        frame.current = requestAnimationFrame(animate);
    }, [nextAnimationFrameHandler]);

    useEffect(() => {
        if (shouldAnimate) {
            frame.current = requestAnimationFrame(animate);
        } else {
            cancelAnimationFrame(frame.current);
        }

        return (): void => cancelAnimationFrame(frame.current);
    }, [animate, shouldAnimate]);
};

export { useAnimationFrame };
