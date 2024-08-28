const circleVariants = {
    animate: {
        r: [1, 5, 10, 15, 20],
        opacity: [0.9, 0.3, 0.2, 0.1, 0],
    },
};

const circleTransition = {
    repeat: Number.POSITIVE_INFINITY,
    ease: 'easeOut',
    duration: 2,
};

export { circleTransition, circleVariants };
