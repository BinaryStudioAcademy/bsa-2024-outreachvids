import { colors } from './colors.styles.js';

const components = {
    Heading: {
        baseStyle: {
            color: colors.text.accent,
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
    Button: {
        variants: {
            ghostIcon: {
                color: 'white',
                _hover: {
                    color: 'brand.secondary.300',
                },
            },
        },
    },
};

export { components };
