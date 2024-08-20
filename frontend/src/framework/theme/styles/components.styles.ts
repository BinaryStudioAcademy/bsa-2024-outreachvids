const components = {
    Heading: {
        baseStyle: {
            color: 'text.white',
            fontFamily: 'Poppins, sans-serif',
            textAlign: 'left',
        },
        variants: {
            H1: {
                fontSize: '54px',
                fontWeight: '600',
                lineHeight: '64px',
            },
            H2: {
                fontSize: '30px',
                fontWeight: '600',
                lineHeight: '32px',
            },
            H3: {
                fontSize: '18px',
                fontWeight: '700',
                lineHeight: '27px',
            },
        },
    },
    Text: {
        baseStyle: {
            color: 'text.white',
            fontFamily: 'Poppins, sans-serif',
            textAlign: 'left',
        },
        variants: {
            body1: {
                fontSize: '16px',
                fontWeight: '500',
                lineHeight: '22px',
            },
            bodySmall: {
                fontSize: '14px',
                fontWeight: '400',
                lineHeight: '20px',
            },
            caption: {
                fontSize: '12px',
                fontWeight: '400',
                lineHeight: '16px',
            },
            button: {
                fontSize: '14px',
                fontWeight: '600',
                lineHeight: '16px',
            },
        },
    },
};

export { components };
