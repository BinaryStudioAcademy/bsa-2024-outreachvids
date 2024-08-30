import { colors } from './colors.styles.js';

const components = {
    Heading: {
        baseStyle: {
            color: colors.white,
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
            color: colors.white,
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
    Button: {
        variants: {
            solid: {
                color: colors.white,
                bgColor: colors.brand.secondary[300],
                _hover: {
                    bg: colors.brand.secondary[600],
                    _disabled: {
                        bg: colors.brand.secondary[600],
                    },
                },
            },
            primaryOutlined: {
                color: colors.background[300],
                border: '1px solid',
                borderColor: colors.background[300],
                _hover: {
                    color: 'white',
                    bg: colors.background[300],
                    _disabled: {
                        color: colors.background[300],
                        bg: 'none',
                    },
                },
            },
            outlined: {
                color: colors.brand.secondary[300],
                border: '1px solid',
                borderColor: colors.brand.secondary[300],
                _hover: {
                    color: 'white',
                    bg: colors.brand.secondary[300],
                    _disabled: {
                        color: colors.brand.secondary[600],
                        bg: 'none',
                    },
                },
            },
            ghostIcon: {
                color: colors.white,
                _hover: {
                    color: colors.brand.secondary[300],
                },
            },
        },
    },
    Link: {
        variants: {
            primary: {
                color: colors.text.default,
            },
            secondary: {
                color: colors.brand.secondary[300],
                _hover: {
                    color: colors.brand.secondary[600],
                },
            },
        },
        baseStyle: {
            _hover: {
                textDecoration: 'none',
            },
        },
    },
    Input: {
        variants: {
            outline: {
                field: {
                    _focus: {
                        borderWidth: '2px',
                        borderColor: colors.brand.secondary[300],
                        boxShadow: 'none',
                    },
                    _placeholder: {
                        color: colors.typography[300],
                    },
                    _invalid: {
                        borderWidth: '2px',
                        borderColor: colors.brand.secondary[900],
                        boxShadow: 'none',
                    },
                    _autofill: {
                        textFillColor: colors.white,
                        caretColor: colors.white,
                        boxShadow: '0 0 0 0 inherit inset',
                        transition: 'background-color 5000s ease-in-out 0s',
                    },
                },
            },
        },
    },
    FormError: {
        baseStyle: {
            text: {
                color: colors.brand.secondary[900],
            },
        },
    },
};

export { components };
