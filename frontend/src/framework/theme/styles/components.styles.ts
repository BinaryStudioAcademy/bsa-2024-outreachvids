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
            H4: {
                fontSize: '16px',
                fontWeight: '700',
                lineHeight: '24px',
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
            title: {
                color: colors.typography[900],
                fontSize: '18px',
                fontWeight: '700',
                lineHeight: '27px',
                marginBottom: '5px',
            },
            link: {
                _hover: {
                    color: colors.brand.secondary[300],
                },
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
                _active: {
                    bgColor: colors.brand.secondary[900],
                },
            },
            gray: {
                color: colors.typography[600],
                bgColor: colors.background[50],
            },
            light: {
                color: colors.background[50],
                bgColor: colors.white,
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
            secondaryOutlined: {
                color: colors.brand.secondary[300],
                border: '1px solid',
                borderColor: colors.brand.secondary[300],
                _hover: {
                    bg: colors.brand.secondary[100],
                    _disabled: {
                        color: colors.brand.secondary[600],
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
            ghostIconDark: {
                color: colors.background[300],
                _hover: {
                    color: colors.brand.secondary[300],
                },
            },
            icon: {
                color: colors.white,
                bg: 'none',
                _active: { bg: 'none' },
                _hover: { bg: 'none' },
            },
        },
    },
    CloseButton: {
        variants: {
            simple: {
                _hover: {
                    bg: 'none',
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
        baseStyle: {
            field: { fontSize: 'sm' },
        },
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
    Select: {
        baseStyle: {
            field: { fontSize: 'sm' },
        },
        variants: {
            outline: {
                field: {
                    _hover: {
                        cursor: 'pointer',
                    },
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
                },
            },
        },
    },
    Textarea: {
        baseStyle: {
            fontSize: 'sm',
        },
        variants: {
            outline: {
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
            },
        },
    },
    FormLabel: {
        baseStyle: {
            fontSize: 'sm',
        },
    },
    FormError: {
        baseStyle: {
            text: {
                color: colors.brand.secondary[900],
            },
        },
    },
    Card: {
        variants: {
            outline: {
                container: {
                    borderColor: colors.brand.secondary[300],
                },
            },
        },
    },
    Progress: {
        variants: {
            stepper: {
                filledTrack: {
                    bg: colors.white,
                },
                track: {
                    bg: colors.background[600],
                },
            },
        },
    },
};

export { components };
